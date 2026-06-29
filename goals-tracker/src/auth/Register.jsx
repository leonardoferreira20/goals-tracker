import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Forms.css";

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
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__campo">
        <label className="form__label" htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
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
        <label className="form__label" htmlFor="register-password">
          Palavra-passe
        </label>
        <input
          id="register-password"
          className="form__input"
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form__campo">
        <label className="form__label" htmlFor="register-confirm-password">
          Confirmar palavra-passe
        </label>
        <input
          id="register-confirm-password"
          className="form__input"
          type="password"
          placeholder="Confirmar palavra-passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="botao botao--primario botao--bloco">
        Criar conta
      </button>
    </form>
  );
}
