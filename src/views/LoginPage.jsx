import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setUser } from '../redux/slices/userSlice';
import { values } from '../values';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    }).then((response) => response.json());

    if (result.error) {
      toast.error(result.message);
      return;
    }

    localStorage.setItem(values.storageKeys.accessToken, result.accessToken);

    const resultUser = await fetch(
      `${process.env.REACT_APP_API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      }
    ).then((response) => response.json());
    dispatch(setUser(resultUser));
    navigate('/profile');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-[450px]">
        <h2 className="text-2xl font-semibold mb-4 mt-2">Welcome</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register('email')}
              type="text"
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
          <div className="mb-6">
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
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
