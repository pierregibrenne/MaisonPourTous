import { supabase } from "../client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";

function InsertData() {
  const [ageRange, setAgeRange] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [sexe, setSexe] = useState("");
  const [accueil, setAccueil] = useState("");
  const [autreRaisonFirst, setAutreRaisonFirst] = useState(""); // Autre raison pour le premier select
  const [autreRaisonSecond, setAutreRaisonSecond] = useState(""); // Autre raison pour le deuxième select

  const handleInsert = async () => {
    const dataToInsert = {
      raison: firstInput === "Autre" ? autreRaisonFirst : firstInput,
      redirection: secondInput === "Autre" ? autreRaisonSecond : secondInput,
      age: ageRange,
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
      }
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error.message);
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md w-96">
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
            <option value="Permanance numérique">Permanance numérique</option>
            <option value="Prise de RDV EFS">Prise de RDV EFS</option>
            <option value="Prise de rdv conseiller numérique">
              Prise de rdv conseiller numérique
            </option>
            <option value="Besoin de Salle de Réunion">
              Besoin de Salle de Réunion
            </option>
            <option value="Information générales">Information générales</option>
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
          <br />
          <button
            onClick={handleInsert}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-4"
          >
            Insérer
          </button>{" "}
        </div>{" "}
      </form>

      {/* <select
        value={firstInput}
        onChange={(e) => setFirstInput(e.target.value)}
      >
        <option>Selectionne la raison de la venue</option>
        <option value="Permanance numérique">Permanance numérique</option>
        <option value="Prise de RDV EFS">Prise de RDV EFS</option>
        <option value="Prise de rdv conseiller numérique">
          Prise de rdv conseiller numérique
        </option>
        <option value="Besoin de Salle de Réunion">
          Besoin de Salle de Réunion
        </option>
        <option value="Information générales">Information générales</option>
        <option value="Café convivial">Café convivial</option>
        <option value="Impression">Impression</option>

        <option value="Autre">Autre</option>
      </select> */}
      <br />
      {/* Raison de la venue : permanence numérique, prise de rdv EFS, prise de rdv conseiller numérique, réservation de la salle de réunion, café convivial / impression / informations générales / autres (et la personne qui click sur autre peut insérer) 
Est-ce qu’on peut rajouter une rubrique avant toutes les autres questions. Accueil : physique / téléphone  */}
      {/* <input
        type="text"
        value={firstInput}
        onChange={(e) => setFirstInput(e.target.value)}
        required="required"
      /> */}
      {/* <div>
        <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ color: "#1f514e" }}
            class="w-24 h-24 rounded-full mx-auto"
            alt=""
            width="384"
            height="512"
          />
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
          >
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
          <label className="text-3xl font-bold underline">
            Deuxième input:
          </label>
          <input
            type="text"
            value={secondInput}
            onChange={(e) => setSecondInput(e.target.value)}
          />
          <br />
          <button onClick={handleInsert}>Insérer</button> */}
      {/* <img
            class="w-24 h-24 rounded-full mx-auto"
            src="/sarah-dayan.jpg"
            alt=""
            width="384"
            height="512"
          /> */}
      {/* <div class="pt-6 space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medi>
      <div>
        Sarah Dayan
      </div>
      <div>
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>*/}
      {/* </figure> */}
      {/* </div> */}
    </div>
  );
}

export default InsertData;

}

export default InsertData;
