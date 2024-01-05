import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import isNull from 'lodash/isNull';
import RegisterFirstPart from '../components/register/RegisterFirstPart';
import RegisterSecondPart from '../components/register/RegisterSecondPart';
import { setFirstRegisterPart } from '../redux/slices/registerSlice';
import { setUser } from '../redux/slices/userSlice';
import { values } from '../values';

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

const fileDataPartsRegex = /data:([^/]+)\/([^;]+);base64,(.+)/;

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
  const { isFirstRegisterPartComplete, ...registerFirstPartData } = useSelector(
    (state) => state.register
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onImageChange(data) {
    setImagesData(
      data.map((image) => {
        const [, , , base64Data] = fileDataPartsRegex.exec(image.data_url);
        return {
          data_url: image.data_url,
          base64Data: base64Data,
          name: image.file?.name,
          type: image.file?.type,
        };
      })
    );
  }

  function onImageRemove(index) {
    setImagesData(imagesData.filter((_, i) => i !== index));
  }

  function onAvatarChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const [, , , base64Data] = fileDataPartsRegex.exec(reader.result);
      setAvatar({ base64Data, name: file.name, type: file.type });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function goBack() {
    dispatch(
      setFirstRegisterPart({
        ...registerFirstPartData,
        isFirstRegisterPartComplete: false,
      })
    );
  }

  async function onSubmit(data) {
    if (isFirstRegisterPartComplete) {
      if (imagesData.length < 4) {
        toast.error('At least 4 photos must be uploaded');
        return;
      }

      const result = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registerFirstPartData,
          ...(!isNull(avatar) && { avatar }),
          photos: imagesData,
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
      dispatch(
        setFirstRegisterPart({
          ...registerFirstPartData,
          isFirstRegisterPartComplete: false,
        })
      );
      navigate('/profile');
      toast.success('Account created successfully');
    } else {
      dispatch(
        setFirstRegisterPart({ ...data, isFirstRegisterPartComplete: true })
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded shadow-md w-[500px]">
        <h2 className="text-2xl font-semibold mb-4 mt-2">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isFirstRegisterPartComplete ? (
            <RegisterSecondPart
              avatar={avatar}
              imagesData={imagesData}
              onAvatarChange={onAvatarChange}
              onImageChange={onImageChange}
              onImageRemove={onImageRemove}
            />
          ) : (
            <RegisterFirstPart register={register} errors={errors} />
          )}
          <div className="flex justify-between items-center">
            <div className="flex">
              {isFirstRegisterPartComplete && (
                <button
                  type="button"
                  className="bg-gray-500 text-white mr-2 px-4 py-2 rounded-md"
                  onClick={goBack}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {isFirstRegisterPartComplete ? 'Sign Up' : 'Next'}
              </button>
            </div>
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
