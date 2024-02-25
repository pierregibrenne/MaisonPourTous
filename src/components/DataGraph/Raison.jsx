import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { supabase } from '../../client'; // Assurez-vous que le chemin d'importation est correct

const Raison = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Permanance numérique", 
      "Prise de RDV EFS", 
      "Prise de rdv conseiller numérique", 
      "Besoin de Salle de Réunion", 
      "Information générales", 
      "Café convivial", 
      "Impression", 
     
    ],
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#C9CBCF', '#4D5360'
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#C9CBCF', '#4D5360'
      ]
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('visiteur').select('raison');

      if (error) {
        console.error(error);
      } else {
        const reasonsCount = countReasons(data);
        setChartData(prevState => ({
          ...prevState,
          datasets: [{ ...prevState.datasets[0], data: reasonsCount }]
        }));
      }
    };

    fetchData();
  }, []);

  const countReasons = (data) => {
    const reasons = chartData.labels;
    const reasonsCount = reasons.map(reason => data.filter(item => item.raison === reason).length);
    return reasonsCount;
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
        <h4> --Raison :</h4>
      <Pie data={chartData} />
    </div>
  );
};

export default Raison;
