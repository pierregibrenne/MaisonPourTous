import { supabase } from "../client";
import React, { useState } from "react";
import Success from "./Success.jsx";
function InsertData({ userFirstName }) {
  const [success, setSuccess] = useState(false);
  const [ageRange, setAgeRange] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [sexe, setSexe] = useState("");
  const [accueil, setAccueil] = useState("");
  const [autreRaisonFirst, setAutreRaisonFirst] = useState(""); // Autre raison pour le premier select
  const [autreRaisonSecond, setAutreRaisonSecond] = useState(""); // Autre raison pour le deuxième select
  const [errorMessage, setErrorMessage] = useState("");

  const handleInsert = async () => {
    if (!accueil || !sexe || !ageRange || !firstInput || !secondInput) {
      setErrorMessage("Veuillez remplir toutes les informations requises.");
      return;
    }
    setErrorMessage("");
    const dataToInsert = {
      raison: firstInput === "Autre" ? autreRaisonFirst : firstInput,
      redirection: secondInput === "Autre" ? autreRaisonSecond : secondInput,
      age: ageRange,
      prenom: userFirstName,
      // raison: firstInput,
      // redirection: secondInput,
      sexe: sexe,
      accueil: accueil,
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
        setSuccess(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error.message);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      {success ? (
        <Success />
      ) : (
        <div className="bg-white min-h-screen flex items-center justify-center">
          <form className="bg-white p-6 rounded shadow-md w-96">
            <label>{userFirstName}</label> <br />
            <label>Accueil : </label>
            <select
              className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
              value={accueil}
              onChange={(e) => setAccueil(e.target.value)}
            >
              <option>Physique ou Téléphone</option>
              <option value="Physique">Physique</option>
              <option value="Téléphone">Téléphone</option>
            </select>
            <label>Sexe :</label> <br />
            <select
              className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
            >
              <option>Selectionne le sexe</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
            <br />
            <label>Age : </label>
            <select
              className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            >
              <option>Selectionne une tranche d'age </option>
              <option value="0-5">0 - 5 Ans</option>
              <option value="6-15">6 - 15 ans</option>
              <option value="16-17">16 - 17 ans</option>
              <option value="18-25">18 - 25 ans</option>
              <option value="26-64">26 - 64 ans</option>
              <option value="+65">+ 65 ans </option>
            </select>
            <br />
            <label>Raison de la venue:</label>
            <br />
            <div>
              <select
                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                value={firstInput}
                onChange={(e) => setFirstInput(e.target.value)}
              >
                <option>Selectionne la raison de la venue</option>
                <option value="Permanance numérique">
                  Permanance numérique
                </option>
                <option value="Prise de RDV EFS">Prise de RDV EFS</option>
                <option value="Prise de rdv conseiller numérique">
                  Prise de rdv conseiller numérique
                </option>
                <option value="Besoin de Salle de Réunion">
                  Besoin de Salle de Réunion
                </option>
                <option value="Information générales">
                  Information générales
                </option>
                <option value="Café convivial">Café convivial</option>
                <option value="Impression">Impression</option>
                <option value="Autre">Autre</option>
              </select>
              {firstInput === "Autre" && (
                <input
                  type="text"
                  placeholder="Saisissez une autre raison"
                  value={autreRaisonFirst}
                  onChange={(e) => setAutreRaisonFirst(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              )}
            </div>
            <div>
              <label htmlFor="">Orienter vers</label>
              <select
                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                value={secondInput}
                onChange={(e) => setSecondInput(e.target.value)}
              >
                <option>Orienter vers</option>
                <option value="Partenaire">Partenaire</option>
                <option value="Jeunesse">Jeunesse</option>
                <option value="insertion et emploi">Insertion et emploi</option>
                <option value="Numérique">Numérique</option>
                <option value="Accès aux droits">Accès aux droits</option>
                <option value="Vie de quartier">Vie de quartier</option>
                <option value="Famille">Famille</option>
                <option value="Autre">Autre</option>
              </select>
              {secondInput === "Autre" && (
                <input
                  type="text"
                  placeholder="Saisissez une autre orientation"
                  value={autreRaisonSecond}
                  onChange={(e) => setAutreRaisonSecond(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              )}
              <br /> <br />
              <button
                type="button"
                onClick={handleInsert}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-4"
              >
                Valider
              </button>{" "}
            </div>{" "}
            <div className="text-red-700">{errorMessage}</div>
          </form>
        </div>
      )}
    </div>
  );
}

export default InsertData;

