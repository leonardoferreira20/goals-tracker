import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
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

      <button type="submit">Entrar</button>
    </form>
  );
}
