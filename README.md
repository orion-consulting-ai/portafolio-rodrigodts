# Rodrigo De La Torre — Portafolio Personal

> Hub de marca personal de Rodrigo De La Torre — CEO de Orion AI Consulting, fundador de Orion AI Society y divulgador de IA en YouTube (100K+ subs).

**Stack:** Next.js 15 · TypeScript · CSS custom properties · Claude Sonnet 4.6 (Anthropic SDK)  
**Repo:** [github.com/orion-consulting-ai/portafolio-rodrigodts](https://github.com/orion-consulting-ai/portafolio-rodrigodts)  
**Deployment:** Vercel (auto-deploy en push a `main`)

---

## Estructura del proyecto

```
portafolio-rodrigodts/
├── app/
│   ├── page.tsx                  # Landing page completa (client component)
│   ├── layout.tsx                # Fonts, metadata, SEO, Open Graph
│   ├── globals.css               # Sistema de diseño completo
│   └── api/
│       ├── agent/
│       │   └── route.ts          # POST /api/agent — chat con Claude Sonnet 4.6
│       └── knowledge/
│           └── route.ts          # GET/POST/DELETE /api/knowledge — base de conocimiento
├── lib/
│   ├── knowledge.ts              # Lógica CRUD + buildSystemPrompt para el agente
│   └── data/
│       └── knowledge.json        # Base de conocimiento del agente (editable)
├── public/
│   └── assets/                   # 15 imágenes: retratos, frescos renacentistas, logo
├── .env.local.example            # Variables de entorno necesarias
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Diseño

### Concepto visual
**Cosmos renacentista × dualidad antigua/futura.** Frescos del siglo XVI mezclados con UI de precisión técnica (crosshairs, tipografía monospace, placards de museo).

### Variaciones
El diseño soporta dos modos accesibles via el panel "Tweaks" (botón oculto, activado por `postMessage` desde la herramienta de diseño):

| Atributo `data-variation` | Nombre | Fondo | Ambiente |
|---|---|---|---|
| `museo` | Museo editorial | Marfil `#f4efe6` | Diurno, galería |
| `cosmos` | Cosmos nocturno | Noche `#0d0e12` | Oscuro, espacial |

También soporta `data-theme="dark"` (dark mode) y `data-density="airy|editorial|dense"` para el espaciado de secciones.

### Tipografías (Google Fonts)
- **Playfair Display** — Headings, citas, display
- **IBM Plex Sans** — Body, UI, navegación
- **JetBrains Mono** — Labels, meta, monospace

---

## Secciones de la landing

| § | Sección | Descripción |
|---|---|---|
| — | Hero | Díptico de retrato + título animado + stats en tiempo real |
| — | Marquee | Carrusel infinito de servicios |
| § I | Manifiesto | Credo operario + frescos |
| § II | Persona | Bio, galería, timeline 2019–2026 |
| § III | Orion AI Consulting | Servicios + tiers de precios |
| § IV | Orion AI Society | Comunidad educativa + 4 pilares |
| § V | Fractalidad | Metodología propia + visualización SVG |
| § VI | Proyectos | 4 casos de estudio seleccionados |
| § VII | Canal | YouTube + últimos videos |
| § VIII | Testimonia | Marquee de testimonios |
| § IX | Ensayos | Blog / artículos |
| § X | Contacto | CTA final + canales |

---

## Framework del Agente IA

El portafolio incluye un agente de IA basado en Claude (botón `✦` en esquina inferior izquierda) que responde preguntas sobre Rodrigo, sus servicios y metodología.

### Arquitectura

```
Visitante → Widget chat (page.tsx)
               ↓ POST /api/agent
           route.ts → loadKnowledge() → buildSystemPrompt()
               ↓
           Claude Sonnet 4.6 (con prompt caching)
               ↓
           Respuesta → Widget
```

### Base de conocimiento (`lib/data/knowledge.json`)

El agente se alimenta de entradas estructuradas en JSON. Categorías actuales:
- `profile` — Información personal y de marca
- `services` — Servicios de consultoría
- `pricing` — Tiers y precios
- `community` — Orion AI Society
- `methodology` — Fractalidad™
- `projects` — Casos de estudio
- `contact` — Canales de contacto
- `client_interaction` — Notas post-cliente (se agregan vía API)

### API del agente

#### `POST /api/agent` — Chat público
```bash
curl -X POST https://tu-dominio.vercel.app/api/agent \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Qué incluye el Diagnóstico Fractal?",
    "history": []
  }'
```
Responde con `{ "content": "...", "usage": { ... } }`.

#### `GET /api/knowledge` — Listar entradas (protegido)
```bash
curl https://tu-dominio.vercel.app/api/knowledge \
  -H "x-api-key: TU_KNOWLEDGE_API_SECRET"
```

#### `POST /api/knowledge` — Agregar conocimiento (protegido)
```bash
# Ideal para usar después de una sesión con un cliente
curl -X POST https://tu-dominio.vercel.app/api/knowledge \
  -H "x-api-key: TU_KNOWLEDGE_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Cliente del sector legal en CDMX. Necesita automatización de contratos y revisión de documentos. Presupuesto aprox $15k USD. Está evaluando entre Tier II y Tier III.",
    "category": "client_interaction",
    "metadata": { "source": "consulta_2026_04", "priority": "medium" }
  }'
```

#### `DELETE /api/knowledge?id=xxx` — Eliminar entrada (protegido)
```bash
curl -X DELETE "https://tu-dominio.vercel.app/api/knowledge?id=ENTRY_ID" \
  -H "x-api-key: TU_KNOWLEDGE_API_SECRET"
```

---

## Configuración local

### 1. Clonar el repositorio
```bash
git clone https://github.com/orion-consulting-ai/portafolio-rodrigodts.git
cd portafolio-rodrigodts
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de entorno
Copia el archivo de ejemplo y completa los valores:
```bash
cp .env.local.example .env.local
```

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-...         # Obtén en console.anthropic.com
KNOWLEDGE_API_SECRET=tu-secreto      # String aleatorio seguro (min 32 chars)
```

### 4. Desarrollo local
```bash
npm run dev
# → http://localhost:3000
```

### 5. Build de producción
```bash
npm run build
npm run start
```

---

## Deployment en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Importa `orion-consulting-ai/portafolio-rodrigodts`
3. En **Environment Variables** agrega:
   - `ANTHROPIC_API_KEY`
   - `KNOWLEDGE_API_SECRET`
4. **Deploy** — Vercel detecta Next.js automáticamente

Cada `git push` a `main` dispara un re-deploy automático.

---

## Animaciones e interacciones

| Efecto | Implementación |
|---|---|
| Cursor spotlight | JS `requestAnimationFrame` con lerp 0.12 |
| Magnetic buttons | `mousemove` → `translate(x*0.18, y*0.25)` |
| Word reveal | `IntersectionObserver` + `translateY(110%→0)` |
| Scramble titles | Chars aleatorios → texto final en 1200ms |
| Parallax frescos | `scroll` → `translateY(offset * -0.05)` |
| Aurora hero | 3 blobs CSS `@keyframes`, `mix-blend-mode: multiply` |
| Marquee | CSS puro `translateX(0 → -50%)`, sin JS |
| Halo retrato | SVG `stroke-dasharray`, rotación 120s |
| Fractal SVG | Grupo rotatorio 80s, `transform-origin: center` |

> Todas las animaciones respetan `prefers-reduced-motion` en producción (pendiente de implementar).

---

## Roadmap próxima sesión

- [ ] **Agente con streaming** — Respuestas en tiempo real (texto aparece carácter a carácter)
- [ ] **Widget rediseñado** — Animación de entrada, chips de preguntas sugeridas, tipografía Playfair en respuestas
- [ ] **Google Calendar** — Reemplazar `mailto:` en CTA de "Agendar" con link de Google Calendar Appointment Scheduling
- [ ] **Copywriting** — Revisar y mejorar copy sección por sección con Rodrigo
- [ ] **SEO avanzado** — Schema.org Person/Organization, sitemap.xml, robots.txt
- [ ] **Analytics** — Plausible o GA4 con eventos de conversión en CTAs

---

## Variables de entorno (resumen)

| Variable | Descripción | Requerida |
|---|---|---|
| `ANTHROPIC_API_KEY` | API key de Anthropic para Claude | Sí |
| `KNOWLEDGE_API_SECRET` | Secreto para proteger endpoints de admin del agente | Sí |
| `NEXT_PUBLIC_CALENDAR_URL` | URL de Google Calendar Appointment Scheduling | Próxima sesión |

---

## Contacto

**Rodrigo De La Torre**  
`rodrigo@orionai.consulting`  
[youtube.com/@RodrigoDeLaTorre-AI](https://www.youtube.com/@RodrigoDeLaTorre-AI)  
[skool.com/orion-ai-society](https://www.skool.com/orion-ai-society)

---

*« Pro Mundi Beneficio » · Hecho en LATAM con IA y sin prisa*
