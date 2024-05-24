import { supabase } from "../client";
import React, { useState, useEffect } from "react";
import Success from "./Success.jsx";
import Steps from "./Steps.jsx";

const questions = [
  {
    key: "accueil",
    question: "Accueil :",
    type: "select",
    options: ["Physique ou Téléphone", "Physique", "Téléphone"],
    url: "https://img.freepik.com/vecteurs-libre/conversation-entretien-embauche_74855-7566.jpg?size=626&ext=jpg"
  },
  {
    key: "sexe",
    question: "Sexe :",
    type: "select",
    options: ["Sélectionnez le sexe", "Homme", "Femme"],
    url: "https://media.istockphoto.com/id/1289349825/fr/vectoriel/employ%C3%A9s-minuscules-masculins-et-f%C3%A9minins-%C3%A9gaux-restant-sur-l%C3%A9chelle-d%C3%A9quilibre.jpg?s=612x612&w=0&k=20&c=QhA69FBDK8KvluylaXRJWva8HvtoljNSy1krnMog9_I="
  },
  {
    key: "age",
    question: "Age :",
    type: "select",
    options: ["Sélectionnez une tranche d'âge", "0-5", "6-15", "16-17", "18-25", "26-64", "+65"],
    url: "https://img.freepik.com/vecteurs-libre/personne-differents-ages_23-2148403247.jpg?t=st=1716567203~exp=1716567803~hmac=68d0578e740fe347c60ec7a90613bea71b07568f244bd878badfa7ee40d51fad"
  },
  {
    key: "firstInput",
    question: "Raison de la venue :",
    type: "select",
    options: ["Sélectionnez la raison de la venue", "Permanence numérique", "Prise de RDV EFS", "Prise de RDV conseiller numérique", "Besoin de Salle de Réunion", "Informations générales", "Café convivial", "Impression", "Autre"],
    url: "https://img.freepik.com/vecteurs-libre/robots-candidats-humains-attendent-ligne-pour-entretien-embauche-hommes-femmes-affaires-concurrence-machines-pour-location-illustration-vectorielle-pour-emploi-affaires-concept-recrutement_74855-10146.jpg?size=626&ext=jpg&ga=GA1.1.2057300451.1716566524&semt=sph"
  },
  {
    key: "secondInput",
    question: "Orienter vers :",
    type: "select",
    options: ["Orienter vers", "Partenaire", "Jeunesse", "Insertion et emploi", "Numérique", "Accès aux droits", "Vie de quartier", "Famille", "Autre"],
    url: "https://img.freepik.com/vecteurs-libre/illustration-du-concept-orientation-professionnelle_114360-14171.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1706054400&semt=ais"
  }
];

function InsertData({ userFirstName }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [autreRaisonFirst, setAutreRaisonFirst] = useState("");
  const [autreRaisonSecond, setAutreRaisonSecond] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = answers[currentQuestion.key];

    if (!answer || answer === currentQuestion.options[0]) {
      setErrorMessage("Veuillez remplir toutes les informations requises.");
      return;
    }

    if (currentQuestion.key === "firstInput" && answer === "Autre" && !autreRaisonFirst) {
      setErrorMessage("Veuillez fournir une raison supplémentaire.");
      return;
    }

    if (currentQuestion.key === "secondInput" && answer === "Autre" && !autreRaisonSecond) {
      setErrorMessage("Veuillez fournir une orientation supplémentaire.");
      return;
    }

    setErrorMessage("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleInsert();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (key, value) => {
    setAnswers({
      ...answers,
      [key]: value
    });
  };

  const handleInsert = async () => {
    const dataToInsert = {
      accueil: answers.accueil,
      sexe: answers.sexe,
      age: answers.age,
      raison: answers.firstInput === "Autre" ? autreRaisonFirst : answers.firstInput,
      redirection: answers.secondInput === "Autre" ? autreRaisonSecond : answers.secondInput,
      prenom: userFirstName,
    };

    try {
      const { data, error } = await supabase
        .from("visiteur")
        .insert([dataToInsert]);

      if (error) {
        console.error(error);
        setErrorMessage("Erreur lors de l'insertion des données.");
      } else {
        console.log("Données insérées avec succès :", data);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error.message);
      setErrorMessage("Erreur lors de l'insertion des données.");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setAutreRaisonFirst("");
        setAutreRaisonSecond("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      {success ? (
        <Success />
      ) : (
        <>
          <Steps currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
          <div className="card card-compact w-96 bg-base-100 shadow-xl mt-6">
            <figure>
            <img src={currentQuestion.url} alt="Illustration" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{currentQuestion.question}</h2>
              {currentQuestion.type === "select" && (
                <select
                  className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                  value={answers[currentQuestion.key] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.key, e.target.value)}
                >
                  {currentQuestion.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {currentQuestion.key === "firstInput" && answers.firstInput === "Autre" && (
                <input
                  type="text"
                  placeholder="Saisissez une autre raison"
                  value={autreRaisonFirst}
                  onChange={(e) => setAutreRaisonFirst(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              )}
              {currentQuestion.key === "secondInput" && answers.secondInput === "Autre" && (
                <input
                  type="text"
                  placeholder="Saisissez une autre orientation"
                  value={autreRaisonSecond}
                  onChange={(e) => setAutreRaisonSecond(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              )}
              <div className="card-actions justify-between mt-4">
                <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                  Retour
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Suivant
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Envoyer
                  </button>
                )}
              </div>
              <div className="text-red-700 mt-2">{errorMessage}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InsertData;
