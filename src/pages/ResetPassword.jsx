import React, { useState } from "react";
import { supabase } from "../client";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerif, setNewPasswordVerif] = useState("");

  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Votre mot de passe a été réinitialisé avec succès.");
    }
  };

  return (
    <div>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
