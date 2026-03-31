"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  CheckCircle2,
  Clock3,
  Globe,
  Hotel,
  LayoutGrid,
  Layers3,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  MoveRight,
  PencilRuler,
  Quote,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Workflow,
  X,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/50240256327?text=Hola%20JoserWeb,%20quiero%20informaci%C3%B3n%20sobre%20una%20p%C3%A1gina%20web";

type CommentItem = {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
  date: string;
  badge: string;
};

type PortfolioCategory = "Todos" | "Hospitalidad" | "E-commerce" | "Sistema web";

const STORAGE_KEY = "joserweb-comments-v3";

const services = [
  {
    icon: Globe,
    title: "Páginas web para negocios",
    description:
      "Sitios web claros, atractivos y bien estructurados para presentar tu negocio de forma seria, ordenada y confiable.",
  },
  {
    icon: MonitorSmartphone,
    title: "Diseño adaptable",
    description:
      "Cada sección se ajusta correctamente a celular, tablet y computadora para una experiencia cómoda en cualquier pantalla.",
  },
  {
    icon: PencilRuler,
    title: "Diseño cuidado",
    description:
      "Interfaces limpias, modernas y bien trabajadas para que tu marca se vea actual, sólida y agradable de recorrer.",
  },
  {
    icon: Workflow,
    title: "Soluciones a medida",
    description:
      "Desde páginas informativas hasta sistemas web según lo que tu negocio necesite mostrar, vender o gestionar.",
  },
];

const process = [
  {
    title: "Conocer tu negocio",
    description:
      "Primero entendemos qué quieres comunicar, qué vendes y cómo debe presentarse tu marca.",
  },
  {
    title: "Ordenar la estructura",
    description:
      "Organizamos el contenido para que la página se sienta clara, cómoda de recorrer y visualmente sólida.",
  },
  {
    title: "Diseñar y desarrollar",
    description:
      "Creamos una web moderna, funcional y bien trabajada en cada detalle visual.",
  },
  {
    title: "Ajustar y pulir",
    description:
      "Revisamos textos, ritmo visual, interacciones y acabados para lograr una mejor presentación final.",
  },
];

const highlights = [
  "Diseño claro",
  "Buena presentación",
  "Experiencia moderna",
  "Adaptable a celular",
];

const trustPoints = [
  "Atención directa",
  "Diseño adaptable",
  "Interfaz cuidada",
  "Presentación clara",
  "Estructura ordenada",
];

const stats = [
  { label: "Diseño adaptable", value: "100%" },
  { label: "Enfoque visual", value: "Detalle" },
  { label: "Comunicación", value: "Directa" },
  { label: "Entrega", value: "Ordenada" },
];

const portfolio = [
  {
    title: "Página web para hotel",
    category: "Hospitalidad" as const,
    image: "/img/img1.png",
    icon: Hotel,
    href: "https://casabellahotelgt.com",
    description:
      "Sitio web para hotel con una presentación clara, elegante y enfocada en mostrar habitaciones, experiencia y reservas.",
  },
  {
    title: "Tienda en línea",
    category: "E-commerce" as const,
    image: "/img/img2.png",
    icon: ShoppingCart,
    href: "https://beksgt.com",
    description:
      "Tienda en línea con una estructura visual limpia, pensada para mostrar productos de forma atractiva y ordenada.",
  },
  {
    title: "Sistema web para negocios",
    category: "Sistema web" as const,
    image: "/img/img3.png",
    icon: BriefcaseBusiness,
    href: "https://certificacionesaea.com",
    description:
      "Proyecto web orientado a gestión y presentación profesional de información con una interfaz clara y funcional.",
  },
];

const initialComments: CommentItem[] = [
  {
    id: "1",
    name: "Valentina Ruiz",
    role: "Proyecto hotelero",
    text: "Nos gustó mucho cómo quedó la página. Se ve elegante, transmite confianza y la navegación quedó bastante clara para nuestros clientes.",
    avatar: "/img/testimonials/person-1.jpg",
    rating: 5,
    date: "Hace 2 meses",
    badge: "Proyecto entregado",
  },
  {
    id: "2",
    name: "Andrés Morales",
    role: "Tienda en línea",
    text: "El trabajo quedó muy bien presentado. La estructura, los colores y la forma de mostrar los productos ayudaron bastante a la imagen del negocio.",
    avatar: "/img/testimonials/person-2.jpg",
    rating: 5,
    date: "Hace 1 mes",
    badge: "Cliente verificado",
  },
  {
    id: "3",
    name: "Camila Herrera",
    role: "Sitio corporativo",
    text: "La página se siente ordenada, moderna y agradable de recorrer. Se nota el cuidado en los detalles y eso le da una mejor presencia a la marca.",
    avatar: "/img/testimonials/person-3.jpg",
    rating: 5,
    date: "Hace 3 semanas",
    badge: "Proyecto completado",
  },
  {
    id: "4",
    name: "José Arriaga",
    role: "Sistema web",
    text: "Quedamos contentos con la presentación general del proyecto. La interfaz se ve limpia, seria y mucho más clara para mostrar la información.",
    avatar: "/img/testimonials/person-4.jpg",
    rating: 5,
    date: "Hace 2 semanas",
    badge: "Trabajo finalizado",
  },
];

const faqs = [
  {
    q: "¿La página se puede ver bien en celular?",
    a: "Sí. La estructura está pensada para adaptarse correctamente a celular, tablet y computadora.",
  },
  {
    q: "¿También haces sistemas web?",
    a: "Sí. Además de páginas informativas, también se pueden desarrollar paneles, sistemas internos o soluciones web más personalizadas.",
  },
  {
    q: "¿Puedo pedir cambios después?",
    a: "Sí. Se pueden hacer ajustes para pulir detalles visuales, textos, secciones o distribución del contenido.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del tipo de web, el contenido y las funciones necesarias. Todo se revisa según lo que necesite el negocio.",
  },
];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.75,
      ease: smoothEase,
    },
  }),
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      ease: smoothEase,
    },
  }),
};

function createFallbackAvatar(name: string) {
  const initials = (name || "Cliente")
    .split(" ")
    .map((part) => part[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#2b2118" offset="0%"/>
          <stop stop-color="#6b4f38" offset="100%"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="80" fill="url(#g)"/>
      <text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="#ffffff" font-size="52" font-family="Arial, sans-serif" font-weight="700">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolio)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="jw-portfolio-card jw-shine-card"
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.24 }}
      variants={reveal}
      custom={index + 1}
    >
      <div className="jw-portfolio-image-wrap">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="jw-portfolio-image"
          sizes="(max-width: 900px) 100vw, 33vw"
        />
        <div className="jw-portfolio-overlay" />
        <div className="jw-portfolio-badge">
          <Icon size={16} />
          <span>{item.category}</span>
        </div>
      </div>

      <div className="jw-portfolio-content">
        <div className="jw-portfolio-head">
          <h3>{item.title}</h3>
          <div className="jw-portfolio-arrow">
            <ArrowUpRight size={18} />
          </div>
        </div>
        <p>{item.description}</p>

        <div className="jw-portfolio-link">
          <span>Ver proyecto</span>
          <ArrowUpRight size={15} />
        </div>
      </div>
    </motion.a>
  );
}

function CommentCard({
  item,
  index,
}: {
  item: CommentItem;
  index: number;
}) {
  const [imgSrc, setImgSrc] = useState(item.avatar);

  return (
    <motion.article
      className="jw-comment-card jw-shine-card"
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      custom={index + 1}
    >
      <div className="jw-comment-top">
        <div className="jw-comment-avatar-wrap">
          <img
            src={imgSrc}
            alt={item.name}
            className="jw-comment-avatar"
            loading="lazy"
            onError={() => setImgSrc(createFallbackAvatar(item.name))}
          />
        </div>

        <div className="jw-comment-user">
          <div className="jw-comment-user-line">
            <strong>{item.name}</strong>
            <span className="jw-comment-badge">{item.badge}</span>
          </div>
          <span>{item.role}</span>
        </div>

        <div className="jw-comment-quote">
          <Quote size={18} />
        </div>
      </div>

      <div className="jw-comment-meta">
        <div className="jw-comment-stars" aria-label={`${item.rating} estrellas`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={`${item.id}-star-${i}`}
              size={15}
              className={i < item.rating ? "jw-star-active" : "jw-star-inactive"}
            />
          ))}
        </div>
        <span className="jw-comment-date">{item.date}</span>
      </div>

      <p className="jw-comment-text">{item.text}</p>
    </motion.article>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`jw-faq-item ${isOpen ? "is-open" : ""}`}>
      <button className="jw-faq-trigger" onClick={onToggle} type="button">
        <span>{item.q}</span>
        <ChevronDown size={18} className="jw-faq-icon" />
      </button>

      <div className="jw-faq-content">
        <div className="jw-faq-content-inner">
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.94]);
  const orbA = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] =
    useState<PortfolioCategory>("Todos");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CommentItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComments(parsed);
        }
      }
    } catch {
      // ignore localStorage parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch {
      // ignore localStorage save errors
    }
  }, [comments]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  const sortedComments = useMemo(() => [...comments].reverse(), [comments]);

  const portfolioCategories = useMemo<PortfolioCategory[]>(
    () => ["Todos", "Hospitalidad", "E-commerce", "Sistema web"],
    []
  );

  const filteredPortfolio = useMemo(() => {
    if (portfolioFilter === "Todos") return portfolio;
    return portfolio.filter((item) => item.category === portfolioFilter);
  }, [portfolioFilter]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanRole = role.trim();
    const cleanText = text.trim();

    if (!cleanName || !cleanRole || !cleanText) {
      setMessage("Completa nombre, proyecto y comentario.");
      return;
    }

    if (cleanText.length < 24) {
      setMessage("Escribe un comentario un poco más completo.");
      return;
    }

    const newComment: CommentItem = {
      id: `${Date.now()}`,
      name: cleanName,
      role: cleanRole,
      text: cleanText,
      avatar: createFallbackAvatar(cleanName),
      rating,
      date: "Recién agregado",
      badge: "Nuevo comentario",
    };

    setComments((prev) => [...prev, newComment]);
    setName("");
    setRole("");
    setText("");
    setRating(5);
    setMessage("Comentario agregado correctamente.");
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      <main className="jw-root jw-root-light">
        <motion.div className="jw-progress" style={{ scaleX: progressScale }} />
        <div className="jw-noise" />
        <motion.div className="jw-orb jw-orb-a" style={{ y: orbA }} />
        <motion.div className="jw-orb jw-orb-b" style={{ y: orbB }} />
        <div className="jw-grid-fade" />

        <header className="jw-header jw-header-light">
          <div className="jw-container jw-header-inner">
            <motion.a
              href="#inicio"
              className="jw-brand"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="jw-brand-logo">
                <Image
                  src="/img/logo.png"
                  alt="JoserWeb"
                  width={42}
                  height={42}
                  className="jw-logo-img"
                />
              </div>

              <div className="jw-brand-copy">
                <span className="jw-brand-name jw-brand-name-light">
                  JoserWeb
                </span>
              </div>
            </motion.a>

            <nav className="jw-nav jw-nav-light">
              <a href="#inicio">Inicio</a>
              <a href="#servicios">Servicios</a>
              <a href="#portafolio">Portafolio</a>
              <a href="#proceso">Proceso</a>
              <a href="#comentarios">Comentarios</a>
              <a href="#faq">Preguntas</a>
              <a href="#contacto">Contacto</a>
            </nav>

            <div className="jw-header-actions">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="jw-button jw-button-dark jw-header-cta"
              >
                Solicitar página web
              </a>

              <button
                type="button"
                className="jw-mobile-toggle"
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.div
                className="jw-mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMobileMenu}
              />
              <motion.aside
                className="jw-mobile-panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.32, ease: smoothEase }}
              >
                <div className="jw-mobile-panel-top">
                  <div className="jw-mobile-brand">
                    <Image
                      src="/img/logo.png"
                      alt="JoserWeb"
                      width={34}
                      height={34}
                    />
                    <span>JoserWeb</span>
                  </div>

                  <button
                    type="button"
                    className="jw-mobile-close"
                    onClick={closeMobileMenu}
                    aria-label="Cerrar menú"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="jw-mobile-nav">
                  <a href="#inicio" onClick={closeMobileMenu}>
                    Inicio
                  </a>
                  <a href="#servicios" onClick={closeMobileMenu}>
                    Servicios
                  </a>
                  <a href="#portafolio" onClick={closeMobileMenu}>
                    Portafolio
                  </a>
                  <a href="#proceso" onClick={closeMobileMenu}>
                    Proceso
                  </a>
                  <a href="#comentarios" onClick={closeMobileMenu}>
                    Comentarios
                  </a>
                  <a href="#faq" onClick={closeMobileMenu}>
                    Preguntas
                  </a>
                  <a href="#contacto" onClick={closeMobileMenu}>
                    Contacto
                  </a>
                </nav>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="jw-button jw-button-dark jw-mobile-cta"
                >
                  Solicitar página web
                  <ArrowUpRight size={18} />
                </a>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <section id="inicio" className="jw-hero jw-hero-light">
          <motion.div
            className="jw-container jw-hero-grid"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="jw-hero-copy">
              <motion.div
                className="jw-pill jw-pill-light"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
              >
                <Sparkles size={15} />
                <span>Diseño web para presentar tu negocio mejor</span>
              </motion.div>

              <motion.h1
                className="jw-hero-title jw-hero-title-light"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={1}
              >
                Creamos páginas web con una presentación clara, moderna y bien
                cuidada.
              </motion.h1>

              <motion.p
                className="jw-hero-text jw-hero-text-light"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={2}
              >
                En JoserWeb desarrollamos sitios pensados para mostrar tu negocio
                de forma ordenada, atractiva y fácil de recorrer, cuidando la
                imagen, la estructura y la experiencia visual.
              </motion.p>

              <motion.div
                className="jw-hero-actions"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={3}
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="jw-button jw-button-dark"
                >
                  Solicitar página web
                  <MoveRight size={18} />
                </a>

                <a href="#portafolio" className="jw-button jw-button-light-alt">
                  Ver trabajos
                </a>
              </motion.div>

              <motion.div
                className="jw-inline-highlights jw-inline-highlights-light"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={4}
              >
                {highlights.map((item) => (
                  <div key={item} className="jw-inline-item jw-inline-item-light">
                    <BadgeCheck size={16} />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="jw-trust-strip"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={5}
              >
                {trustPoints.map((item) => (
                  <span key={item}>
                    <CheckCircle2 size={14} />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="jw-hero-visual"
              initial={{ opacity: 0, scale: 0.97, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: smoothEase }}
            >
              <div className="jw-editorial-card jw-editorial-card-light">
                <div className="jw-editorial-top jw-editorial-top-light">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="jw-editorial-body">
                  <div className="jw-editorial-intro jw-editorial-intro-light">
                    <div className="jw-mini-label jw-mini-label-light">
                      JoserWeb Studio
                    </div>
                    <h2>Diseño web bien presentado</h2>
                    <p>
                      Sitios pensados para negocios que quieren verse mejor,
                      mostrar con claridad y transmitir confianza.
                    </p>
                  </div>

                  <div className="jw-editorial-grid">
                    <motion.div
                      className="jw-floating-card jw-floating-card-light jw-shine-card"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 4.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Layers3 size={18} />
                      <div>
                        <strong>Estructura clara</strong>
                        <p>Secciones ordenadas y fáciles de recorrer.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="jw-floating-card jw-floating-card-light jw-shine-card"
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 5.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles size={18} />
                      <div>
                        <strong>Buena presentación</strong>
                        <p>Detalles visuales cuidados y consistentes.</p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="jw-show-window jw-show-window-light"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 5.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="jw-show-window-panel">
                      <div className="jw-show-label jw-show-label-light">
                        Presentación
                      </div>
                      <div className="jw-lines jw-lines-light">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>

                    <div className="jw-show-metric jw-show-metric-light">
                      <span className="jw-metric-title">Resultado</span>
                      <span className="jw-metric-value">Claro y visual</span>
                    </div>
                  </motion.div>

                  <div className="jw-hero-mini-stats">
                    <div>
                      <ShieldCheck size={16} />
                      <span>Imagen sólida</span>
                    </div>
                    <div>
                      <Smartphone size={16} />
                      <span>Vista adaptable</span>
                    </div>
                    <div>
                      <LayoutGrid size={16} />
                      <span>Secciones ordenadas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="jw-section jw-section-light jw-stats-section">
          <div className="jw-container">
            <div className="jw-stats-grid">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="jw-stat-card jw-shine-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={reveal}
                  custom={index + 1}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="jw-section jw-section-light">
          <div className="jw-container">
            <motion.div
              className="jw-section-head jw-section-head-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <span className="jw-section-kicker jw-section-kicker-light">
                Servicios
              </span>
              <h2>Una web bien hecha ayuda a presentar mejor tu negocio</h2>
              <p>
                Trabajamos páginas con una estructura limpia, buena lectura visual
                y un diseño pensado para verse bien en cualquier dispositivo.
              </p>
            </motion.div>

            <div className="jw-service-grid">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    key={service.title}
                    className="jw-service-card jw-service-card-light jw-shine-card"
                    initial="hidden"
                    whileInView="visible"
                    whileHover={{ y: -6 }}
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    custom={index + 1}
                  >
                    <div className="jw-service-icon jw-service-icon-light">
                      <Icon size={20} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="portafolio"
          className="jw-section jw-section-light jw-portfolio-section"
        >
          <div className="jw-container">
            <motion.div
              className="jw-section-head jw-section-head-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <span className="jw-section-kicker jw-section-kicker-light">
                Portafolio
              </span>
              <h2>Algunos proyectos</h2>
              <p>
                Estos trabajos muestran distintos tipos de páginas desarrolladas
                para presentar negocios, productos y servicios de forma visualmente
                ordenada.
              </p>
            </motion.div>

            <div className="jw-portfolio-filters">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`jw-filter-chip ${
                    portfolioFilter === category ? "is-active" : ""
                  }`}
                  onClick={() => setPortfolioFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="jw-portfolio-grid">
              {filteredPortfolio.map((item, index) => (
                <PortfolioCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="proceso" className="jw-section jw-section-soft-light">
          <div className="jw-container jw-process-wrap">
            <motion.div
              className="jw-process-copy jw-process-copy-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <span className="jw-section-kicker jw-section-kicker-light">
                Proceso
              </span>
              <h2>Trabajamos cada proyecto con orden y detalle</h2>
              <p>
                La idea es que la web no solo funcione bien, sino que también se
                vea coherente, agradable y bien presentada de principio a fin.
              </p>
            </motion.div>

            <div className="jw-process-list jw-process-list-light">
              {process.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="jw-process-item jw-process-item-light jw-shine-card"
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ x: 4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  custom={index + 1}
                >
                  <div className="jw-process-number jw-process-number-light">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>

                  <div className="jw-process-text">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="comentarios" className="jw-section jw-section-light">
          <div className="jw-container">
            <motion.div
              className="jw-section-head jw-section-head-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <span className="jw-section-kicker jw-section-kicker-light">
                Comentarios
              </span>
              <h2>Lo que dicen algunos clientes</h2>
              <p>
                Opiniones presentadas de forma clara, visual y agradable para que
                la sección también sume a la imagen del sitio.
              </p>
            </motion.div>

            <div className="jw-comments-layout">
              <div className="jw-comments-grid jw-comments-grid-pro">
                {sortedComments.map((item, index) => (
                  <CommentCard key={item.id} item={item} index={index} />
                ))}
              </div>

              <motion.form
                className="jw-comment-form jw-shine-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                custom={2}
                onSubmit={handleSubmit}
              >
                <div className="jw-comment-form-head">
                  <h3>Agregar comentario</h3>
                  <p>
                    Puedes mantener esta sección activa para que la página se siga
                    viendo viva, actual y con mejor presencia.
                  </p>
                </div>

                <div className="jw-form-grid">
                  <div className="jw-field">
                    <label htmlFor="name">Nombre</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Ej. María López"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="jw-field">
                    <label htmlFor="role">Proyecto</label>
                    <input
                      id="role"
                      type="text"
                      placeholder="Ej. Tienda en línea"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jw-field">
                  <label>Calificación</label>
                  <div className="jw-rating-picker">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`jw-rating-btn ${
                          value <= rating ? "is-active" : ""
                        }`}
                        onClick={() => setRating(value)}
                        aria-label={`${value} estrellas`}
                      >
                        <Star size={16} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="jw-field">
                  <label htmlFor="text">Comentario</label>
                  <textarea
                    id="text"
                    placeholder="Escribe tu experiencia aquí..."
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                {message ? <div className="jw-form-message">{message}</div> : null}

                <button type="submit" className="jw-button jw-button-dark">
                  Publicar comentario
                  <Send size={16} />
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        <section id="faq" className="jw-section jw-section-soft-light">
          <div className="jw-container">
            <motion.div
              className="jw-section-head jw-section-head-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <span className="jw-section-kicker jw-section-kicker-light">
                Preguntas frecuentes
              </span>
              <h2>Algunas dudas comunes</h2>
              <p>
                Esta sección ayuda a que la página se sienta más completa, clara y
                confiable para nuevos clientes.
              </p>
            </motion.div>

            <div className="jw-faq-list">
              {faqs.map((item, index) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="jw-section jw-section-light">
          <div className="jw-container">
            <motion.div
              className="jw-statement jw-statement-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              custom={1}
            >
              <p>
                Una página bien presentada ayuda a que tu negocio se vea más claro,
                más ordenado y mejor cuidado.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="contacto" className="jw-section jw-section-light">
          <div className="jw-container">
            <motion.div
              className="jw-cta jw-cta-light jw-shine-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <div className="jw-cta-copy jw-cta-copy-light">
                <span className="jw-section-kicker jw-section-kicker-light">
                  Contacto
                </span>
                <h2>Si quieres una página web para tu negocio, conversemos.</h2>
                <p>
                  Escríbeme por WhatsApp y revisamos qué tipo de página necesitas,
                  cómo debería verse y cuál sería la mejor forma de presentarla.
                </p>

                <div className="jw-cta-points">
                  <span>
                    <Clock3 size={16} />
                    Atención directa
                  </span>
                  <span>
                    <ShieldCheck size={16} />
                    Propuesta clara
                  </span>
                  <span>
                    <Smartphone size={16} />
                    Diseño adaptable
                  </span>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="jw-button jw-button-dark"
              >
                Solicitar página web
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </section>

        <footer className="jw-footer jw-footer-light">
          <div className="jw-container jw-footer-inner">
            <div className="jw-footer-left">
              <div className="jw-footer-brandline">
                <Image
                  src="/img/logo.png"
                  alt="JoserWeb"
                  width={32}
                  height={32}
                  className="jw-footer-logo"
                />
                <span>JoserWeb</span>
              </div>
              <p>Diseño web para negocios y proyectos digitales.</p>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="jw-footer-link jw-footer-link-light"
            ></a>
          </div>
        </footer>

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="jw-whatsapp-float"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.45 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Abrir WhatsApp"
        >
          <MessageCircle size={20} />
        </motion.a>
      </main>

      <style jsx global>{`
        :root {
          --jw-bg: #ece6dc;
          --jw-bg-soft: #f3eee6;
          --jw-surface: rgba(255, 250, 244, 0.72);
          --jw-surface-strong: rgba(255, 248, 242, 0.92);
          --jw-card: #f7f3ee;
          --jw-border: rgba(73, 52, 31, 0.08);
          --jw-border-strong: rgba(73, 52, 31, 0.12);
          --jw-text: #181412;
          --jw-muted: #5f5146;
          --jw-soft: #7a695b;
          --jw-dark: #111111;
          --jw-dark-2: #1a1a1a;
          --jw-white: #ffffff;
          --jw-accent: #7b5a3a;
          --jw-accent-soft: rgba(123, 90, 58, 0.08);
          --jw-shadow: 0 10px 30px rgba(71, 52, 35, 0.08);
          --jw-shadow-lg: 0 30px 60px rgba(71, 52, 35, 0.14);
          --jw-radius: 24px;
          --jw-radius-md: 18px;
          --jw-radius-sm: 14px;
          --jw-container: 1200px;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.72), transparent 35%),
            linear-gradient(180deg, #efebe4 0%, #e9e3d9 100%);
          color: var(--jw-text);
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        img {
          max-width: 100%;
          display: block;
        }

        .jw-root {
          position: relative;
          overflow: clip;
          min-height: 100vh;
          isolation: isolate;
        }

        .jw-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          transform-origin: left;
          background: linear-gradient(90deg, #5f4631, #111111);
          z-index: 100;
        }

        .jw-noise {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image:
            radial-gradient(circle at 20% 20%, #000 0.8px, transparent 0.8px),
            radial-gradient(circle at 80% 40%, #000 0.8px, transparent 0.8px),
            radial-gradient(circle at 40% 80%, #000 0.8px, transparent 0.8px);
          background-size: 24px 24px;
          z-index: -2;
        }

        .jw-grid-fade {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(73, 52, 31, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(73, 52, 31, 0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at center, black 32%, transparent 85%);
          z-index: -3;
          opacity: 0.6;
        }

        .jw-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          z-index: -1;
        }

        .jw-orb-a {
          width: 360px;
          height: 360px;
          top: 120px;
          left: -90px;
          background: rgba(173, 142, 108, 0.18);
        }

        .jw-orb-b {
          width: 340px;
          height: 340px;
          top: 480px;
          right: -70px;
          background: rgba(92, 63, 39, 0.1);
        }

        .jw-container {
          width: min(calc(100% - 32px), var(--jw-container));
          margin-inline: auto;
        }

        .jw-section {
          padding: 100px 0;
          position: relative;
        }

        .jw-section-soft-light {
          background: linear-gradient(
            180deg,
            rgba(255, 248, 242, 0.45) 0%,
            rgba(240, 233, 223, 0.82) 100%
          );
        }

        .jw-header {
          position: sticky;
          top: 0;
          z-index: 60;
          backdrop-filter: blur(18px);
          background: rgba(236, 230, 220, 0.72);
          border-bottom: 1px solid rgba(73, 52, 31, 0.06);
        }

        .jw-header-inner {
          min-height: 84px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .jw-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: fit-content;
        }

        .jw-brand-logo {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 249, 243, 0.86);
          border: 1px solid var(--jw-border);
          box-shadow: var(--jw-shadow);
          display: grid;
          place-items: center;
        }

        .jw-logo-img {
          object-fit: contain;
        }

        .jw-brand-name {
          font-size: 1.08rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--jw-text);
        }

        .jw-nav {
          display: flex;
          align-items: center;
          gap: 24px;
          color: var(--jw-muted);
          font-size: 0.97rem;
          font-weight: 600;
        }

        .jw-nav a {
          position: relative;
          transition: color 0.25s ease;
        }

        .jw-nav a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: var(--jw-accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }

        .jw-nav a:hover {
          color: var(--jw-text);
        }

        .jw-nav a:hover::after {
          transform: scaleX(1);
        }

        .jw-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .jw-mobile-toggle {
          display: none;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          border: 1px solid rgba(73, 52, 31, 0.08);
          background: rgba(255, 249, 243, 0.9);
          color: var(--jw-text);
          box-shadow: var(--jw-shadow);
          cursor: pointer;
        }

        .jw-mobile-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(24, 20, 18, 0.34);
          backdrop-filter: blur(8px);
          z-index: 78;
        }

        .jw-mobile-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: min(92vw, 380px);
          height: 100vh;
          padding: 18px;
          background: rgba(247, 243, 238, 0.98);
          border-left: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: -18px 0 50px rgba(30, 20, 10, 0.14);
          z-index: 79;
          display: flex;
          flex-direction: column;
        }

        .jw-mobile-panel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 22px;
        }

        .jw-mobile-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
        }

        .jw-mobile-close {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          border: 1px solid rgba(73, 52, 31, 0.08);
          background: rgba(255, 252, 248, 0.96);
          cursor: pointer;
          color: var(--jw-text);
        }

        .jw-mobile-nav {
          display: grid;
          gap: 8px;
          margin-top: 4px;
        }

        .jw-mobile-nav a {
          padding: 16px 14px;
          border-radius: 16px;
          background: rgba(255, 252, 248, 0.72);
          border: 1px solid rgba(73, 52, 31, 0.06);
          color: var(--jw-text);
          font-weight: 700;
        }

        .jw-mobile-cta {
          margin-top: auto;
        }

        .jw-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 52px;
          padding: 0 20px;
          border-radius: 999px;
          border: 1px solid transparent;
          font-weight: 700;
          font-size: 0.97rem;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
          cursor: pointer;
          white-space: nowrap;
        }

        .jw-button:hover {
          transform: translateY(-2px);
        }

        .jw-button-dark {
          background: linear-gradient(180deg, #171717 0%, #0f0f0f 100%);
          color: var(--jw-white);
          box-shadow: 0 16px 30px rgba(30, 20, 10, 0.18);
        }

        .jw-button-dark:hover {
          box-shadow: 0 22px 40px rgba(30, 20, 10, 0.24);
        }

        .jw-button-light-alt {
          background: rgba(255, 250, 244, 0.9);
          border-color: rgba(73, 52, 31, 0.08);
          color: var(--jw-text);
          box-shadow: var(--jw-shadow);
        }

        .jw-hero {
          padding: 72px 0 52px;
        }

        .jw-hero-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 48px;
          align-items: center;
        }

        .jw-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(255, 248, 242, 0.84);
          border: 1px solid var(--jw-border);
          color: var(--jw-text);
          font-size: 0.92rem;
          font-weight: 700;
          box-shadow: var(--jw-shadow);
        }

        .jw-hero-title {
          margin: 22px 0 18px;
          font-size: clamp(2.6rem, 5vw, 5rem);
          line-height: 0.96;
          letter-spacing: -0.055em;
          max-width: 11ch;
        }

        .jw-hero-text {
          margin: 0;
          max-width: 640px;
          font-size: 1.08rem;
          line-height: 1.85;
          color: var(--jw-muted);
        }

        .jw-hero-actions {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .jw-inline-highlights {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .jw-inline-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(255, 248, 242, 0.88);
          border: 1px solid var(--jw-border);
          color: var(--jw-text);
          box-shadow: var(--jw-shadow);
          font-weight: 600;
          font-size: 0.92rem;
        }

        .jw-trust-strip {
          margin-top: 26px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .jw-trust-strip span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 38px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(123, 90, 58, 0.08);
          border: 1px solid rgba(123, 90, 58, 0.1);
          color: var(--jw-muted);
          font-size: 0.89rem;
          font-weight: 700;
        }

        .jw-editorial-card {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          background:
            linear-gradient(180deg, rgba(255, 249, 243, 0.96) 0%, rgba(244, 237, 228, 0.92) 100%);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow-lg);
        }

        .jw-editorial-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top right, rgba(123, 90, 58, 0.08), transparent 28%),
            radial-gradient(circle at bottom left, rgba(190, 166, 141, 0.2), transparent 35%);
          pointer-events: none;
        }

        .jw-editorial-top {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 18px 20px;
          border-bottom: 1px solid rgba(73, 52, 31, 0.06);
        }

        .jw-editorial-top span {
          width: 11px;
          height: 11px;
          border-radius: 999px;
          background: rgba(73, 52, 31, 0.16);
        }

        .jw-editorial-body {
          padding: 28px;
          position: relative;
        }

        .jw-mini-label {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(123, 90, 58, 0.08);
          border: 1px solid rgba(123, 90, 58, 0.12);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--jw-accent);
        }

        .jw-editorial-intro h2 {
          margin: 16px 0 10px;
          font-size: clamp(1.7rem, 2.7vw, 2.35rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
        }

        .jw-editorial-intro p {
          margin: 0;
          color: var(--jw-muted);
          line-height: 1.8;
        }

        .jw-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 22px;
        }

        .jw-shine-card {
          position: relative;
          overflow: hidden;
        }

        .jw-shine-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.22) 14%,
            transparent 28%
          );
          transform: translateX(-120%);
          transition: transform 0.9s ease;
          pointer-events: none;
        }

        .jw-shine-card:hover::after {
          transform: translateX(130%);
        }

        .jw-floating-card,
        .jw-show-window,
        .jw-stat-card,
        .jw-service-card,
        .jw-portfolio-card,
        .jw-process-item,
        .jw-comment-card,
        .jw-comment-form,
        .jw-cta,
        .jw-statement,
        .jw-faq-item {
          backdrop-filter: blur(12px);
        }

        .jw-floating-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255, 248, 242, 0.9);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
        }

        .jw-floating-card strong {
          display: block;
          margin-bottom: 6px;
          font-size: 0.98rem;
        }

        .jw-floating-card p {
          margin: 0;
          color: var(--jw-muted);
          font-size: 0.93rem;
          line-height: 1.7;
        }

        .jw-show-window {
          margin-top: 16px;
          padding: 22px;
          border-radius: 28px;
          background: linear-gradient(135deg, #2b1d15 0%, #35241a 50%, #2a1c15 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          box-shadow: 0 24px 46px rgba(45, 28, 16, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .jw-show-window-panel {
          flex: 1;
        }

        .jw-show-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(220, 184, 145, 0.85);
          font-weight: 700;
        }

        .jw-lines {
          margin-top: 14px;
          display: grid;
          gap: 10px;
        }

        .jw-lines span {
          display: block;
          height: 9px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
        }

        .jw-lines span:nth-child(1) {
          width: 150px;
        }

        .jw-lines span:nth-child(2) {
          width: 210px;
        }

        .jw-lines span:nth-child(3) {
          width: 120px;
        }

        .jw-show-metric {
          min-width: 170px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .jw-metric-title {
          display: block;
          font-size: 0.78rem;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.58);
          font-weight: 700;
        }

        .jw-metric-value {
          display: block;
          font-size: 1.9rem;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .jw-hero-mini-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 18px;
        }

        .jw-hero-mini-stats div {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255, 248, 242, 0.9);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--jw-text);
        }

        .jw-stats-section {
          padding-top: 44px;
          padding-bottom: 26px;
        }

        .jw-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .jw-stat-card {
          padding: 24px;
          border-radius: 24px;
          background: rgba(247, 243, 238, 0.94);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
          text-align: center;
        }

        .jw-stat-card strong {
          display: block;
          font-size: clamp(1.4rem, 2vw, 2rem);
          line-height: 1;
          letter-spacing: -0.05em;
          margin-bottom: 8px;
        }

        .jw-stat-card span {
          color: var(--jw-muted);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .jw-section-head {
          max-width: 760px;
          margin-bottom: 36px;
        }

        .jw-section-kicker {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(123, 90, 58, 0.08);
          border: 1px solid rgba(123, 90, 58, 0.12);
          font-size: 0.82rem;
          font-weight: 800;
          color: #7b5a3a;
          margin-bottom: 16px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .jw-section-head h2 {
          margin: 0 0 14px;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.02;
          letter-spacing: -0.05em;
        }

        .jw-section-head p {
          margin: 0;
          color: var(--jw-muted);
          line-height: 1.85;
          font-size: 1.02rem;
        }

        .jw-service-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .jw-service-card {
          padding: 24px;
          border-radius: 26px;
          background: rgba(247, 243, 238, 0.94);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .jw-service-card:hover {
          box-shadow: 0 24px 44px rgba(71, 52, 35, 0.12);
        }

        .jw-service-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: rgba(123, 90, 58, 0.08);
          margin-bottom: 18px;
          color: var(--jw-accent);
        }

        .jw-service-card h3 {
          margin: 0 0 10px;
          font-size: 1.08rem;
          letter-spacing: -0.03em;
        }

        .jw-service-card p {
          margin: 0;
          color: var(--jw-muted);
          line-height: 1.75;
        }

        .jw-portfolio-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .jw-filter-chip {
          min-height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(73, 52, 31, 0.08);
          background: rgba(255, 250, 244, 0.9);
          color: var(--jw-text);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: var(--jw-shadow);
        }

        .jw-filter-chip.is-active,
        .jw-filter-chip:hover {
          background: #171717;
          color: #ffffff;
          border-color: #171717;
          transform: translateY(-1px);
        }

        .jw-portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .jw-portfolio-card {
          border-radius: 28px;
          overflow: hidden;
          background: rgba(247, 243, 238, 0.94);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }

        .jw-portfolio-card:hover {
          box-shadow: 0 28px 54px rgba(71, 52, 35, 0.14);
        }

        .jw-portfolio-image-wrap {
          position: relative;
          aspect-ratio: 16 / 11;
          overflow: hidden;
        }

        .jw-portfolio-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .jw-portfolio-card:hover .jw-portfolio-image {
          transform: scale(1.06);
        }

        .jw-portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(15, 10, 8, 0.02) 0%,
            rgba(15, 10, 8, 0.26) 100%
          );
        }

        .jw-portfolio-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 36px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(255, 248, 242, 0.9);
          border: 1px solid rgba(73, 52, 31, 0.06);
          box-shadow: var(--jw-shadow);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .jw-portfolio-content {
          padding: 22px;
        }

        .jw-portfolio-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .jw-portfolio-head h3 {
          margin: 0;
          font-size: 1.14rem;
          letter-spacing: -0.03em;
        }

        .jw-portfolio-arrow {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(123, 90, 58, 0.08);
          color: var(--jw-accent);
        }

        .jw-portfolio-content p {
          margin: 12px 0 16px;
          color: var(--jw-muted);
          line-height: 1.78;
        }

        .jw-portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--jw-text);
          font-weight: 700;
        }

        .jw-process-wrap {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 28px;
          align-items: start;
        }

        .jw-process-list {
          display: grid;
          gap: 16px;
        }

        .jw-process-item {
          display: flex;
          gap: 18px;
          align-items: flex-start;
          padding: 22px;
          border-radius: 24px;
          background: rgba(247, 243, 238, 0.94);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
        }

        .jw-process-number {
          width: 56px;
          height: 56px;
          min-width: 56px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: rgba(123, 90, 58, 0.08);
          font-weight: 800;
          color: var(--jw-accent);
        }

        .jw-process-text h3 {
          margin: 0 0 8px;
          font-size: 1.05rem;
          letter-spacing: -0.03em;
        }

        .jw-process-text p {
          margin: 0;
          color: var(--jw-muted);
          line-height: 1.78;
        }

        .jw-comments-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 22px;
          align-items: start;
        }

        .jw-comments-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .jw-comment-card {
          padding: 22px;
          border-radius: 26px;
          background: rgba(247, 243, 238, 0.94);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .jw-comment-card:hover {
          box-shadow: 0 24px 48px rgba(71, 52, 35, 0.12);
        }

        .jw-comment-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .jw-comment-avatar-wrap {
          width: 58px;
          height: 58px;
          min-width: 58px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(73, 52, 31, 0.08);
          background: #e2d8cc;
          box-shadow: var(--jw-shadow);
        }

        .jw-comment-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jw-comment-user {
          flex: 1;
          min-width: 0;
        }

        .jw-comment-user-line {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }

        .jw-comment-user strong {
          display: block;
          font-size: 1rem;
          letter-spacing: -0.02em;
        }

        .jw-comment-user span {
          display: block;
          color: var(--jw-muted);
          font-size: 0.9rem;
        }

        .jw-comment-badge {
          display: inline-flex !important;
          align-items: center;
          min-height: 28px;
          padding: 0 10px;
          border-radius: 999px;
          background: rgba(123, 90, 58, 0.08);
          border: 1px solid rgba(123, 90, 58, 0.12);
          color: var(--jw-accent) !important;
          font-size: 0.77rem !important;
          font-weight: 800;
        }

        .jw-comment-quote {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(123, 90, 58, 0.08);
          color: var(--jw-accent);
        }

        .jw-comment-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .jw-comment-stars {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .jw-star-active {
          color: #d29b2b;
          fill: currentColor;
        }

        .jw-star-inactive {
          color: #d7c8b8;
        }

        .jw-comment-date {
          color: var(--jw-soft);
          font-size: 0.86rem;
          font-weight: 600;
        }

        .jw-comment-text {
          margin: 0;
          color: var(--jw-muted);
          line-height: 1.82;
        }

        .jw-comment-form {
          padding: 24px;
          border-radius: 28px;
          background: rgba(247, 243, 238, 0.96);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow-lg);
          position: sticky;
          top: 110px;
        }

        .jw-comment-form-head h3 {
          margin: 0 0 10px;
          font-size: 1.18rem;
          letter-spacing: -0.03em;
        }

        .jw-comment-form-head p {
          margin: 0 0 22px;
          color: var(--jw-muted);
          line-height: 1.75;
        }

        .jw-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .jw-field {
          display: grid;
          gap: 8px;
          margin-bottom: 16px;
        }

        .jw-field label {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--jw-text);
        }

        .jw-field input,
        .jw-field textarea {
          width: 100%;
          border: 1px solid rgba(73, 52, 31, 0.1);
          background: rgba(255, 252, 248, 0.96);
          color: var(--jw-text);
          border-radius: 16px;
          padding: 14px 16px;
          font: inherit;
          outline: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            transform 0.2s ease;
          resize: vertical;
        }

        .jw-field input:focus,
        .jw-field textarea:focus {
          border-color: rgba(123, 90, 58, 0.24);
          box-shadow: 0 0 0 4px rgba(123, 90, 58, 0.06);
        }

        .jw-rating-picker {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .jw-rating-btn {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(73, 52, 31, 0.08);
          background: rgba(255, 252, 248, 0.96);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease;
          color: #d7c8b8;
        }

        .jw-rating-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--jw-shadow);
        }

        .jw-rating-btn.is-active {
          color: #d29b2b;
          background: rgba(210, 155, 43, 0.08);
          border-color: rgba(210, 155, 43, 0.2);
        }

        .jw-form-message {
          margin: 0 0 16px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(123, 90, 58, 0.08);
          border: 1px solid rgba(123, 90, 58, 0.12);
          color: var(--jw-text);
          font-size: 0.92rem;
          font-weight: 600;
        }

        .jw-faq-list {
          display: grid;
          gap: 18px;
          max-width: 900px;
        }

        .jw-faq-item {
          border-radius: 24px;
          background: rgba(247, 243, 238, 0.94);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow);
          overflow: hidden;
        }

        .jw-faq-trigger {
          width: 100%;
          background: transparent;
          border: 0;
          color: var(--jw-text);
          padding: 24px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          text-align: left;
          cursor: pointer;
          font: inherit;
          font-weight: 800;
          font-size: 1rem;
        }

        .jw-faq-icon {
          transition: transform 0.25s ease;
          min-width: 18px;
        }

        .jw-faq-item.is-open .jw-faq-icon {
          transform: rotate(180deg);
        }

        .jw-faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s ease;
        }

        .jw-faq-item.is-open .jw-faq-content {
          grid-template-rows: 1fr;
        }

        .jw-faq-content-inner {
          overflow: hidden;
        }

        .jw-faq-content p {
          margin: 0;
          padding: 0 26px 24px;
          color: var(--jw-muted);
          line-height: 1.85;
          font-size: 1rem;
        }

        .jw-statement {
          padding: 34px 38px;
          border-radius: 32px;
          background:
            radial-gradient(circle at center, rgba(33, 54, 104, 0.18) 0%, rgba(14, 20, 35, 0) 38%),
            linear-gradient(90deg, #121a30 0%, #0f1930 42%, #111827 100%);
          color: #ffffff !important;
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.24);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .jw-statement p {
          margin: 0;
          font-size: clamp(1.5rem, 2.6vw, 2.4rem);
          line-height: 1.45;
          letter-spacing: -0.03em;
          max-width: 30ch;
          color: #ffffff !important;
          text-align: center;
          margin-inline: auto;
        }

        .jw-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          padding: 32px;
          border-radius: 34px;
          background: rgba(247, 243, 238, 0.96);
          border: 1px solid rgba(73, 52, 31, 0.08);
          box-shadow: var(--jw-shadow-lg);
        }

        .jw-cta-copy h2 {
          margin: 0 0 12px;
          font-size: clamp(1.8rem, 3vw, 2.7rem);
          line-height: 1.02;
          letter-spacing: -0.05em;
          max-width: 15ch;
        }

        .jw-cta-copy p {
          margin: 0;
          color: var(--jw-muted);
          line-height: 1.82;
          max-width: 680px;
        }

        .jw-cta-points {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .jw-cta-points span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(123, 90, 58, 0.08);
          border: 1px solid rgba(123, 90, 58, 0.12);
          color: var(--jw-text);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .jw-footer {
          padding: 34px 0 60px;
        }

        .jw-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid rgba(73, 52, 31, 0.08);
          padding-top: 28px;
        }

        .jw-footer-brandline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .jw-footer-left p {
          margin: 0;
          color: var(--jw-muted);
        }

        .jw-footer-link {
          color: var(--jw-text);
          font-weight: 700;
        }

        .jw-whatsapp-float {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 58px;
          height: 58px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #171717 0%, #0f0f0f 100%);
          color: white;
          box-shadow: 0 20px 30px rgba(30, 20, 10, 0.2);
          z-index: 80;
        }

        @media (max-width: 1180px) {
          .jw-nav,
          .jw-header-cta {
            display: none;
          }

          .jw-mobile-toggle {
            display: grid;
            place-items: center;
          }

          .jw-hero-grid,
          .jw-process-wrap,
          .jw-comments-layout {
            grid-template-columns: 1fr;
          }

          .jw-service-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .jw-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .jw-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .jw-comment-form {
            position: static;
          }
        }

        @media (max-width: 820px) {
          .jw-section {
            padding: 78px 0;
          }

          .jw-header-inner {
            min-height: 76px;
          }

          .jw-hero {
            padding-top: 44px;
          }

          .jw-hero-title {
            max-width: none;
          }

          .jw-editorial-grid,
          .jw-hero-mini-stats,
          .jw-comments-grid,
          .jw-form-grid,
          .jw-portfolio-grid,
          .jw-service-grid,
          .jw-stats-grid {
            grid-template-columns: 1fr;
          }

          .jw-show-window,
          .jw-cta,
          .jw-footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .jw-show-metric {
            width: 100%;
            min-width: 100%;
          }

          .jw-portfolio-content,
          .jw-comment-card,
          .jw-service-card,
          .jw-process-item,
          .jw-stat-card,
          .jw-comment-form,
          .jw-cta,
          .jw-statement {
            border-radius: 22px;
          }
        }

        @media (max-width: 560px) {
          .jw-container {
            width: min(calc(100% - 22px), var(--jw-container));
          }

          .jw-pill,
          .jw-inline-item,
          .jw-trust-strip span,
          .jw-section-kicker,
          .jw-mini-label,
          .jw-cta-points span {
            font-size: 0.82rem;
          }

          .jw-hero-text,
          .jw-section-head p,
          .jw-comment-text,
          .jw-process-text p,
          .jw-service-card p,
          .jw-portfolio-content p,
          .jw-cta-copy p {
            font-size: 0.96rem;
          }

          .jw-comment-top {
            align-items: flex-start;
          }

          .jw-comment-user-line {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }

          .jw-comment-meta {
            flex-direction: column;
            align-items: flex-start;
          }

          .jw-whatsapp-float {
            width: 54px;
            height: 54px;
            right: 14px;
            bottom: 14px;
          }
        }
      `}</style>
    </>
  );
}