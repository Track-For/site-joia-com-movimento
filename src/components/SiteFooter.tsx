import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-mark">EIRA</div>
      <div className="footer-grid shell">
        <div>
          <p className="footer-title">Joias construídas como pequenos espaços.</p>
          <p className="footer-note">Conceito demonstrativo. Produtos e políticas devem ser validados antes da operação comercial.</p>
        </div>
        <nav aria-label="Rodapé loja">
          <Link href="/collection/intervalo">Coleção Intervalo</Link>
          <Link href="/category/aneis">Anéis</Link>
          <Link href="/category/brincos">Brincos</Link>
          <Link href="/search">Buscar</Link>
        </nav>
        <div className="footer-service">
          <p>Atendimento privado</p>
          <a href="mailto:atelier@eira.example">atelier@eira.example</a>
          <p>Segunda a sexta, 10h às 18h</p>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} EIRA Atelier</span>
        <span>Projeto conceitual</span>
      </div>
    </footer>
  );
}
