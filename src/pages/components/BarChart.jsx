import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./style/BarChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data }) {
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

  // Create labels and datasets
  const labels = data.map((brand) => brand.brand);

  // Extract all models and their data
  const modelDataMap = new Map();
  data.forEach((brand) => {
    brand.valByModel.forEach((model) => {
      if (!modelDataMap.has(model.model)) {
        modelDataMap.set(model.model, {
          label: model.model,
          data: new Array(data.length).fill(0),
        });
      }
      const modelEntry = modelDataMap.get(model.model);
      const index = data.findIndex((b) => b.brand === brand.brand);
      modelEntry.data[index] = model.totalModel;
    });
  });

  const modelArray = Array.from(modelDataMap.values());

  const chartData = {
    labels: labels,
    datasets: modelArray.map((model, index) => ({
      label: model.label,
      data: model.data,
      backgroundColor: predefinedColors[index % predefinedColors.length],
      hoverBackgroundColor: predefinedColors[index % predefinedColors.length],
    })),
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => {
            const dataset = chartData.datasets[tooltipItem.datasetIndex];
            const brandIndex = tooltipItem.dataIndex;
            const models = dataset.data
              .map((value, index) => {
                if (index === brandIndex) return `${dataset.label}: ${value}`;
                return null;
              })
              .filter((item) => item !== null);
            return models;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: true, // Skip some ticks to avoid clutter
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar-chart">
      <h2>Models of Each Car Brand</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart;
