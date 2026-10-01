"use client";

import { useState, type ReactNode } from "react";
import { EVENTS, track } from "@/lib/analytics";
import {
  IconBox,
  IconCalendar,
  IconClock,
  IconLayers,
  IconReceipt,
  IconSpark,
  IconUser,
  IconUsers,
} from "./icons";
import { Tabs } from "./Tabs";

type Module = { icon: ReactNode; name: string; summary: string; points: string[] };

/**
 * Module content mirrors what the Na Pista API implements today
 * (na-pista/docs/modules.md, docs/api/*). Nothing listed here is a roadmap item.
 */
const FAMILIES: Record<"comercio" | "marcacoes", { label: string; intro: string; modules: Module[] }> = {
  comercio: {
    label: "Comércio",
    intro: "Para quem vende bens: do catálogo ao stock e ao pedido, com o stock sempre coerente com o que foi vendido.",
    modules: [
      {
        icon: <IconBox />,
        name: "Produtos",
        summary: "Catálogo com categorias, unidades e preço actual.",
        points: ["Arquivar sem perder histórico", "Preço em falta impede a venda", "Pesquisa e filtros por categoria"],
      },
      {
        icon: <IconUsers />,
        name: "Clientes",
        summary: "A carteira de clientes da organização, isolada de outras organizações.",
        points: ["Partilhados por pedidos e marcações", "Clientes arquivados preservados"],
      },
      {
        icon: <IconLayers />,
        name: "Stock",
        summary: "Saldo por produto alterado apenas por movimentos.",
        points: ["Entradas e ajustes registados", "Nunca abaixo de zero", "Histórico completo de movimentos"],
      },
      {
        icon: <IconReceipt />,
        name: "Pedidos",
        summary: "Do rascunho à conclusão, com preços calculados no servidor.",
        points: ["Confirmar desconta o stock", "Cancelar devolve o stock", "Valores exactos em Kz"],
      },
    ],
  },
  marcacoes: {
    label: "Marcações",
    intro: "Para quem vende tempo: serviços, quem os presta, quando há disponibilidade e as marcações em si.",
    modules: [
      {
        icon: <IconSpark />,
        name: "Serviços",
        summary: "O catálogo do que se presta, com duração e preço.",
        points: ["Ligados aos profissionais que os prestam", "Arquivar sem perder histórico"],
      },
      {
        icon: <IconUser />,
        name: "Profissionais",
        summary: "A equipa que presta os serviços.",
        points: ["Cada um com os serviços que presta", "Arquivar sem perder histórico"],
      },
      {
        icon: <IconClock />,
        name: "Horários e disponibilidade",
        summary: "Horário semanal, excepções e disponibilidade calculada.",
        points: ["No fuso horário da organização", "Excepções por data, como folgas e feriados"],
      },
      {
        icon: <IconCalendar />,
        name: "Marcações",
        summary: "Agenda com conflitos de horário impedidos na origem.",
        points: ["Agendada, concluída, cancelada, não compareceu", "Sobreposições impedidas pela base de dados"],
      },
    ],
  },
};

export function ModuleExplorer() {
  const [active, setActive] = useState<"comercio" | "marcacoes">("comercio");

  return (
    <Tabs
      label="Famílias de módulos"
      tabs={(Object.keys(FAMILIES) as (keyof typeof FAMILIES)[]).map((id) => ({ id, label: FAMILIES[id].label }))}
      active={active}
      onChange={(id) => {
        if (id === active) return;
        setActive(id as keyof typeof FAMILIES);
        track(EVENTS.MODULE_INTERACTION, { family: id });
      }}
      panelClassName="modules__panel"
      renderPanel={(id) => {
        const family = FAMILIES[id as keyof typeof FAMILIES];
        return (
          <>
            <p className="modules__intro">{family.intro}</p>
            <ul className="grid grid--4">
              {family.modules.map((m) => (
                <li key={m.name} className="card module-card">
                  <div className="card__icon">{m.icon}</div>
                  <h3 className="h3">{m.name}</h3>
                  <p>{m.summary}</p>
                  <ul>
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        );
      }}
    />
  );
}
