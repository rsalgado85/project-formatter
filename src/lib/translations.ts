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
  terms: {
    title: string;
    lastUpdated: string;
    sections: { heading: string; body: string }[];
  };
  privacy: {
    title: string;
    lastUpdated: string;
    sections: { heading: string; body: string }[];
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
    terms: {
    title: "Terms and Conditions",
    lastUpdated: "June 14, 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing or using FormatterHub (\"the Service\"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the Service.",
      },
      {
        heading: "2. Description of Service",
        body: "FormatterHub provides free, client-side developer formatting and conversion tools. All processing happens in your browser — no data is uploaded to any server. The Service includes JSON formatting, XML formatting, YAML conversion, Base64 encoding/decoding, password generation, and password strength checking.",
      },
      {
        heading: "3. Privacy and Data Handling",
        body: "FormatterHub operates entirely in your browser. We do not collect, store, transmit, or process any of your data on external servers. No analytics, tracking, or cookies beyond those strictly necessary for theme and language preferences (stored locally in your browser) are used. See our Privacy Policy for more details.",
      },
      {
        heading: "4. Intellectual Property",
        body: "The FormatterHub source code is open-source and available on GitHub. The name \"FormatterHub,\" the logo, and the website design are proprietary. You may use the tools freely but may not reproduce the branding or present the tools as your own without attribution.",
      },
      {
        heading: "5. User Responsibilities",
        body: "You agree not to: (a) use the Service for any illegal purpose; (b) attempt to disrupt or overload the Service; (c) scrape, mirror, or frame the Service without permission; (d) use automated tools that place unreasonable load on the hosting infrastructure.",
      },
      {
        heading: "6. Disclaimer of Warranties",
        body: "The Service is provided \"as is\" and \"as available\" without warranties of any kind, either express or implied. FormatterHub does not guarantee that the tools will be error-free, that formatting output is always correct, or that the Service will be available without interruption.",
      },
      {
        heading: "7. Limitation of Liability",
        body: "In no event shall FormatterHub or its creator be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. The tools process your data locally — you remain fully responsible for validating any output before using it in production or critical contexts.",
      },
      {
        heading: "8. Third-Party Links",
        body: "The Service may contain links to third-party websites or services (e.g., PayPal for donations, GitHub, LinkedIn). FormatterHub is not responsible for the content, privacy practices, or terms of those third-party services.",
      },
      {
        heading: "9. Changes to Terms",
        body: "We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of the Service after changes constitutes acceptance of the new terms.",
      },
      {
        heading: "10. Contact",
        body: "For questions about these Terms, please contact the project maintainer via GitHub at github.com/rsalgado85 or email rsalgado85@gmail.com.",
      },
    ],
    },
    privacy: {
    title: "Privacy Policy",
    lastUpdated: "June 14, 2026",
    sections: [
      {
        heading: "1. Our Privacy Commitment",
        body: "FormatterHub is built on the principle that your data belongs to you. We designed the entire platform to process everything in your browser — no data ever leaves your machine. This Privacy Policy explains exactly what happens when you use FormatterHub.",
      },
      {
        heading: "2. What We Collect",
        body: "Nothing. FormatterHub does not collect, store, or transmit any of the text, files, passwords, or data you enter into our tools. We do not use analytics services, tracking scripts, advertising networks, or any form of user monitoring. The only data stored is your theme preference (dark/light) and language preference (EN/ES) — both saved locally in your browser's localStorage and never sent to any server.",
      },
      {
        heading: "3. How Your Data Is Processed",
        body: "All formatting, conversion, encoding, decoding, and password operations run entirely as client-side JavaScript in your browser. When you paste JSON into the formatter, it stays in your browser tab. When you generate a password, the random bytes come from your browser's cryptographic API and are never transmitted. You can verify this by disconnecting your internet — all tools continue to work offline after the initial page load.",
      },
      {
        heading: "4. Cookies and Local Storage",
        body: "FormatterHub does not use cookies for tracking or advertising. We use localStorage (not cookies) to remember your theme and language choices. This information is stored only in your browser, is never sent to any server, and is deleted if you clear your browser's local storage.",
      },
      {
        heading: "5. Third-Party Services",
        body: "The only third-party interactions occur when you explicitly choose them: (a) Clicking the PayPal donate button redirects you to PayPal's website — PayPal's privacy policy applies to that transaction; (b) Links to GitHub, LinkedIn, or email open in your default applications. We embed no third-party scripts, fonts, CDNs, or tracking pixels.",
      },
      {
        heading: "6. Hosting Infrastructure",
        body: "FormatterHub is hosted on Vercel. Vercel processes HTTP requests to serve the static files (HTML, CSS, JavaScript) to your browser. Vercel may log standard web server information (IP address, user agent, request path) as part of their infrastructure operations. FormatterHub does not access or process these Vercel logs. See Vercel's privacy policy for details on their infrastructure data handling.",
      },
      {
        heading: "7. Children's Privacy",
        body: "FormatterHub is a general-purpose developer tool. We do not knowingly collect information from children under 13. Since we collect no personal data at all, there is no mechanism by which children's data could be collected through the Service.",
      },
      {
        heading: "8. Data Security",
        body: "Because FormatterHub processes all data locally in your browser, there is no server-side data to protect or breach. However, you should exercise standard caution — do not use the tools on shared or public computers for sensitive data, as processed data may remain visible in your browser tab until you close it.",
      },
      {
        heading: "9. Your Rights",
        body: "Since FormatterHub collects no personal data, there is no data to access, correct, delete, or port. If you have any privacy concerns, you can verify this by inspecting the source code at github.com/rsalgado85/project-formatter or by using browser developer tools to confirm no network requests are made with your tool data.",
      },
      {
        heading: "10. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Material changes will be noted in the project's GitHub repository.",
      },
      {
        heading: "11. Contact",
        body: "If you have questions about this Privacy Policy or FormatterHub's data practices, contact robinson@formatterhub.dev or open an issue on the GitHub repository at github.com/rsalgado85/project-formatter.",
      },
    ],
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
  terms: {
    title: "Términos y Condiciones",
    lastUpdated: "14 de junio de 2026",
    sections: [
      {
        heading: "1. Aceptación de los Términos",
        body: "Al acceder o utilizar FormatterHub (\"el Servicio\"), aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el Servicio.",
      },
      {
        heading: "2. Descripción del Servicio",
        body: "FormatterHub ofrece herramientas gratuitas de formateo y conversión para desarrolladores, procesadas completamente del lado del cliente. Todo el procesamiento ocurre en tu navegador — ningún dato se sube a servidor alguno. El Servicio incluye formateo JSON, formateo XML, conversión YAML, codificación/decodificación Base64, generación de contraseñas y verificación de fortaleza de contraseñas.",
      },
      {
        heading: "3. Privacidad y Manejo de Datos",
        body: "FormatterHub opera completamente en tu navegador. No recopilamos, almacenamos, transmitimos ni procesamos ninguno de tus datos en servidores externos. No utilizamos analíticas, rastreo ni cookies más allá de las estrictamente necesarias para las preferencias de tema e idioma (almacenadas localmente en tu navegador). Consulta nuestra Política de Privacidad para más detalles.",
      },
      {
        heading: "4. Propiedad Intelectual",
        body: "El código fuente de FormatterHub es de código abierto y está disponible en GitHub. El nombre \"FormatterHub\", el logotipo y el diseño del sitio web son propietarios. Puedes utilizar las herramientas libremente, pero no puedes reproducir la marca ni presentar las herramientas como propias sin atribución.",
      },
      {
        heading: "5. Responsabilidades del Usuario",
        body: "Aceptas no: (a) utilizar el Servicio con fines ilegales; (b) intentar interrumpir o sobrecargar el Servicio; (c) extraer, replicar o enmarcar el Servicio sin permiso; (d) utilizar herramientas automatizadas que impongan una carga irrazonable sobre la infraestructura de alojamiento.",
      },
      {
        heading: "6. Exención de Garantías",
        body: "El Servicio se proporciona \"tal cual\" y \"según disponibilidad\", sin garantías de ningún tipo, expresas o implícitas. FormatterHub no garantiza que las herramientas estén libres de errores, que el resultado del formateo sea siempre correcto o que el Servicio esté disponible sin interrupciones.",
      },
      {
        heading: "7. Limitación de Responsabilidad",
        body: "En ningún caso FormatterHub o su creador serán responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos que surjan del uso del Servicio. Las herramientas procesan tus datos localmente — tú eres completamente responsable de validar cualquier resultado antes de usarlo en producción o contextos críticos.",
      },
      {
        heading: "8. Enlaces a Terceros",
        body: "El Servicio puede contener enlaces a sitios web o servicios de terceros (ej., PayPal para donaciones, GitHub, LinkedIn). FormatterHub no es responsable del contenido, las prácticas de privacidad o los términos de esos servicios de terceros.",
      },
      {
        heading: "9. Cambios en los Términos",
        body: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta página con una fecha actualizada. El uso continuado del Servicio después de los cambios constituye la aceptación de los nuevos términos.",
      },
      {
        heading: "10. Contacto",
        body: "Para preguntas sobre estos Términos, contacta al mantenedor del proyecto a través de GitHub en github.com/rsalgado85 o por correo a rsalgado85@gmail.com.",
      },
    ],
  },
  privacy: {
    title: "Política de Privacidad",
    lastUpdated: "14 de junio de 2026",
    sections: [
      {
        heading: "1. Nuestro Compromiso de Privacidad",
        body: "FormatterHub se construye sobre el principio de que tus datos te pertenecen. Diseñamos toda la plataforma para procesar todo en tu navegador — ningún dato sale jamás de tu máquina. Esta Política de Privacidad explica exactamente qué sucede cuando usas FormatterHub.",
      },
      {
        heading: "2. Qué Recopilamos",
        body: "Nada. FormatterHub no recopila, almacena ni transmite ninguno de los textos, archivos, contraseñas o datos que introduces en nuestras herramientas. No utilizamos servicios de analítica, scripts de rastreo, redes publicitarias ni ninguna forma de monitoreo de usuarios. El único dato almacenado es tu preferencia de tema (oscuro/claro) e idioma (ES/EN) — ambos guardados localmente en el localStorage de tu navegador y nunca enviados a ningún servidor.",
      },
      {
        heading: "3. Cómo se Procesan tus Datos",
        body: "Todas las operaciones de formateo, conversión, codificación, decodificación y contraseñas se ejecutan completamente como JavaScript del lado del cliente en tu navegador. Cuando pegas JSON en el formateador, permanece en la pestaña de tu navegador. Cuando generas una contraseña, los bytes aleatorios provienen de la API criptográfica de tu navegador y nunca se transmiten. Puedes verificarlo desconectando tu internet — todas las herramientas siguen funcionando sin conexión después de la carga inicial de la página.",
      },
      {
        heading: "4. Cookies y Almacenamiento Local",
        body: "FormatterHub no utiliza cookies para rastreo o publicidad. Usamos localStorage (no cookies) para recordar tus preferencias de tema e idioma. Esta información se almacena solo en tu navegador, nunca se envía a ningún servidor y se elimina si limpias el almacenamiento local de tu navegador.",
      },
      {
        heading: "5. Servicios de Terceros",
        body: "Las únicas interacciones con terceros ocurren cuando tú las eliges explícitamente: (a) Al hacer clic en el botón de donación de PayPal, eres redirigido al sitio web de PayPal — la política de privacidad de PayPal se aplica a esa transacción; (b) Los enlaces a GitHub, LinkedIn o correo electrónico se abren en tus aplicaciones predeterminadas. No incrustamos scripts, fuentes, CDNs ni píxeles de rastreo de terceros.",
      },
      {
        heading: "6. Infraestructura de Alojamiento",
        body: "FormatterHub está alojado en Vercel. Vercel procesa las solicitudes HTTP para servir los archivos estáticos (HTML, CSS, JavaScript) a tu navegador. Vercel puede registrar información estándar del servidor web (dirección IP, agente de usuario, ruta de solicitud) como parte de sus operaciones de infraestructura. FormatterHub no accede ni procesa estos registros de Vercel. Consulta la política de privacidad de Vercel para detalles sobre el manejo de datos de su infraestructura.",
      },
      {
        heading: "7. Privacidad Infantil",
        body: "FormatterHub es una herramienta para desarrolladores de propósito general. No recopilamos conscientemente información de menores de 13 años. Dado que no recopilamos ningún dato personal, no existe ningún mecanismo mediante el cual se puedan recopilar datos de menores a través del Servicio.",
      },
      {
        heading: "8. Seguridad de Datos",
        body: "Debido a que FormatterHub procesa todos los datos localmente en tu navegador, no hay datos del lado del servidor que proteger o que puedan ser vulnerados. Sin embargo, debes ejercer precaución estándar — no uses las herramientas en computadoras compartidas o públicas para datos sensibles, ya que los datos procesados pueden permanecer visibles en la pestaña de tu navegador hasta que la cierres.",
      },
      {
        heading: "9. Tus Derechos",
        body: "Dado que FormatterHub no recopila datos personales, no hay datos que acceder, corregir, eliminar o transferir. Si tienes alguna preocupación de privacidad, puedes verificarlo inspeccionando el código fuente en github.com/rsalgado85/project-formatter o utilizando las herramientas de desarrollo del navegador para confirmar que no se realizan solicitudes de red con los datos de tus herramientas.",
      },
      {
        heading: "10. Cambios en esta Política",
        body: "Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios se publicarán en esta página con una fecha actualizada. Los cambios sustanciales se notificarán en el repositorio GitHub del proyecto.",
      },
      {
        heading: "11. Contacto",
        body: "Si tienes preguntas sobre esta Política de Privacidad o las prácticas de datos de FormatterHub, contacta a robinson@formatterhub.dev o abre un issue en el repositorio de GitHub en github.com/rsalgado85/project-formatter.",
      },
    ],
  },
};

export const translations: Record<Language, Translations> = { en, es };
