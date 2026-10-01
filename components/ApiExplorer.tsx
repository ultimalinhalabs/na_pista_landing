"use client";

import { Fragment, useState, type ReactNode } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { Tabs } from "./Tabs";

/**
 * Illustrative, abbreviated examples that follow the real Na Pista API
 * contracts (na-pista/docs/api/*, docs/api-boundary.md): `/v1` paths, the
 * `{ "data": … }` envelope, server-derived prices/status, decimal strings for
 * money and quantities. Identifiers are shortened; no real data.
 */
const EXAMPLES = {
  pedido: {
    label: "Pedido",
    request: {
      line: "POST /v1/organizations/{organizationId}/orders",
      body: `{
  "customerId": "c1f0…",
  "items": [
    { "productId": "8a2e…", "quantity": 2 }
  ]
}`,
    },
    status: "201 Created",
    response: `{
  "data": {
    "id": "5d71…",
    "status": "DRAFT",
    "currency": "AOA",
    "items": [
      {
        "productName": "Camisola Azul",
        "quantity": "2.000000",
        "unitPrice": "9500.00",
        "subtotal": "19000.00"
      }
    ],
    "total": "19000.00"
  }
}`,
    note: "Preços, totais e estado são sempre calculados no servidor — nunca aceites do cliente.",
  },
  marcacao: {
    label: "Marcação",
    request: {
      line: "POST /v1/organizations/{organizationId}/appointments",
      body: `{
  "customerId": "c1f0…",
  "professionalId": "77b3…",
  "serviceId": "e04a…",
  "startAt": "2026-10-05T09:00:00+01:00"
}`,
    },
    status: "201 Created",
    response: `{
  "data": {
    "id": "a9c2…",
    "status": "SCHEDULED",
    "startAt": "2026-10-05T08:00:00.000Z",
    "endAt": "2026-10-05T08:45:00.000Z"
  }
}`,
    note: "O fim é derivado da duração do serviço; horários indisponíveis ou sobrepostos são recusados.",
  },
  stock: {
    label: "Stock",
    request: {
      line: "POST /v1/organizations/{organizationId}/inventory/{productId}/movements",
      body: `{
  "type": "RECEIPT",
  "quantity": 20,
  "reason": "Stock inicial"
}`,
    },
    status: "201 Created",
    response: `{
  "data": {
    "movement": { "type": "RECEIPT", "quantity": "20.000000" },
    "balance": { "quantity": "20.000000" }
  }
}`,
    note: "O saldo só muda através de movimentos — cada um fica no histórico e na auditoria.",
  },
} as const;

type ExampleId = keyof typeof EXAMPLES;

/** Minimal JSON highlighting: keys and string values. */
function highlightJson(src: string): ReactNode {
  const out: ReactNode[] = [];
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    out.push(
      <span key={i++} className={m[2] ? "k" : "s"}>
        {m[1]}
      </span>,
    );
    if (m[2]) out.push(m[2]);
    last = re.lastIndex;
  }
  out.push(src.slice(last));
  return out.map((n, k) => <Fragment key={k}>{n}</Fragment>);
}

export function ApiExplorer() {
  const [active, setActive] = useState<ExampleId>("pedido");

  return (
    <div className="code">
      <Tabs
        label="Exemplos de pedidos à API"
        tabs={(Object.keys(EXAMPLES) as ExampleId[]).map((id) => ({ id, label: EXAMPLES[id].label }))}
        active={active}
        onChange={(id) => {
          if (id === active) return;
          setActive(id as ExampleId);
          track(EVENTS.API_INTERACTION, { example: id });
        }}
        renderPanel={(id) => {
          const ex = EXAMPLES[id as ExampleId];
          return (
            <>
              <pre aria-label="Pedido">
                <span className="k">
                  {/* Allow line breaks only between path segments on narrow screens. */}
                  {ex.request.line.split("/").map((seg, k) => (
                    <Fragment key={k}>
                      {k > 0 && (
                        <>
                          /<wbr />
                        </>
                      )}
                      {seg}
                    </Fragment>
                  ))}
                </span>
                {"\n"}
                <span className="c">{"Authorization: Bearer <token>\nContent-Type: application/json"}</span>
                {"\n\n"}
                {highlightJson(ex.request.body)}
              </pre>
              <pre aria-label="Resposta">
                <span className="ok">{ex.status}</span>
                {"\n\n"}
                {highlightJson(ex.response)}
              </pre>
              <p className="code__note">
                {ex.note} <span className="muted">Exemplo ilustrativo e abreviado.</span>
              </p>
            </>
          );
        }}
      />
    </div>
  );
}
