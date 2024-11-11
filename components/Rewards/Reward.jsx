"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getCookie } from "cookies-next";

const Reward = () => {
  const { t } = useTranslation();
  const [farmer, setFarmer] = useState(null);
  const currentAccount = getCookie("address"); // Get the current user's address from cookies

  // Fetch single farmer reward data from the API on component mount
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/farms/fetch-single-rewards/${currentAccount}`
        );

        setFarmer(response.data); // Set the farmer data when fetched
      } catch (error) {
        console.error("Error fetching rewards data:", error);
      }
    };
    fetchRewards();
  }, [currentAccount]);

  // Handle the claim status for the farmer
  const handleClaim = async () => {
    try {
      // Assuming you will trigger a claim update API here (for example)
      // Update the state to reflect the new claim status
      setFarmer((prevFarmer) => ({
        ...prevFarmer,
        claimStatus: true,
      }));

      // Trigger API to claim the reward (optional)
      // await axios.post('your_claim_api_url', { address: farmer.address });
    } catch (error) {
      console.error("Error claiming reward:", error);
    }
  };

  // If farmer data is still loading, show a loading message
  if (!farmer) {
    return <div>{t("Loading...")}</div>;
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        {t("Your_Pending_Rewards")}
      </h1>
      {farmer.error ? (
        <p>{farmer.error}</p>
      ) : (
        <div className="p-6 bg-white border flex flex-col justify-between rounded-lg shadow-lg w-1/2">
          <div>
            <h2 className="text-xl font-semibold text-primary">
              {t("Farmer_Address")}: {farmer.address}
            </h2>
            <p className="text-gray-600 mt-2">
              {t("Total_Rewards")}: {farmer.totalRewards} ETH
            </p>
            {farmer.isEligible && (
              <p className="text-green-600 mt-2">{t("Eligible_For_Rewards")}</p>
            )}
            {!farmer.isEligible && (
              <p className="text-red-600 mt-2">
                {t("Not_Eligible_For_Rewards")}
              </p>
            )}
            {farmer.sustainabilityReasons.length > 0 && (
              <div className="mt-2">
                <h3 className="font-semibold text-primary">
                  {t("Sustainability_Reasons")}
                </h3>
                <ul className="list-disc pl-6">
                  {farmer.sustainabilityReasons.map((reason, index) => (
                    <li key={index} className="text-gray-600">
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={handleClaim}
            className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold shadow-lg w-full ${
              farmer.claimStatus
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-reward hover:bg-primary"
            }`}
            disabled={farmer.claimStatus}
          >
            {farmer.claimStatus ? t("claimed") : t("claim_now")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reward;
