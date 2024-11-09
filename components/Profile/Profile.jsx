"use client";
import React, { useState } from "react";
import Image from "next/image";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    phoneNumber: "+91 9876543210",
    crops: ["Rice", "Wheat"],
    etherCoins: "120 ETH",
    achievements: "500+ Likes",
  });

  const [editField, setEditField] = useState("");

  const availableCrops = [
    { name: "Wheat", imageUrl: "/assets/Images/wheat.png" },
    { name: "Ragi", imageUrl: "/assets/Images/ragi.png" },
    { name: "Corn", imageUrl: "/assets/Images/corn.png" },
    { name: "Barley", imageUrl: "/assets/Images/barley.png" },
    { name: "Millet", imageUrl: "/assets/Images/millet.png" },
  ];

  const [selectedCrop, setSelectedCrop] = useState("");

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = () => {
    setEditField("");
  };

  const handleAddCrop = () => {
    if (selectedCrop && !user.crops.includes(selectedCrop)) {
      setUser((prevData) => ({
        ...prevData,
        crops: [...prevData.crops, selectedCrop],
      }));
      setSelectedCrop(""); // Reset selected crop after adding
    }
  };

  const handleRemoveCrop = (cropName) => {
    setUser((prevData) => ({
      ...prevData,
      crops: prevData.crops.filter((crop) => crop !== cropName),
    }));
  };

  return (
    <div className="min-h-screen bg-white px-12 py-8">
      {/* Name Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">{user.name}</h1>
      </div>

      {/* Horizontal Line */}
      <hr className="border-secondary mb-8" />

      {/* Table-like Structure */}
      <div className="w-full max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
        <table className="table-auto w-full">
          <tbody>
            {/* Phone Number */}
            <tr className="border-b">
              <td className="py-4 text-gray-700 font-medium">Phone Number:</td>
              <td className="py-4 text-gray-900">
                {editField === "phoneNumber" ? (
                  <input
                    type="text"
                    value={user.phoneNumber}
                    onChange={(e) =>
                      setUser({ ...user, phoneNumber: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                ) : (
                  user.phoneNumber
                )}
              </td>
              <td className="py-4 text-right">
                {editField === "phoneNumber" ? (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit("phoneNumber")}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>

            {/* Crops */}
            <tr className="border-b">
              <td className="py-4 text-gray-700 font-medium">Crops:</td>
              <td className="py-4 text-gray-900">
                {editField === "crops" ? (
                  <>
                    <div className="flex flex-wrap gap-4">
                      {user.crops.map((crop, index) => {
                        const cropData = availableCrops.find((item) => item.name === crop);
                        return (
                          <div
                            key={index}
                            className="relative bg-green-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-2"
                          >
                            {/* Circular Image */}
                            <Image
                              src={cropData?.imageUrl || ""}
                              alt={crop}
                              width={60}
                              height={60}
                              className="w-20 h-20 rounded-full"
                            />
                            {/* Name Below Image */}
                            <span className="font-medium text-center">{crop}</span>
                            <button
                              onClick={() => handleRemoveCrop(crop)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      {/* Crop Selection */}
                      <select
                        name="selectedCrop"
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-10"
                      >
                        <option value="" disabled>
                          Select a crop
                        </option>
                        {availableCrops
                          .filter((crop) => !user.crops.includes(crop.name))
                          .map((crop, index) => (
                            <option key={index} value={crop.name}>
                              {crop.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Add Selected Crop */}
                    <button
                      onClick={handleAddCrop}
                      className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                    >
                      Add Crop
                    </button>
                  </>
                ) : (
                  user.crops.join(", ")
                )}
              </td>
              <td className="py-4 text-right">
                {editField === "crops" ? (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit("crops")}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>

            {/* Ether Coins */}
            <tr className="border-b">
              <td className="py-4 text-gray-700 font-medium">Ether Coins:</td>
              <td className="py-4 text-gray-900">{user.etherCoins}</td>
              <td className="py-4 text-right"></td>
            </tr>

            {/* Achievements */}
            <tr>
              <td className="py-4 text-gray-700 font-medium">Achievements:</td>
              <td className="py-4 text-gray-900">{user.achievements}</td>
              <td className="py-4 text-right"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
