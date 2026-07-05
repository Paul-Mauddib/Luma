// ---------------------------------------------------------------------------
// Luma dossier checklists — regulation-as-code, v2026-07
// Each requirement cites its basis and carries logistics metadata the
// planner uses (validity windows, apostille/translation flags).
// Supervised content: changes require colegiado sign-off before release.
// ---------------------------------------------------------------------------

export interface L10n {
  en: string;
  es: string;
}

export interface Requirement {
  id: string;
  name: L10n;
  why: L10n;
  apostille?: boolean;
  swornTranslation?: boolean;
  validityDays?: number; // must be younger than this at submission
  perDependent?: boolean;
  cite: string;
}

export interface Checklist {
  pathwayId: string;
  name: L10n;
  form: string;
  fee: string;
  requirements: Requirement[];
}

const t = (en: string, es: string): L10n => ({ en, es });

export const CHECKLIST_VERSION = "2026-07";

export const checklists: Record<string, Checklist> = {
  dnv: {
    pathwayId: "dnv",
    name: t("Digital Nomad Visa (in-Spain application)", "Visado de nómada digital (solicitud desde España)"),
    form: "MI-T",
    fee: "Modelo 790 código 038 — €73.26",
    requirements: [
      {
        id: "passport",
        name: t("Passport — full copy, valid ≥1 year", "Pasaporte — copia completa, validez ≥1 año"),
        why: t("Identity for the entire application; must not expire during processing.", "Identidad para toda la solicitud; no debe caducar durante el trámite."),
        cite: "Ley 14/2013 art. 61",
      },
      {
        id: "criminal_record",
        name: t("Criminal record certificate — every country of residence, last 2 years", "Certificado de antecedentes penales — países de residencia de los últimos 2 años"),
        why: t("Proves a clean record; the slowest document for most applicants — order it first.", "Acredita ausencia de antecedentes; el documento más lento para la mayoría — pídelo primero."),
        apostille: true,
        swornTranslation: true,
        validityDays: 90,
        cite: "Ley 14/2013; práctica consular 90 días",
      },
      {
        id: "work_relationship",
        name: t("Employment contract or client contracts (≥3 months' relationship)", "Contrato de trabajo o contratos con clientes (relación ≥3 meses)"),
        why: t("Shows the remote relationship predates the application by at least 3 months.", "Demuestra que la relación en remoto es anterior a la solicitud en al menos 3 meses."),
        swornTranslation: true,
        cite: "Ley 28/2022 art. 74 bis",
      },
      {
        id: "employer_letter",
        name: t("Employer letter authorising remote work from Spain", "Carta de la empresa autorizando el teletrabajo desde España"),
        why: t("Must state your role, salary, and explicit permission to work from Spain.", "Debe indicar puesto, salario y permiso expreso para trabajar desde España."),
        swornTranslation: true,
        cite: "UGE criterios",
      },
      {
        id: "company_registration",
        name: t("Company registration certificate (company ≥1 year old)", "Certificado de registro mercantil de la empresa (antigüedad ≥1 año)"),
        why: t("Proves the employer/client company genuinely exists and has operated ≥1 year.", "Acredita que la empresa existe realmente y opera desde hace ≥1 año."),
        apostille: true,
        swornTranslation: true,
        cite: "UGE criterios",
      },
      {
        id: "income_proof",
        name: t("Income evidence — payslips or invoices + bank statements, 3–6 months", "Prueba de ingresos — nóminas o facturas + extractos bancarios, 3–6 meses"),
        why: t("Must show ≥€2,762/month (200% SMI), plus increments per family member.", "Debe acreditar ≥2.762 €/mes (200% SMI), más incrementos por familiar."),
        cite: "Ley 28/2022; 200% SMI",
      },
      {
        id: "social_security",
        name: t("Social security coverage certificate (or autónomo commitment)", "Certificado de cobertura de seguridad social (o compromiso de alta como autónomo)"),
        why: t("The #1 timeline killer for US applicants — the SSA certificate can take months.", "El mayor cuello de botella para estadounidenses — el certificado de la SSA puede tardar meses."),
        cite: "Convenios bilaterales SS; UGE criterios",
      },
      {
        id: "qualification",
        name: t("University degree or proof of 3+ years' experience", "Título universitario o prueba de 3+ años de experiencia"),
        why: t("Either qualifies; officials increasingly ask for documentary proof of the experience route.", "Cualquiera de los dos vale; cada vez se exige más prueba documental de la vía de experiencia."),
        apostille: true,
        swornTranslation: true,
        cite: "Ley 14/2013 art. 71",
      },
      {
        id: "health_insurance",
        name: t("Spanish-authorised health insurance, no copays", "Seguro médico autorizado en España, sin copagos"),
        why: t("Copay policies are a top denial reason — the policy certificate must say 'sin copagos'.", "Las pólizas con copago son un motivo principal de denegación — el certificado debe decir 'sin copagos'."),
        cite: "UGE criterios 2026",
      },
      {
        id: "photos",
        name: t("Recent passport photos, white background", "Fotos recientes tamaño carné, fondo blanco"),
        why: t("Needed for the application and later for your TIE card.", "Necesarias para la solicitud y después para la TIE."),
        cite: "Formulario MI-T",
      },
    ],
  },
  nlv: {
    pathwayId: "nlv",
    name: t("Non-Lucrative Visa (consular application)", "Visado no lucrativo (solicitud consular)"),
    form: "EX-01 + national visa form",
    fee: "Modelo 790 código 052 + consular fee",
    requirements: [
      {
        id: "passport",
        name: t("Passport — valid ≥1 year, 2 blank pages", "Pasaporte — validez ≥1 año, 2 páginas en blanco"),
        why: t("Required by every consulate; check expiry against your target date.", "Lo exige todo consulado; revisa la caducidad frente a tu fecha objetivo."),
        cite: "RD 1155/2024",
      },
      {
        id: "means_proof",
        name: t("Proof of means — €28,800/year + €7,200 per dependent (400% IPREM)", "Prueba de medios — 28.800 €/año + 7.200 € por familiar (400% IPREM)"),
        why: t("Funds must be liquid and traceable; salary-like deposits are a denial trigger — no work allowed.", "Los fondos deben ser líquidos y trazables; ingresos tipo nómina provocan denegaciones — no se permite trabajar."),
        cite: "RD 1155/2024; 400% IPREM",
      },
      {
        id: "health_insurance",
        name: t("Private health insurance, Spanish insurer, no copays", "Seguro médico privado, aseguradora española, sin copagos"),
        why: t("Travel insurance is not accepted; the certificate must show full coverage without copays.", "No se acepta seguro de viaje; el certificado debe mostrar cobertura completa sin copagos."),
        cite: "Práctica consular",
      },
      {
        id: "medical_certificate",
        name: t("Medical certificate (2005 IHR wording)", "Certificado médico (redacción RSI 2005)"),
        why: t("Must use the exact International Health Regulations wording; valid ~3 months — order late.", "Debe usar la redacción exacta del Reglamento Sanitario Internacional; validez ~3 meses — pídelo al final."),
        validityDays: 90,
        swornTranslation: true,
        cite: "Práctica consular; RSI 2005",
      },
      {
        id: "criminal_record",
        name: t("Criminal record certificate — countries of residence, last 5 years", "Certificado de antecedentes penales — países de residencia de los últimos 5 años"),
        why: t("Apostilled and sworn-translated; ~90-day validity makes sequencing critical.", "Apostillado y con traducción jurada; su validez de ~90 días hace crítica la secuencia."),
        apostille: true,
        swornTranslation: true,
        validityDays: 90,
        cite: "RD 1155/2024; práctica consular",
      },
      {
        id: "family_docs",
        name: t("Marriage / birth certificates for accompanying family", "Certificados de matrimonio / nacimiento de familiares acompañantes"),
        why: t("Each family member's link to you must be proven with a legalised, translated certificate.", "El vínculo de cada familiar debe probarse con certificado legalizado y traducido."),
        apostille: true,
        swornTranslation: true,
        perDependent: true,
        cite: "RD 1155/2024",
      },
      {
        id: "photos",
        name: t("Recent passport photos, white background", "Fotos recientes tamaño carné, fondo blanco"),
        why: t("Consulates are strict about photo age and format.", "Los consulados son estrictos con la antigüedad y el formato."),
        cite: "Formulario visado nacional",
      },
    ],
  },
};

export function getChecklist(pathwayId: string): Checklist | null {
  return checklists[pathwayId] ?? null;
}

export const supportedDossierPathways = Object.keys(checklists);
