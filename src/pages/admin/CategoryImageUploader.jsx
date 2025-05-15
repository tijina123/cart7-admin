import React, { useRef, useState } from "react";

const ImageUploaderCategory = ({ images, setImages, error }) => {
  const fileInputRef = useRef();
  const fileInputRefs = useRef([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const selectedFiles = [...images, ...files].slice(0, 4);
    setImages(selectedFiles);
  };

  const handleEditImage = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleReplaceImage = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mt-6">
      <label className="block font-semibold text-gray-700 mb-2">Product Images</label>

      {/* Upload Box */}
      <div
        onClick={openFilePicker}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <p className="text-gray-500">Click to upload or drag & drop (Max 4 images)</p>
        <p className="text-sm text-gray-400 mt-1">JPEG, PNG, or WEBP only</p>
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png, image/webp"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 group"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 hidden group-hover:flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleEditImage(index)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow"
              >
                Delete
              </button>
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => handleReplaceImage(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploaderCategory;