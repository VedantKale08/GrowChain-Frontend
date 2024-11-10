import React, { useState, useContext } from "react";
import axios from "axios";
import { UploadCloud, X } from "lucide-react";
import { TransactionContext } from "../context/context";
import { userStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";

const Crop = () => {
  const [images, setImages] = useState([]);
  const [averageCropInfo, setAverageCropInfo] = useState(null); // Store only averaged data
  const { trackProgress, deletePreviousProgress } =
    useContext(TransactionContext);
  const params = useParams();

  const { user } = userStore();

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

  const mapQualityToCategory = (quality) => {
    if (quality >= 85) return "Excellent";
    if (quality >= 70) return "Superior";
    if (quality >= 55) return "Prime";
    if (quality >= 40) return "Good";
    if (quality >= 20) return "Fair";
    return "Poor";
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

    const activityHashes = activities.map((activity) => ({
      activity,
      hash: predefinedHashes[activity],
    }));

    try {
      await deletePreviousProgress();

      const response = await axios.post(
        "http://localhost:5001/upload-images",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Parse and process data from ML API
      const parsedData = response.data.map((item) => JSON.parse(item));
      if (parsedData.length > 1) {
        // Calculate averages if there are multiple crops
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

        setAverageCropInfo({
          CropType: "Average Data", // Label for averaged data
          Hydration: (averageValues.hydration / averageValues.count).toFixed(2),
          Quality: (averageValues.quality / averageValues.count).toFixed(2),
          Time: (averageValues.timeLeft / averageValues.count).toFixed(2),
        });
      } else if (parsedData.length === 1) {
        setAverageCropInfo(parsedData[0]); // Only one crop, show it directly
      }

      // Calculate averages for necessary fields
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

      const isSustainable = {
        "WATER CONSERVATION": averageHydration >= 70 && averageQuality >= 80,
        "CROP ROTATION": averageQuality >= 80 && averageTimeLeft <= 15,
        "PESTICIDE USE": averageQuality >= 85 && averageTimeLeft <= 10,
      };

      const sustainableActivities = [];

      for (let activity of activities) {
        if (isSustainable[activity]) {
          const activityHash = activityHashes.find(
            (item) => item.activity === activity
          ).hash;
          sustainableActivities.push(activityHash);
        }
      }

      if (sustainableActivities.length > 0) {
        await trackProgress(sustainableActivities);
        const isEligible = true;
        const claimStatus = false;
        const sustainabilityReasons = sustainableActivities.map((hash) =>
          activities.find((activity) => predefinedHashes[activity] === hash)
        );

        await axios.put(
          `http://localhost:5000/api/farmers/update-status/${user._id}`,
          {
            farmerId: user._id,
            isEligible,
            claimStatus,
            sustainabilityReasons,
          }
        );
      }
      const activityData = {
        farmerId: JSON.parse(getCookie("userData"))._id, // Replace with the actual farmerId
        crop: params.id, // Replace with actual crop type, if available
        quality: mapQualityToCategory(averageQuality),
        moisture: averageHydration,
        fertilizer: "Organic", // Replace with actual fertilizer data if available
        date: new Date().toISOString(), // Replace with actual date if needed
        desc: parsedData[0].Recomendation || parsedData[0].Recommendation,
      };

      setTimeout(async () => {
        const addActivityResponse = await axios.post(
          "http://localhost:5000/api/activity/add",
          activityData
        );

        console.log("Activity added successfully:", addActivityResponse.data);

        const addSustainResponse = await axios.post(
          "http://localhost:5000/api/farms/add-sustainibility",
          {
            farmerId: JSON.parse(getCookie("userData"))._id,
            data: {
              averageHydration: averageHydration,
              averageQuality: averageQuality,
            },
          }
        );

        console.log(
          "sustainibility added successfully:",
          addSustainResponse.data
        );
      }, 2000);
    } catch (error) {
      console.log("Error in analyzeImages function:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Crop Management
      </h1>

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
      {console.log(averageCropInfo)}

      {averageCropInfo && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Crop Analysis Results</h2>
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-bold mb-2">
              {averageCropInfo.CropType}
            </h3>
            <p>
              <strong>Hydration Level:</strong> {averageCropInfo.Hydration}%
            </p>
            <p>
              <strong>Quality:</strong> {averageCropInfo.Quality} / 100
            </p>
            <p>
              <strong>Time Left to Harvest:</strong> {averageCropInfo.Time} days
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crop;
