import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import SexePieChart from "./DataGraph/Sexe";
import UserTrack from "./DataGraph/UserTrack";
// import TimeTrendChart from './DataGraph/TimeTrendChart';
import fetchCollaboratorsData from "../helpers/collaborateur";
import AgeDistributionChart from "./DataGraph/AgeDistribution";
const Dashboard = () => {
  //jeter un oeil sur const sexes, j'ai l'impression que je me suis planter
  const [sexes, setSexes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nombreHommes, setNombreHommes] = useState(0);
  const [nombreFemmes, setNombreFemmes] = useState(0);
  const [collaborateurs, setCollaborateurs] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchSexes = async () => {
      const { data, error } = await supabase.from("visiteur").select("sexe");

      if (error) {
        console.error(error);
        setLoading(false);
      } else {
        setSexes(data);
        setLoading(false);

        // Compter le nombre d'hommes et de femmes
        let hommes = 0;
        let femmes = 0;

        data.forEach((item) => {
          if (item.sexe === "Homme") {
            hommes++;
          } else if (item.sexe === "Femme") {
            femmes++;
          }
        });

        setNombreHommes(hommes);
        setNombreFemmes(femmes);
      }
    };

    fetchSexes();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }
  useEffect(() => {
    const fetchData = async () => {
      const collaborateursData = await fetchCollaboratorsData();

      if (collaborateursData) {
        setCollaborateurs(collaborateursData);
        setLoading(false);
      } else {
        setLoading(false);
        // Gérez l'erreur selon vos besoins
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   // Ici, vous récupéreriez vos données (par exemple, depuis une API)
  //   // Pour cet exemple, je vais juste simuler des données
  //   const simulatedData = {
  //     labels: ['2024-01-01', '2024-01-02', '2024-01-03'], // Exemple de dates
  //     values: [10, 20, 15] // Exemple de nombre de visiteurs
  //   };

  //   setChartData(simulatedData);
  // }, []);
  return (
    <div>
      <div className="flex">
        <SexePieChart nombreHommes={nombreHommes} nombreFemmes={nombreFemmes} />
      </div>
      <div>
        <UserTrack userData={collaborateurs} />
      </div>
      <div>
      <h2>Tranche d'age Répartition</h2>
      <div>
      <AgeDistributionChart/>
      </div>
      {/* <TimeTrendChart data={chartData} /> */}
    </div>
    </div>
  );
};

export default Dashboard;
