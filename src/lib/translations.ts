export type Language = "en" | "es";

export interface Translations {
  header: {
    donate: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaExplore: string;
    ctaSupport: string;
  };
  banner: {
    support: string;
    keepFree: string;
    donate: string;
  };
  tools: {
    heading: string;
    subtitle: string;
    useTool: string;
    json: { title: string; desc: string };
    xml: { title: string; desc: string };
    yaml: { title: string; desc: string };
    base64: { title: string; desc: string };
    base64Image: { title: string; desc: string };
    passwordGen: { title: string; desc: string };
    passwordCheck: { title: string; desc: string };
  };
  footer: {
    madeWith: string;
    rights: string;
  };
  donate: {
    title: string;
    desc: string;
    chooseAmount: string;
    paypalButton: string;
    redirectNote: string;
  };
  about: {
    title: string;
    subtitle: string;
    role: string;
    bio: string;
    stats: { value: string; label: string }[];
    techHeading: string;
    techDesc: string;
    timelineHeading: string;
    timelineDesc: string;
    timelineItems: { year: string; title: string; desc: string }[];
    quote: string;
    quoteAuthor: string;
    socialAlt: { github: string; linkedin: string; email: string };
  };
  toolPages: {
    home: string;
    json: { title: string; desc: string };
    xml: { title: string; desc: string };
    yaml: { title: string; desc: string };
    base64: { title: string; desc: string };
    base64Image: { title: string; desc: string };
    passwordGen: { title: string; desc: string };
    passwordCheck: { title: string; desc: string };
    passwordTools: { title: string; desc: string };
  };
}

const en: Translations = {
  header: { donate: "Donate" },
  hero: {
    title: "Developer Formatting Tools",
    subtitle: "That Just Work",
    description:
      "Fast, free and privacy-friendly formatting utilities for developers. All processing happens in your browser — nothing leaves your machine.",
    ctaExplore: "Explore Tools",
    ctaSupport: "Support Us",
  },
  banner: {
    support: "Support FormatterHub",
    keepFree: "Help keep these tools free forever",
    donate: "Donate",
  },
  tools: {
    heading: "All Developer Tools",
    subtitle:
      "Privacy-first utilities. Every tool runs entirely in your browser — your data is never uploaded anywhere.",
    useTool: "Use Tool",
    json: {
      title: "JSON Formatter",
      desc: "Format, validate, and prettify JSON data. Minify or expand with a single click.",
    },
    xml: {
      title: "XML Formatter",
      desc: "Make XML readable. Indent, validate, and convert between XML structures.",
    },
    yaml: {
      title: "YAML Converter",
      desc: "Convert between YAML, JSON, and XML. Validate YAML syntax effortlessly.",
    },
    base64: {
      title: "Base64 Encoder / Decoder",
      desc: "Encode and decode Base64 strings. Supports UTF-8 and binary data.",
    },
    base64Image: {
      title: "Base64 to Image",
      desc: "Decode Base64 strings back into images. Supports PNG, JPEG, GIF, WebP and SVG.",
    },
    passwordGen: {
      title: "Password Generator",
      desc: "Generate strong, cryptographically secure passwords with custom rules.",
    },
    passwordCheck: {
      title: "Password Strength Checker",
      desc: "Check how strong your password is and get tips to improve it.",
    },
  },
  footer: {
    madeWith: "Made with ❤️ for developers",
    rights: "© {year} FormatterHub. All rights reserved.",
  },
  donate: {
    title: "Support FormatterHub",
    desc: "Help keep these tools free, fast, and ad-free for developers everywhere. Every donation makes a difference.",
    chooseAmount: "Choose an amount",
    paypalButton: "Donate via PayPal",
    redirectNote: "You'll be redirected to PayPal to complete your donation.",
  },
  about: {
    title: "Robinson Salgado",
    subtitle: "Full-Stack Developer & Creator",
    role: "Full-Stack Developer & Creator",
    bio: "I'm the creator of FormatterHub — a passion project born from the desire to provide fast, free, and privacy-friendly developer tools. With over 18 years of experience in software engineering, I build solutions that combine great design with solid architecture. FormatterHub is my contribution to the developer community — tools that respect your privacy and just work.",
    stats: [
      { value: "7", label: "Tools" },
      { value: "100%", label: "Client-Side" },
      { value: "0", label: "Data Collected" },
      { value: "2", label: "Languages" },
      { value: "8", label: "Technologies" },
      { value: "18+", label: "Years Coding" },
    ],
    techHeading: "Tech Stack",
    techDesc: "The modern toolchain powering FormatterHub — built for speed, privacy, and developer experience.",
    timelineHeading: "Timeline",
    timelineDesc: "The evolution of FormatterHub — from concept to production.",
    timelineItems: [
      {
        year: "2026 Q2",
        title: "FormatterHub Launch",
        desc: "Public launch with JSON, XML, YAML, Base64, and Password tools — all 100% client-side with zero data collection.",
      },
      {
        year: "2026 Q2",
        title: "Multi-Language Support",
        desc: "Added full Spanish translation and language toggle, making FormatterHub accessible to Spanish-speaking developers worldwide.",
      },
      {
        year: "2026 Q1",
        title: "Platform Foundation",
        desc: "Set up the Next.js 15 architecture, design system with TailwindCSS v4, shadcn/ui components, and dark/light theme system.",
      },
    ],
    quote:
      "Great tools don't just solve problems — they earn trust by respecting privacy and delivering results without compromise.",
    quoteAuthor: "— FormatterHub Manifesto",
    socialAlt: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
    },
  },
  toolPages: {
    home: "Home",
    json: {
      title: "JSON Formatter",
      desc: "Pretty print, minify, validate, and download your JSON data.",
    },
    xml: {
      title: "XML Formatter",
      desc: "Pretty print, minify, validate, and download your XML data.",
    },
    yaml: {
      title: "YAML Converter",
      desc: "Convert between YAML and JSON formats.",
    },
    base64: {
      title: "Base64 Encoder / Decoder",
      desc: "Encode text to Base64 or decode Base64 strings back to readable text. All processing happens in your browser.",
    },
    base64Image: {
      title: "Base64 to Image",
      desc: "Decode Base64 strings back into visible images. Supports PNG, JPEG, GIF, WebP, and SVG formats. All processing happens in your browser.",
    },
    passwordGen: {
      title: "Password Generator",
      desc: "Generate strong, cryptographically secure passwords with custom length and character types.",
    },
    passwordCheck: {
      title: "Password Strength Checker",
      desc: "Check how strong your password is. Get an entropy estimate, estimated crack time, and detailed improvement tips.",
    },
    passwordTools: {
      title: "Password Tools",
      desc: "Generate cryptographically secure passwords and check their strength. All processing happens in your browser — passwords never leave your machine.",
    },
  },
};

const es: Translations = {
  header: { donate: "Donar" },
  hero: {
    title: "Herramientas de Formateo para Devs",
    subtitle: "Que Simplemente Funcionan",
    description:
      "Utilidades rápidas, gratuitas y respetuosas con tu privacidad. Todo el procesamiento ocurre en tu navegador — nada sale de tu máquina.",
    ctaExplore: "Explorar Herramientas",
    ctaSupport: "Apoyar el Proyecto",
  },
  banner: {
    support: "Apoya FormatterHub",
    keepFree: "Ayuda a mantener estas herramientas gratuitas",
    donate: "Donar",
  },
  tools: {
    heading: "Todas las Herramientas",
    subtitle:
      "Utilidades que respetan tu privacidad. Cada herramienta se ejecuta completamente en tu navegador — tus datos nunca se suben a ningún servidor.",
    useTool: "Usar Herramienta",
    json: {
      title: "Formateador JSON",
      desc: "Formatea, valida y embellece datos JSON. Minimiza o expande con un solo clic.",
    },
    xml: {
      title: "Formateador XML",
      desc: "Haz el XML legible. Indenta, valida y convierte entre estructuras XML.",
    },
    yaml: {
      title: "Convertidor YAML",
      desc: "Convierte entre formatos YAML, JSON y XML. Valida sintaxis YAML fácilmente.",
    },
    base64: {
      title: "Codificador Base64",
      desc: "Codifica y decodifica cadenas Base64. Soporta UTF-8 y datos binarios.",
    },
    base64Image: {
      title: "Base64 a Imagen",
      desc: "Decodifica cadenas Base64 a imágenes. Soporta PNG, JPEG, GIF, WebP y SVG.",
    },
    passwordGen: {
      title: "Generador de Contraseñas",
      desc: "Genera contraseñas seguras criptográficamente con reglas personalizables.",
    },
    passwordCheck: {
      title: "Verificador de Contraseñas",
      desc: "Verifica qué tan segura es tu contraseña y recibe consejos para mejorarla.",
    },
  },
  footer: {
    madeWith: "Hecho con ❤️ para developers",
    rights: "© {year} FormatterHub. Todos los derechos reservados.",
  },
  donate: {
    title: "Apoya FormatterHub",
    desc: "Ayuda a mantener estas herramientas gratuitas, rápidas y sin publicidad para developers de todo el mundo. Cada donación cuenta.",
    chooseAmount: "Elige un monto",
    paypalButton: "Donar vía PayPal",
    redirectNote: "Serás redirigido a PayPal para completar tu donación.",
  },
  about: {
    title: "Robinson Salgado",
    subtitle: "Desarrollador Full-Stack & Creador",
    role: "Desarrollador Full-Stack & Creador",
    bio: "Soy el creador de FormatterHub — un proyecto apasionante que nació del deseo de ofrecer herramientas para developers rápidas, gratuitas y respetuosas con la privacidad. Con más de 18 años de experiencia en ingeniería de software, construyo soluciones que combinan gran diseño con arquitectura sólida. FormatterHub es mi contribución a la comunidad de developers — herramientas que respetan tu privacidad y simplemente funcionan.",
    stats: [
      { value: "7", label: "Herramientas" },
      { value: "100%", label: "Cliente" },
      { value: "0", label: "Datos Recopilados" },
      { value: "2", label: "Idiomas" },
      { value: "8", label: "Tecnologías" },
      { value: "18+", label: "Años Programando" },
    ],
    techHeading: "Stack Tecnológico",
    techDesc: "El toolchain moderno que impulsa FormatterHub — construido para velocidad, privacidad y experiencia de desarrollo.",
    timelineHeading: "Línea de Tiempo",
    timelineDesc: "La evolución de FormatterHub — del concepto a producción.",
    timelineItems: [
      {
        year: "2026 Q2",
        title: "Lanzamiento de FormatterHub",
        desc: "Lanzamiento público con herramientas JSON, XML, YAML, Base64 y Contraseñas — todo 100% del lado del cliente sin recopilación de datos.",
      },
      {
        year: "2026 Q2",
        title: "Soporte Multi-Idioma",
        desc: "Traducción completa al español y selector de idioma, haciendo FormatterHub accesible para developers hispanohablantes.",
      },
      {
        year: "2026 Q1",
        title: "Fundación de la Plataforma",
        desc: "Configuración de la arquitectura Next.js 15, sistema de diseño con TailwindCSS v4, componentes shadcn/ui y sistema de tema claro/oscuro.",
      },
    ],
    quote:
      "Las grandes herramientas no solo resuelven problemas — se ganan la confianza respetando la privacidad y entregando resultados sin concesiones.",
    quoteAuthor: "— Manifiesto FormatterHub",
    socialAlt: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Correo",
    },
  },
  toolPages: {
    home: "Inicio",
    json: {
      title: "Formateador JSON",
      desc: "Embellece, minimiza, valida y descarga tus datos JSON.",
    },
    xml: {
      title: "Formateador XML",
      desc: "Embellece, minimiza, valida y descarga tus datos XML.",
    },
    yaml: {
      title: "Convertidor YAML",
      desc: "Convierte entre formatos YAML y JSON.",
    },
    base64: {
      title: "Codificador Base64",
      desc: "Codifica texto a Base64 o decodifica cadenas Base64 a texto legible. Todo el procesamiento ocurre en tu navegador.",
    },
    base64Image: {
      title: "Base64 a Imagen",
      desc: "Decodifica cadenas Base64 a imágenes visibles. Soporta formatos PNG, JPEG, GIF, WebP y SVG. Todo el procesamiento ocurre en tu navegador.",
    },
    passwordGen: {
      title: "Generador de Contraseñas",
      desc: "Genera contraseñas seguras criptográficamente con longitud y tipos de caracteres personalizables.",
    },
    passwordCheck: {
      title: "Verificador de Contraseñas",
      desc: "Verifica qué tan segura es tu contraseña. Obtén estimación de entropía, tiempo estimado para descifrarla y consejos detallados.",
    },
    passwordTools: {
      title: "Herramientas de Contraseñas",
      desc: "Genera contraseñas criptográficamente seguras y verifica su fortaleza. Todo ocurre en tu navegador — tus contraseñas nunca salen de tu máquina.",
    },
  },
};

export const translations: Record<Language, Translations> = { en, es };
