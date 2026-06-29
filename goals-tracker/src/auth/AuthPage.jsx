import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <span className="app__eyebrow">Caderneta de poupança</span>
          <h1 className="app__titulo">Goals Tracker</h1>
          <p className="app__subtitulo">Cria objetivos financeiros e acompanha o progresso das tuas poupanças.</p>
        </div>

        {isLogin ? (
          <>
            <Login />
            <p>
              Ainda não tens conta?{" "}
              <button type="button" onClick={() => setIsLogin(false)}>
                Criar conta
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p>
              Já tens conta?{" "}
              <button type="button" onClick={() => setIsLogin(true)}>
                Entrar
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
