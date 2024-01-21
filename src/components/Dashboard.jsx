import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import SexePieChart from "./DataGraph/Sexe";
import UserTrack from "./DataGraph/UserTrack";
import fetchCollaboratorsData from "../helpers/collaborateur";

const Dashboard = () => {
  //jeter un oeil sur const sexes, j'ai l'impression que je me suis planter
  const [sexes, setSexes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nombreHommes, setNombreHommes] = useState(0);
  const [nombreFemmes, setNombreFemmes] = useState(0);
  const [collaborateurs, setCollaborateurs] = useState([]);

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
  return (
    <div>
      <div className="flex">
        <SexePieChart nombreHommes={nombreHommes} nombreFemmes={nombreFemmes} />
      </div>
      <div>
        <UserTrack userData={collaborateurs} />
      </div>
    </div>
  );
};

export default Dashboard;
