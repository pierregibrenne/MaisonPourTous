import { supabase } from "../client";

const fetchCollaboratorsData = async () => {
  try {
    const { data, error } = await supabase.from("visiteur").select("prenom");

    if (error) {
      console.error(
        "Erreur lors de la récupération des données des collaborateurs :",
        error.message
      );
      return null; // Gérez l'erreur selon vos besoins
    }

    return data; // Retournez les données des collaborateurs
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données des collaborateurs :",
      error.message
    );
    return null; // Gérez l'erreur selon vos besoins
  }
};

export default fetchCollaboratorsData;
