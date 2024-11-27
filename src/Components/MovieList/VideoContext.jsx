import React, { createContext, useState } from 'react';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [pausePlayingVideo, setPausePlayingVideo] = useState(() => {});

  return (
    <VideoContext.Provider value={{ playingVideo, setPlayingVideo, pausePlayingVideo, setPausePlayingVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
