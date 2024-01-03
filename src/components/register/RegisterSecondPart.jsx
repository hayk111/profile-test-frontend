import ImageUploader from '../../common/ImageUploader';

export default function RegisterSecondPart({
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
      </div>
      <div className="mb-4">
        <ImageUploader
          onImageChange={onImageChange}
          onImageRemove={onImageRemove}
          images={imagesData}
        />
      </div>
    </>
  );
}
