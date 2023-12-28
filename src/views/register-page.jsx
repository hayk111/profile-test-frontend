import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your role"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700"
          >
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
