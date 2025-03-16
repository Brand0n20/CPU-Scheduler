import React, { useEffect, useRef } from "react";
//import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const BarChart = ({ algorithm, calculations }) => {
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Reference to store the Chart.js instance

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous chart before creating a new one
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: calculations.map((p) => `P${p.id}`),
        datasets: [
          {
            label: "Turnaround Time",
            data: calculations.map((p) => p.turnaroundTime),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Waiting Time",
            data: calculations.map((p) => p.waitingTime),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on component unmount
      }
    };
  }, [algorithm, calculations]); // Re-run effect when algorithm or calculations change

  return <canvas ref={chartRef} id={`chart-${algorithm}`} />;
};

export default BarChart;
