import { supabase } from "../client";
import React, { useState } from "react";

function InsertData() {
  const [ageRange, setAgeRange] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");

  const handleInsert = async () => {
    const dataToInsert = {
      age: ageRange,
      raison: firstInput,
      redirection: secondInput,
    };

    try {
      const { data, error } = await supabase
        .from("visiteur")
        .upsert([dataToInsert]);

      if (error) {
        console.error(error);
      } else {
        console.log("Données insérées avec succès :", data);
        // Réinitialisez les champs après l'insertion réussie
        setAgeRange("");
        setFirstInput("");
        setSecondInput("");
      }
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error.message);
    }
  };

  return (
    <div>
      <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
        <option>Selectionne une tranche d'age </option>
        <option value="-18">Moins de 18 ans</option>
        <option value="18-25">18 à 25 ans</option>
        <option value="25-50">25 à 50 ans</option>
        <option value="50+">50 ans et plus</option>
      </select>
      <br />
      <label>Premier input:</label>
      <input
        type="text"
        value={firstInput}
        onChange={(e) => setFirstInput(e.target.value)}
        required="required"
      />
      <br />
      <label className="text-3xl font-bold underline">Deuxième input:</label>
      <input
        type="text"
        value={secondInput}
        onChange={(e) => setSecondInput(e.target.value)}
      />
      <br />
      <button onClick={handleInsert}>Insérer</button>
    </div>
  );
}

export default InsertData;
