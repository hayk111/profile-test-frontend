import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
