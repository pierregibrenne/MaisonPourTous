import React, { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
import imageMomo from "../assets/imageMomo.png";
import mpt from "../assets/mpt.png";
import logoOfficiel from "../assets/logoOfficiel.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  console.log(formData);
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  }
  function Logo() {
    return <img className="w-8 h-8 mr-2" src={logo} />;
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
        <h3 className="mb-4 text-black text-2xl font-mono">Crée ton compte</h3>
        <form onSubmit={handleSubmit} className="mb-4 w-full">
          <br />
          <div className="relative">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
            </svg>
            <input
              placeholder="Nom"
              name="fullName"
              onChange={handleChange}
              type="text"
              className="w-full py-2 pl-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <br />
          <div className="relative">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            <input
              placeholder="Email"
              name="email"
              onChange={handleChange}
              type="text"
              className="w-full py-2 pl-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <br />
          <div className="relative">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <input
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
              type="password"
              className="w-full py-2 pl-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>{" "}
          <br />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 w-full rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Crée un compte
          </button>
        </form>{" "}
        <br />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Tu as déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-primary-500"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
