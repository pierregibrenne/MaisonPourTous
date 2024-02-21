import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { supabase } from '../../client'; // Assurez-vous que ce chemin d'importation est correct

const AgeDistributionChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['0 - 5 Ans', '6 - 15 ans', '16 - 17 ans', '18 - 25 ans', '26 - 64 ans', '+ 65 ans'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("visiteur").select("age");

      if (error) {
        console.error(error);
      } else {
        const processedData = processAgeData(data.map(item => parseInt(item.age, 10)));
        setChartData(prevState => ({
          ...prevState,
          datasets: [{ ...prevState.datasets[0], data: processedData }]
        }));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const processAgeData = (ages) => {
    const ageGroupsCount = [0, 0, 0, 0, 0, 0]; // Correspond à chaque tranche d'âge spécifiée

    ages.forEach(age => {
      if (!isNaN(age)) { // Vérifie si 'age' est un nombre après la conversion
        if (age <= 5) ageGroupsCount[0]++;
        else if (age <= 15) ageGroupsCount[1]++;
        else if (age <= 17) ageGroupsCount[2]++;
        else if (age <= 25) ageGroupsCount[3]++;
        else if (age <= 64) ageGroupsCount[4]++;
        else ageGroupsCount[5]++;
      }
    });

    return ageGroupsCount;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default AgeDistributionChart;
