import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

import "./style/PieChart.css";

ChartJS.register(Tooltip, Legend, ArcElement);

function lightenColor(hex, percent) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function generateColors(baseColors, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const baseColor = baseColors[i % baseColors.length];
    const colorVariation = (i / baseColors.length) * 0.3; // Adjust the factor for more/less variation
    colors.push(lightenColor(baseColor, colorVariation));
  }
  return colors;
}

function PieChart({ data }) {
  // Predefined set of distinct colors
  const predefinedColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
    "#FF6F61",
    "#6B5B95",
    "#C0E0D6",
    "#C07C7C",
    "#F6C1C1",
    "#6A5ACD",
    "#FF6347",
    "#40E0D0",
  ];

  const labels = data.map((brand) => brand.brand);
  const dataPoints = data.map((brand) => brand.totalCars);

  // Generate distinct colors
  const backgroundColors = generateColors(predefinedColors, labels.length);
  const hoverBackgroundColors = backgroundColors; // Same colors for hover effect

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Cars by Brand",
        data: dataPoints,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  return (
    <div className="pie-chart">
      <h2>Car Brands Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default PieChart;
