import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="notfound">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, official PNG used as-is */}
        <img src="/brand/mark.png" alt="" width={48} height={57} />
        <h1 className="h2">Esta página saiu da pista.</h1>
        <p className="lead">O endereço que procura não existe.</p>
        <p style={{ marginTop: 28 }}>
          <Link href="/" className="btn btn--primary">
            Voltar ao início
          </Link>
        </p>
      </div>
    </main>
  );
}
