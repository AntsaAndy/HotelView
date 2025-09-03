const API_URL = "http://localhost:5041/api/users";

export async function register(email, password, role) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  return await res.text();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Erreur de connexion");
  const data = await res.json();
  return data.token;
}

export async function getProtectedData(token) {
  const res = await fetch(`${API_URL}/protected`, {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) throw new Error("Accès refusé");
  return await res.text();
}
