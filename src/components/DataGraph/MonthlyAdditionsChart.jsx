import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { supabase } from '../../client';

const MonthlyAdditionsChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Octobre 2023", "Novembre 2023", "Décembre 2023", "Janvier 2024", "Février 2024"],
    datasets: [
      {
        label: 'Nombre d\'ajouts par mois',
        data: [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("visiteur")
        .select("created_at")
        .gte('created_at', '2023-10-01')
        .lte('created_at', '2024-02-28');

      if (error) {
        console.error(error);
      } else {
        const monthlyCounts = countMonthlyAdditions(data);
        setChartData(prevState => ({
          ...prevState,
          datasets: [{ ...prevState.datasets[0], data: monthlyCounts }]
        }));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const countMonthlyAdditions = (data) => {
    const monthlyCounts = [0, 0, 0, 0, 0]; // Pour chaque mois d'Octobre 2023 à Février 2024

    data.forEach(({ created_at }) => {
      const month = new Date(created_at).getMonth();
      const year = new Date(created_at).getFullYear();
      const index = month - 9 + (year - 2023) * 12; // Octobre 2023 est l'index 0
      if (index >= 0 && index < 5) {
        monthlyCounts[index]++;
      }
    });

    return monthlyCounts;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ width: '600px', height: '400px' }}>
        <h4>Visite par mois</h4>
      <Line data={chartData} />
    </div>
  );
};

export default MonthlyAdditionsChart;
