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
    cta: "Find my visa",
  },
  hero: {
    eyebrow: "Supervised by colegiado professionals",
    title: "Spanish residency in days, not months.",
    sub: "One clear step at a time: find your pathway, follow your checklist, file a validated application. No guesswork, no €3,000 legal bill.",
    ctaPrimary: "See which visas I qualify for",
    ctaFine: "Free · 2 minutes · no email needed",
    journey: {
      label: "Your journey with Luma",
      stages: ["Day 1 · pathway + checklist", "Days 2–5 · documents validated", "Ready to file"],
      speedBefore: "Typical DIY preparation:",
      speedOld: "2–4 months",
      speedNew: "days, once your documents are in hand",
    },
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
        body: "Every document for your consulate or province, with validity windows planned backwards from your submission date — so your criminal record certificate doesn’t expire while you wait for an apostille. Every checklist is maintained under colegiado supervision.",
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
          "Personalised checklist for your consulate or province, maintained under colegiado supervision",
          "Encrypted document vault — your files never leave EU servers, and only you hold the key",
          "Every upload validated like a case officer would: dates, apostilles, income evidence, insurance clauses",
          "Auto-filled official forms & fee slips, with a critical-path timeline planner",
          "Originals auto-deleted after your case closes",
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
          "Sworn translations coordinated — documents shared via expiring, access-controlled links, never email",
          "Reviewed, signed and filed by a colegiado professional under their licence and indemnity insurance",
          "Requests for additional documents (requerimientos) handled",
        ],
        highlight: false,
        cta: "Join the waitlist",
      },
    ],
    included: {
      title: "Every plan includes",
      items: [
        "EU-only processing — documents are read by open-source AI models we host ourselves",
        "Battle-tested open-source encryption, per-user keys",
        "Guidance supervised by colegiado professionals",
        "Delete everything, any time — cryptographically, backups included",
      ],
    },
    note: "Prices are launch targets. Sworn translation costs are passed through at cost + coordination.",
  },
  privacy: {
    kicker: "Privacy is the product",
    title: "Passports. Criminal records. Medical certificates. We built the infrastructure they deserve.",
    sub: "Most immigration help means emailing your passport to a stranger's inbox. Luma is engineered so the most sensitive documents you own are held as little as possible, as briefly as possible — on infrastructure you can verify.",
    points: [
      {
        title: "EU infrastructure only",
        body: "Your documents are processed exclusively on servers in the European Union, read by open-source AI models we run ourselves — never routed through US model providers.",
      },
      {
        title: "Battle-tested encryption",
        body: "Your vault uses the same proven, open-source cryptography that protects banks — encrypted per-user, so deleting your account cryptographically destroys your data, backups included.",
      },
      {
        title: "Open, inspectable architecture",
        body: "No black boxes: we build on proven open-source components and publish our privacy architecture and full subprocessor list for anyone — including your lawyer — to inspect.",
      },
      {
        title: "We keep almost nothing",
        body: "We extract the fields we need — an expiry date, a name match — not copies of your documents. Originals auto-purge after your case closes, and we never hold your passwords or certificates.",
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
    title: "Which visa do you qualify for?",
    sub: "Two minutes, no email required. Built on the real 2026 thresholds, supervised by colegiado professionals.",
    back: "Back",
    next: "Next",
    seeResults: "See my pathways",
    restart: "Start over",
    stepLabels: ["Situation", "Family", "Work & income", "Details"],
    stepEncourage: ["", "Nice start", "Halfway there", "Almost done"],
    timeLeft: ["~2 min left", "~1 min left", "~1 min left", "Last step"],
    privacyLine: "Nothing is stored until you create an account. No email needed for results.",
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
    results_title: "Your visa options, ranked",
    results_sub: "Based on your answers and the thresholds in force July 2026. This is guidance, not legal advice — every figure links to its official source in the full product.",
    supervisedNote: "Eligibility rules maintained and signed off by a colegiado gestor administrativo.",
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
    cta: "Encontrar mi visado",
  },
  hero: {
    eyebrow: "Con supervisión de profesionales colegiados",
    title: "Tu residencia en España en días, no en meses.",
    sub: "Un paso claro cada vez: encuentra tu vía, sigue tu checklist y presenta una solicitud validada. Sin conjeturas y sin facturas de 3.000 €.",
    ctaPrimary: "Ver qué visados puedo pedir",
    ctaFine: "Gratis · 2 minutos · sin email",
    journey: {
      label: "Tu camino con Luma",
      stages: ["Día 1 · vía + checklist", "Días 2–5 · documentos validados", "Lista para presentar"],
      speedBefore: "Preparación típica por tu cuenta:",
      speedOld: "2–4 meses",
      speedNew: "días, con tus documentos en mano",
    },
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
        body: "Cada documento para tu consulado o provincia, con ventanas de validez planificadas hacia atrás desde la fecha de presentación — para que tus antecedentes penales no caduquen mientras esperas la apostilla. Cada checklist se mantiene bajo supervisión colegiada.",
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
          "Checklist personalizada para tu consulado o provincia, mantenida bajo supervisión colegiada",
          "Caja fuerte cifrada — tus archivos nunca salen de servidores europeos y solo tú tienes la clave",
          "Cada documento validado como lo haría un funcionario: fechas, apostillas, ingresos, cláusulas del seguro",
          "Formularios oficiales y tasas autorrellenados, con planificador de plazos de ruta crítica",
          "Los originales se eliminan automáticamente al cerrar tu caso",
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
          "Traducciones juradas coordinadas — documentos compartidos con enlaces caducables y controlados, nunca por email",
          "Revisado, firmado y presentado por un profesional colegiado, bajo su licencia y su seguro de responsabilidad",
          "Requerimientos de documentación gestionados",
        ],
        highlight: false,
        cta: "Unirme a la lista",
      },
    ],
    included: {
      title: "Todos los planes incluyen",
      items: [
        "Procesamiento solo en la UE — modelos de IA de código abierto operados por nosotros",
        "Cifrado de código abierto probado en batalla, con claves por usuario",
        "Orientación supervisada por profesionales colegiados",
        "Borra todo, cuando quieras — criptográficamente, copias incluidas",
      ],
    },
    note: "Precios objetivo de lanzamiento. Las traducciones juradas se repercuten a coste + coordinación.",
  },
  privacy: {
    kicker: "La privacidad es el producto",
    title: "Pasaportes. Antecedentes penales. Certificados médicos. Construimos la infraestructura que merecen.",
    sub: "La mayoría de la ayuda migratoria consiste en enviar tu pasaporte al correo de un desconocido. Luma está diseñada para que los documentos más sensibles que tienes se guarden lo mínimo posible, el menor tiempo posible — en infraestructura verificable.",
    points: [
      {
        title: "Solo infraestructura europea",
        body: "Tus documentos se procesan exclusivamente en servidores de la Unión Europea, leídos por modelos de IA de código abierto que operamos nosotros — nunca pasan por proveedores estadounidenses.",
      },
      {
        title: "Cifrado probado en batalla",
        body: "Tu caja fuerte usa la misma criptografía de código abierto que protege a los bancos — cifrada por usuario, de modo que borrar tu cuenta destruye criptográficamente tus datos, copias de seguridad incluidas.",
      },
      {
        title: "Arquitectura abierta e inspeccionable",
        body: "Sin cajas negras: construimos sobre componentes de código abierto contrastados y publicamos nuestra arquitectura de privacidad y la lista completa de subencargados para que cualquiera — incluido tu abogado — pueda inspeccionarla.",
      },
      {
        title: "No guardamos casi nada",
        body: "Extraemos los campos necesarios — una fecha de caducidad, una coincidencia de nombre — no copias de tus documentos. Los originales se purgan al cerrar tu caso, y nunca guardamos tus contraseñas ni certificados.",
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
    title: "¿Qué visado te corresponde?",
    sub: "Dos minutos, sin email. Basado en los umbrales reales de 2026, con supervisión de profesionales colegiados.",
    back: "Atrás",
    next: "Siguiente",
    seeResults: "Ver mis vías",
    restart: "Empezar de nuevo",
    stepLabels: ["Situación", "Familia", "Trabajo e ingresos", "Detalles"],
    stepEncourage: ["", "Buen comienzo", "Vas por la mitad", "Casi está"],
    timeLeft: ["~2 min restantes", "~1 min restante", "~1 min restante", "Último paso"],
    privacyLine: "No se guarda nada hasta que crees una cuenta. No necesitas email para ver resultados.",
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
    results_title: "Tus opciones de visado, ordenadas",
    results_sub: "Según tus respuestas y los umbrales vigentes en julio de 2026. Es orientación, no asesoramiento jurídico — en el producto completo cada cifra enlaza a su fuente oficial.",
    supervisedNote: "Reglas de elegibilidad mantenidas y validadas por un gestor administrativo colegiado.",
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
