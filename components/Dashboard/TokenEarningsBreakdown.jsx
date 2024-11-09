import React, { useRef, useEffect } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController
);

function TokenEarningsBreakdown() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
      ],
      datasets: [
        {
          label: "Tokens Earned",
          data: [100, 120, 150, 180, 140, 200, 120, 90, 80, 160, 290],
          backgroundColor: [
            "rgba(75, 192, 192, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(153, 102, 215, 0.7)",
            "rgba(255, 129, 64, 0.7)",
            "rgba(252, 159, 64, 0.7)",
            "rgba(133, 102, 215, 0.7)",
            "rgba(255, 129, 64, 0.7)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(153, 102, 215, 0.7)",
            "rgba(255, 129, 64, 0.7)",
            "rgba(252, 159, 64, 1)",
            "rgba(133, 102, 215, 0.7)",
            "rgba(255, 129, 64, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Tokens Earned",
            },
          },
          x: {
            title: {
              display: true,
              text: "Weeks",
            },
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    return () => myChart.destroy();
  }, []);

  return <canvas ref={chartRef} className="w-full-custom"></canvas>;
}

export default TokenEarningsBreakdown;
