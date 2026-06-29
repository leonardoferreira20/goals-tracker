import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Forms.css";

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
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__campo">
        <label className="form__label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="form__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div className="form__campo">
        <label className="form__label" htmlFor="login-password">
          Palavra-passe
        </label>
        <input
          id="login-password"
          className="form__input"
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="botao botao--primario botao--bloco">
        Entrar
      </button>
    </form>
  );
}
