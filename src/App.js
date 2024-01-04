import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ProfilePage from './views/ProfilePage';
import NotFoundPage from './views/NotFoundPage';
import PublicPage from './hoc/PublicPage';
import PrivatePage from './hoc/PrivatePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicPage>
                <LoginPage />
              </PublicPage>
            }
          />
          <Route
            path="/login"
            element={
              <PublicPage>
                <LoginPage />
              </PublicPage>
            }
          />
          <Route
            path="/register"
            element={
              <PublicPage>
                <RegisterPage />
              </PublicPage>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivatePage>
                <ProfilePage />
              </PrivatePage>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
