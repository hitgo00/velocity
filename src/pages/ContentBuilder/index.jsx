import { noop } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import Editor from '../../components/Editor';

const APP_URL = 'https://extip.herokuapp.com';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun.stunprotocol.org:3478' },
  { urls: 'stun:stun.sipnet.net:3478' },
  { urls: 'stun:stun.ideasip.com:3478' },
  { urls: 'stun:stun.iptel.org:3478' },
  {
    urls: 'turn:numb.viagenie.ca',
    username: 'imvasanthv@gmail.com',
    credential: 'd0ntuseme',
  },
  {
    urls: [
      'turn:173.194.72.127:19305?transport=udp',
      'turn:[2404:6800:4008:C01::7F]:19305?transport=udp',
      'turn:173.194.72.127:443?transport=tcp',
      'turn:[2404:6800:4008:C01::7F]:443?transport=tcp',
    ],
    username: 'CKjCuLwFEgahxNRjuTAYzc/s6OMT',
    credential: 'u1SQDR/SQsPQIxXNWQT7czc/G4c=',
  },
];

const ContentBuilder = (props) => {
  const { courseId } = props.match.params;
  const ROOM_ID = courseId || 'velomcity';

  const socket = useRef();
  const peers = useRef({});
  const peerMedias = useRef({});
  const audioRef = useRef(null);

  const [peerStreams, setPeerStreams] = useState(0);

  const joinChannel = useCallback((channel, userdata) => {
    if (socket.current)
      socket.current.emit('join', { channel: channel, userdata: userdata });
  }, []);

  useEffect(() => {
    socket.current = io(APP_URL);
    socket.current.on('connect', function () {
      if (audioRef.current.srcObject) joinChannel(ROOM_ID, {});
      else {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          if (audioRef) {
            audioRef.current.srcObject = stream;
            joinChannel(ROOM_ID, {});
          }
        });
      }
    });

    socket.current.on('addPeer', function (config) {
      const peer_id = config.peer_id;
      if (peer_id in peers.current) return;

      const peerConnection = new RTCPeerConnection(
        { iceServers: ICE_SERVERS },
        { optional: [{ DtlsSrtpKeyAgreement: true }] }
      );
      peers.current[peer_id] = peerConnection;

      peerConnection.onicecandidate = function (event) {
        if (event.candidate) {
          socket.current.emit('relayICECandidate', {
            peer_id: peer_id,
            ice_candidate: {
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              candidate: event.candidate.candidate,
            },
          });
        }
      };
      peerConnection.onaddstream = (event) => {
        if (peer_id in peerMedias.current) return;
        peerMedias.current[peer_id] = event.stream;
        // console.log(peerMedias.current);
        setPeerStreams((n) => n + 1);

        // peerAudioRef.current.srcObject = event.stream;
      };

      /* Add our local stream */
      peerConnection.addStream(audioRef.current?.srcObject);

      if (config.should_create_offer) {
        peerConnection.createOffer(
          (localDescription) => {
            peerConnection.setLocalDescription(
              localDescription,
              () => {
                socket.current.emit('relaySessionDescription', {
                  peer_id: peer_id,
                  session_description: localDescription,
                });
              },
              () => alert('Offer setLocalDescription failed!')
            );
          },
          (error) => console.log('Error sending offer: ', error)
        );
      }
    });

    socket.current.on('sessionDescription', function (config) {
      const peer_id = config.peer_id;
      const peer = peers.current[peer_id];
      const remoteDescription = config.session_description;

      const desc = new RTCSessionDescription(remoteDescription);
      peer.setRemoteDescription(
        desc,
        () => {
          if (remoteDescription.type === 'offer') {
            peer.createAnswer(
              (localDescription) => {
                peer.setLocalDescription(
                  localDescription,
                  () => {
                    socket.current.emit('relaySessionDescription', {
                      peer_id: peer_id,
                      session_description: localDescription,
                    });
                  },
                  () => alert('Answer setLocalDescription failed!')
                );
              },
              (error) => console.log('Error creating answer: ', error)
            );
          }
        },
        (error) => console.log('setRemoteDescription error: ', error)
      );
    });

    socket.current.on('iceCandidate', function (config) {
      const peer = peers.current[config.peer_id];
      const iceCandidate = config.ice_candidate;
      peer.addIceCandidate(new RTCIceCandidate(iceCandidate));
    });

    socket.current.on('removePeer', function (config) {
      const peer_id = config.peer_id;
      if (peer_id in peers) {
        peers[peer_id].close();
      }
      setPeerStreams((n) => n - 1);

      delete peers[peer_id];
      delete peerMedias.current[config.peer_id];
    });
  }, [ROOM_ID, joinChannel]);

  return (
    <div>
      <audio autoPlay muted={true} ref={audioRef} />
      {peerStreams &&
        Object.entries(peerMedias.current).map((idStreamArr) => {
          //   console.log(`peerMedias.current`, idStreamArr);

          return (
            <audio
              id={idStreamArr[0]}
              autoPlay
              style={{ height: 0, width: 0 }}
              controls
              ref={(audio) =>
                audio ? (audio.srcObject = idStreamArr[1]) : noop
              }
            />
          );
        })}
      <Editor name="Meet" lessonId={courseId} viewOnly={false}/>
    </div>
  );
};

export default ContentBuilder;
