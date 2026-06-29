import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As palavras-passe não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <label>Palavra-passe</label>

        <input
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Confirmar palavra-passe</label>

        <input
          type="password"
          placeholder="Confirmar palavra-passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Criar conta</button>
    </form>
  );
}
