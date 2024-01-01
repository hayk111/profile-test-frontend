import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/login-page';
import RegisterPage from './views/register-page';
import ProfilePage from './views/profile-page';
import NotFoundPage from './views/404-page';

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
