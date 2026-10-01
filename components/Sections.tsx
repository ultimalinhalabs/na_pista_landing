import { EVENTS } from "@/lib/analytics";
import { SITE } from "@/lib/site";
import { ApiExplorer } from "./ApiExplorer";
import {
  IconArrow,
  IconArrowDown,
  IconBox,
  IconCalendar,
  IconCheck,
  IconCode,
  IconCoins,
  IconGrid,
  IconLayers,
  IconLog,
  IconReceipt,
  IconServer,
  IconShield,
} from "./icons";
import { ModuleExplorer } from "./ModuleExplorer";
import { TrackedLink } from "./TrackedLink";

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow reveal">Infraestrutura operacional para negócios</p>
          <h1 id="hero-title" className="h1 reveal reveal--d1">
            A operação do seu negócio, <span className="accent">na pista</span>.
          </h1>
          <p className="lead reveal reveal--d2">
            Produtos, stock, pedidos, serviços e marcações numa só infraestrutura. Comece pela consola pronta a
            usar — ou ligue a sua própria interface à API do Na Pista.
          </p>
          <div className="btn-row reveal reveal--d3">
            <TrackedLink
              href="#comecar"
              className="btn btn--primary"
              event={EVENTS.HERO_CTA}
              params={{ cta: "comecar" }}
            >
              Começar <IconArrow size={16} />
            </TrackedLink>
            <TrackedLink href="#produto" className="btn" event={EVENTS.HERO_CTA} params={{ cta: "explorar" }}>
              Explorar a plataforma
            </TrackedLink>
          </div>
          <p className="hero__note reveal reveal--d3">Um produto do ecossistema Última Linha.</p>
        </div>

        <HeroTrack />
      </div>
    </section>
  );
}

/** Product illustration: the operation as parallel "lanes". Purely illustrative — no real data. */
function HeroTrack() {
  const lanes = [
    { icon: <IconBox size={17} />, title: "Produtos", meta: "catálogo · preço", state: "ACTIVE" },
    { icon: <IconLayers size={17} />, title: "Stock", meta: "RECEIPT +20", state: "20.000000" },
    { icon: <IconReceipt size={17} />, title: "Pedido", meta: "2 itens · 19 000,00 Kz", state: "CONFIRMED", active: true },
    { icon: <IconCalendar size={17} />, title: "Marcação", meta: "09:00 · 45 min", state: "SCHEDULED" },
  ];
  return (
    <figure className="reveal reveal--d2" style={{ margin: 0 }}>
      <div className="track" aria-hidden="true">
        <div className="track__bar">
          <span className="track__dots">
            <span />
            <span />
            <span />
          </span>
          /v1/organizations/…
        </div>
        <div className="track__lanes">
          {lanes.map((l) => (
            <div key={l.title} className={`lane${l.active ? " lane--active" : ""}`}>
              <span className="lane__icon">{l.icon}</span>
              <span>
                <span className="lane__title">{l.title}</span>
                <br />
                <span className="lane__meta">{l.meta}</span>
              </span>
              <span className="lane__state">{l.state}</span>
            </div>
          ))}
        </div>
        <div className="track__foot">
          <span>organização isolada</span>
          <span>auditoria activa</span>
        </div>
      </div>
      <figcaption className="track__caption">
        Ilustração: cada módulo é uma pista da mesma operação.
      </figcaption>
    </figure>
  );
}

/* --------------------------------------------------- Problem / positioning */

export function Problem() {
  const items = [
    {
      title: "Folhas de cálculo e conversas soltas",
      text: "Stock numa folha, pedidos no telefone, agenda num caderno. Nada fala com nada e os erros aparecem tarde.",
    },
    {
      title: "Sistemas fechados",
      text: "Software pronto que dita como o negócio deve funcionar — e não deixa ligar a sua loja, app ou site.",
    },
    {
      title: "Desenvolvimento que recomeça do zero",
      text: "Cada projecto à medida volta a construir catálogo, clientes, stock e agenda antes de chegar ao que é único.",
    },
  ];
  return (
    <section className="section" id="posicionamento" aria-labelledby="problem-title">
      <div className="container problem">
        <div>
          <p className="eyebrow">O problema</p>
          <h2 id="problem-title" className="h2">
            Todos os negócios acabam a reconstruir a mesma operação.
          </h2>
          <div className="positioning">
            <p>
              O Na Pista é a camada operacional que falta: os módulos de que o negócio precisa, já construídos,
              isolados por organização e disponíveis por API.
            </p>
          </div>
        </div>
        <ol className="problem__list">
          {items.map((it, i) => (
            <li key={it.title} className="problem__item">
              <span className="problem__num">0{i + 1}</span>
              <div>
                <h3 className="h3">{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ What it provides */

export function Product() {
  return (
    <section className="section section--carvao" id="produto" aria-labelledby="product-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">O que o Na Pista oferece</p>
          <h2 id="product-title" className="h2">
            Módulos operacionais, prontos a usar.
          </h2>
          <p className="lead">
            Duas famílias de módulos sobre a mesma base — clientes, organização e regras de negócio partilhadas.
            Use as que fazem sentido para o seu negócio.
          </p>
        </div>
        <ModuleExplorer />
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Business models */

export function BusinessModels() {
  return (
    <section className="section" id="solucoes" aria-labelledby="models-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Soluções</p>
          <h2 id="models-title" className="h2">
            Vende produtos, vende tempo — ou ambos.
          </h2>
          <p className="lead">
            O Na Pista não o obriga a escolher um &ldquo;tipo de negócio&rdquo;. Os módulos combinam-se de acordo com o
            que vende.
          </p>
        </div>
        <div className="grid grid--3">
          <article className="card model">
            <span className="model__kicker">Comércio</span>
            <h3 className="h3">Vende produtos</h3>
            <p>Catálogo, stock e pedidos ligados: confirmar um pedido desconta o stock; cancelá-lo devolve-o.</p>
            <div className="model__examples">
              <span className="chip">Boutique</span>
              <span className="chip">Loja</span>
              <span className="chip">Distribuição</span>
            </div>
            <p className="model__modules">Produtos · Stock · Pedidos · Clientes</p>
          </article>
          <article className="card model">
            <span className="model__kicker">Marcações</span>
            <h3 className="h3">Vende tempo</h3>
            <p>Serviços, profissionais e disponibilidade reais: só se marca o que pode, de facto, ser prestado.</p>
            <div className="model__examples">
              <span className="chip">Barbearia</span>
              <span className="chip">Clínica</span>
              <span className="chip">Estúdio</span>
            </div>
            <p className="model__modules">Serviços · Profissionais · Horários · Marcações · Clientes</p>
          </article>
          <article className="card model model--hybrid">
            <span className="model__kicker">Híbrido</span>
            <h3 className="h3">Os dois, na mesma organização</h3>
            <p>Um salão que também vende produtos usa as duas famílias, com os mesmos clientes nas duas.</p>
            <div className="model__examples">
              <span className="chip">Salão + loja</span>
              <span className="chip">Ginásio + bar</span>
            </div>
            <p className="model__modules">Comércio + Marcações</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- API first */

export function ApiFirst() {
  const flow = [
    { label: "A sua interface", sub: "Consola, site, app ou POS" },
    { label: "API Na Pista", sub: "/v1 · autenticação · autorização", core: true },
    { label: "Módulos de negócio", sub: "Regras aplicadas no servidor" },
    { label: "Dados operacionais", sub: "Isolados por organização" },
  ];
  const points = [
    {
      title: "Versionada desde o início",
      text: "Todas as rotas vivem em /v1, com respostas e códigos de erro previsíveis.",
    },
    {
      title: "Regras no servidor, não no cliente",
      text: "Preços, totais, estados e stock são decididos pela API — uma interface nunca os pode forjar.",
    },
    {
      title: "Isolamento por organização",
      text: "Cada pedido é autenticado e autorizado no servidor; uma organização nunca vê dados de outra.",
    },
    {
      title: "Credenciais de integração",
      text: "Sistemas externos usam credenciais de serviço próprias — não a sessão de uma pessoa.",
    },
  ];
  return (
    <section className="section section--carvao" id="api" aria-labelledby="api-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">API-first</p>
          <h2 id="api-title" className="h2">
            A API é o produto. As interfaces são escolhas.
          </h2>
          <p className="lead">
            Toda a lógica de negócio vive na API. A consola do Na Pista é apenas mais um cliente — o mesmo contrato
            está disponível para a interface que quiser construir.
          </p>
        </div>

        <ol className="flow" aria-label="Fluxo de um pedido">
          {flow.map((f, i) => (
            <li key={f.label}>
              {i > 0 && (
                <span className="flow__arrow" aria-hidden="true">
                  <IconArrowDown size={16} />
                </span>
              )}
              <div className={`flow__step${f.core ? " flow__step--core" : ""}`}>
                <div className="flow__label">{f.label}</div>
                <div className="flow__sub">{f.sub}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="api">
          <ul className="api__points">
            {points.map((p) => (
              <li key={p.title} className="api__point">
                <IconCheck size={20} />
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <ApiExplorer />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Console */

export function ConsoleSection() {
  return (
    <section className="section" id="consola" aria-labelledby="console-title">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Recursos</p>
          <h2 id="console-title" className="h2">
            Pronto para usar. Pronto para integrar.
          </h2>
          <p className="lead">Dois caminhos para a mesma operação — escolha um, ou use os dois.</p>
        </div>
        <div className="console-split">
          <article className="card console-card console-card--primary">
            <span className="console-card__tag">Pronto para usar</span>
            <h3 className="h3">Consola Na Pista</h3>
            <p>A interface de gestão para a sua equipa, sem escrever código.</p>
            <ul className="checklist">
              {[
                "Catálogo, stock e pedidos",
                "Serviços, profissionais, horários e agenda",
                "Clientes da organização",
                "Permissões por função da equipa",
              ].map((t) => (
                <li key={t}>
                  <IconCheck size={16} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="btn-row">
              <TrackedLink
                href={SITE.consoleLoginUrl}
                className="btn"
                event={EVENTS.CONSOLE_LOGIN}
                params={{ location: "console_section" }}
              >
                Entrar na consola <IconArrow size={16} />
              </TrackedLink>
            </div>
          </article>
          <article className="card console-card">
            <span className="console-card__tag">Pronto para integrar</span>
            <h3 className="h3">A sua própria interface</h3>
            <p>O seu site, app ou ponto de venda, ligado directamente à API.</p>
            <ul className="checklist">
              {[
                "O mesmo contrato que a consola usa",
                "Credenciais de serviço para integrações",
                "Erros estáveis e referência de pedido",
                "A sua marca, a sua experiência",
              ].map((t) => (
                <li key={t}>
                  <IconCheck size={16} />
                  {t}
                </li>
              ))}
            </ul>
            <a href="#api" className="text-link">
              Ver a API <IconArrow size={16} />
            </a>
          </article>
        </div>
        <p className="same-api">A consola não tem atalhos: usa exactamente a mesma API que a sua interface usaria.</p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Why Na Pista */

export function Why() {
  const reasons = [
    {
      icon: <IconShield />,
      title: "Isolamento por organização",
      text: "Autenticação e autorização em cada pedido, no servidor. Os dados de uma organização nunca chegam a outra.",
    },
    {
      icon: <IconServer />,
      title: "Regras que não dependem da interface",
      text: "Stock nunca negativo, preços derivados do produto, horários sem sobreposições — garantidos na origem.",
    },
    {
      icon: <IconLog />,
      title: "Auditoria",
      text: "As operações relevantes deixam registo de quem fez o quê e quando, com uma referência por pedido.",
    },
    {
      icon: <IconCoins />,
      title: "Valores exactos",
      text: "Dinheiro e quantidades tratados como decimais exactos — sem arredondamentos inesperados.",
    },
    {
      icon: <IconGrid />,
      title: "Modular",
      text: "Comércio e marcações são famílias independentes sobre a mesma base: use só o que o seu negócio precisa.",
    },
    {
      icon: <IconCode />,
      title: "Sem prisão de interface",
      text: "Comece pela consola e evolua para uma interface própria sem migrar dados nem mudar de sistema.",
    },
  ];
  return (
    <section className="section section--carvao" id="porque" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Porquê o Na Pista</p>
          <h2 id="why-title" className="h2">
            Construído para operar, não para impressionar.
          </h2>
        </div>
        <ul className="grid grid--3">
          {reasons.map((r) => (
            <li key={r.title} className="card">
              <div className="card__icon">{r.icon}</div>
              <h3 className="h3">{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- How it works */

export function HowItWorks() {
  const steps = [
    { title: "Fale connosco", text: "Percebemos o que vende e que módulos fazem sentido para a sua operação." },
    {
      title: "Activamos a organização",
      text: "A sua organização e a subscrição do Na Pista são criadas na plataforma Última Linha, com acesso para a equipa.",
    },
    { title: "Configure", text: "Catálogo, serviços, profissionais e horários — directamente na consola." },
    {
      title: "Opere — ou integre",
      text: "Comece a vender e a marcar. Quando quiser, ligue a sua própria interface à API.",
    },
  ];
  return (
    <section className="section" id="como-funciona" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Como funciona</p>
          <h2 id="how-title" className="h2">
            Da conversa à operação em quatro passos.
          </h2>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title} className="step">
              <h3 className="h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Trust / ecosystem */

export function Ecosystem() {
  return (
    <section className="section section--carvao" id="ecossistema" aria-labelledby="eco-title">
      <div className="container eco">
        <div>
          <p className="eyebrow">Empresa</p>
          <h2 id="eco-title" className="h2">
            Parte do ecossistema Última Linha.
          </h2>
          <p className="lead">
            O Na Pista é um produto da Última Linha. Identidade, organizações, subscrições e permissões vêm da
            plataforma partilhada do ecossistema — o Na Pista concentra-se na operação.
          </p>
          <p className="lead">
            Pagamentos e entregas ficam fora do Na Pista por desenho: pertencem a produtos dedicados do ecossistema,
            ligados sempre por API — nunca por acesso directo a dados.
          </p>
          <p style={{ marginTop: 28 }}>
            <a href={SITE.company.url} className="text-link" rel="noopener noreferrer">
              Conhecer a Última Linha <IconArrow size={16} />
            </a>
          </p>
        </div>
        <div className="eco__stack" role="group" aria-label="Arquitectura do ecossistema">
          <div className="eco__layer eco__layer--np">
            <div className="eco__layer-title">
              Na Pista <span>operação</span>
            </div>
            <p>Catálogo, stock, pedidos, serviços e marcações.</p>
          </div>
          <div className="eco__siblings">
            <div className="eco__sibling">
              Micha Express<span>pagamentos</span>
            </div>
            <div className="eco__sibling">
              Foi<span>logística</span>
            </div>
            <div className="eco__sibling">
              Qualé a Dica?!<span>conversacional</span>
            </div>
          </div>
          <div className="eco__layer">
            <div className="eco__layer-title">
              Plataforma Última Linha <span>infraestrutura</span>
            </div>
            <p>Identidade, organizações, subscrições, permissões e auditoria.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Final CTA */

export function FinalCta() {
  return (
    <section className="section" id="comecar" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, official PNG used as-is */}
          <img src="/brand/mark.png" alt="" width={56} height={66} />
          <h2 id="cta-title" className="h2">
            Coloque a sua operação na pista.
          </h2>
          <p className="lead">
            Conte-nos o que vende e como trabalha. Ajudamos a escolher os módulos e a pôr a sua organização a operar.
          </p>
          <div className="btn-row">
            <TrackedLink
              href={SITE.startUrl}
              className="btn btn--primary"
              event={EVENTS.START_CTA}
              params={{ location: "final_cta" }}
            >
              Começar com Na Pista <IconArrow size={16} />
            </TrackedLink>
            <TrackedLink
              href={SITE.contactUrl}
              className="btn"
              event={EVENTS.CONTACT_CTA}
              params={{ location: "final_cta" }}
              target="_blank"
            >
              Falar com a equipa
            </TrackedLink>
          </div>
          <p className="cta__fine">
            Já tem conta?{" "}
            <TrackedLink
              href={SITE.consoleLoginUrl}
              event={EVENTS.CONSOLE_LOGIN}
              params={{ location: "final_cta" }}
            >
              Entrar na consola
            </TrackedLink>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <span className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, official PNG used as-is */}
              <img src="/brand/mark-sm.png" alt="" width={22} height={26} />
              <span>Na Pista</span>
            </span>
            <p className="footer__tagline">{SITE.tagline}.</p>
          </div>
          <nav aria-label="Produto">
            <h2>Produto</h2>
            <ul>
              <li>
                <a href="#produto">Módulos</a>
              </li>
              <li>
                <a href="#solucoes">Soluções</a>
              </li>
              <li>
                <a href="#api">API</a>
              </li>
              <li>
                <a href="#consola">Consola</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Empresa">
            <h2>Empresa</h2>
            <ul>
              <li>
                <a href={SITE.company.url} rel="noopener noreferrer">
                  Última Linha
                </a>
              </li>
              <li>
                <TrackedLink href={SITE.contactUrl} event={EVENTS.CONTACT_CTA} params={{ location: "footer" }} target="_blank">
                  Contacto
                </TrackedLink>
              </li>
              <li>
                <a href={SITE.company.privacyUrl} rel="noopener noreferrer">
                  Privacidade
                </a>
              </li>
              <li>
                <TrackedLink href={SITE.consoleLoginUrl} event={EVENTS.CONSOLE_LOGIN} params={{ location: "footer" }}>
                  Entrar
                </TrackedLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>
            © {year} {SITE.company.name}. Todos os direitos reservados.
          </span>
          <span>Na Pista é um produto Última Linha.</span>
        </div>
      </div>
    </footer>
  );
}
