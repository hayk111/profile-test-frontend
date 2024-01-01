export default function ProfilePage({ user }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="mb-4 text-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-full w-20 h-20 mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <p className="text-md p-2 border rounded-md bg-gray-100">
            {user.email}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <p className="text-md p-2 border rounded-md bg-gray-100">
            {user.firstName}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <p className="text-md p-2 border rounded-md bg-gray-100">
            {user.lastName}
          </p>
        </div>
      </div>
    </div>
  );
}
