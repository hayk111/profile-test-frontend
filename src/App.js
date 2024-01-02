import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ProfilePage from './views/ProfilePage';
import NotFoundPage from './views/NotFoundPage';

const demoUser = {
  id: 1,
  username: 'demo',
  email: 'hayk@gmail.com',
  firstName: 'Hayk',
  lastName: 'Hovhannisyan',
  avatar: 'https://i.pravatar.cc/300?img=3',
  role: 'admin',
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage user={demoUser} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
