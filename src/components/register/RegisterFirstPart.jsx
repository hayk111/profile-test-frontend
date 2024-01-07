import PropTypes from 'prop-types';

function RegisterFirstPart({ register, errors }) {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          name="email"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter email"
        />
        {errors.email && (
          <p role="alert" className="text-sm text-red-400 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter password"
        />
        {errors.password && (
          <p role="alert" className="text-sm text-red-400 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          {...register('firstName')}
          type="text"
          id="firstName"
          name="firstName"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter first name"
        />
        {errors.firstName && (
          <p role="alert" className="text-sm text-red-400 mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          {...register('lastName')}
          type="text"
          id="lastName"
          name="lastName"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter last name"
        />
        {errors.lastName && (
          <p role="alert" className="text-sm text-red-400 mt-1">
            {errors.lastName.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          {...register('role')}
          id="role"
          name="role"
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        {errors.role && (
          <p role="alert" className="text-sm text-red-400 mt-1">
            {errors.role.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Active
        </label>
        <input
          {...register('active')}
          type="checkbox"
          id="active"
          name="active"
          defaultChecked={true}
          className="mt-1 p-2 cursor-pointer rounded-md"
          style={{ transform: 'scale(1.2)' }}
        />
      </div>
    </>
  );
}

RegisterFirstPart.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default RegisterFirstPart;
