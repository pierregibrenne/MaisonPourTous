import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Add from "../components/Add";
import Delete from "../components/Delete";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import mpt from "../assets/mpt.png";

function HomePage({ token }) {
  let navigate = useNavigate();
  const welcomeText = `Bienvenue ${token.user.user_metadata.full_name} 😊`;
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const [currentView, setCurrentView] = useState("Add");

  const changeView = (viewName) => {
    setCurrentView(viewName);
  };

  const renderComponent = () => {
    switch (currentView) {
      case "Add":
        return <Add userFirstName={token.user.user_metadata.full_name} />;
      case "Delete":
        return <Delete />;
      case "Dashboard":
        return <Dashboard />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-gray-100 h-full shadow-lg">
        <NavBar
          userEmail={token.user.email}
          changeView={changeView}
          handleLogout={handleLogout}
          welcomeText={welcomeText}
        />        
      </div>
      <div className="w-4/5 p-4 overflow-auto"> 
        {renderComponent()}
      </div>
    </div>
  );
}

export default HomePage;
