import PropTypes from 'prop-types';
import ImageUploader from '../../common/ImageUploader';
import { values } from '../../values';

function RegisterSecondPart({
  avatar,
  imagesData,
  onAvatarChange,
  onImageChange,
  onImageRemove,
}) {
  return (
    <>
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
        <div className="flex justify-center mt-4">
          {avatar ? (
            <img
              src={`data:${avatar.type};base64,${avatar.base64Data}`}
              alt="Avatar"
              className="object-cover w-[100px] h-[100px] rounded-full"
            />
          ) : (
            <img
              src={values.defaultAvatar}
              alt="Avatar"
              className="object-cover w-[100px] h-[100px] rounded-full"
            />
          )}
        </div>
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
