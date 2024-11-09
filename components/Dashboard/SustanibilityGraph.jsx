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
    gradient.addColorStop(0, "rgb(24, 153, 118, 0.6)");
    gradient.addColorStop(1, "rgb(24, 153, 118, 0)");

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
          data: [70, 72, 25, 48, 77, 59, 70, 22, 111, 27, 78, 90],
          fill: true,
          backgroundColor: gradient,
          borderColor: "#189976",
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
