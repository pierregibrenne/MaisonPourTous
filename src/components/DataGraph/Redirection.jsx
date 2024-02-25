import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { supabase } from '../../client'; // Assurez-vous que le chemin d'importation est correct

const Redirection = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Partenaire", 
      "Jeunesse", 
      "Insertion et emploi", 
      "Numérique", 
      "Accès aux droits", 
      "Vie de quartier", 
      "Famille", 
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
      const { data, error } = await supabase.from('visiteur').select('redirection');

      if (error) {
        console.error(error);
      } else {
        const redirectionCounts = countRedirections(data);
        setChartData(prevState => ({
          ...prevState,
          datasets: [{ ...prevState.datasets[0], data: redirectionCounts }]
        }));
      }
    };

    fetchData();
  }, []);

  const countRedirections = (data) => {
    const redirections = chartData.labels;
    const redirectionCounts = redirections.map(redirection => data.filter(item => item.redirection === redirection).length);
    return redirectionCounts;
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
        <h4>Redirection :</h4>
      <Pie data={chartData} />
    </div>
  );
};

export default Redirection
