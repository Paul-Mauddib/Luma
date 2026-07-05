export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export function isLocale(v: string): v is Locale {
  return locales.includes(v as Locale);
}

const en = {
  nav: {
    how: "How it works",
    pathways: "Pathways",
    pricing: "Pricing",
    privacy: "Privacy",
    faq: "FAQ",
    cta: "Check my eligibility",
  },
  hero: {
    eyebrow: "Spanish residency, self-serve",
    title: "Your Spanish residency, without the maze.",
    sub: "Luma guides you from “which visa?” to a complete, validated application — the right documents, translated, apostilled and ready to file. Built for people doing it themselves, supervised by colegiado professionals.",
    ctaPrimary: "Check my eligibility — free",
    ctaSecondary: "See how it works",
    stats: [
      { value: "1.4M+", label: "residence documents issued in Spain per year" },
      { value: "€38", label: "what the government actually charges" },
      { value: "€2,000+", label: "what law firms charge for the same forms" },
    ],
  },
  how: {
    title: "From confusion to a filed application",
    steps: [
      {
        title: "1 · Find your pathway",
        body: "Answer a few questions. Our rules engine — built from the official regulations, not guesswork — ranks every route you qualify for, with real income thresholds and timelines.",
      },
      {
        title: "2 · Get your exact checklist",
        body: "Every document for your consulate or province, with validity windows planned backwards from your submission date — so your criminal record certificate doesn’t expire while you wait for an apostille.",
      },
      {
        title: "3 · Upload, we validate",
        body: "Luma reads each document and checks it like a case officer would: dates, apostilles, income evidence, insurance clauses. Every problem comes with a plain-language fix.",
      },
      {
        title: "4 · File with confidence",
        body: "Auto-filled official forms and fee slips, sworn translations coordinated, and step-by-step filing guidance. You file in your own name — or a colegiado from our network reviews, signs and submits for you.",
      },
    ],
  },
  pathways: {
    title: "Every major route, covered",
    sub: "Launching with the pathways that matter most — more added continuously.",
    items: [
      {
        name: "Digital Nomad Visa",
        tag: "Remote workers",
        desc: "Work remotely from Spain for a foreign employer or your own clients. €2,762/month minimum income, 3-year permit available in-country.",
      },
      {
        name: "Non-Lucrative Visa",
        tag: "Retirees & savers",
        desc: "Live in Spain on passive income or savings. €28,800/year plus €7,200 per dependent. Applied at your consulate.",
      },
      {
        name: "Arraigo (all 5 types)",
        tag: "Already in Spain",
        desc: "Regularise after 2 years in Spain — social, work, training, family and second-chance routes under the 2025 rules.",
      },
      {
        name: "Family of Spanish / EU citizens",
        tag: "Families",
        desc: "The new 5-year permit for family of Spanish citizens, and the EU family card — the fastest, most protected routes.",
      },
      {
        name: "Students & graduates",
        tag: "Study",
        desc: "Student stays, the 30h/week work rules, and the student-to-work transitions that actually work after the 2025 reform.",
      },
      {
        name: "Skilled work & renewals",
        tag: "Coming next",
        desc: "Highly qualified permits, EU Blue Card, renewals and the road to long-term residency and citizenship.",
      },
    ],
  },
  pricing: {
    title: "A fraction of what a law firm charges",
    sub: "Government fees are €38–104. Legal help shouldn’t cost 50× that.",
    tiers: [
      {
        name: "Free",
        price: "€0",
        desc: "Know where you stand",
        features: ["Eligibility check across all pathways", "Income threshold calculators", "Generic document checklists"],
        highlight: false,
        cta: "Start free",
      },
      {
        name: "Core",
        price: "€199",
        desc: "Your complete dossier",
        features: [
          "Personalised checklist for your consulate or province",
          "Document upload & automated validation",
          "Auto-filled official forms & fee slips",
          "Critical-path timeline planner",
        ],
        highlight: true,
        cta: "Join the waitlist",
      },
      {
        name: "Filed for you",
        price: "€699",
        desc: "A professional signs & submits",
        features: [
          "Everything in Core",
          "Sworn translations coordinated",
          "Reviewed, signed and filed by a colegiado professional",
          "Requests for additional documents handled",
        ],
        highlight: false,
        cta: "Join the waitlist",
      },
    ],
    note: "Prices are launch targets. Sworn translation costs are passed through at cost + coordination.",
  },
  privacy: {
    title: "Your documents are radioactive. We treat them that way.",
    sub: "Passports, criminal records, medical certificates — the most sensitive documents you own. Luma is built so we hold as little as possible, for as short as possible.",
    points: [
      {
        title: "Processed in the EU, full stop",
        body: "Sensitive documents are read by AI models we host ourselves on EU infrastructure — never sent to US-based model providers.",
      },
      {
        title: "Encrypted with your key",
        body: "Your vault is encrypted per-user. Delete your account and the data is cryptographically gone — backups included.",
      },
      {
        title: "Minimum extraction",
        body: "We keep the fields we need — an expiry date, a name match — not copies of your documents, and originals auto-purge after your case closes.",
      },
      {
        title: "You stay in control",
        body: "You file in your own name, from your own session. We never hold your passwords or certificates, and never file as you.",
      },
    ],
  },
  faq: {
    title: "Fair questions",
    items: [
      {
        q: "Is Luma a law firm?",
        a: "No. Luma is software that helps you prepare and file your own application. All guidance content is supervised by a colegiado gestor administrativo, and if you choose the “Filed for you” tier, an independent colegiado professional engages with you directly, reviews your dossier, and files it under their professional licence and insurance.",
      },
      {
        q: "Can software really handle something this bureaucratic?",
        a: "The hard part of most applications isn’t legal argument — it’s logistics: the right documents, valid on the right dates, apostilled and translated correctly, filed in the right place. That’s exactly what software is good at. Genuinely complex cases (refusals, appeals, criminal records) get referred to lawyers — we don’t pretend.",
      },
      {
        q: "What if the rules change?",
        a: "Every requirement in Luma is versioned against the official source (BOE, ministry instructions) with effective dates, and reviewed by our supervising gestor when regulations move — as they did in May 2025.",
      },
      {
        q: "What happens to my documents?",
        a: "They live in an encrypted vault only you control, are processed only on EU infrastructure, and are automatically deleted after your case closes. Read our privacy commitments above — they’re architectural, not just policy.",
      },
      {
        q: "Do you guarantee approval?",
        a: "No one honestly can — decisions belong to the Spanish administration. What we guarantee is a complete, validated, correctly-filed application, which is what the most common rejection reasons come down to.",
      },
    ],
  },
  waitlist: {
    title: "Be first in line",
    sub: "We’re launching with the Digital Nomad and Non-Lucrative visas, then arraigo and family permits. Leave your email and we’ll tell you the moment your pathway opens.",
    placeholder: "you@example.com",
    button: "Join the waitlist",
    success: "You’re on the list. We’ll be in touch soon.",
    privacyNote: "Just your email, nothing else. No spam, ever.",
  },
  footer: {
    disclaimer:
      "Luma is a software platform, not a law firm, and does not provide individualised legal advice. Requirement information is compiled from official sources and reviewed by colegiado professionals; figures current as of July 2026 and subject to regulatory change.",
    rights: "All rights reserved.",
  },
  triage: {
    title: "Which Spanish residency pathway fits you?",
    sub: "Two minutes, no email required. Built on the real 2026 thresholds.",
    back: "Back",
    next: "Next",
    seeResults: "See my pathways",
    restart: "Start over",
    stepLabels: ["Situation", "Family", "Work & income", "Details"],
    q_location: "Where are you right now?",
    location_opts: {
      abroad: { label: "Outside Spain", hint: "Planning the move" },
      spain_legal: { label: "In Spain, legally", hint: "Visa, permit or visa-free stay" },
      spain_irregular: { label: "In Spain, without papers", hint: "Overstayed or never had status" },
    },
    q_years: "How long have you lived in Spain continuously?",
    years_opts: {
      lt2: { label: "Less than 2 years", hint: "" },
      gte2: { label: "2 years or more", hint: "With absences under 90 days total" },
    },
    q_prior: "Did you hold a Spanish residence permit that expired in the last 2 years?",
    prior_opts: { yes: "Yes", no: "No" },
    q_family: "Do you have close family with status in Spain?",
    family_opts: {
      spanish: { label: "Spouse/partner or parent is a Spanish citizen", hint: "" },
      eu: { label: "Close family is an EU citizen living in Spain", hint: "" },
      resident: { label: "Close family legally resides in Spain", hint: "Non-EU residents" },
      none: { label: "None of these", hint: "" },
    },
    q_work: "What best describes your work situation?",
    work_opts: {
      remote_employee: { label: "Employed remotely by a company outside Spain", hint: "≥3 months with them" },
      freelancer: { label: "Freelancer with mostly non-Spanish clients", hint: "" },
      passive: { label: "Living on savings, pension or passive income", hint: "" },
      job_offer: { label: "I have (or expect) a job offer in Spain", hint: "" },
      study: { label: "I want to study in Spain", hint: "" },
      none: { label: "None of these yet", hint: "" },
    },
    q_income: "Your gross monthly income (€)",
    income_hint: "Salary, freelance income, pension or reliable passive income. An estimate is fine.",
    q_dependents: "How many family members would come with you?",
    dependents_hint: "Spouse/partner and children joining your application.",
    q_ibero: "Are you a citizen of an Ibero-American country?",
    ibero_hint: "Latin America, plus Andorra, Philippines, Equatorial Guinea or Portugal.",
    ibero_opts: { yes: "Yes", no: "No" },
    results_title: "Your pathways, ranked",
    results_sub: "Based on your answers and the thresholds in force July 2026. This is guidance, not legal advice — every figure links to its official source in the full product.",
    strong: "Strong fit",
    possible: "Worth exploring",
    not_yet: "Not yet — here’s the gap",
    requirements: "Key requirements",
    timeline: "Typical timeline",
    citizenship_note:
      "Because you’re an Ibero-American citizen, you can apply for Spanish citizenship after just 2 years of legal residence — any of these pathways starts that clock.",
    no_results:
      "No pathway is a clear fit yet — that usually means a work offer, study plan or more income would open doors. The full product maps out what would change your options.",
    cta_title: "Want the full picture?",
    cta_sub: "Join the waitlist and get your personalised document checklist the day we launch your pathway.",
    disclaimerShort:
      "Educational guidance based on official sources, current July 2026. Not individualised legal advice.",
  },
};

const es: typeof en = {
  nav: {
    how: "Cómo funciona",
    pathways: "Vías",
    pricing: "Precios",
    privacy: "Privacidad",
    faq: "Preguntas",
    cta: "Comprobar mi elegibilidad",
  },
  hero: {
    eyebrow: "Tu residencia en España, sin intermediarios",
    title: "Tu residencia en España, sin laberintos.",
    sub: "Luma te guía desde “¿qué vía me corresponde?” hasta una solicitud completa y validada: los documentos correctos, traducidos, apostillados y listos para presentar. Para quienes lo hacen por su cuenta, con supervisión de profesionales colegiados.",
    ctaPrimary: "Comprobar mi elegibilidad — gratis",
    ctaSecondary: "Ver cómo funciona",
    stats: [
      { value: "1,4M+", label: "documentos de residencia emitidos en España al año" },
      { value: "38 €", label: "lo que realmente cobra la administración" },
      { value: "2.000 €+", label: "lo que cobran los despachos por los mismos formularios" },
    ],
  },
  how: {
    title: "De la confusión a la solicitud presentada",
    steps: [
      {
        title: "1 · Encuentra tu vía",
        body: "Responde unas preguntas. Nuestro motor de reglas — construido sobre la normativa oficial, no sobre suposiciones — clasifica todas las vías a las que puedes optar, con umbrales de ingresos y plazos reales.",
      },
      {
        title: "2 · Recibe tu checklist exacta",
        body: "Cada documento para tu consulado o provincia, con ventanas de validez planificadas hacia atrás desde la fecha de presentación — para que tus antecedentes penales no caduquen mientras esperas la apostilla.",
      },
      {
        title: "3 · Sube, nosotros validamos",
        body: "Luma lee cada documento y lo revisa como lo haría un funcionario: fechas, apostillas, justificantes de ingresos, cláusulas del seguro. Cada problema viene con una solución en lenguaje claro.",
      },
      {
        title: "4 · Presenta con confianza",
        body: "Formularios oficiales y tasas autorrellenados, traducciones juradas coordinadas y guía paso a paso. Presentas en tu propio nombre — o un colegiado de nuestra red revisa, firma y presenta por ti.",
      },
    ],
  },
  pathways: {
    title: "Todas las vías importantes, cubiertas",
    sub: "Lanzamos con las vías de mayor demanda — y añadimos más continuamente.",
    items: [
      {
        name: "Visado de nómada digital",
        tag: "Teletrabajo",
        desc: "Trabaja en remoto desde España para una empresa extranjera o tus propios clientes. Ingresos mínimos de 2.762 €/mes, permiso de 3 años disponible desde España.",
      },
      {
        name: "Visado no lucrativo",
        tag: "Rentas y ahorros",
        desc: "Vive en España con ingresos pasivos o ahorros. 28.800 €/año más 7.200 € por familiar. Se solicita en tu consulado.",
      },
      {
        name: "Arraigo (los 5 tipos)",
        tag: "Ya en España",
        desc: "Regulariza tu situación tras 2 años en España — arraigo social, sociolaboral, socioformativo, familiar y de segunda oportunidad según el reglamento de 2025.",
      },
      {
        name: "Familiares de españoles / ciudadanos UE",
        tag: "Familias",
        desc: "La nueva tarjeta de 5 años para familiares de españoles y la tarjeta comunitaria — las vías más rápidas y protegidas.",
      },
      {
        name: "Estudiantes y graduados",
        tag: "Estudios",
        desc: "Estancias por estudios, la regla de 30h/semana de trabajo y las transiciones de estudios a trabajo que de verdad funcionan tras la reforma de 2025.",
      },
      {
        name: "Trabajo cualificado y renovaciones",
        tag: "Próximamente",
        desc: "Profesionales altamente cualificados, tarjeta azul UE, renovaciones y el camino a la larga duración y la nacionalidad.",
      },
    ],
  },
  pricing: {
    title: "Una fracción de lo que cobra un despacho",
    sub: "Las tasas oficiales son de 38–104 €. La ayuda legal no debería costar 50 veces más.",
    tiers: [
      {
        name: "Gratis",
        price: "0 €",
        desc: "Sabe dónde estás",
        features: ["Comprobación de elegibilidad en todas las vías", "Calculadoras de umbrales de ingresos", "Checklists genéricas de documentos"],
        highlight: false,
        cta: "Empezar gratis",
      },
      {
        name: "Core",
        price: "199 €",
        desc: "Tu expediente completo",
        features: [
          "Checklist personalizada para tu consulado o provincia",
          "Subida de documentos y validación automática",
          "Formularios oficiales y tasas autorrellenados",
          "Planificador de plazos con ruta crítica",
        ],
        highlight: true,
        cta: "Unirme a la lista",
      },
      {
        name: "Presentado por ti",
        price: "699 €",
        desc: "Un profesional firma y presenta",
        features: [
          "Todo lo de Core",
          "Traducciones juradas coordinadas",
          "Revisado, firmado y presentado por un profesional colegiado",
          "Requerimientos de documentación gestionados",
        ],
        highlight: false,
        cta: "Unirme a la lista",
      },
    ],
    note: "Precios objetivo de lanzamiento. Las traducciones juradas se repercuten a coste + coordinación.",
  },
  privacy: {
    title: "Tus documentos son radiactivos. Los tratamos como tal.",
    sub: "Pasaportes, antecedentes penales, certificados médicos — los documentos más sensibles que tienes. Luma está construida para guardar lo mínimo posible, el menor tiempo posible.",
    points: [
      {
        title: "Procesado en la UE, punto",
        body: "Tus documentos sensibles los leen modelos de IA alojados por nosotros en infraestructura europea — nunca se envían a proveedores estadounidenses.",
      },
      {
        title: "Cifrado con tu clave",
        body: "Tu caja fuerte se cifra por usuario. Si borras tu cuenta, los datos desaparecen criptográficamente — copias de seguridad incluidas.",
      },
      {
        title: "Extracción mínima",
        body: "Guardamos los campos necesarios — una fecha de caducidad, una coincidencia de nombre — no copias de tus documentos, y los originales se purgan al cerrar tu caso.",
      },
      {
        title: "Tú mantienes el control",
        body: "Presentas en tu propio nombre, desde tu propia sesión. Nunca guardamos tus contraseñas ni certificados, y nunca presentamos haciéndonos pasar por ti.",
      },
    ],
  },
  faq: {
    title: "Preguntas justas",
    items: [
      {
        q: "¿Luma es un despacho de abogados?",
        a: "No. Luma es software que te ayuda a preparar y presentar tu propia solicitud. Todo el contenido está supervisado por un gestor administrativo colegiado, y si eliges “Presentado por ti”, un profesional colegiado independiente te contrata directamente, revisa tu expediente y lo presenta bajo su licencia y su seguro profesional.",
      },
      {
        q: "¿Puede el software con tanta burocracia?",
        a: "Lo difícil de la mayoría de solicitudes no es argumentación jurídica, es logística: los documentos correctos, válidos en las fechas correctas, apostillados y traducidos bien, presentados donde toca. Justo lo que el software hace bien. Los casos realmente complejos (denegaciones, recursos, antecedentes) se derivan a abogados — no fingimos.",
      },
      {
        q: "¿Y si cambia la normativa?",
        a: "Cada requisito en Luma está versionado contra su fuente oficial (BOE, instrucciones ministeriales) con fechas de vigencia, y lo revisa nuestro gestor supervisor cuando la normativa cambia — como ocurrió en mayo de 2025.",
      },
      {
        q: "¿Qué pasa con mis documentos?",
        a: "Viven en una caja fuerte cifrada que solo tú controlas, se procesan únicamente en infraestructura europea y se eliminan automáticamente al cerrar tu caso. Nuestros compromisos de privacidad son de arquitectura, no solo de política.",
      },
      {
        q: "¿Garantizáis la aprobación?",
        a: "Nadie puede garantizarla honestamente — la decisión es de la administración. Lo que garantizamos es una solicitud completa, validada y bien presentada, que es justo donde caen los motivos más comunes de denegación.",
      },
    ],
  },
  waitlist: {
    title: "Sé de los primeros",
    sub: "Lanzamos con el visado de nómada digital y el no lucrativo; después arraigo y familiares. Déjanos tu email y te avisamos en cuanto abra tu vía.",
    placeholder: "tu@ejemplo.com",
    button: "Unirme a la lista",
    success: "Estás en la lista. Te escribiremos pronto.",
    privacyNote: "Solo tu email, nada más. Sin spam, nunca.",
  },
  footer: {
    disclaimer:
      "Luma es una plataforma de software, no un despacho de abogados, y no presta asesoramiento jurídico individualizado. La información de requisitos se compila de fuentes oficiales y la revisan profesionales colegiados; cifras vigentes a julio de 2026 y sujetas a cambios normativos.",
    rights: "Todos los derechos reservados.",
  },
  triage: {
    title: "¿Qué vía de residencia en España encaja contigo?",
    sub: "Dos minutos, sin email. Basado en los umbrales reales de 2026.",
    back: "Atrás",
    next: "Siguiente",
    seeResults: "Ver mis vías",
    restart: "Empezar de nuevo",
    stepLabels: ["Situación", "Familia", "Trabajo e ingresos", "Detalles"],
    q_location: "¿Dónde estás ahora mismo?",
    location_opts: {
      abroad: { label: "Fuera de España", hint: "Planificando el traslado" },
      spain_legal: { label: "En España, legalmente", hint: "Visado, permiso o estancia sin visado" },
      spain_irregular: { label: "En España, sin papeles", hint: "Estancia vencida o sin estatus" },
    },
    q_years: "¿Cuánto llevas viviendo en España de forma continuada?",
    years_opts: {
      lt2: { label: "Menos de 2 años", hint: "" },
      gte2: { label: "2 años o más", hint: "Con ausencias totales inferiores a 90 días" },
    },
    q_prior: "¿Tuviste un permiso de residencia español que caducó en los últimos 2 años?",
    prior_opts: { yes: "Sí", no: "No" },
    q_family: "¿Tienes familia cercana con estatus en España?",
    family_opts: {
      spanish: { label: "Mi cónyuge/pareja o progenitor es español", hint: "" },
      eu: { label: "Familia cercana ciudadana de la UE residiendo en España", hint: "" },
      resident: { label: "Familia cercana con residencia legal en España", hint: "Residentes no comunitarios" },
      none: { label: "Ninguna de estas", hint: "" },
    },
    q_work: "¿Qué describe mejor tu situación laboral?",
    work_opts: {
      remote_employee: { label: "Empleado en remoto por una empresa fuera de España", hint: "≥3 meses con ella" },
      freelancer: { label: "Freelance con clientes mayoritariamente fuera de España", hint: "" },
      passive: { label: "Vivo de ahorros, pensión o ingresos pasivos", hint: "" },
      job_offer: { label: "Tengo (o espero) una oferta de trabajo en España", hint: "" },
      study: { label: "Quiero estudiar en España", hint: "" },
      none: { label: "Ninguna de estas todavía", hint: "" },
    },
    q_income: "Tus ingresos brutos mensuales (€)",
    income_hint: "Salario, ingresos freelance, pensión o ingresos pasivos estables. Vale una estimación.",
    q_dependents: "¿Cuántos familiares vendrían contigo?",
    dependents_hint: "Cónyuge/pareja e hijos incluidos en tu solicitud.",
    q_ibero: "¿Eres ciudadano de un país iberoamericano?",
    ibero_hint: "América Latina, más Andorra, Filipinas, Guinea Ecuatorial o Portugal.",
    ibero_opts: { yes: "Sí", no: "No" },
    results_title: "Tus vías, ordenadas",
    results_sub: "Según tus respuestas y los umbrales vigentes en julio de 2026. Es orientación, no asesoramiento jurídico — en el producto completo cada cifra enlaza a su fuente oficial.",
    strong: "Encaje fuerte",
    possible: "Merece explorarse",
    not_yet: "Todavía no — esta es la distancia",
    requirements: "Requisitos clave",
    timeline: "Plazo típico",
    citizenship_note:
      "Al ser ciudadano iberoamericano, puedes solicitar la nacionalidad española tras solo 2 años de residencia legal — cualquiera de estas vías pone en marcha ese reloj.",
    no_results:
      "Ninguna vía encaja claramente todavía — suele significar que una oferta de trabajo, un plan de estudios o más ingresos abrirían puertas. El producto completo te muestra qué cambiaría tus opciones.",
    cta_title: "¿Quieres el mapa completo?",
    cta_sub: "Únete a la lista y recibe tu checklist personalizada el día que lancemos tu vía.",
    disclaimerShort:
      "Orientación educativa basada en fuentes oficiales, vigente a julio de 2026. No es asesoramiento jurídico individualizado.",
  },
};

export const dictionaries: Record<Locale, typeof en> = { en, es };

export type Dict = typeof en;
