import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageUploader from '../common/ImageUploader';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(50, "Password can't exceed 50 characters")
    .matches(/\d/, 'Password must contain a number')
    .required('Password is required'),
  firstName: yup
    .string()
    .min(2, 'First name must have at least 2 characters')
    .max(25, "First name can't exceed 25 characters")
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must have at least 2 characters')
    .max(25, "Last name can't exceed 25 characters")
    .required('Last name is required'),
  role: yup.string().required('Role is required'),
});

export default function SignupPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [imagesData, setImagesData] = useState([]);
  const [avatar, setAvatar] = useState(null);
  console.log('🚀 ~ SignupPage ~ avatar:', avatar);
  console.log('🚀 ~ SignupPage ~ imagesData:', imagesData);

  function onImageChange(data) {
    setImagesData(
      data.map((image) => ({
        data_url: image.data_url,
        name: image.file.name,
        type: image.file.type,
      }))
    );
  }

  function onAvatarChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setAvatar(base64String);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(data) {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, photos: imagesData }),
    }).then((response) => response.json());
    console.log('🚀 ~ onSubmit ~ result:', result);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-[450px]">
        <h2 className="text-2xl font-semibold mb-4 mt-2">Create an Account</h2>
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
              onChange={onAvatarChange}
            />
          </div>
          <div className="mb-4">
            <ImageUploader onImageChange={onImageChange} images={imagesData} />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign Up
            </button>
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
