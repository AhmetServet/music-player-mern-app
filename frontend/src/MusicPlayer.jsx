import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';

const MusicPlayer = ({ song }) => {
  const [audioSrc, setAudioSrc] = useState('');
  const audioRef = useRef(null);
  const [audioKey, setAudioKey] = useState(0);



  useEffect(() => {

    const audioElement = audioRef.current;
    if (song && song.trackFile && song.trackFile.data) {
      console.log('Song:', song);
      // Turn buffer into base64 string
      const buffer = Buffer.from(song.trackFile.data);

      // Decode base64 string to binary
      const binaryString = window.atob(buffer);
      // Create uint8 array
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      // Create blob
      const trackFileBlob = new Blob([uint8Array], { type: 'audio/mpeg' });
      console.log('Track File Blob:', trackFileBlob);
      const trackFileUrl = URL.createObjectURL(trackFileBlob);
      setAudioSrc(trackFileUrl);
      console.log('Track File URL:', trackFileUrl);

      if(audioElement) {
        setAudioKey(prevKey => prevKey + 1);
      }
      // Clean up the URL object when the component unmounts or song changes
      return () => {
        URL.revokeObjectURL(trackFileUrl);

      };
    }
  }, [song]);

  return (
    <div>
      <h3>{song.title}</h3>
      {audioSrc ? (
        <audio key={audioKey} controls>
          <source src={audioSrc} ref={audioRef} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MusicPlayer;