import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, "../src/i18n/locales");
const en = JSON.parse(fs.readFileSync(path.join(localesDir, "en.json"), "utf8"));

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      out[key] = deepMerge(target[key], source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

const patches = {
  es: {
    nav: {
      platform: "Plataforma",
      lawgicHub: "LawgicHub",
      industries: "Industrias",
      company: "Empresa",
      resources: "Recursos",
      contact: "Contacto",
      login: "Iniciar sesión",
      bookDemo: "Reservar llamada",
    },
    hero: {
      title: "Inteligencia empresarial para operaciones legales.",
      subtitle:
        "Xarka ofrece infraestructura de IA soberana y plataformas legales listas para producción, diseñadas para equipos que exigen control, seguridad y resultados medibles.",
      bookDemo: "Reservar llamada",
      explorePlatform: "Explorar la plataforma",
    },
    footer: {
      description:
        "XARKA AI Technologies desarrolla IA empresarial para operaciones legales e industrias reguladas. Con sede en Mumbai, India.",
      platform: "Plataforma",
      product: "Producto",
      company: "Empresa",
      legal: "Legal",
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
      links: {
        platform: "Plataforma",
        lawgicHub: "LawgicHub",
        industries: "Industrias",
        whyXarka: "Por qué Xarka",
        team: "Liderazgo",
        resources: "Recursos",
        demo: "Reservar llamada",
        login: "Iniciar sesión",
        contact: "Contacto",
      },
    },
    blog: {
      sectionLabel: "Recursos",
      heading: "Perspectivas para equipos legales y empresariales",
      subtitle:
        "Reflexiones sobre IA soberana, operaciones legales y despliegue de inteligencia en entornos regulados.",
      readMore: "Solicitar informe",
      newsletterNote:
        "Los artículos completos están disponibles bajo solicitud. Contacte a nuestro equipo para informes y recursos empresariales.",
      subscribeCta: "Contáctenos",
    },
    login: {
      sectionLabel: "Iniciar sesión",
      heading: "Acceder a LawgicHub",
      subtitle:
        "Inicie sesión en el espacio de trabajo LawgicHub de su organización. Los despliegues empresariales incluyen SSO, acceso por roles y registro de auditoría.",
      signInBtn: "Iniciar sesión en LawgicHub",
      requestDemo: "Reservar llamada",
      enterpriseLink: "Hablar con nuestro equipo",
    },
    demo: {
      sectionLabel: "Reservar llamada",
      heading: "Vea Xarka en acción",
      subtitle:
        "Programe una demostración personalizada de nuestra plataforma, LawgicHub y opciones de despliegue para su organización.",
      formTitle: "Solicitar su demo",
      messagePlaceholder:
        "Cuéntenos sobre su equipo, caso de uso y horario preferido para la demo…",
    },
    contact: { demoLink: "Reservar llamada del producto" },
    notFound: {
      title: "Página no encontrada",
      description: "La página que busca no existe o ha sido movida.",
      backHome: "Volver al inicio",
    },
  },
  de: {
    nav: {
      platform: "Plattform",
      lawgicHub: "LawgicHub",
      industries: "Branchen",
      company: "Unternehmen",
      resources: "Ressourcen",
      contact: "Kontakt",
      login: "Anmelden",
      bookDemo: "Gespräch buchen",
    },
    hero: {
      title: "Enterprise-Intelligenz für Rechtsabteilungen.",
      subtitle:
        "Xarka liefert souveräne KI-Infrastruktur und produktionsreife Rechtsplattformen – für Teams, die Kontrolle, Sicherheit und messbare Ergebnisse benötigen.",
      bookDemo: "Gespräch buchen",
      explorePlatform: "Plattform entdecken",
    },
    footer: {
      description:
        "XARKA AI Technologies entwickelt Enterprise-KI für Rechtsoperationen und regulierte Branchen. Hauptsitz in Mumbai, Indien.",
      platform: "Plattform",
      product: "Produkt",
      company: "Unternehmen",
      legal: "Rechtliches",
      privacyPolicy: "Datenschutz",
      termsOfService: "Nutzungsbedingungen",
      links: {
        platform: "Plattform",
        lawgicHub: "LawgicHub",
        industries: "Branchen",
        whyXarka: "Warum Xarka",
        team: "Führung",
        resources: "Ressourcen",
        demo: "Gespräch buchen",
        login: "Anmelden",
        contact: "Kontakt",
      },
    },
    blog: {
      sectionLabel: "Ressourcen",
      heading: "Einblicke für Rechts- und Enterprise-Teams",
      subtitle:
        "Perspektiven zu souveräner KI, Rechtsoperationen und dem Einsatz von Intelligenz in regulierten Umgebungen.",
      readMore: "Briefing anfragen",
      subscribeCta: "Kontakt aufnehmen",
    },
    login: {
      sectionLabel: "Anmelden",
      heading: "LawgicHub öffnen",
      signInBtn: "Bei LawgicHub anmelden",
      requestDemo: "Gespräch buchen",
    },
    demo: {
      sectionLabel: "Gespräch buchen",
      heading: "Xarka live erleben",
      formTitle: "Gespräch anfragen",
    },
    contact: { demoLink: "Gespräch buchen" },
    notFound: {
      title: "Seite nicht gefunden",
      description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zur Startseite",
    },
  },
  fr: {
    nav: {
      platform: "Plateforme",
      lawgicHub: "LawgicHub",
      industries: "Secteurs",
      company: "Entreprise",
      resources: "Ressources",
      contact: "Contact",
      login: "Connexion",
      bookDemo: "Réserver un appel",
    },
    hero: {
      title: "Intelligence d'entreprise pour les opérations juridiques.",
      bookDemo: "Réserver un appel",
      explorePlatform: "Explorer la plateforme",
    },
    footer: {
      links: {
        resources: "Ressources",
        demo: "Réserver un appel",
        login: "Connexion",
      },
    },
    blog: { sectionLabel: "Ressources", readMore: "Demander un briefing", subscribeCta: "Nous contacter" },
    login: { sectionLabel: "Connexion", signInBtn: "Se connecter à LawgicHub", requestDemo: "Réserver un appel" },
    demo: { sectionLabel: "Réserver un appel", heading: "Voir Xarka en action", formTitle: "Demander un appel" },
    contact: { demoLink: "Réserver un appel" },
    notFound: { title: "Page introuvable", backHome: "Retour à l'accueil" },
  },
  zh: {
    nav: {
      platform: "平台",
      lawgicHub: "LawgicHub",
      industries: "行业",
      company: "公司",
      resources: "资源",
      contact: "联系",
      login: "登录",
      bookDemo: "预约通话",
    },
    hero: {
      title: "面向法律运营的企业级智能。",
      bookDemo: "预约通话",
      explorePlatform: "了解平台",
    },
    footer: {
      links: {
        resources: "资源",
        demo: "预约通话",
        login: "登录",
      },
    },
    blog: { sectionLabel: "资源", readMore: "申请简报", subscribeCta: "联系我们" },
    login: { sectionLabel: "登录", signInBtn: "登录 LawgicHub", requestDemo: "预约通话" },
    demo: { sectionLabel: "预约通话", heading: "了解 Xarka", formTitle: "申请通话" },
    contact: { demoLink: "预约通话" },
    notFound: { title: "页面未找到", backHome: "返回首页" },
  },
  ar: {
    nav: {
      platform: "المنصة",
      lawgicHub: "LawgicHub",
      industries: "القطاعات",
      company: "الشركة",
      resources: "الموارد",
      contact: "اتصل",
      login: "تسجيل الدخول",
      bookDemo: "احجز مكالمة",
    },
    hero: {
      title: "ذكاء مؤسسي لعمليات الشؤون القانونية.",
      bookDemo: "احجز مكالمة",
      explorePlatform: "استكشف المنصة",
    },
    footer: {
      links: {
        resources: "الموارد",
        demo: "احجز مكالمة",
        login: "تسجيل الدخول",
      },
    },
    blog: { sectionLabel: "الموارد", readMore: "طلب موجز", subscribeCta: "اتصل بنا" },
    login: { sectionLabel: "تسجيل الدخول", signInBtn: "تسجيل الدخول إلى LawgicHub", requestDemo: "احجز مكالمة" },
    demo: { sectionLabel: "احجز مكالمة", heading: "شاهد Xarka", formTitle: "طلب مكالمة" },
    contact: { demoLink: "احجز مكالمة" },
    notFound: { title: "الصفحة غير موجودة", backHome: "العودة للرئيسية" },
  },
};

for (const lang of ["es", "de", "fr", "zh", "ar"]) {
  const merged = deepMerge(en, patches[lang] ?? {});
  fs.writeFileSync(
    path.join(localesDir, `${lang}.json`),
    `${JSON.stringify(merged, null, 2)}\n`,
    "utf8"
  );
  console.log(`Synced ${lang}.json`);
}
