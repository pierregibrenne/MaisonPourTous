import React from "react";
import { SignUp, Login } from "./pages";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useState, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const App = () => {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<SignUp />} />
        <Route path={"/login"} element={<Login setToken={setToken} />} />
        {token ? (
          <Route path={"/homepage"} element={<Homepage token={token} />} />
        ) : (
          ""
        )}
      </Routes>
      <SpeedInsights />
    </div>
  );
};

export default App;
