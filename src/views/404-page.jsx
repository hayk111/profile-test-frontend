import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
      <div className="text-center">
        <h2 className="text-4xl font-semibold mb-4">404 - Not Found</h2>
        <p className="text-lg mb-4">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="text-gray-200">
          <button className="bg-gray-100 text-black px-4 py-2 rounded-md">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
