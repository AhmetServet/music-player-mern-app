import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ArtistPage = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongFile, setNewSongFile] = useState(null);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [updatedAlbumTitle, setUpdatedAlbumTitle] = useState('');
  const [updatedSongTitle, setUpdatedSongTitle] = useState('');
  const location = useLocation();
  const {username, artistID}= location.state;


  useEffect(() => {
    fetchSongs();
    fetchAlbums();

  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.post('http://localhost:8800/albums/artist/id', { artistID: artistID });
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.post('http://localhost:8800/songs/artist/', { artistID: artistID });
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };



  const createAlbum = async () => {
    console.log('Creating album:', newAlbumTitle, newReleaseDate.toString());
    try {
      const response = await axios.post('http://localhost:8800/albums/', { 
        title: newAlbumTitle,
        artistID: artistID,
        releaseDate: newReleaseDate.toString(),
    });
    fetchAlbums();
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const renameAlbum = async (albumID) => {
    try {
      await axios.put(`http://localhost:8800/albums/id`, { albumID: albumID, title: updatedAlbumTitle });
      fetchAlbums();
    } catch (error) {
      console.error('Error renaming album:', error);
    }
  };

  const deleteAlbum = async (albumId) => {
    try {
      await axios.delete('http://localhost:8800/albums/id', { data: { albumID: albumId }});
      fetchAlbums();
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const addSong = async () => {
    console.log('Uploading song:', newSongTitle, newSongFile);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const binaryData = reader.result.split(',')[1];
      console.log("reader.result", reader.result)
      try {
        const res = await axios.post('http://localhost:8800/songs', {
          artistID: artistID,
          title: newSongTitle,
          trackFile: binaryData
        });
        console.log('Uploaded song:', res.data);
        // Optionally, update the playlists or songs state with the new song
        fetchAlbums();
        fetchSongs();
        setNewSongTitle('');
        setNewSongFile(null);
      } catch (error) {
        console.error('Error uploading song:', error);
      }
    };
    reader.readAsDataURL(newSongFile);
  };

  const renameSong = async (songId) => {
    try {
      const response = await axios.put(`http://localhost:8800/songs/id`, { songID:songId, title: updatedSongTitle });
      fetchSongs();
    } catch (error) {
      console.error('Error renaming song:', error);
    }
  };

  const deleteSong = async (songId) => {
    try {
      await axios.delete('http://localhost:8800/songs/id', { data: { songID: songId }});
      fetchSongs();
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const addSongToAlbum = async (albumId, songId) => {
    try {
      await axios.put(`http://localhost:8800/songs/album/id`, { songID: songId, albumID: albumId});
      fetchAlbums();
      fetchSongs();
    } catch (error) {
      console.error('Error adding song to album:', error);
    }
  };

  const removeSongFromAlbum = async (albumId, songId) => {
    try {
      await axios.put(`http://localhost:8800/songs/album/id`, { songID: songId, albumID: null});
      fetchAlbums(); 
      fetchSongs();
    } catch (error) {
      console.error('Error removing song from album:', error);
    }
  };

  return (
    <div>
      <h1>Artist Page</h1>
      <div>
        <h2>Create Album</h2>
        <input
          type="text"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          placeholder="New Album Title"
        />
        <input
          type="date"
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(e.target.value)}
          placeholder="New Release Date"
        />

        <button onClick={createAlbum}>Create Album</button>
      </div>

      <div>
        <h2>Albums</h2>
        {albums.map((album, index) => (
          <div key={`${album.albumID} - ${index}`}>
            {editingAlbum === album.albumID ? (
              <input
                type="text"
                value={updatedAlbumTitle}
                onChange={(e) => setUpdatedAlbumTitle(e.target.value)}
                placeholder="Updated Album Title"
              />
            ) : (
              <span>{album.title}</span>
            )}
            <button onClick={() => setEditingAlbum(album.albumID)}>Edit</button>
            <button onClick={() => renameAlbum(album.albumID)}>Save</button>
            <button onClick={() => deleteAlbum(album.albumID)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Add Song</h2>
        <input
          type="text"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          placeholder="New Song Title"
        />
        <input
          type="file"
          onChange={(e) => setNewSongFile(e.target.files[0])}
        />
        <button onClick={addSong}>Add Song</button>
      </div>

      <div>
        <h2>Songs</h2>
        {songs.map((song, index) => (
          <div key={`${song.songID} - ${index}`}>
            {editingSong === song.songID ? (
              <input
                type="text"
                value={updatedSongTitle}
                onChange={(e) => setUpdatedSongTitle(e.target.value)}
                placeholder="Updated Song Title"
              />
            ) : (
              <span>{song.title}</span>
            )}
            <button onClick={() => setEditingSong(song.songID)}>Edit</button>
            <button onClick={() => renameSong(song.songID)}>Save</button>
            <button onClick={() => deleteSong(song.songID)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Manage Songs in Albums</h2>
        <div>
        {albums.map((album) => (
          <div key={album.albumID}>
            <h3>{album.title}</h3>
            <ul>
              {songs.map((song, index) => (
                (song.albumID === album.albumID) && (
                  <li key={`${album.albumID}-${song.songID}-${index}`}>
                  {song.title}
                  <button onClick={() => removeSongFromAlbum(album.albumID, song.songID)}>Remove from Album</button>
                </li>
                )
              ))
                }
                
            </ul>
            <select onChange={(e) => addSongToAlbum(album.albumID, e.target.value)}>
              <option value="">Add a song to this Album</option>
              {songs.map((song) => (
                <option key={song.songID} value={song.songID}>
                  {song.title}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ArtistPage;