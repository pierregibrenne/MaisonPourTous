import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const SexePieChart = ({ nombreHommes, nombreFemmes }) => {
  const total = nombreHommes + nombreFemmes;
  const pourcentageHommes = ((nombreHommes / total) * 100).toFixed(2); // Pourcentage avec deux décimales
  const pourcentageFemmes = ((nombreFemmes / total) * 100).toFixed(2);

  const data = {
    labels: [
      `Hommes: ${nombreHommes} (${pourcentageHommes}%)`,
      `Femmes: ${nombreFemmes} (${pourcentageFemmes}%)`,
    ],
    datasets: [
      {
        label: "Répartition par sexe",
        data: [nombreHommes, nombreFemmes],
        backgroundColor: ["blue", "pink"],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default SexePieChart;
