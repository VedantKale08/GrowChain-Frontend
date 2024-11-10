"use-client";
import { useEffect, useState } from "react";

function Advertisements() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup when the component is first loaded
    setShowPopup(true);

    // Automatically show the popup every 5 minutes
    const interval = setInterval(() => {
      setShowPopup(true);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        .popup-content h2 {
          margin-top: 0;
          font-size: 24px;
        }
        .popup-content p {
          margin: 15px 0;
        }
        .popup-content button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        .popup-content button:hover {
          background-color: #0056b3;
        }
      `}</style>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Special Advertisement</h2>
            <p>Don't miss out on our exclusive offers!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Advertisements;
