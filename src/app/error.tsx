"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="route-state shell">
      <p className="micro-label">Não foi possível carregar</p>
      <h1>Algo interrompeu este percurso.</h1>
      <p>Tente novamente. Sua seleção local permanece salva neste dispositivo.</p>
      <button className="button button-dark" onClick={reset}>Tentar novamente</button>
    </div>
  );
}
