import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
} from "chart.js";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController
);

function SustanibilityGraph() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(75, 192, 192, 0.6)");
    gradient.addColorStop(1, "rgba(75, 192, 192, 0)");

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
        "Week 12",
      ], 
      datasets: [
        {
          label: "Sustainability Score",
          data: [70, 72, 75, 78, 77, 79, 80, 82, 85, 87, 88, 90],
          fill: true, 
          backgroundColor: gradient,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Sustainability Score",
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

  return <canvas ref={chartRef} className="w-full h-fit" ></canvas>;
}

export default SustanibilityGraph;