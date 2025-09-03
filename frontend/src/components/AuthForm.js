import React, { useState } from "react";
import { register, login } from "../api/auth";

export default function AuthForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Visitor");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password, role);
        setMessage("Inscription réussie, connecte-toi !");
        setIsRegister(false);
      } else {
        const token = await login(email, password);
        setMessage("Connexion réussie !");
        onLogin(token);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>{isRegister ? "Inscription" : "Connexion"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10, width: "100%" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10, width: "100%" }}
        />
        {isRegister && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginBottom: 10, width: "100%" }}
          >
            <option value="Visitor">Visitor</option>
            <option value="Partner">Partner</option>
            <option value="Admin">Admin</option>
          </select>
        )}
        <button type="submit" style={{ marginRight: 10 }}>
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister ? "J'ai déjà un compte" : "Créer un compte"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
