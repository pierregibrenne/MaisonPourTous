import React, { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <Logo />
        MomoApp
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Crée ton compte
        </h1>
        <form onSubmit={handleSubmit}>
          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ton Nom :
          </label>
          <input
            placeholder="name"
            name="fullName"
            onChange={handleChange}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ton adress mail :
          </label>
          <input
            placeholder="email"
            name="email"
            onChange={handleChange}
            type="text"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mot de passe:
          </label>
          <input
            placeholder="mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />{" "}
          <br />
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Crée un compte
          </button>
        </form>{" "}
        <br />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Ta déja un compte, click sur{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
