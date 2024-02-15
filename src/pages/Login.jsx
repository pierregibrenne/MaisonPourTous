import React, { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import imageMomo from "../assets/imageMomo.png";
import logoOfficiel from "../assets/logoOfficiel.png";

const Login = ({ setToken }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailForReset, setEmailForReset] = useState("");
  const [showReset, setShowReset] = useState(false);

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      setToken(data);
      navigate("/homepage");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault(); // Prévenir le rechargement de la page
    try {
      // Remplacer 'http://example.com/account/update-password' par l'URL de votre choix
      const { error } = await supabase.auth.resetPasswordForEmail(
        emailForReset,
        {
          redirectTo: "http://localhost:5173/reset-password",
        }
      );
      if (error) throw error;
      alert(
        "Vérifiez votre email pour le lien de réinitialisation du mot de passe."
      );
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-3/5 bg-gray-400">
        <img
          src={imageMomo}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/5 flex flex-col justify-center items-center p-10 bg-white rounded-md shadow-md mt-8 mb-8 mr-8 border border-gray-300">
        <img width={200} src={logoOfficiel} alt="image" /> <br />
        <h3 className="mb-4 text-black text-2xl font-mono">Connexion</h3>
        {!showReset ? (
          <>
            <form onSubmit={handleSubmit} className="mb-4 w-full">
              <div className="relative mb-4">
                <input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  className="w-full py-2 pl-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="relative">
                <input
                  placeholder="Mot de passe"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="w-full py-2 pl-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Connexion
              </button>
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Tu n'as pas de compte ?{" "}
              <Link className="font-bold hover:text-blue-500" to="/">
                Inscris-toi !
              </Link>
            </p>
            <p
              className="mt-4 text-sm font-light text-blue-500 hover:underline cursor-pointer"
              onClick={() => setShowReset(true)}
            >
              Mot de passe oublié ?
            </p>
          </>
        ) : (
          <>
            <form onSubmit={handleResetPassword} className="mb-4 w-full">
              <input
                placeholder="Email"
                name="emailForReset"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                type="text"
                className="w-full py-2 pl-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Envoyer le lien de réinitialisation
              </button>
            </form>
            <p
              className="text-sm font-light text-blue-500 hover:underline cursor-pointer"
              onClick={() => setShowReset(false)}
            >
              Retour à la connexion
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
