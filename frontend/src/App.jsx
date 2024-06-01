import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage.jsx';
import ArtistPage from './artistPage.jsx';
import ListenerPage from './listenerPage.jsx';
import Test from './test.jsx';

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/artist" element={<ArtistPage />} />
                <Route path="/listener" element={<ListenerPage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
    );
};

export default App;

