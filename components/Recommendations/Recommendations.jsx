"use client";

import React from "react";
import { FaLeaf, FaTint, FaSeedling } from "react-icons/fa";

// Function to map quality score to category
const mapQualityToCategory = (quality) => {
  if (quality >= 85) return "Excellent";
  if (quality >= 70) return "Superior";
  if (quality >= 55) return "Prime";
  if (quality >= 40) return "Good";
  if (quality >= 20) return "Fair";
  return "Poor";
};

const cropsData = [
  {
    name: "Wheat",
    stage: "Reproductive",
    quality: 90, // Number representing quality
    moisturer: "45%",
    fertilizer: "Organic",
    date: "1st Oct 2024",
    recommendation: "Increase moisture by 10%",
    icon: <FaTint />,
    imageUrl: "./assets/Images/wheat.png",
  },
  {
    name: "Corn",
    stage: "Vegetative",
    quality: 65,
    moisturer: "60%",
    fertilizer: "Compost",
    date: "1st Nov 2024",
    recommendation: "Add more compost",
    icon: <FaLeaf />,
    imageUrl: "./assets/Images/corn.png",
  },
  {
    name: "Millet",
    stage: "Growth",
    quality: 45,
    moisturer: "50%",
    fertilizer: "Manure",
    date: "17th Oct 2024",
    recommendation: "Thin the plants",
    icon: <FaSeedling />,
    imageUrl: "./assets/Images/millet.png",
  },
  {
    name: "Ragi",
    stage: "Reproductive",
    quality: 80,
    moisturer: "45%",
    fertilizer: "Organic",
    date: "15th May 2024",
    recommendation: "Increase moisture by 10%",
    icon: <FaTint />,
    imageUrl: "./assets/Images/ragi.png",
  },
  {
    name: "Apple",
    stage: "Reproductive",
    quality: 90, // Number representing quality
    moisturer: "45%",
    fertilizer: "Organic",
    date: "23rd Oct 2024",
    recommendation: "Increase moisture by 10%",
    icon: <FaTint />,
    imageUrl: "./assets/Images/apple.png",
  },
  {
    name: "Banana",
    stage: "Vegetative",
    quality: 65,
    moisturer: "60%",
    fertilizer: "Compost",
    date: "27th Nov 2024",
    recommendation: "Add more compost",
    icon: <FaLeaf />,
    imageUrl: "./assets/Images/banana.png",
  },
  {
    name: "Kiwi",
    stage: "Growth",
    quality: 45,
    moisturer: "50%",
    fertilizer: "Manure",
    date: "11th Oct 2024",
    recommendation: "Thin the plants",
    icon: <FaSeedling />,
    imageUrl: "./assets/Images/kiwi.png",
  },
  {
    name: "Litchi",
    stage: "Reproductive",
    quality: 80,
    moisturer: "45%",
    fertilizer: "Organic",
    date: "31st May 2024",
    recommendation: "Increase moisture by 10%",
    icon: <FaTint />,
    imageUrl: "./assets/Images/litchi.png",
  },
];

const RecommendationsCard = ({ crop }) => (
  <div style={styles.card}>
    <div style={{ ...styles.header, backgroundImage: `url(${crop.imageUrl})` }}>
      <div style={styles.overlay}>
        <h2 style={styles.cardTitle}>{crop.name}</h2>
      </div>
    </div>
    <div style={styles.infoRow}>
      <span>Quality:</span> <span>{mapQualityToCategory(crop.quality)}</span>
    </div>
    <div style={styles.infoRow}>
      <span>Moisture:</span> <span>{crop.moisturer}</span>
    </div>
    <div style={styles.infoRow}>
      <span>Fertilizer:</span> <span>{crop.fertilizer}</span>
    </div>
    <div style={styles.infoRow}>
      <span>Date:</span> <span>{crop.date}</span>
    </div>
    <div style={styles.recommendation}>
      {crop.icon}
      <span style={{ marginLeft: "8px" }}>{crop.recommendation}</span>
    </div>
  </div>
);

const Recommendations = () => (
  <div style={styles.container} className="grid-cols-4">
    {cropsData.map((crop, index) => (
      <RecommendationsCard key={index} crop={crop} />
    ))}
  </div>
);

const styles = {
  container: {
    display: "grid",
    padding: "30px",
    gap: "30px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    width: "280px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  header: {
    position: "relative",
    height: "120px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    display: "flex",
    alignItems: "flex-end",
  },
  overlay: {
    width: "100%",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 20px",
    color: "#555",
  },
  recommendation: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
};

export default Recommendations;
