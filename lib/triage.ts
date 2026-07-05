// ---------------------------------------------------------------------------
// Luma triage rules engine (demo edition)
// Deterministic, versioned, cited. The LLM never decides eligibility.
// Thresholds in force July 2026 (SMI/IPREM frozen pending 2026 budget).
// ---------------------------------------------------------------------------

import type { Locale } from "./i18n";

export const RULES_VERSION = "2026-07";

// Thresholds (EUR / month unless noted) --------------------------------------
export const T = {
  DNV_MAIN: 2762, // 200% SMI — Ley 28/2022
  DNV_FIRST_DEP: 1035, // +75% SMI
  DNV_EXTRA_DEP: 345, // +25% SMI
  NLV_MAIN: 2400, // 400% IPREM
  NLV_DEP: 600, // 100% IPREM per dependent
  ARRAIGO_OWN: 600, // 100% IPREM — arraigo social own means
  HQP_ANNUAL: 41356, // 1.4x avg gross salary, 2026
};

export type LocationAnswer = "abroad" | "spain_legal" | "spain_irregular";
export type FamilyAnswer = "spanish" | "eu" | "resident" | "none";
export type WorkAnswer =
  | "remote_employee"
  | "freelancer"
  | "passive"
  | "job_offer"
  | "study"
  | "none";

export interface Answers {
  location: LocationAnswer;
  yearsInSpain: "lt2" | "gte2" | null;
  priorPermit: boolean;
  family: FamilyAnswer;
  work: WorkAnswer;
  monthlyIncome: number;
  dependents: number;
  ibero: boolean;
}

export type Fit = "strong" | "possible" | "not_yet";

interface L10n {
  en: string;
  es: string;
}

export interface PathwayResult {
  id: string;
  fit: Fit;
  name: L10n;
  summary: L10n;
  reasons: L10n[];
  requirements: L10n[];
  timeline: L10n;
  cite: string; // legal basis shown as provenance
}

const t = (en: string, es: string): L10n => ({ en, es });

export function pick(l: L10n, locale: Locale): string {
  return l[locale];
}

function fmt(n: number): string {
  return "€" + n.toLocaleString("en-US");
}

// ---------------------------------------------------------------------------

export function evaluate(a: Answers): PathwayResult[] {
  const results: PathwayResult[] = [];
  const dnvRequired =
    T.DNV_MAIN +
    (a.dependents >= 1 ? T.DNV_FIRST_DEP : 0) +
    Math.max(0, a.dependents - 1) * T.DNV_EXTRA_DEP;
  const nlvRequired = T.NLV_MAIN + a.dependents * T.NLV_DEP;

  // --- Family of a Spanish citizen -----------------------------------------
  if (a.family === "spanish") {
    results.push({
      id: "familiar_espanol",
      fit: "strong",
      name: t("Family member of a Spanish citizen", "Familiar de ciudadano español"),
      summary: t(
        "The new statute gives family of Spanish citizens a 5-year residence-and-work permit from day one — the strongest card in the deck.",
        "El nuevo estatuto da a los familiares de españoles un permiso de residencia y trabajo de 5 años desde el primer día — la mejor carta de la baraja."
      ),
      reasons: [
        t("You reported a Spanish citizen spouse/partner or parent.", "Indicas cónyuge/pareja o progenitor español."),
      ],
      requirements: [
        t("Proof of the family bond (marriage/civil registry, birth certificate).", "Prueba del vínculo (registro civil, certificado de nacimiento)."),
        t("Applied in Spain; no income threshold in the general case.", "Se solicita en España; sin umbral de ingresos en el caso general."),
      ],
      timeline: t("Weeks to ~3 months; 5-year card.", "Semanas a ~3 meses; tarjeta de 5 años."),
      cite: "RD 1155/2024, régimen de familiares de españoles",
    });
  }

  // --- Family of an EU citizen ----------------------------------------------
  if (a.family === "eu") {
    results.push({
      id: "tarjeta_comunitaria",
      fit: "strong",
      name: t("EU family member card (tarjeta comunitaria)", "Tarjeta de familiar de ciudadano de la UE"),
      summary: t(
        "5-year card with full work rights, protected by EU free-movement law — including positive silence if the administration is slow.",
        "Tarjeta de 5 años con pleno derecho a trabajar, protegida por el derecho de libre circulación de la UE — con silencio positivo si la administración se retrasa."
      ),
      reasons: [t("Close EU-citizen family member residing in Spain.", "Familiar cercano ciudadano de la UE residiendo en España.")],
      requirements: [
        t("Form EX-19 plus proof of the relationship and the EU citizen's residence/means.", "Formulario EX-19 más prueba del vínculo y de la residencia/medios del ciudadano UE."),
        t("Unregistered partners: evidence of a durable relationship.", "Parejas no registradas: prueba de relación estable."),
      ],
      timeline: t("Statutory 3 months, positive silence.", "3 meses de plazo legal, silencio positivo."),
      cite: "RD 240/2007, art. 8 (EX-19)",
    });
  }

  // --- Digital nomad ----------------------------------------------------------
  if (a.work === "remote_employee" || a.work === "freelancer") {
    const meets = a.monthlyIncome >= dnvRequired;
    results.push({
      id: "dnv",
      fit: meets ? "strong" : "not_yet",
      name: t("Digital Nomad Visa (teletrabajo)", "Visado de nómada digital (teletrabajo)"),
      summary: t(
        "Work remotely from Spain for foreign employers or clients. Applying from inside Spain gets you a 3-year permit decided in ~20 working days.",
        "Trabaja en remoto desde España para empresas o clientes extranjeros. Solicitándolo desde España obtienes un permiso de 3 años resuelto en ~20 días hábiles."
      ),
      reasons: meets
        ? [
            t(
              `Your income (${fmt(a.monthlyIncome)}/mo) clears the ${fmt(dnvRequired)}/mo requirement for your family size.`,
              `Tus ingresos (${fmt(a.monthlyIncome)}/mes) superan el requisito de ${fmt(dnvRequired)}/mes para tu unidad familiar.`
            ),
          ]
        : [
            t(
              `You need ${fmt(dnvRequired)}/mo for your family size; you reported ${fmt(a.monthlyIncome)}/mo — a gap of ${fmt(dnvRequired - a.monthlyIncome)}.`,
              `Necesitas ${fmt(dnvRequired)}/mes para tu unidad familiar; indicas ${fmt(a.monthlyIncome)}/mes — faltan ${fmt(dnvRequired - a.monthlyIncome)}.`
            ),
          ],
      requirements: [
        t("≥3 months with your employer/clients; company operating ≥1 year.", "≥3 meses con tu empresa/clientes; empresa operando ≥1 año."),
        t("Degree or 3+ years' experience; clean criminal record (apostilled).", "Titulación o 3+ años de experiencia; antecedentes penales limpios (apostillados)."),
        t("Social security coverage proof — the #1 timeline killer for US applicants.", "Prueba de cobertura de seguridad social — el mayor cuello de botella para solicitantes de EE. UU."),
        a.work === "freelancer"
          ? t("Spanish clients capped at ~20% of income.", "Clientes españoles limitados a ~20% de los ingresos.")
          : t("Employer letter authorising remote work from Spain.", "Carta del empleador autorizando el teletrabajo desde España."),
      ],
      timeline: t("2.5–4 months end-to-end incl. document prep.", "2,5–4 meses de principio a fin, incluida la preparación documental."),
      cite: "Ley 28/2022 (Startup Law) + Ley 14/2013; 200% SMI",
    });
  }

  // --- Non-lucrative -----------------------------------------------------------
  if (a.work === "passive" || (a.work === "none" && a.monthlyIncome >= T.NLV_MAIN)) {
    const meets = a.monthlyIncome >= nlvRequired;
    const abroadOk = a.location === "abroad";
    results.push({
      id: "nlv",
      fit: meets && abroadOk ? "strong" : meets ? "possible" : "not_yet",
      name: t("Non-Lucrative Visa", "Visado no lucrativo"),
      summary: t(
        "Residence without working, on savings or passive income. Consulate-only application from your country of residence.",
        "Residencia sin trabajar, con ahorros o ingresos pasivos. Se solicita únicamente en el consulado de tu país de residencia."
      ),
      reasons: [
        meets
          ? t(
              `Your income (${fmt(a.monthlyIncome)}/mo) clears the ${fmt(nlvRequired)}/mo (400% IPREM) requirement.`,
              `Tus ingresos (${fmt(a.monthlyIncome)}/mes) superan el requisito de ${fmt(nlvRequired)}/mes (400% IPREM).`
            )
          : t(
              `You need ${fmt(nlvRequired)}/mo for your family size; gap of ${fmt(nlvRequired - a.monthlyIncome)}/mo.`,
              `Necesitas ${fmt(nlvRequired)}/mes para tu unidad familiar; faltan ${fmt(nlvRequired - a.monthlyIncome)}/mes.`
            ),
        ...(abroadOk
          ? []
          : [t("Must be applied for at the consulate in your country of residence — not from inside Spain.", "Debe solicitarse en el consulado de tu país de residencia — no desde España.")]),
      ],
      requirements: [
        t("No work of any kind — including remote work; enforcement tightened in 2025–26.", "Prohibido trabajar — incluido el teletrabajo; el control se endureció en 2025–26."),
        t("Funds must be liquid and traceable; consulates vary on rental/investment income.", "Los fondos deben ser líquidos y trazables; los consulados varían sobre rentas de alquiler/inversión."),
        t("Full private health insurance without copays + medical certificate.", "Seguro médico privado sin copagos + certificado médico."),
      ],
      timeline: t("2–4 months at the consulate; 1-year permit, 4-year renewal.", "2–4 meses en el consulado; permiso de 1 año, renovación de 4 años."),
      cite: "RD 1155/2024; 400% IPREM",
    });
  }

  // --- Arraigo family ----------------------------------------------------------
  if (a.location === "spain_irregular") {
    if (a.priorPermit) {
      results.push({
        id: "arraigo_segunda",
        fit: "strong",
        name: t("Arraigo — second chance", "Arraigo de segunda oportunidad"),
        summary: t(
          "New 2025 route for people whose permit lapsed within the last 2 years — no new job contract required.",
          "Nueva vía de 2025 para quienes perdieron su permiso en los últimos 2 años — sin necesidad de nuevo contrato."
        ),
        reasons: [t("You held a permit that expired within the last 2 years.", "Tuviste un permiso caducado en los últimos 2 años.")],
        requirements: [
          t("Evidence of the prior permit and continued presence in Spain.", "Prueba del permiso anterior y de la permanencia en España."),
          t("Clean criminal record.", "Antecedentes penales limpios."),
        ],
        timeline: t("~3 months (offices are saturated post-2026 regularisation).", "~3 meses (oficinas saturadas tras la regularización de 2026)."),
        cite: "RD 1155/2024, arraigo de segunda oportunidad; Instrucciones SEM 1/2025",
      });
    }
    if (a.yearsInSpain === "gte2") {
      if (a.work === "job_offer") {
        results.push({
          id: "arraigo_sociolaboral",
          fit: "strong",
          name: t("Arraigo sociolaboral", "Arraigo sociolaboral"),
          summary: t(
            "Regularisation through a job offer after 2 years in Spain — contract(s) of at least 20h/week at legal pay.",
            "Regularización mediante oferta de empleo tras 2 años en España — contrato(s) de al menos 20h/semana con salario legal."
          ),
          reasons: [
            t("2+ years in Spain and a job offer in hand.", "Más de 2 años en España y una oferta de empleo."),
          ],
          requirements: [
            t("Proof of 2 years' continuous presence (absences under 90 days).", "Prueba de 2 años de permanencia continuada (ausencias menores de 90 días)."),
            t("Contract ≥20h/week at SMI-proportional or collective-agreement pay.", "Contrato ≥20h/semana con salario proporcional al SMI o al convenio."),
          ],
          timeline: t("~3 months; 1-year permit with full work rights.", "~3 meses; permiso de 1 año con pleno derecho a trabajar."),
          cite: "RD 1155/2024, arraigo sociolaboral",
        });
      }
      results.push({
        id: "arraigo_social",
        fit: a.work === "job_offer" ? "possible" : "strong",
        name: t("Arraigo social", "Arraigo social"),
        summary: t(
          "The workhorse regularisation route: 2 years in Spain plus family ties to legal residents or a social-integration report — no job contract needed since 2025.",
          "La vía de regularización más usada: 2 años en España más vínculos familiares con residentes legales o informe de integración social — sin contrato desde 2025."
        ),
        reasons: [
          t("2+ years of continuous residence reported.", "Indicas más de 2 años de residencia continuada."),
          a.family === "resident"
            ? t("Family ties to legal residents strengthen this route.", "Tus vínculos familiares con residentes legales refuerzan esta vía.")
            : t("Without family ties you'll need the municipal integration report.", "Sin vínculos familiares necesitarás el informe municipal de integración."),
        ],
        requirements: [
          t(`Means of ${fmt(T.ARRAIGO_OWN)}/mo own funds (100% IPREM) or family support at 200%.`, `Medios de ${fmt(T.ARRAIGO_OWN)}/mes propios (100% IPREM) o apoyo familiar al 200%.`),
          t("Presence evidence mosaic: padrón, medical visits, remittances, school records…", "Mosaico de pruebas de permanencia: padrón, visitas médicas, remesas, matrículas…"),
        ],
        timeline: t("~3 months; 1-year permit with work rights.", "~3 meses; permiso de 1 año con derecho a trabajar."),
        cite: "RD 1155/2024, arraigo social; Instrucciones SEM 1/2025",
      });
      if (a.work === "study") {
        results.push({
          id: "arraigo_socioformativo",
          fit: "strong",
          name: t("Arraigo socioformativo", "Arraigo socioformativo"),
          summary: t(
            "Regularise by committing to accredited training — and work up to 30h/week while you study.",
            "Regularízate comprometiéndote a una formación reglada — y trabaja hasta 30h/semana mientras estudias."
          ),
          reasons: [t("2+ years in Spain and intent to study.", "Más de 2 años en España e intención de estudiar.")],
          requirements: [
            t("Enrolment or commitment to enrol in regulated training.", "Matrícula o compromiso de matrícula en formación reglada."),
            t("Proof of 2 years' continuous presence.", "Prueba de 2 años de permanencia continuada."),
          ],
          timeline: t("~3 months; renewable while training continues.", "~3 meses; renovable mientras continúe la formación."),
          cite: "RD 1155/2024, arraigo socioformativo",
        });
      }
    } else if (a.yearsInSpain === "lt2" && !a.priorPermit) {
      results.push({
        id: "arraigo_wait",
        fit: "not_yet",
        name: t("Arraigo (from 2 years of presence)", "Arraigo (a partir de 2 años de permanencia)"),
        summary: t(
          "The 2025 reform cut the residence requirement from 3 years to 2. Until then, document your presence relentlessly — every padrón entry, medical visit and receipt counts later.",
          "La reforma de 2025 redujo el requisito de 3 años a 2. Mientras tanto, documenta tu permanencia sin descanso — cada padrón, visita médica y recibo contará después."
        ),
        reasons: [t("Under 2 years of continuous presence so far.", "Menos de 2 años de permanencia continuada por ahora.")],
        requirements: [
          t("Register on the padrón immediately if you haven't.", "Empadrónate ya si no lo has hecho."),
          t("Build the evidence file monthly — Luma's presence tracker automates this.", "Construye el expediente de pruebas mes a mes — el rastreador de permanencia de Luma lo automatiza."),
        ],
        timeline: t("Eligible once you reach 2 years.", "Elegible al cumplir 2 años."),
        cite: "RD 1155/2024, requisito de permanencia de 2 años",
      });
    }
  }

  // --- Student -----------------------------------------------------------------
  if (a.work === "study" && a.location !== "spain_irregular") {
    results.push({
      id: "student",
      fit: "strong",
      name: t("Student stay (estancia por estudios)", "Estancia por estudios"),
      summary: t(
        "Study in Spain with work rights of up to 30h/week — but only for higher-education programmes. Language schools no longer open a path to work permits.",
        "Estudia en España con derecho a trabajar hasta 30h/semana — pero solo en enseñanza superior. Las escuelas de idiomas ya no abren camino al permiso de trabajo."
      ),
      reasons: [t("You plan to study in Spain.", "Planeas estudiar en España.")],
      requirements: [
        t("Admission to an accredited programme; means ~100% IPREM; insurance.", "Admisión en un programa acreditado; medios ~100% IPREM; seguro."),
        t("Choose higher education if you want work rights and a route to a work permit — critical post-2025 distinction.", "Elige enseñanza superior si quieres derechos laborales y una vía al permiso de trabajo — distinción crítica tras 2025."),
      ],
      timeline: t("1–3 months; can be applied for from inside Spain if legally present.", "1–3 meses; puede solicitarse desde España si estás en situación legal."),
      cite: "RD 1155/2024, estancia por estudios",
    });
  }

  // --- Highly qualified / regular work ------------------------------------------
  if (a.work === "job_offer" && a.location !== "spain_irregular") {
    const hqpMonthly = Math.round(T.HQP_ANNUAL / 12);
    const meetsHqp = a.monthlyIncome >= hqpMonthly;
    results.push({
      id: "hqp",
      fit: meetsHqp ? "strong" : "possible",
      name: t("Highly Qualified Professional / EU Blue Card", "Profesional altamente cualificado / Tarjeta azul UE"),
      summary: t(
        "Spain's fastest lane: decided in 20 working days with positive silence, 3-year permit, family with full work rights.",
        "La vía más rápida de España: resuelta en 20 días hábiles con silencio positivo, permiso de 3 años, familia con pleno derecho a trabajar."
      ),
      reasons: [
        meetsHqp
          ? t(`Your salary clears the ~${fmt(hqpMonthly)}/mo (${fmt(T.HQP_ANNUAL)}/yr) threshold.`, `Tu salario supera el umbral de ~${fmt(hqpMonthly)}/mes (${fmt(T.HQP_ANNUAL)}/año).`)
          : t(
              `The HQP threshold is ~${fmt(hqpMonthly)}/mo; below it, the ordinary work permit route applies (employer must usually pass the labour-market test).`,
              `El umbral es ~${fmt(hqpMonthly)}/mes; por debajo aplica el permiso ordinario de trabajo (el empleador suele pasar por la situación nacional de empleo).`
            ),
      ],
      requirements: [
        t("Graduate-level role (or higher vocational / 5 years' experience).", "Puesto de nivel universitario (o FP superior / 5 años de experiencia)."),
        t("Employer files through the UGE — largely their process, your documents.", "El empleador tramita ante la UGE — el proceso es suyo, los documentos tuyos."),
      ],
      timeline: t("20 working days, positive silence (UGE).", "20 días hábiles, silencio positivo (UGE)."),
      cite: "Ley 14/2013 (mod. Ley 11/2023); umbral 2026 €41.356",
    });
  }

  // Order: strong → possible → not_yet, stable within group
  const rank: Record<Fit, number> = { strong: 0, possible: 1, not_yet: 2 };
  results.sort((x, y) => rank[x.fit] - rank[y.fit]);
  return results;
}
