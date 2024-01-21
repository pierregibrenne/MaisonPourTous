import React from "react";
import { Bar } from "react-chartjs-2";

const UserTrack = ({ userData }) => {
  // Éliminer les doublons des prénoms et exclure les prénoms non valides (vides, espaces, null)
  const uniquePrenoms = [
    ...new Set(userData.map((user) => user.prenom)),
  ].filter((prenom) => prenom && prenom.trim() !== "");

  // Compter le nombre de données poussées par prénom valide
  const dataPushedByPrenom = uniquePrenoms.map((prenom) => {
    const count = userData.filter((user) => user.prenom === prenom).length;
    return count;
  });

  const labels = uniquePrenoms; // Utilisez les prénoms uniques et valides des collaborateurs
  const dataPushed = dataPushedByPrenom;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Données poussées par collaborateur",
        data: dataPushed,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Nombre de données poussées",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default UserTrack;
