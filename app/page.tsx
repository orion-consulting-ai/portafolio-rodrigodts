/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

const I18N = {
  es: {
    'nav.manifesto': 'Manifiesto',
    'nav.bio': 'Persona',
    'nav.consulting': 'Consulting',
    'nav.society': 'Society',
    'nav.method': 'Método',
    'nav.projects': 'Proyectos',
    'nav.content': 'Canal',
    'nav.contact': 'Contacto',
    'nav.cta': 'Agendar',
    'hero.kicker': 'ARCHITECTVS · SYSTEMA INTELLIGENTIAE',
    'hero.s_members': 'Miembros activos',
    'hero.s_retention': 'Retención mensual',
    'hero.latin_tr': '— IA ética y social para el bien del mundo',
    'hero.cap': 'Retrato del autor, año MMXXVI',
    'hero.lede': 'Consultor, constructor y divulgador de <em>Inteligencia Artificial</em>. Fundador de <strong>Orion AI Consulting</strong> y de la comunidad <strong>Orion AI Society</strong>. Diseño sistemas que multiplican el trabajo humano — sin reemplazarlo.',
    'hero.cta1': 'Trabajar conmigo',
    'hero.cta2': 'Unirme a la comunidad',
    'hero.scroll': 'Desciende',
    'sec.manifesto': 'Manifiesto',
    'sec.bio': 'Persona',
    'sec.consulting': 'Orion AI Consulting',
    'sec.society': 'Orion AI Society',
    'sec.method': 'Fractalidad',
    'sec.projects': 'Proyectos',
    'sec.content': 'Canal',
    'sec.testimonials': 'Testimonia',
    'sec.essays': 'Ensayos',
    'consulting.cta': 'Solicitar diagnóstico',
  },
  en: {
    'nav.manifesto': 'Manifesto',
    'nav.bio': 'Persona',
    'nav.consulting': 'Consulting',
    'nav.society': 'Society',
    'nav.method': 'Method',
    'nav.projects': 'Works',
    'nav.content': 'Channel',
    'nav.contact': 'Contact',
    'nav.cta': 'Book a call',
    'hero.kicker': 'ARCHITECTVS · INTELLIGENTIAE SYSTEMS',
    'hero.s_members': 'Active members',
    'hero.s_retention': 'Monthly retention',
    'hero.latin_tr': '— Ethical AI for the benefit of the world',
    'hero.cap': 'Portrait of the author, year MMXXVI',
    'hero.lede': 'Consultant, builder and educator on <em>Artificial Intelligence</em>. Founder of <strong>Orion AI Consulting</strong> and the community <strong>Orion AI Society</strong>. I design systems that multiply human work — without replacing it.',
    'hero.cta1': 'Work with me',
    'hero.cta2': 'Join the community',
    'hero.scroll': 'Scroll',
    'sec.manifesto': 'Manifesto',
    'sec.bio': 'Persona',
    'sec.consulting': 'Orion AI Consulting',
    'sec.society': 'Orion AI Society',
    'sec.method': 'Fractality',
    'sec.projects': 'Selected works',
    'sec.content': 'Channel',
    'sec.testimonials': 'Testimonia',
    'sec.essays': 'Essays',
    'consulting.cta': 'Request diagnostic',
  },
} as const;

type Lang = 'es' | 'en';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [heroPortrait, setHeroPortrait] = useState('/assets/portrait-1.jpg');
  const [agentOpen, setAgentOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente de Rodrigo. Puedo contarte sobre sus servicios, metodología o la Orion AI Society. ¿En qué te puedo ayudar?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const t = (key: keyof typeof I18N['es']) => I18N[lang][key] ?? I18N['es'][key];

  // Interactions
  useEffect(() => {
    const body = document.body;

    // Spotlight cursor
    const spotlight = spotlightRef.current;
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let curX = mouseX, curY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      body.classList.add('spotlight-on');
    };
    const onMouseLeave = () => body.classList.remove('spotlight-on');

    function raf() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      if (spotlight) {
        spotlight.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(raf);
    }
    raf();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Magnetic buttons
    const magneticEls = document.querySelectorAll<HTMLElement>('.magnetic');
    const magneticHandlers: Array<{ el: HTMLElement; move: (e: Event) => void; leave: () => void }> = [];
    magneticEls.forEach(el => {
      const move = (e: Event) => {
        const me = e as MouseEvent;
        const r = el.getBoundingClientRect();
        const x = me.clientX - r.left - r.width / 2;
        const y = me.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      };
      const leave = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      magneticHandlers.push({ el, move, leave });
    });

    // Scroll text reveal
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const revIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-in');
          revIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(el => revIO.observe(el));
    setTimeout(() => {
      document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('reveal-in'));
    }, 120);

    // Scramble titles
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·✦◇+0123456789';
    function scrambleText(el: HTMLElement) {
      const final = el.dataset.text || el.textContent || '';
      const duration = 1200;
      const start = performance.now();
      const len = final.length;
      function tick(now: number) {
        const p = Math.min(1, (now - start) / duration);
        const reveal = Math.floor(p * len);
        let out = '';
        for (let i = 0; i < len; i++) {
          if (i < reveal) out += final[i];
          else if (final[i] === ' ') out += ' ';
          else out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
        el.textContent = out;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = final;
      }
      requestAnimationFrame(tick);
    }
    const scIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          if (!el.dataset.text) el.dataset.text = el.textContent || '';
          if (body.dataset.glitch !== 'off') scrambleText(el);
          scIO.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll<HTMLElement>('.scramble').forEach(el => scIO.observe(el));

    // Parallax frescoes
    const parallaxItems = [
      ...document.querySelectorAll<HTMLElement>('.portrait-fresco, .side-fresco img, .society-fresco img, .proj-fresco img'),
    ];
    const onScroll = () => {
      parallaxItems.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const y = (r.top + r.height / 2 - window.innerHeight / 2) * -0.05;
        el.style.transform = `translateY(${y}px) scale(1.05)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Tweaks panel protocol
    const onMessage = (e: MessageEvent) => {
      const d = e.data || {};
      const tweaksEl = document.getElementById('tweaks');
      if (!tweaksEl) return;
      if (d.type === '__activate_edit_mode') tweaksEl.removeAttribute('hidden');
      if (d.type === '__deactivate_edit_mode') tweaksEl.setAttribute('hidden', '');
    };
    window.addEventListener('message', onMessage);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      magneticHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
      revIO.disconnect();
      scIO.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatMessages.slice(-10),
        }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content || 'Lo siento, ocurrió un error.' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Por favor intenta de nuevo.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Tweaks panel handlers
  const setTweak = (key: string, val: string) => {
    document.body.dataset[key] = val;
    document.querySelectorAll<HTMLButtonElement>(`[data-tweak="${key}"] button`).forEach(b => {
      b.classList.toggle('active', b.dataset.val === val);
    });
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*'); } catch (_) {}
  };

  return (
    <>
      {/* Grain + Vignette */}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Cursor Spotlight */}
      <div className="spotlight" ref={spotlightRef} aria-hidden="true" />

      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            <span className="orion-mark">✦</span>
            <span className="brand-stack">
              <span className="brand-name">RODRIGO</span>
              <span className="brand-sub">DE&nbsp;LA&nbsp;TORRE</span>
            </span>
          </a>
          <nav className="nav-links">
            <a href="#manifiesto"><i>i.</i> <span>{t('nav.manifesto')}</span></a>
            <a href="#bio"><i>ii.</i> <span>{t('nav.bio')}</span></a>
            <a href="#consulting"><i>iii.</i> <span>{t('nav.consulting')}</span></a>
            <a href="#society"><i>iv.</i> <span>{t('nav.society')}</span></a>
            <a href="#fractalidad"><i>v.</i> <span>{t('nav.method')}</span></a>
            <a href="#proyectos"><i>vi.</i> <span>{t('nav.projects')}</span></a>
            <a href="#contenido"><i>vii.</i> <span>{t('nav.content')}</span></a>
            <a href="#contacto"><i>viii.</i> <span>{t('nav.contact')}</span></a>
          </nav>
          <div className="nav-utils">
            <button
              className="lang-toggle"
              onClick={() => setLang(l => l === 'es' ? 'en' : 'es')}
              aria-label="Toggle language"
            >
              <span className={`lang-es${lang === 'es' ? ' active' : ''}`}>ES</span>
              <span className="lang-sep">·</span>
              <span className={`lang-en${lang === 'en' ? ' active' : ''}`}>EN</span>
            </button>
            <a href="#contacto" className="nav-cta magnetic">
              <span>{t('nav.cta')}</span>
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
            </a>
          </div>
        </div>
        <div className="nav-rule" />
      </header>

      <main id="top">

        {/* HERO */}
        <section className="hero">
          <div className="aurora" aria-hidden="true">
            <div className="aurora-blob a1" />
            <div className="aurora-blob a2" />
            <div className="aurora-blob a3" />
          </div>

          <div className="placard placard-top">
            <span className="mono">MMXXVI · MORELIA / MÉXICO · LAT 19.7°N</span>
            <span className="mono">CATÁLOGO № 001 — RETRATO DEL ARQUITECTO</span>
          </div>

          <svg className="crosshair ch-tl" viewBox="0 0 40 40"><path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth=".6"/></svg>
          <svg className="crosshair ch-tr" viewBox="0 0 40 40"><path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth=".6"/></svg>
          <svg className="crosshair ch-bl" viewBox="0 0 40 40"><path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth=".6"/></svg>
          <svg className="crosshair ch-br" viewBox="0 0 40 40"><path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth=".6"/></svg>

          <div className="hero-grid">
            {/* LEFT: meta */}
            <aside className="hero-left">
              <div className="hero-kicker">
                <span className="dot" />
                <span className="mono">{t('hero.kicker')}</span>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-num">100K+</span>
                  <span className="stat-lbl mono">YouTube</span>
                </div>
                <div className="stat">
                  <span className="stat-num">104<span className="plus">+</span></span>
                  <span className="stat-lbl mono">{t('hero.s_members')}</span>
                </div>
                <div className="stat">
                  <span className="stat-num">70.6<span className="pct">%</span></span>
                  <span className="stat-lbl mono">{t('hero.s_retention')}</span>
                </div>
              </div>
              <p className="hero-latin serif-italic">« Pro Mundi Beneficio »</p>
              <p className="hero-latin-tr mono">{t('hero.latin_tr')}</p>
            </aside>

            {/* CENTER: portrait diptych */}
            <div className="hero-center">
              <figure className="portrait-frame" id="portraitFrame">
                <div className="portrait-layer portrait-fresco">
                  <img src="/assets/fresco-sun-god.avif" alt="Renaissance fresco: sun god" />
                </div>
                <div className="portrait-layer portrait-photo">
                  <img id="heroPortrait" src={heroPortrait} alt="Rodrigo De La Torre" />
                </div>
                <div className="portrait-halo" aria-hidden="true">
                  <svg viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" strokeWidth=".6" strokeDasharray="2 4"/>
                  </svg>
                </div>
                <figcaption className="portrait-cap mono">
                  <span>FIG. I</span>
                  <span>—</span>
                  <span>{t('hero.cap')}</span>
                </figcaption>
              </figure>
            </div>

            {/* RIGHT: title */}
            <div className="hero-right">
              <h1 className="hero-title">
                <span className="line" data-reveal="">
                  <span className="word">El</span>
                  <span className="word"><em>arte</em></span>
                  <span className="word">de</span>
                </span>
                <span className="line" data-reveal="">
                  <span className="word">construir</span>
                  <span className="word">con</span>
                </span>
                <span className="line gold" data-reveal="">
                  <span className="word">inteligencia.</span>
                </span>
              </h1>

              <p
                className="hero-lede"
                dangerouslySetInnerHTML={{ __html: t('hero.lede') }}
              />

              <div className="hero-cta">
                <a href="#consulting" className="btn btn-primary magnetic">
                  <span>{t('hero.cta1')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>
                </a>
                <a href="#society" className="btn btn-ghost magnetic">
                  <span>{t('hero.cta2')}</span>
                </a>
              </div>

              <div className="hero-signature">
                <svg viewBox="0 0 200 60" className="sig">
                  <path d="M5,42 C20,10 35,60 50,30 S80,5 100,35 130,55 150,25 180,40 195,20" fill="none" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <div className="sig-meta mono">
                  <span>RDLT</span>
                  <span>·</span>
                  <span>MMXXVI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator mono">
            <span>{t('hero.scroll')}</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee-row">
          <div className="marquee">
            <div className="marquee-track">
              {['Automatizaciones','Prompt Engineering','Context Engineering','N8N Systems','Vibe Coding','Agentes Autónomos','Consultoría B2B','Productos IA','Formación Ejecutiva','Fractalidad'].flatMap((item, i, arr) => [
                <span key={`a${i}`}>{item}</span>,
                <span key={`sa${i}`} className="m-sep">✦</span>,
              ])}
              {['Automatizaciones','Prompt Engineering','Context Engineering','N8N Systems','Vibe Coding','Agentes Autónomos','Consultoría B2B','Productos IA','Formación Ejecutiva','Fractalidad'].flatMap((item, i) => [
                <span key={`b${i}`}>{item}</span>,
                <span key={`sb${i}`} className="m-sep">✦</span>,
              ])}
            </div>
          </div>
        </section>

        {/* MANIFIESTO */}
        <section id="manifiesto" className="section manifesto">
          <div className="section-head">
            <span className="section-num mono">§ I</span>
            <h2 className="section-title scramble" data-text="Manifiesto">{t('sec.manifesto')}</h2>
            <span className="section-latin serif-italic">— Credo operarii</span>
          </div>
          <div className="manifesto-grid">
            <blockquote className="manifesto-quote">
              <p>
                <span className="drop-cap">C</span>reo que la <em>Inteligencia Artificial</em> no es un reemplazo, sino un <span className="gold">traje de armadura</span> para el profesional que ya sabe lo que hace.
              </p>
              <p>
                Que sin <em>fundamentos</em> no hay conocimiento, y sin conocimiento no hay soberanía. Que <em>copiar un prompt</em> es ser albañil; <em>entender el sistema</em> es ser arquitecto.
              </p>
              <p>
                Construyo para que LATAM hispanohablante tenga acceso, dignidad y voz propia en la era de las máquinas pensantes.
              </p>
            </blockquote>
            <aside className="manifesto-side">
              <figure className="side-fresco">
                <img src="/assets/fresco-angel.avif" alt="Ángel renacentista" />
                <figcaption className="mono">FIG. II · ANGELVS · FRESCO S. XVI</figcaption>
              </figure>
              <dl className="creed-list">
                <div><dt className="mono">01</dt><dd>Sin bases, no hay conocimiento.</dd></div>
                <div><dt className="mono">02</dt><dd>La IA potencia — nunca reemplaza.</dd></div>
                <div><dt className="mono">03</dt><dd>Fractalidad: el patrón se repite.</dd></div>
                <div><dt className="mono">04</dt><dd>Pro Mundi Beneficio.</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        {/* BIO */}
        <section id="bio" className="section bio">
          <div className="section-head">
            <span className="section-num mono">§ II</span>
            <h2 className="section-title scramble" data-text="Persona">{t('sec.bio')}</h2>
            <span className="section-latin serif-italic">— De origine et operibus</span>
          </div>
          <div className="bio-grid">
            <div className="bio-portrait-col">
              <figure className="bio-portrait">
                <img src="/assets/portrait-2.jpg" alt="Rodrigo De La Torre" />
                <div className="tape tape-tl mono">RDLT·02</div>
                <div className="tape tape-br mono">COPIA · 1/1</div>
              </figure>
              <figure className="bio-portrait-sm">
                <img src="/assets/portrait-glasses.jpg" alt="Rodrigo" />
              </figure>
              <figure className="bio-portrait-sm">
                <img src="/assets/portrait-3.jpg" alt="Rodrigo" />
              </figure>
            </div>
            <div className="bio-text">
              <p className="bio-lede">
                Nací en <strong>Morelia</strong>, crecí entre libros de sistemas y conversaciones con máquinas. Hoy construyo la infraestructura que faltaba para que LATAM no vea la IA desde el estribo, sino desde la cabina.
              </p>
              <div className="bio-body">
                <p>
                  Mi nombre es <strong>Rodrigo De La Torre</strong>. Soy CEO y fundador de <strong>Orion AI Consulting</strong> —agencia de consultoría en IA para negocios— y de la comunidad educativa <strong>Orion AI Society</strong>, respaldada institucionalmente por la Fundación SEAAF (<em>South East Astro AI Foundation</em>).
                </p>
                <p>
                  Mi obsesión es la <em>fractalidad</em>: que el patrón que funciona para un prompt funcione para un agente, y el que funciona para un agente sirva para una organización. Lo que enseño, lo aplico. Lo que aplico, lo documento. Lo que documento, se vuelve currículo.
                </p>
                <p>
                  Publico semanalmente en YouTube para más de <strong>100,000</strong> profesionales hispanohablantes, y mi comunidad tiene una retención de <strong>70.6%</strong> — el doble del promedio de la industria.
                </p>
              </div>
              <div className="bio-meta">
                <div className="meta-col">
                  <span className="mono meta-lbl">Base</span>
                  <span className="meta-val">Morelia, MX ↔ Panamá, PA</span>
                </div>
                <div className="meta-col">
                  <span className="mono meta-lbl">Rol</span>
                  <span className="meta-val">CEO · Consultor · Divulgador</span>
                </div>
                <div className="meta-col">
                  <span className="mono meta-lbl">Método</span>
                  <span className="meta-val">Fractalidad™</span>
                </div>
                <div className="meta-col">
                  <span className="mono meta-lbl">Idiomas</span>
                  <span className="meta-val">Español · English</span>
                </div>
              </div>
              <ul className="bio-tl">
                <li><span className="tl-yr mono">2019</span><span className="tl-dot" /><span className="tl-txt">Primer contacto profundo con LLMs. Empieza la obsesión.</span></li>
                <li><span className="tl-yr mono">2023</span><span className="tl-dot" /><span className="tl-txt">Lanzamiento del canal de YouTube. 10K suscriptores en 6 meses.</span></li>
                <li><span className="tl-yr mono">2024</span><span className="tl-dot" /><span className="tl-txt">Fundación de Orion AI Consulting. Primeros clientes enterprise.</span></li>
                <li><span className="tl-yr mono">2025</span><span className="tl-dot" /><span className="tl-txt">Nacimiento de Orion AI Society. Alianza con Fundación SEAAF.</span></li>
                <li><span className="tl-yr mono">2026</span><span className="tl-dot" /><span className="tl-txt">100K+ en YouTube · 104+ miembros · convenios B2G.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONSULTING */}
        <section id="consulting" className="section consulting">
          <div className="section-head">
            <span className="section-num mono">§ III</span>
            <h2 className="section-title scramble" data-text="Orion AI Consulting">{t('sec.consulting')}</h2>
            <span className="section-latin serif-italic">— Ars machinarum</span>
          </div>
          <div className="consulting-intro">
            <p className="serif-body">
              Agencia de consultoría enfocada en empresas que quieren <em>dejar de hablar de IA</em> y empezar a operar con ella. Automatización, desarrollo de producto, estrategia y formación ejecutiva — todo con un único criterio: <strong>ROI medible en 90 días o menos</strong>.
            </p>
            <a href="#contacto" className="btn btn-outline magnetic">
              <span>{t('consulting.cta')}</span>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>
            </a>
          </div>
          <div className="services-grid">
            <article className="service">
              <header className="service-head">
                <span className="mono service-n">01</span>
                <span className="service-tag mono">Operación</span>
              </header>
              <h3 className="service-title">Automatización de Procesos</h3>
              <p className="service-body">Sistemas N8N de grado industrial: CRM, cotización, onboarding, soporte, reporting. Agentes autónomos con memoria y lógica condicional que reemplazan horas de trabajo operativo.</p>
              <ul className="service-tags mono"><li>N8N</li><li>Zapier</li><li>Make</li><li>APIs custom</li></ul>
            </article>
            <article className="service">
              <header className="service-head">
                <span className="mono service-n">02</span>
                <span className="service-tag mono">Estrategia</span>
              </header>
              <h3 className="service-title">Consultoría en Desarrollo de Software</h3>
              <p className="service-body">Arquitectura técnica, selección de stack, due diligence, auditoría de código. Acompañamos equipos internos para que lo que se construya escale y no colapse al tercer sprint.</p>
              <ul className="service-tags mono"><li>Arquitectura</li><li>Code review</li><li>Stack</li><li>DevOps IA</li></ul>
            </article>
            <article className="service">
              <header className="service-head">
                <span className="mono service-n">03</span>
                <span className="service-tag mono">Producto</span>
              </header>
              <h3 className="service-title">Creación de Productos IA</h3>
              <p className="service-body">De idea a MVP funcional en 30–60 días. Chatbots especializados, copilotos internos, agentes verticales, plataformas de generación de contenido. Claude Code + Vibe Coding + equipo dedicado.</p>
              <ul className="service-tags mono"><li>MVPs</li><li>Copilotos</li><li>RAG</li><li>Multi-agente</li></ul>
            </article>
            <article className="service">
              <header className="service-head">
                <span className="mono service-n">04</span>
                <span className="service-tag mono">Liderazgo</span>
              </header>
              <h3 className="service-title">Desarrollo Estratégico con IA</h3>
              <p className="service-body">Sesiones ejecutivas 1:1 y grupales para directores y founders. Diseño del roadmap IA de la compañía, mapa de oportunidades, priorización por impacto y formación del liderazgo.</p>
              <ul className="service-tags mono"><li>C-Suite</li><li>Roadmap</li><li>Cambio cultural</li><li>KPIs IA</li></ul>
            </article>
          </div>
          <div className="tiers">
            <div className="tier">
              <span className="tier-kicker mono">TIER I</span>
              <h4 className="tier-title">Diagnóstico Fractal</h4>
              <p className="tier-body">Auditoría 360° de tu operación, mapa de procesos automatizables y plan priorizado por ROI.</p>
              <span className="tier-meta mono">2 semanas · reporte ejecutivo</span>
            </div>
            <div className="tier tier-featured">
              <span className="tier-kicker mono">TIER II — RECOMENDADO</span>
              <h4 className="tier-title">Implementación Dirigida</h4>
              <p className="tier-body">Construcción de 3–5 sistemas críticos, integración y traspaso al equipo interno con documentación.</p>
              <span className="tier-meta mono">60–90 días · equipo dedicado</span>
            </div>
            <div className="tier">
              <span className="tier-kicker mono">TIER III</span>
              <h4 className="tier-title">Socio Estratégico</h4>
              <p className="tier-body">Retainer mensual: CTO-IA fraccional, mentoría ejecutiva y desarrollo continuo de capacidades.</p>
              <span className="tier-meta mono">12+ meses · equity opcional</span>
            </div>
          </div>
        </section>

        {/* SOCIETY */}
        <section id="society" className="section society">
          <div className="section-head">
            <span className="section-num mono">§ IV</span>
            <h2 className="section-title scramble" data-text="Orion AI Society">{t('sec.society')}</h2>
            <span className="section-latin serif-italic">— Collegium discipulorum</span>
          </div>
          <div className="society-hero">
            <div className="society-hero-left">
              <p className="society-kicker mono">LA COMUNIDAD POR EXCELENCIA EN IA EN ESPAÑOL</p>
              <h3 className="society-pitch serif-display">
                Donde un profesional deja de <em>seguir</em> la ola de la IA y empieza a <span className="gold">surfearla</span>.
              </h3>
              <p className="society-body">
                Comunidad educativa de élite para profesionales hispanohablantes. No es un curso: es un búnker de implementación donde los miembros aprenden, construyen y monetizan sistemas de IA reales. Respaldada por la Fundación SEAAF.
              </p>
              <div className="society-kpis">
                <div className="kpi"><span className="kpi-num">104<span className="plus">+</span></span><span className="kpi-lbl mono">Miembros</span></div>
                <div className="kpi"><span className="kpi-num">70.6%</span><span className="kpi-lbl mono">Retención</span></div>
                <div className="kpi"><span className="kpi-num">$29</span><span className="kpi-lbl mono">USD/mes desde</span></div>
                <div className="kpi"><span className="kpi-num">12</span><span className="kpi-lbl mono">Módulos</span></div>
              </div>
              <div className="society-ctas">
                <a href="https://www.skool.com/orion-ai-society" target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic">
                  <span>Entrar a la Society</span>
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>
                </a>
                <a href="#fractalidad" className="btn btn-ghost magnetic"><span>Ver metodología</span></a>
              </div>
            </div>
            <aside className="society-hero-right">
              <figure className="society-fresco">
                <img src="/assets/fresco-dome.jpg" alt="Renaissance dome" />
                <div className="society-orion">
                  <svg viewBox="0 0 200 200">
                    <g stroke="currentColor" strokeWidth=".6" fill="none" opacity=".6">
                      <circle cx="100" cy="100" r="90"/>
                      <circle cx="100" cy="100" r="70"/>
                    </g>
                    <g fill="currentColor">
                      <circle cx="60" cy="70" r="1.8"/>
                      <circle cx="90" cy="55" r="2.4"/>
                      <circle cx="120" cy="80" r="2"/>
                      <circle cx="100" cy="105" r="2.8"/>
                      <circle cx="80" cy="130" r="2.2"/>
                      <circle cx="130" cy="140" r="1.6"/>
                      <circle cx="155" cy="115" r="1.4"/>
                    </g>
                    <g stroke="currentColor" strokeWidth=".4" fill="none" opacity=".5">
                      <path d="M60,70 L90,55 L120,80 L100,105 L80,130 L130,140 L155,115"/>
                    </g>
                  </svg>
                </div>
              </figure>
            </aside>
          </div>
          <div className="pillars-head">
            <span className="mono">LOS 4 PILARES DEL CONOCIMIENTO</span>
            <span className="pillars-rule" />
            <span className="mono">× 3 NIVELES · 12 MÓDULOS</span>
          </div>
          <div className="pillars">
            <article className="pillar">
              <span className="pillar-glyph serif-display">I</span>
              <h4 className="pillar-title">Fundamentos de IA</h4>
              <p className="pillar-sub mono">EL CEREBRO · PRERREQUISITO</p>
              <p className="pillar-body">Prompt engineering, pensamiento estratégico, ingeniería de contexto. La base sobre la que todo lo demás se construye.</p>
              <ul className="pillar-levels mono"><li>🔰 Iniciado</li><li>⚡ Constructor</li><li>🔥 Arquitecto</li></ul>
            </article>
            <article className="pillar">
              <span className="pillar-glyph serif-display">II</span>
              <h4 className="pillar-title">Automatizaciones N8N</h4>
              <p className="pillar-sub mono">EL MOTOR</p>
              <p className="pillar-body">Desde tu primer flujo hasta agentes autónomos en producción con memoria y lógica compleja.</p>
              <ul className="pillar-levels mono"><li>🔰 Primera automatización</li><li>⚡ Flujos inteligentes</li><li>🔥 Sistemas autónomos</li></ul>
            </article>
            <article className="pillar">
              <span className="pillar-glyph serif-display">III</span>
              <h4 className="pillar-title">Vibe Coding</h4>
              <p className="pillar-sub mono">LA CONSTRUCCIÓN</p>
              <p className="pillar-body">Crea software real sin ser ingeniero. No-code, Cursor, Claude Code, Windsurf, Anti-Gravity.</p>
              <ul className="pillar-levels mono"><li>🔰 Sin código</li><li>⚡ IDE con IA</li><li>🔥 Laboratorio Orión</li></ul>
            </article>
            <article className="pillar">
              <span className="pillar-glyph serif-display">IV</span>
              <h4 className="pillar-title">Generación de Contenido</h4>
              <p className="pillar-sub mono">LA VOZ</p>
              <p className="pillar-body">Kit creativo, producción de video con IA, y fábrica de contenido real-time con pipelines automatizados.</p>
              <ul className="pillar-levels mono"><li>🔰 Kit creativo</li><li>⚡ Video con IA</li><li>🔥 Fábrica de contenido</li></ul>
            </article>
          </div>
          <div className="bonus-track">
            <span className="bonus-kicker mono">★ BONUS TRACK — TRANSVERSAL</span>
            <h4 className="bonus-title serif-display">Negocio: Freelancer → Agencia → Producto → Incubadora</h4>
            <p className="bonus-body">Se desbloquea desde Nivel 2. Modelo de negocio, oferta, nicho, ventas high-ticket y monetización avanzada.</p>
          </div>
        </section>

        {/* FRACTALIDAD */}
        <section id="fractalidad" className="section fractalidad">
          <div className="section-head">
            <span className="section-num mono">§ V</span>
            <h2 className="section-title scramble" data-text="Fractalidad">{t('sec.method')}</h2>
            <span className="section-latin serif-italic">— Methodus propria</span>
          </div>
          <div className="fractal-grid">
            <div className="fractal-text">
              <p className="serif-body lg">
                <span className="drop-cap">L</span>a <em>fractalidad</em> es mi metodología propia. Parte de una premisa: los principios que gobiernan una buena conversación con un LLM son los mismos que gobiernan una arquitectura de agentes. Y esos, a su vez, gobiernan una organización que opera con IA.
              </p>
              <p>
                Si entiendes el <em>fundamento</em>, la escala deja de importar. Dejas de perseguir herramientas; empiezas a dominar patrones.
              </p>
              <blockquote className="inline-quote">
                « El arquitecto ve el edificio antes de la primera piedra.<br/>
                El albañil solo ve la piedra. »
              </blockquote>
            </div>
            <div className="fractal-viz">
              <svg viewBox="0 0 400 400" className="fractal-svg">
                <defs>
                  <radialGradient id="rg" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity=".35"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="180" fill="url(#rg)"/>
                <g fill="none" stroke="currentColor" strokeWidth=".6" opacity=".55">
                  <circle cx="200" cy="200" r="180"/>
                  <circle cx="200" cy="200" r="130"/>
                  <circle cx="200" cy="200" r="85"/>
                  <circle cx="200" cy="200" r="45"/>
                  <circle cx="200" cy="200" r="18"/>
                </g>
                <g className="fractal-rotor" style={{transformOrigin: '200px 200px'}}>
                  <g fill="currentColor">
                    <circle cx="200" cy="20" r="3"/>
                    <circle cx="200" cy="70" r="2.4"/>
                    <circle cx="200" cy="115" r="2"/>
                    <circle cx="200" cy="155" r="1.6"/>
                    <circle cx="200" cy="182" r="1.2"/>
                  </g>
                </g>
                <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="currentColor" opacity=".8">
                  <text x="200" y="8" textAnchor="middle">ORGANIZACIÓN</text>
                  <text x="200" y="60" textAnchor="middle">SISTEMA</text>
                  <text x="200" y="105" textAnchor="middle">AGENTE</text>
                  <text x="200" y="148" textAnchor="middle">FLUJO</text>
                  <text x="200" y="205" textAnchor="middle">PROMPT</text>
                </g>
              </svg>
              <figcaption className="mono fractal-cap">FIG. III · ANATOMÍA FRACTAL DE UN SISTEMA DE IA</figcaption>
            </div>
          </div>
          <div className="fractal-principles">
            <div className="principle"><span className="mono p-n">·i</span><span className="p-t">Patrón antes que herramienta</span></div>
            <div className="principle"><span className="mono p-n">·ii</span><span className="p-t">Contexto antes que prompt</span></div>
            <div className="principle"><span className="mono p-n">·iii</span><span className="p-t">Sistema antes que agente</span></div>
            <div className="principle"><span className="mono p-n">·iv</span><span className="p-t">Operación antes que estrategia</span></div>
            <div className="principle"><span className="mono p-n">·v</span><span className="p-t">Humano antes que máquina</span></div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="section proyectos">
          <div className="section-head">
            <span className="section-num mono">§ VI</span>
            <h2 className="section-title scramble" data-text="Proyectos">{t('sec.projects')}</h2>
            <span className="section-latin serif-italic">— Opera selecta</span>
          </div>
          <div className="projects">
            <article className="project">
              <div className="project-media">
                <div className="proj-fresco"><img src="/assets/fresco-ceiling.jpg" alt=""/></div>
                <div className="proj-overlay">
                  <span className="mono">CASE № 01</span>
                  <span className="mono">B2G · PANAMÁ</span>
                </div>
              </div>
              <div className="project-body">
                <h4>Plataforma educativa nacional</h4>
                <p>Diseño e implementación de la infraestructura IA para democratizar alfabetización digital en Panamá, junto a Fundación SEAAF y alianza con Microsoft.</p>
                <ul className="proj-meta mono">
                  <li>Sector · Gobierno</li><li>Stack · Azure · n8n · React</li><li>Impacto · +10k ciudadanos/año</li>
                </ul>
              </div>
            </article>
            <article className="project">
              <div className="project-media">
                <div className="proj-fresco"><img src="/assets/fresco-greco.jpg" alt=""/></div>
                <div className="proj-overlay">
                  <span className="mono">CASE № 02</span>
                  <span className="mono">B2B · PYME</span>
                </div>
              </div>
              <div className="project-body">
                <h4>Agencia de marketing con 40% menos horas</h4>
                <p>Rediseño de operación con 7 agentes N8N: cotización, onboarding, reporting y QA de campañas. ROI positivo en el mes 2.</p>
                <ul className="proj-meta mono">
                  <li>Sector · Marketing</li><li>Stack · n8n · Claude · Airtable</li><li>Impacto · −40% horas operativas</li>
                </ul>
              </div>
            </article>
            <article className="project">
              <div className="project-media">
                <div className="proj-fresco"><img src="/assets/fresco-oval.avif" alt=""/></div>
                <div className="proj-overlay">
                  <span className="mono">CASE № 03</span>
                  <span className="mono">PRODUCTO</span>
                </div>
              </div>
              <div className="project-body">
                <h4>Copiloto vertical para despachos legales</h4>
                <p>MVP de agente RAG especializado en jurisprudencia mexicana. De idea a producto facturable en 45 días.</p>
                <ul className="proj-meta mono">
                  <li>Sector · Legal</li><li>Stack · Claude · Pinecone · Next</li><li>Impacto · MRR $4.2k desde mes 3</li>
                </ul>
              </div>
            </article>
            <article className="project">
              <div className="project-media">
                <div className="proj-fresco"><img src="/assets/fresco-angels.jpg" alt=""/></div>
                <div className="proj-overlay">
                  <span className="mono">CASE № 04</span>
                  <span className="mono">CONTENIDO</span>
                </div>
              </div>
              <div className="project-body">
                <h4>Fábrica de contenido real-time</h4>
                <p>Pipeline que produce 30 piezas de contenido por semana desde una sola sesión de grabación. Usado internamente por Orion.</p>
                <ul className="proj-meta mono">
                  <li>Sector · Media</li><li>Stack · Creatomate · Eleven · n8n</li><li>Impacto · 10× output creativo</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* CANAL / YOUTUBE */}
        <section id="contenido" className="section contenido">
          <div className="section-head">
            <span className="section-num mono">§ VII</span>
            <h2 className="section-title scramble" data-text="Canal">{t('sec.content')}</h2>
            <span className="section-latin serif-italic">— Verba publica</span>
          </div>
          <div className="yt-hero">
            <div className="yt-left">
              <p className="yt-kicker mono">YOUTUBE · @RodrigoDeLaTorre-AI</p>
              <h3 className="yt-title serif-display">
                Cada semana publico la IA que <em>realmente</em> importa para tu trabajo.
              </h3>
              <p className="yt-body">
                Tutoriales profundos, análisis de herramientas, y la metodología de Fractalidad aplicada a casos reales. Sin humo, sin hype, sin prompts copiados. Más de <strong>100,000 profesionales</strong> ya aprenden aquí.
              </p>
              <a href="https://www.youtube.com/@RodrigoDeLaTorre-AI" target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic">
                <span>Suscribirme al canal</span>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>
              </a>
            </div>
            <div className="yt-right">
              <ul className="videos">
                {[
                  { src: '/assets/portrait-5.jpg', cat: 'ARQUITECTURA', title: 'Construyendo tu primer agente autónomo con N8N', stats: '47k · hace 3 días', dur: '18:42' },
                  { src: '/assets/portrait-4.jpg', cat: 'PROMPT ENG.', title: 'La técnica que cambió mi forma de hablarle a Claude', stats: '82k · 1 semana', dur: '23:15' },
                  { src: '/assets/portrait-3.jpg', cat: 'NEGOCIO', title: 'Cómo cobré $12k por mi primer agente vertical', stats: '134k · 2 semanas', dur: '12:08' },
                  { src: '/assets/portrait-2.jpg', cat: 'MASTERCLASS', title: 'Fractalidad: el único framework que necesitas', stats: '68k · 1 mes', dur: '31:47' },
                ].map((v, i) => (
                  <li key={i} className="video">
                    <div className="video-thumb">
                      <img src={v.src} alt=""/>
                      <span className="play">▶</span>
                      <span className="dur mono">{v.dur}</span>
                    </div>
                    <div className="video-meta">
                      <span className="mono vid-cat">{v.cat}</span>
                      <h5>{v.title}</h5>
                      <span className="mono vid-stats">{v.stats}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="section testimonios">
          <div className="section-head">
            <span className="section-num mono">§ VIII</span>
            <h2 className="section-title scramble" data-text="Testimonia">{t('sec.testimonials')}</h2>
            <span className="section-latin serif-italic">— Voces discipulorum</span>
          </div>
          <div className="tmarquee">
            <div className="tmarquee-track">
              {[
                { quote: '« Rodrigo no vende prompts. Vende <em>soberanía operativa</em>. Mi despacho facturó 30% más en el primer trimestre. »', name: 'Álvaro M.', role: 'DESPACHO LEGAL · CDMX' },
                { quote: '« Llevaba dos años entre cursos de IA sin llegar a nada. Con la Society, en dos meses tenía mi primer agente en producción. »', name: 'Lucía R.', role: 'CONSULTORA INDEPENDIENTE · MONTERREY' },
                { quote: '« El diagnóstico de Orion AI Consulting nos reveló 17 procesos automatizables. Hoy operamos con 4 personas menos y más volumen. »', name: 'Javier P.', role: 'CEO · LOGÍSTICA · PANAMÁ' },
                { quote: '« La fractalidad es real. Una vez que la ves, no puedes des-verla. Rodrigo explica lo complejo como un maestro de escuela. »', name: 'Sofía G.', role: 'PM · FINTECH · BOGOTÁ' },
                { quote: '« El mejor dinero que invertí en formación en los últimos 5 años. Sin exagerar. »', name: 'Diego A.', role: 'FUNDADOR · AGENCIA · BUENOS AIRES' },
              ].flatMap((card, i) => [
                <figure key={`t${i}`} className="tcard">
                  <blockquote dangerouslySetInnerHTML={{ __html: card.quote }} />
                  <figcaption>
                    <strong>{card.name}</strong>
                    <span className="mono">{card.role}</span>
                  </figcaption>
                </figure>,
                // Duplicate for seamless loop
                i < 3 ? <figure key={`td${i}`} className="tcard">
                  <blockquote dangerouslySetInnerHTML={{ __html: card.quote }} />
                  <figcaption>
                    <strong>{card.name}</strong>
                    <span className="mono">{card.role}</span>
                  </figcaption>
                </figure> : null,
              ]).filter(Boolean)}
            </div>
          </div>
        </section>

        {/* ENSAYOS */}
        <section id="blog" className="section blog">
          <div className="section-head">
            <span className="section-num mono">§ IX</span>
            <h2 className="section-title scramble" data-text="Ensayos">{t('sec.essays')}</h2>
            <span className="section-latin serif-italic">— Scripta minora</span>
          </div>
          <ul className="essays">
            {[
              { date: 'MMXXVI · 04 · 14', title: 'El arquitecto, el albañil y el prompt de tres líneas', lede: 'Sobre la diferencia entre quien copia y quien construye — y por qué la segunda será la única profesión que quede en cinco años.' },
              { date: 'MMXXVI · 03 · 27', title: 'Pro Mundi Beneficio: por qué la ética precede a la IA', lede: 'La Fundación SEAAF no nació como accesorio: nació como respuesta a la pregunta que nadie quiere hacerse en LATAM.' },
              { date: 'MMXXVI · 03 · 02', title: 'El traje de Iron Man no se usa sin entrenar', lede: 'Por qué la mayoría de profesionales 35–65 fallan con la IA no por falta de talento, sino de método.' },
              { date: 'MMXXVI · 02 · 10', title: 'Fractalidad: el mapa que faltaba', lede: 'Cinco años de enseñar IA comprimidos en una sola idea que puedes aplicar hoy.' },
            ].map((essay, i) => (
              <li key={i} className="essay">
                <span className="essay-date mono">{essay.date}</span>
                <div>
                  <h4 className="essay-title">{essay.title}</h4>
                  <p className="essay-lede">{essay.lede}</p>
                </div>
                <span className="essay-cta mono">Leer ensayo →</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="section contacto">
          <div className="contacto-inner">
            <div className="contacto-fresco" aria-hidden="true">
              <img src="/assets/fresco-angel.avif" alt=""/>
            </div>
            <span className="contacto-kicker mono">§ X — EPILOGO</span>
            <h2 className="contacto-title serif-display">
              <span data-reveal="">
                <span className="word">Si</span>
                <span className="word">llegaste</span>
                <span className="word">hasta</span>
                <span className="word">aquí,</span>
              </span>
              <span data-reveal="">
                <span className="word"><em>tenemos</em></span>
                <span className="word">algo</span>
                <span className="word">que</span>
                <span className="word"><span className="gold">construir.</span></span>
              </span>
            </h2>
            <p className="contacto-lede">
              Trabajo con un número limitado de clientes por trimestre. Si buscas consultoría estratégica, implementación dirigida o formación ejecutiva, la puerta está abierta.
            </p>
            <div className="contacto-ctas">
              <a href="mailto:rodrigo@orionai.consulting" className="btn btn-primary btn-lg magnetic">
                <span>Agendar llamada de diagnóstico</span>
                <svg width="16" height="16" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>
              </a>
              <a href="https://www.skool.com/orion-ai-society" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg magnetic">
                <span>Unirme a Orion AI Society</span>
              </a>
            </div>
            <div className="contacto-channels">
              <a href="mailto:rodrigo@orionai.consulting" className="channel">
                <span className="mono ch-lbl">Email</span>
                <span className="ch-val">rodrigo@orionai.consulting</span>
              </a>
              <a href="https://www.youtube.com/@RodrigoDeLaTorre-AI" target="_blank" rel="noopener noreferrer" className="channel">
                <span className="mono ch-lbl">YouTube</span>
                <span className="ch-val">@RodrigoDeLaTorre-AI</span>
              </a>
              <a href="https://www.skool.com/orion-ai-society" target="_blank" rel="noopener noreferrer" className="channel">
                <span className="mono ch-lbl">Comunidad</span>
                <span className="ch-val">skool.com/orion-ai-society</span>
              </a>
              <div className="channel">
                <span className="mono ch-lbl">Base</span>
                <span className="ch-val">Morelia, MX ↔ Panamá</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-col">
              <span className="orion-mark-big">✦</span>
              <p className="footer-name serif-display">Rodrigo De La Torre</p>
              <p className="footer-sub mono">ARCHITECTVS · SYSTEMA INTELLIGENTIAE · MMXXVI</p>
            </div>
            <div className="footer-col">
              <span className="mono footer-lbl">Ecosistema</span>
              <ul className="footer-list">
                <li>Orion AI Consulting</li>
                <li>Orion AI Society</li>
                <li>Fundación SEAAF</li>
              </ul>
            </div>
            <div className="footer-col">
              <span className="mono footer-lbl">Sigue</span>
              <ul className="footer-list">
                <li><a href="https://www.youtube.com/@RodrigoDeLaTorre-AI" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://www.skool.com/orion-ai-society" target="_blank" rel="noopener noreferrer">Skool</a></li>
                <li><a href="#contacto">LinkedIn</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <span className="mono footer-lbl">Legal</span>
              <ul className="footer-list">
                <li>Aviso de privacidad</li>
                <li>Términos</li>
                <li>© MMXXVI · Todos los derechos</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom mono">
            <span>« PRO MUNDI BENEFICIO »</span>
            <span>·</span>
            <span>HECHO EN LATAM CON IA Y SIN PRISA</span>
          </div>
        </footer>

      </main>

      {/* TWEAKS PANEL */}
      <aside className="tweaks" id="tweaks" hidden>
        <header className="tweaks-head">
          <h4>Tweaks</h4>
          <button
            className="tweaks-close"
            onClick={() => {
              document.getElementById('tweaks')?.setAttribute('hidden', '');
              try { window.parent.postMessage({ type: '__edit_mode_deactivated' }, '*'); } catch (_) {}
            }}
            aria-label="Close tweaks"
          >×</button>
        </header>
        <div className="tweak-group">
          <label className="tweak-lbl">Variation</label>
          <div className="tweak-seg" data-tweak="variation">
            <button data-val="museo" className="active" onClick={() => setTweak('variation', 'museo')}>Museo</button>
            <button data-val="cosmos" onClick={() => setTweak('variation', 'cosmos')}>Cosmos nocturno</button>
          </div>
        </div>
        <div className="tweak-group">
          <label className="tweak-lbl">Theme</label>
          <div className="tweak-seg" data-tweak="theme">
            <button data-val="light" className="active" onClick={() => setTweak('theme', 'light')}>Light</button>
            <button data-val="dark" onClick={() => setTweak('theme', 'dark')}>Dark</button>
          </div>
        </div>
        <div className="tweak-group">
          <label className="tweak-lbl">Density</label>
          <div className="tweak-seg" data-tweak="density">
            <button data-val="airy" onClick={() => setTweak('density', 'airy')}>Airy</button>
            <button data-val="editorial" className="active" onClick={() => setTweak('density', 'editorial')}>Editorial</button>
            <button data-val="dense" onClick={() => setTweak('density', 'dense')}>Dense</button>
          </div>
        </div>
        <div className="tweak-group">
          <label className="tweak-lbl">Glitch / tech fx</label>
          <div className="tweak-seg" data-tweak="glitch">
            <button data-val="on" className="active" onClick={() => setTweak('glitch', 'on')}>On</button>
            <button data-val="off" onClick={() => setTweak('glitch', 'off')}>Off</button>
          </div>
        </div>
        <div className="tweak-group">
          <label className="tweak-lbl">Hero portrait</label>
          <div className="tweak-portraits" id="tweakPortraits">
            {[
              '/assets/portrait-1.jpg',
              '/assets/portrait-2.jpg',
              '/assets/portrait-3.jpg',
              '/assets/portrait-4.jpg',
              '/assets/portrait-5.jpg',
              '/assets/portrait-glasses.jpg',
              '/assets/portrait-street.jpg',
            ].map((src, i) => (
              <button
                key={i}
                data-src={src}
                className={heroPortrait === src ? 'active' : ''}
                style={{ backgroundImage: `url('${src}')` }}
                onClick={() => setHeroPortrait(src)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* AGENT CHAT WIDGET */}
      <button
        className="agent-btn"
        onClick={() => setAgentOpen(o => !o)}
        aria-label="Abrir asistente"
        title="Habla con el asistente de Rodrigo"
      >
        ✦
      </button>

      <div className="agent-panel" hidden={!agentOpen}>
        <div className="agent-header">
          <div className="agent-header-left">
            <strong>Asistente Orion</strong>
            <span>POWERED BY CLAUDE · IA</span>
          </div>
          <button className="agent-close" onClick={() => setAgentOpen(false)}>×</button>
        </div>
        <div className="agent-messages">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`agent-msg ${msg.role === 'user' ? 'agent-msg-user' : 'agent-msg-bot'}`}
            >
              {msg.content}
            </div>
          ))}
          {chatLoading && <div className="agent-msg agent-msg-typing">Escribiendo…</div>}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="agent-form"
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        >
          <input
            className="agent-input"
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Escribe tu pregunta…"
            disabled={chatLoading}
          />
          <button className="agent-send" type="submit" disabled={chatLoading || !chatInput.trim()}>
            ENVIAR
          </button>
        </form>
      </div>
    </>
  );
}
