# Arquitectura del Sistema BioEquipManager

## Objetivos del sistema
- Centralizar la gestión del inventario biomédico, mantenimiento y soporte técnico.
- Garantizar trazabilidad completa de equipos, responsables, mantenimientos y documentos.
- Exponer servicios seguros y escalables que soporten operaciones en tiempo real y análisis históricas.
- Facilitar experiencias de usuario ricas (SSR/ISR) con Next.js y capacidades offline parciales.

## Vista general de componentes
- **Front-End**: Next.js 14 (App Router) + TypeScript desplegado como aplicación híbrida (SSR/SSG/ISR) con Tailwind CSS y shadcn/ui. Actúa como interfaz principal y BFF ligero para optimizar llamadas al backend.
- **Back-End**: FastAPI modular (async) con arquitectura hexagonal, servicios de dominio y repositorios sobre SQLAlchemy 2.0. Expone API REST y eventos asíncronos.
- **Base de datos**: PostgreSQL 15 gestionado con SQLAlchemy/Alembic. Almacena entidades core, catálogos y auditorías.
- **Procesamiento asíncrono**: Celery + Redis/RabbitMQ para tareas de largo aliento (importaciones, notificaciones, generación de reportes).
- **Almacenamiento de archivos**: S3 compatible (MinIO/local en dev, AWS S3 en prod) para guardar hojas de vida, evidencias y reportes.
- **Infraestructura**: Contenedores Docker, orquestación Kubernetes (prod) y Docker Compose (dev). Observabilidad con Prometheus/Grafana, logging estructurado con OpenTelemetry + Loki.

## Front-End (Next.js)
- **Stack**: Next.js 14 App Router, React Server Components, TypeScript estricto, ESLint + Prettier. Tailwind CSS y shadcn/ui para componentes accesibles. Zustand o TanStack Query para estado cliente y cacheo.
- **Estructura propuesta**:
  - `app/` con rutas segmentadas (`app/(protected)/dashboard`, `app/(auth)/login`, `app/api/*` para handlers BFF).
  - `components/` compartidos (tablas, formularios, gráficos con Recharts/ECharts).
  - `features/` por dominio (`inventory`, `maintenance`, `support`, `auth`) con hooks y servicios aislados.
  - `lib/` para SDK de API, configuración Axios/Fetch con interceptores y manejo centralizado de errores.
- **Arquitectura de archivos actual**:
  - `package.json`: scripts (`dev`, `build`, `start`, `lint`), dependencias de producción (Next 14, React 18, Tailwind, `lucide-react`, `clsx`, `tailwind-merge`) y devDependencies (TypeScript, ESLint, Tailwind CLI, PostCSS). Define engines para exigir Node ≥18.17.
  - `next.config.js`: activa `reactStrictMode` y `serverActions` (experimental) para habilitar patrones modernos en App Router.
  - `tsconfig.json`: configura TypeScript estricto, `moduleResolution` tipo bundler y alias (`@/*`, `@features/*`, `@components/*`, etc.) que permiten importaciones limpias y reusables.
  - `tailwind.config.ts`: limita el escaneo a `src/app`, `src/components` y `src/features`, extiende paleta `brand`, define tipografías (`Outfit`, `Inter`) y sombras personalizadas para las tarjetas.
  - `postcss.config.js`: declara `tailwindcss` y `autoprefixer` como plugins para la fase de build.
  - `next-env.d.ts`: referencia los tipos de Next; no debe editarse manualmente.
  - `public/`: espacio para íconos y activos estáticos del frontend.
  - `src/app/globals.css`: registra capas de Tailwind, tema oscuro base y utilidades (`surface-card`, `text-gradient`).
  - `src/app/layout.tsx`: layout raíz con fuente Outfit y `body` base; carga `globals.css`.
  - `src/app/(public)/*`: layouts/páginas públicas (`layout.tsx`, `login/page.tsx`) con UI de bienvenida y formulario.
  - `src/app/(app)/layout.tsx`: envuelve zonas autenticadas usando `AppShell`. Dentro se alojan las páginas modulares (`dashboard`, `inventario`, `mantenimiento`, `soporte`, `perfil`), cada una compuesta por componentes mock listos para conectar con la API.
  - `src/components/ui/*`: primitivos reutilizables (`button.tsx`, `card.tsx`) con variantes y estados de carga.
  - `src/components/navigation/*`: barra lateral (`sidebar.tsx`), topbar (`topbar.tsx`) y helper para íconos (`sidebarIcon.tsx`), alimentados por `src/data/navigation.ts`.
  - `src/components/layout/app-shell.tsx`: orquesta la shell responsive (sidebar colapsable, topbar y contenedor de vistas).
  - `src/features/**/components`: agrupaciones por dominio (dashboard, inventario, mantenimiento, soporte, perfil) que definen tarjetas, tablas y timelines con datos simulados.
  - `src/lib/cn.ts`: helper `cn` que combina `clsx` con `tailwind-merge` para clases condicionales.
- **Autenticación**: NextAuth.js con proveedores de credenciales personalizados. Uso de JWT firmados por FastAPI, refresco vía endpoints `/auth/refresh`. Middleware de ruta para proteger segmentos `(protected)`.
- **Data fetching**:
  - SSR para vistas dashboard, inventario y mantenimiento para SEO/control de acceso inicial.
  - ISR o SSG para catálogos estáticos (listados de proveedores, tipologías).
  - React Query para mutaciones optimistas y sincronización con API.
- **Internacionalización y accesibilidad**: next-intl (ES/EN), componentes respetando WCAG 2.1 AA.
- **Telemetría**: Integración con OpenTelemetry SDK Web para métricas de rendimiento y logs cliente.

## Back-End (FastAPI)
- **Estructura lógica**:
  - `app/main.py`: inicialización, lifespan, routers.
  - `app/config/`: settings pydantic (`BaseSettings`) separados por entorno.
  - `app/api/` con routers versionados (`/api/v1/auth`, `/equipment`, `/maintenance`, `/support`).
  - `app/domain/` con entidades de negocio (dataclasses/pydantic models) y servicios.
  - `app/infrastructure/` para adaptadores: repositorios SQLAlchemy, clientes S3, correo, mensajería.
  - `app/core/security.py`: gestión JWT (access/refresh), OAuth2 scopes, roles RBAC.
  - `app/tasks/`: definiciones Celery para cargas intensivas.
  - `app/events/`: Publish/Subscribe (Redis Streams o RabbitMQ) para integraciones futuras.
- **Patrones**: Arquitectura hexagonal (puertos/adaptadores), separación de esquemas Pydantic (Request/Response) vs modelos de dominio. Dependencias declarativas con `fastapi.Depends`.
- **Autorización**: RBAC con roles (`admin`, `coordinator`, `technician`, `viewer`). Decoradores para scopes en endpoints. Auditoría obligatoria (tabla `audit_log`).
- **Validaciones**: Pydantic v2 + business rules en servicios. Uso de SQLAlchemy para transacciones y Unit of Work en operaciones complejas.
- **Documentación API**: OpenAPI autogenerado, personalizado con ReDoc. Contratos estabilizados y exportados para SDK front.
- **Eventos asíncronos**:
  - Celery workers para importación de equipos (desde Excel/CSV), generación de reportes PDF, notificaciones email/SMS.
  - Webhooks o WebSockets (FastAPI + Redis) para notificar al front de cambios críticos (mantenimientos urgentes).

## Base de datos (PostgreSQL)
- **Modelo principal (resumen)**:
  - `users`, `roles`, `user_roles`
  - `equipment` (datos técnicos, estado operativo, ubicaciones, integridad referencial).
  - `equipment_life_sheets`, `equipment_documents`
  - `maintenance_orders`, `maintenance_tasks`, `maintenance_reports`
  - `calibration_events`, `corrective_actions`
  - `support_tickets`, `ticket_comments`, `ticket_attachments`
  - `inventory_metrics` (materialized views para analítica rápida)
  - `audit_log`, `integration_events`
- **Prácticas**:
  - Migrations con Alembic (autogenerate + scripts manuales).
  - Uso de UUID v4 como PK, timestamps `created_at/updated_at`.
  - Soft-delete con columnas `deleted_at` donde aplique.
  - Índices compuestos en búsquedas frecuentes (estado + fecha, equipo + sede).
  - Particionamiento opcional para `audit_log`/`maintenance_orders` por año si volumen crece.
- **Data warehouse ligero**: opcional con snapshots diarios en esquemas `analytics` para BI.

## Integración Front-Back
- Comunicación asegurada vía HTTPS. Next.js usa fetch/axios al endpoint `https://api.bioequipmanager.com/api/v1`.
- Next.js route handlers (`app/api/*`) actúan como proxy opcional para unificar dominios y administrar cookies httpOnly (pattern BFF).
- Manejo de errores centralizado con códigos estandarizados (`detail`, `code`, `meta`) consumidos por front.
- WebSockets (FastAPI) o Server-Sent Events para tablero en tiempo real de mantenimientos críticos. Next.js usa `useEffect` + Zustand para actualizar UI.

## Infraestructura y despliegue
- **Contenedores**: Docker multi-stage (frontend y backend). Imágenes publicadas en registry privado (GHCR/ECR).
- **Orquestación**:
  - Dev: Docker Compose (`frontend`, `backend`, `db`, `redis`, `minio`, `mailhog`).
  - Prod: Kubernetes (EKS/GKE). Helm charts separados para front, API, workers, jobs.
- **Networking**:
  - Ingress NGINX con TLS (Let’s Encrypt o ACM).
  - Service Mesh opcional (Istio/Linkerd) para observabilidad y políticas de seguridad.
- **CI/CD**:
  - GitHub Actions: pipelines para lint/test/build, generación de imágenes, despliegue via ArgoCD o Flux.
  - Estrategia trunk-based con feature flags y ambientes `dev`, `staging`, `prod`.
- **Configuración y secretos**: Vault/Secrets Manager. Variables por entorno (`.env` solo en local). Rotación automática de tokens/llaves.

## Observabilidad y operaciones
- **Logging**: Estructurado (JSON) con nivel correlacionado (`request_id`, `user_id`). Fluent Bit -> Loki/ELK.
- **Métricas**: Prometheus + Grafana (Dashboards: performance API, tiempos de mantenimiento, uso de recursos).
- **Tracing**: OpenTelemetry (FastAPI + Next.js + Celery) enviando spans a Tempo/Jaeger.
- **Alertas**: Alertmanager (latencia API, errores 5xx, jobs fallidos), PagerDuty/Slack.
- **Auditoría**: Tablas dedicadas y export periódico a almacenamiento frío (S3 Glacier) según requisitos normativos.

## Seguridad
- Autenticación multifactor (MFA) opcional para roles críticos.
- Políticas de contraseñas y bloqueo automático tras intentos fallidos.
- JWT cortos (15 min) + refresh tokens con rotación y lista negra en Redis.
- CORS restringido, headers de seguridad (CSP, HSTS) desde Next.js + reverse proxy.
- Escaneo de dependencias (Dependabot), SAST (SonarCloud), DAST automatizado (OWASP ZAP) en CI.
- Encriptación: TLS en tránsito, datos sensibles en reposo con pgcrypto o KMS (ej. NIT, información contractual).

## Calidad y ciclo de vida
- **Pruebas**:
  - Front: Jest/Testing Library, Playwright para e2e.
  - Back: Pytest (unitarias, integración), contract tests con Schemathesis.
  - Contract Testing (Pact) entre Next.js BFF y FastAPI.
- **Revisión de código**: PR obligatorias, política de cobertura.
- **Feature flags**: ConfigCat/LaunchDarkly para liberar módulos gradualmente.
- **Documentación viva**: ADRs en repositorio, diagramas C4 generados con Structurizr/Diagrams-as-Code.

## Flujos clave (resumen)
1. **Inicio de sesión**: Next.js envía credenciales a `/auth/login` → FastAPI valida, emite JWT + refresh → cookies httpOnly → middleware protege rutas.
2. **Gestión de inventario**: Front consulta `/equipment` con filtros → FastAPI aplica RBAC, pagina resultados, responde con metadatos → front actualiza caches SSR/CSR.
3. **Programación de mantenimiento**: Usuario crea orden → API persiste en PostgreSQL → Celery agenda recordatorios (email/SMS) → WebSocket notifica paneles activos.
4. **Migración de datos legacy**: CSV/Excel subidos a S3 → tarea Celery procesa, inserta transaccionalmente o staging → reporta progreso vía WebSocket y registros de auditoría.

Esta arquitectura provee una base escalable y observable para BioEquipManager, lista para evolucionar con nuevas integraciones (ERP, BI) y requisitos regulatorios del sector salud.


