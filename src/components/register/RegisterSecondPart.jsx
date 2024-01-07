import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import ImageUploader from '../../common/ImageUploader';
import { values } from '../../values';

function RegisterSecondPart({
  avatar,
  imagesData,
  onAvatarChange,
  onImageChange,
  onImageRemove,
}) {
  const fileInputRef = useRef(null);

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="avatar"
          className="text-center mb-4 block font-medium text-gray-800"
        >
          Pick an avatar or use the default one
        </label>
        <img
          src={
            isNull(avatar)
              ? values.defaultAvatar
              : `data:${avatar.type};base64,${avatar.base64Data}`
          }
          id="avatar"
          name="avatar"
          alt="Avatar"
          className="rounded-full object-cover w-[100px] h-[100px] mx-auto mb-2 cursor-pointer hover:opacity-80 transition-opacity duration-800"
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onAvatarChange}
        />
      </div>
      <div className="mb-4">
        <ImageUploader
          onImageChange={onImageChange}
          onImageRemove={onImageRemove}
          images={imagesData}
        />
        {imagesData.length < 4 && (
          <p role="alert" className="text-center text-sm text-red-400 mt-1">
            At least 4 photos must be uploaded
          </p>
        )}
      </div>
    </>
  );
}

RegisterSecondPart.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  imagesData: PropTypes.array.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
};

export default RegisterSecondPart;
