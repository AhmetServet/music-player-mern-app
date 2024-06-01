import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8800/users/login', {
                username,
                password,
            });
            
            console.log("response: ", response.data);

            const userType = response.data[0].userType;
            const userID = response.data[0].userID;
            
            console.log("userType: ", userType);
            console.log("userID: ", userID);

            // Redirect based on user role and pass the username
            if (userType === 'artist') {
                const artist = await axios.post('http://localhost:8800/users/artist/id', {userID: userID});
                console.log("artist: ", artist.data);
                const artistID = artist.data[0].artistID;
                navigate('/artist', { state: { username, artistID } });
            } else if (userType === 'listener') {
                const listener = await axios.post('http://localhost:8800/users/listener/id', {userID: userID});
                console.log("listener: ", listener.data);
                const listenerID = listener.data[0].listenerID;
                navigate('/listener', { state: { username, listenerID } });
            }
        } catch (err) {
            console.error(err);
            setError('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage;