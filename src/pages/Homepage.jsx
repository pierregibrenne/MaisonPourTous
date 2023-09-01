import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "../components/Add";

function Homepage({ token }) {
  let navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div>
      Welcome back {token.user.user_metadata.full_name}
      <div>
        <Add />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Homepage;
