import React, { useCallback, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { TextField, Button } from '@mui/material';

import { getIframeSrc } from './utils';

const EmbedNodeView = ({ node, updateAttributes }) => {
  const { url } = node.attrs;
  const [input, setInput] = useState('');

  const setUrl = useCallback(() => {
    const iFrameSrc = getIframeSrc(input);
    if (iFrameSrc) updateAttributes({ url: iFrameSrc });
  }, [input, updateAttributes]);

  if (url) {
    return (
      <NodeViewWrapper>
        <iframe
          allowFullScreen
          className={'w-full shadow-02 rounded-md'}
          height="400px"
          loading="lazy"
          sandbox="allow-scripts allow-top-navigation-by-user-activation allow-forms allow-same-origin"
          src={url || 'https://velocity.vercel.app/'}
          title="embed"
        />
      </NodeViewWrapper>
    );
  }
  return (
    <NodeViewWrapper>
      <div className="w-full flex space-x-2 ">
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          placeholder="Enter embed URl..."
        />
        <Button onClick={setUrl}>Embed</Button>
      </div>
    </NodeViewWrapper>
  );
};

export default EmbedNodeView;
