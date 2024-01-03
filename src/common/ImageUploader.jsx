import React from 'react';
import ImageUploading from 'react-images-uploading';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './ImageUploader.module.css';

function ImageUploader({
  images = [],
  onImageChange,
  onImageRemove,
  maxImageNumber = 10,
  acceptTypes = ['jpg', 'jpeg', 'gif', 'png'],
}) {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onImageChange}
      maxNumber={maxImageNumber}
      dataURLKey="data_url"
      acceptType={acceptTypes}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        isDragging,
        dragProps,
      }) => (
        <div className="image-uploader-container flex flex-col">
          <div className="image-uploader-actions flex flex-col items-center mb-6">
            <button
              className={clsx(
                classes['image-uploader__button-upload'],
                'mb-5',
                {
                  [classes['image-uploader__button-upload--dragging']]:
                    isDragging,
                }
              )}
              onClick={(event) => {
                event.preventDefault();
                onImageUpload(event);
              }}
              {...dragProps}
            >
              Click or Drop Image here
            </button>
            <button
              className={clsx(classes['image-uploader__button-remove-all'])}
              onClick={(event) => {
                event.preventDefault();
                onImageRemoveAll();
              }}
            >
              Remove all images
            </button>
          </div>
          {imageList?.length > 0 && (
            <div className={classes['image-uploader-images']}>
              {imageList.map((image, index) => (
                <div key={index} className={classes['image-uploader-image']}>
                  <img
                    src={image.url || image.data_url}
                    className={clsx(classes['image-uploader__image'], 'mb-4')}
                    width={120}
                    alt=""
                  />
                  <div className="flex image-uploader-btn-wrapper mb-4">
                    <button
                      className={clsx(
                        classes['image-uploader__image-remove'],
                        'ml-4'
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        onImageRemove(index);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
}

ImageUploader.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onImageChange: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  maxImageNumber: PropTypes.number,
  acceptTypes: PropTypes.arrayOf(PropTypes.string),
};

export default ImageUploader;
