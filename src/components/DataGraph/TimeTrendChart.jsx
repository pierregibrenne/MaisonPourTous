import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Props pourraient inclure des données ou des méthodes pour récupérer des données
const TimeTrendChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        // Supposons que `data` est un objet avec deux arrays: labels et values
        labels: data.labels, // Les dates doivent être formatées comme des strings
        datasets: [{
          label: 'Nombre de visiteurs',
          data: data.values, // Les valeurs numériques correspondantes
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de visiteurs'
            }
          }
        }
      }
    });

    // Cleanup on unmount
    return () => chart.destroy();
  }, [data]); // Refaire le graphique si les données changent

  return <canvas ref={chartRef}></canvas>;
};

export default TimeTrendChart;
