"use client";
import React, { useState } from "react";
import { UploadCloud, X } from "lucide-react"; // Importing icons from Lucide React

const Crop = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // Temporary ID using object URL
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Crop Management
      </h1>

      {/* Image Picker */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <label
          htmlFor="imageUpload"
          className="w-full border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-secondary hover:bg-gray-50"
        >
          {/* Upload Icon */}
          <UploadCloud className="w-12 h-12 text-gray-500 mb-2" />

          <span className="text-gray-600 font-medium">
            Click to upload images or drag and drop
          </span>
          <input
            id="imageUpload"
            type="file"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </label>

        {/* Uploaded Images */}
        <div className="mt-4 flex flex-wrap gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative w-20 h-20 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={image.id}
                alt="Crop"
                className="w-full h-full object-cover"
              />
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Static Table */}
      <div className="mt-8">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-4 px-6 text-left">Field</th>
              <th className="py-4 px-6 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-6 font-medium">Description</td>
              <td className="py-4 px-6">Lorem ipsum dolor sit amet</td>
            </tr>
            <tr className="border-b">
              <td className="py-4 px-6 font-medium">Quality</td>
              <td className="py-4 px-6">Good</td>
            </tr>
            <tr className="border-b">
              <td className="py-4 px-6 font-medium">Moisture</td>
              <td className="py-4 px-6">Moderate</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium">Fertilization</td>
              <td className="py-4 px-6">Required</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crop;
