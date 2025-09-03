import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import { getProtectedData } from "./api/auth";

function App() {
  const [token, setToken] = useState(null);
  const [protectedData, setProtectedData] = useState("");

  const handleLogin = (tok) => {
    setToken(tok);
  };

  const fetchProtected = async () => {
    if (!token) {
      alert("Connecte-toi d'abord !");
      return;
    }
    try {
      const data = await getProtectedData(token);
      setProtectedData(data);
    } catch {
      setProtectedData("Accès refusé");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Frontend React avec backend .NET</h1>
      {!token ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={fetchProtected}>Appeler route protégée</button>
          <p>{protectedData}</p>
          <button onClick={() => setToken(null)}>Déconnexion</button>
        </>
      )}
    </div>
  );
}

export default App;
