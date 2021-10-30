import { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useUserDispatch,
  loginUser,
} from '../../components/context/UserContext';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

function LandingPage() {
  let userDispatch = useUserDispatch();
  let history = useHistory();
  let { state } = useLocation();

  return (
    <>
      <div>Welcome to Velomcity!!</div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign In with Google"
        onSuccess={(response) => {
          // setLoginLoading(true);
          loginUser(userDispatch, history, response, state);
        }}
        onFailure={(err) => {
          console.log(err);
          // setLoginLoading(false);
        }}
      />

    </>
  );
}

export default LandingPage;
