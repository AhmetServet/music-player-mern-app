import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicPlayer from './MusicPlayer.jsx';
import { useLocation } from 'react-router-dom';
import './ListenerPage.css'; // Import the CSS file


const ListenerPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongFile, setNewSongFile] = useState(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [listenerSongs, setSongs] = useState([]);
  const [editingSong, setEditingSong] = useState(null);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [updatedPlaylistTitle, setUpdatedPlaylistTitle] = useState('');
  const [updatedSongTitle, setUpdatedSongTitle] = useState('');
  const location = useLocation();
  const { username, listenerID } = location.state;

  useEffect(() => {
    fetchPlaylists();
    fetchAlbums();
    fetchSongsByListenerId(listenerID).then((songs) => setSongs(songs));
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get('http://localhost:8800/playlists');
      const playlistsData = res.data;
      const playlistsWithSongs = await Promise.all(
        playlistsData.map(async (playlist) => {
          const songs = await Promise.all(
            playlist.songs.map(async ({ songID }) => {
              const song = await fetchSongWithId(songID);
              return song;
            })
          );
          return { ...playlist, songs };
        })
      );
      setPlaylists(playlistsWithSongs);
      console.log('Fetched playlists:', playlistsWithSongs);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const res = await axios.get('http://localhost:8800/albums');
      const albumsData = res.data;
      const albumsWithSongs = await Promise.all(
        albumsData.map(async (album) => {
          const songs = await fetchAlbumSongs(album.albumID);
          const artistName = await fetchArtistName(album.artistID);
          return { ...album, artistName, songs };
        })
      );
      setAlbums(albumsWithSongs);
      console.log('Fetched albums:', albumsWithSongs);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchAlbumSongs = async (albumID) => {
    try {
      const res = await axios.post('http://localhost:8800/songs/album', { albumID });
      console.log('Fetched album songs:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching album songs:', error);
    }

    };

  const fetchSongWithId = async (songID) => {
    try {
      console.log('Fetching song with ID:', songID);
      const res = await axios.post(`http://localhost:8800/songs/id`, { songID });
      console.log('Axios Request:', res.config); // Log the axios request config
      console.log('Fetched song:', res.data);
      return res.data;
    } catch (error) {
      console.error(`Error fetching song with ID ${songID}:`, error);
      throw error;
    }
  };

  const fetchSongsByListenerId = async () => {
    try {
      const res = await axios.post('http://localhost:8800/songs/listener', { listenerID });
      console.log('Fetched songs:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const fetchArtistName = async (artistID) => {
    try {
      const res = await axios.post('http://localhost:8800/users/artistName/id', { artistID });
      console.log('Fetched artist name:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching artist name:', error);
    }
  };

  const handlePlaySong = (song) => {
    setPlayingSong(song);
  };

  const handleNewSongTitleChange = (e) => {
    setNewSongTitle(e.target.value);
  };

  const handleNewSongFileChange = (e) => {
    const file = e.target.files[0];
    setNewSongFile(file);
  };

  const handleNewPlaylistTitleChange = (e) => {
    setNewPlaylistTitle(e.target.value);
  };

  const handleNewSongSubmit = async (e) => {
    e.preventDefault();

    console.log('Uploading song:', newSongTitle, newSongFile);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const binaryData = reader.result.split(',')[1];
      console.log("reader.result", reader.result)
      try {
        const res = await axios.post('http://localhost:8800/songs', {
          listenerID: listenerID,
          title: newSongTitle,
          trackFile: binaryData
        });
        console.log('Uploaded song:', res.data);
        // Optionally, update the playlists or songs state with the new song
        fetchPlaylists();
        fetchSongsByListenerId(listenerID).then((songs) => setSongs(songs));
      } catch (error) {
        console.error('Error uploading song:', error);
      }
    };
    reader.readAsDataURL(newSongFile);
  };

  const handleNewPlaylistSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/playlists', {
        title: newPlaylistTitle,
        listenerID: listenerID,
        songs: []
      });
      console.log('Created new playlist:', res.data);
      setNewPlaylistTitle('');
      fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleAddSongToPlaylist = async (playlistID, songID) => {
    try {
      await axios.post(`http://localhost:8800/playlists/song`, { playlistID, songID });
      fetchPlaylists();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const handleRemoveSongFromPlaylist = async (playlistID, songID) => {
    try {
      console.log('Removing song from playlist:', playlistID, songID);
      await axios.delete(`http://localhost:8800/playlists/song`, {
        data: { playlistID, songID }
      });
      fetchPlaylists();
    } catch (error) {
      console.error('Error removing song from playlist:', error);
    }
  };

  const handleUpdateSong = async (songID) => {
    try {
      await axios.put(`http://localhost:8800/songs/id`, { songID:songID, title: updatedSongTitle });
      console.log('Updated song:', songID);
      fetchPlaylists();
      fetchSongsByListenerId(listenerID).then((songs) => setSongs(songs));
      setEditingSong(null);
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  const handleRemoveSong = async (songID) => {
    try {
      await axios.delete(`http://localhost:8800/songs/id`, { data: { songID } });
      console.log('Removed song:', songID);
      fetchPlaylists();
      fetchSongsByListenerId(listenerID).then((songs) => setSongs(songs));
    } catch (error) {
      console.error('Error removing song:', error);
    }
  };

  const handleUpdatePlaylist = async (playlistID) => {
    try {
      await axios.put(`http://localhost:8800/playlists/id`, { playlistID: playlistID, title: updatedPlaylistTitle });
      console.log('Updated playlist:', playlistID);
      fetchPlaylists();
      setEditingPlaylist(null);

    } catch (error) {
      console.error('Error updating playlist:', error);
    }

  }

  const handleRemovePlaylist = async (playlistID) => {
    try {
      await axios.delete(`http://localhost:8800/playlists/id`, { data: { playlistID } });
      console.log('Removed playlist:', playlistID);
      fetchPlaylists();
    } catch (error) {
      console.error('Error removing playlist:', error);
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Listener Page</h1>
        <h2>Welcome, {username}!</h2>
        
        <div>
          <h2>Playlists</h2>
          {playlists.map((playlist) => (
            <div key={playlist.playlistID}>
              <h3>{playlist.title}</h3>
              <button onClick={() => setEditingPlaylist(playlist.playlistID)}>Rename</button>
              {editingPlaylist === playlist.playlistID && (
                <div>
                  <input
                    type="text"
                    value={updatedPlaylistTitle}
                    onChange={(e) => setUpdatedPlaylistTitle(e.target.value)}
                  />
                  <button onClick={() => handleUpdatePlaylist(playlist.playlistID)}>Save</button>
                </div>
              )}
              <button onClick={() => handleRemovePlaylist(playlist.playlistID)}>Remove</button>

              <ul>
                {playlist.songs.map((song, index) => (
                  <li key={`${playlist.playlistID}-${song[0].songID}-${index}`}>
                    {song[0].title}
                    <button onClick={() => handlePlaySong(song[0])}>Play</button>
                    <button onClick={() => handleRemoveSongFromPlaylist(playlist.playlistID, song[0].songID)}>Remove from Playlist</button>
                  </li>
                ))}
              </ul>
              <select onChange={(e) => handleAddSongToPlaylist(playlist.playlistID, e.target.value)}>
                <option value="">Add a song to this playlist</option>
                {listenerSongs.map((song) => (
                  <option key={song.songID} value={song.songID}>
                    {song.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div>
          <h2>Create New Playlist</h2>
          <form onSubmit={handleNewPlaylistSubmit}>
            <label>
              Playlist Title:
              <input type="text" value={newPlaylistTitle} onChange={handleNewPlaylistTitleChange} required />
            </label>
            <button type="submit">Create Playlist</button>
          </form>
        </div>
        
        <div>
          <h2>Albums</h2>
          {albums.map((album) => (
            <div key={album.albumID}>
              <h3>{album.title} - {album.artistName[0].name} - {album.releaseDate.split("T")[0]}</h3>
              <ul>
                {album.songs.map((song, index) => (
                  <li key={`${album.albumID}-${song.songID}-${index}`}>
                    {song.title}
                    <button onClick={() => handlePlaySong(song)}>Play</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2>Songs</h2>
          <ul>
            {listenerSongs.map((song, index) => (
              <li key={`${song.songID}-${index}`}>
                {editingSong === song.songID ? (
                  <input
                    type="text"
                    value={updatedSongTitle}
                    onChange={(e) => setUpdatedSongTitle(e.target.value)}
                  />
                ) : (
                  <span>{song.title}</span>
                )}
                <button onClick={() => handlePlaySong(song)}>Play</button>
                <button onClick={() => setEditingSong(song.songID)}>Rename</button>
                {editingSong === song.songID && (
                  <button onClick={() => handleUpdateSong(song.songID)}>Save</button>
                )}         
                <button onClick={() => handleRemoveSong(song.songID)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Create New Song</h2>
          <form onSubmit={handleNewSongSubmit}>
            <label>
              Song Title:
              <input type="text" value={newSongTitle} onChange={handleNewSongTitleChange} required />
            </label>
            <label>
              MP3 File:
              <input type="file" id="mp3File" accept="audio/mp3" onChange={handleNewSongFileChange} required />
            </label>
            <button type="submit">Create Song</button>
          </form>
        </div>
      </div>

      {playingSong && (
        <div className="music-player">
          <MusicPlayer song={playingSong} />
        </div>
      )}
    </div>
  );
};

export default ListenerPage;

