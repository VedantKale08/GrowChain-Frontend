import React, { useState, useContext } from "react";
import axios from "axios";
import { UploadCloud, X } from "lucide-react";
import { TransactionContext } from "../context/context";

const Crop = () => {
  const [images, setImages] = useState([]);
  const [cropInfo, setCropInfo] = useState([]);
  const { trackProgress, deletePreviousProgress } =
    useContext(TransactionContext);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const predefinedHashes = {
    "PESTICIDE USE":
      "0x5a105e8b9d40e41a5b17a34d1e01b1044e3c19f44be28df9f80439fa8e660ef4",
    "WATER CONSERVATION":
      "0x3c6ee01d13cbf5f7c5fc6ee5be5f2d8a129aeead8ad5729b9f9f08d1989cfa6e",
    "CROP ROTATION":
      "0x91b0b3ff35025b14cfa6a7f59c478d72f7425b4f76fa21d8d4b4a039b5c10844",
    "SOIL TESTING":
      "0x1f77f2df6d161d9c61f21b62276bc0731b6b3e472f6f44e7aa5c12379b06a5b5",
    "CROP MONITORING":
      "0x7f4f307df68d36287f70c72a2676a3b2465e674aaae4db7efc4fa0d2b99f5010",
    "FERTILIZER MANAGEMENT":
      "0xa6d33eaab6b80deaf5d87037a634a60e8b15ec6b507dc8f629ff0bbf9bba9c75",
    "HARVEST TRACKING":
      "0x437d5d39e6c71052d8f3c6bc0d819463fb2e2b6b2d1c01a9e7d65a93820c1253",
  };

  const analyzeImages = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image.file));

    const activities = [
      "PESTICIDE USE",
      "WATER CONSERVATION",
      "CROP ROTATION",
      "SOIL TESTING",
      "CROP MONITORING",
      "FERTILIZER MANAGEMENT",
      "HARVEST TRACKING",
    ];

    // Use predefined hash values
    const activityHashes = activities.map((activity) => ({
      activity,
      hash: predefinedHashes[activity], // Fetch the predefined hash for each activity
    }));

    try {
      await deletePreviousProgress();
      const response = await axios.post(
        "http://localhost:5000/upload-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const parsedData = response.data.map((item) => JSON.parse(item));
      setCropInfo(parsedData);

      // Calculate averages for numerical fields
      const averageValues = parsedData.reduce(
        (acc, info) => {
          acc.hydration += info.Hydration;
          acc.quality += info.Quality;
          acc.timeLeft += info.Time;
          acc.count += 1;
          return acc;
        },
        { hydration: 0, quality: 0, timeLeft: 0, count: 0 }
      );

      const averageHydration = averageValues.hydration / averageValues.count;
      const averageQuality = averageValues.quality / averageValues.count;
      const averageTimeLeft = averageValues.timeLeft / averageValues.count;

      // Define sustainability criteria for each activity
      const isSustainable = {
        "WATER CONSERVATION": averageHydration >= 70 && averageQuality >= 80,
        "CROP ROTATION": averageQuality >= 80 && averageTimeLeft <= 15, // Example condition
        "PESTICIDE USE": averageQuality >= 85 && averageTimeLeft <= 10, // Example condition
        // Add similar conditions for other activities
      };

      // Track progress for each qualifying activity
      const sustainableActivities = [];

      for (let activity of activities) {
        if (isSustainable[activity]) {
          const activityHash = activityHashes.find(
            (item) => item.activity === activity
          ).hash;
          sustainableActivities.push(activityHash);
        } else {
          console.log(
            `The results for ${activity} are not sustainable. No progress will be tracked.`
          );
        }
      }

      // Track all sustainable activities at once
      if (sustainableActivities.length > 0) {
        await trackProgress(sustainableActivities);
      }

      // Log generated hashes (for debugging or reference)
      console.log("Generated activity hashes:", activityHashes);
      console.log(`Average Hydration: ${averageHydration}%`);
      console.log(`Average Quality: ${averageQuality}`);
      console.log(`Average Time Left to Harvest: ${averageTimeLeft} days`);
    } catch (error) {
      console.error("Error analyzing images:", error);
    }
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
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={analyzeImages}
          className="mt-4 bg-primary text-white p-2 rounded-lg shadow-md hover:bg-secondary"
          disabled={images.length === 0}
        >
          Analyze Crops
        </button>
      </div>

      {/* Crop Information Display */}
      {cropInfo.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Crop Analysis Results</h2>
          <div className="space-y-4">
            {cropInfo.map((info, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-bold mb-2">
                  Crop {index + 1} Analysis
                </h3>
                <p>
                  <strong>Crop Type:</strong> {info.CropType}
                </p>
                <p>
                  <strong>Hydration Level:</strong> {info.Hydration}%
                </p>
                <p>
                  <strong>Quality:</strong> {info.Quality} / 100
                </p>
                <p>
                  <strong>Time Left to Harvest:</strong> {info.Time} days
                </p>
                <p>
                  <strong>Is Crop Cut:</strong> {info.isCropCut ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Crop;
