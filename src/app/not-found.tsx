import Link from "next/link";

export default function NotFound() {
  return (
    <div className="route-state shell">
      <p className="micro-label">Página não encontrada</p>
      <h1>Esta peça não está aqui.</h1>
      <p>Volte para a coleção e continue por outra forma.</p>
      <Link className="button button-dark" href="/collection/intervalo">Ver coleção</Link>
    </div>
  );
}
