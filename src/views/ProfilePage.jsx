import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isNull from 'lodash/isNull';
import { values } from '../values';
import { resetUser, updateAvatar } from '../redux/slices/userSlice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { uploadAvatarRequest } from '../api';

const fileDataPartsRegex = /data:([^/]+)\/([^;]+);base64,(.+)/;

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem(values.storageKeys.accessToken);
    if (!isNull(avatar) && accessToken) {
      uploadAvatarRequest(accessToken, avatar).then((newAvatarUrl) => {
        dispatch(updateAvatar(newAvatarUrl));
      });
    }
  }, [avatar, dispatch]);

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      // Here you can send the base64 image to the server
      const [, , , base64Data] = fileDataPartsRegex.exec(reader.result);
      setAvatar({ base64Data, name: file.name, type: file.type });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300">
      <div className="bg-white w-[500px] p-8 rounded shadow-md w-96">
        <div className="mb-4 text-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-full object-cover w-32 h-32 mx-auto mb-2 cursor-pointer hover:opacity-80 transition-opacity duration-800"
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <h2 className="text-xl font-semibold">{`${user.fullName}`}</h2>
          <p className="text-gray-500">{user.role}</p>
          <button
            className="w-[150px] mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
            onClick={() => {
              localStorage.removeItem(values.storageKeys.accessToken);
              dispatch(resetUser());
            }}
          >
            Log Out
          </button>
        </div>
        <div className="mt-8">
          {user.photos?.length > 0 ? (
            <Carousel
              infiniteLoop
              autoPlay
              stopOnHover
              showArrows
              swipeable
              emulateTouch
              showStatus={false}
              showThumbs={false}
              interval={3000}
              dynamicHeight={false}
              width="100%"
            >
              {user.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative h-full"
                  style={{ height: '450px' }}
                >
                  <img
                    alt=""
                    src={photo.url}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p className="text-center text-sm font-medium text-gray-700">
              No Photo Uploaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
