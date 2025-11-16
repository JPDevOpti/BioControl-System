# MedInventory Front-End

Base inicial para el sistema de gestión de equipos médicos del laboratorio. Esta iteración se enfoca en dejar lista la estructura del proyecto reutilizando el stack técnico de PathSys:

- **Framework:** Vue 3 + TypeScript
- **Compilación:** Vite + Tailwind CSS (sin pipeline PostCSS adicional)
- **Estado global:** Pinia (sin lógica implementada todavía)
- **Cliente HTTP:** Axios configurado para apuntar al backend FastAPI

## Requisitos previos

- Node.js 20+
- npm 9+

## Scripts disponibles

```bash
npm install     # Instalar dependencias
npm run dev     # Servidor de desarrollo en http://localhost:5180
npm run build   # Generar build de producción
npm run preview # Servir build de producción
npm run type-check # Verificar tipos con vue-tsc
```

## Estructura principal

- `src/main.ts`: punto de entrada que monta Vue, Pinia y el router.
- `src/router/`: rutas placeholder para dashboard, inventario, mantenimiento y login.
- `src/modules/`: módulos por dominio listos para recibir componentes reales.
- `src/shared/`: layouts, componentes y utilidades reutilizables (vacíos por ahora).
- `src/core/config/`: configuración de cliente HTTP y constantes de API.

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar según el backend:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE=MedInventory Frontend
VITE_APP_ENV=development
```

## Módulo de autenticación (demo)

- Vista: `src/modules/auth/views/LoginView.vue` reutiliza el layout a pantalla completa y los componentes compartidos portados desde PathSys.
- El formulario valida correo y contraseña en el cliente y persiste el correo si se marca "mantenerme conectado".
- Servicio simulado: `src/modules/auth/services/auth.service.ts` acepta cualquier correo registrado en el directorio demo (`admin@medinventory.test`, `coordinador@medinventory.test`, `tecnico@medinventory.test`) con contraseñas de 6+ caracteres.
- Tienda: `src/stores/auth.store.ts` gestiona sesión y almacenamiento local hasta que el backend esté disponible.

## Próximos pasos sugeridos

1. Implementar el flujo auténtico de autenticación reutilizando los servicios existentes.
2. Migrar componentes compartidos (layouts, formularios, toasts) desde PathSys.
3. Integrar módulos funcionales para inventario y mantenimiento.
4. Conectar con el backend FastAPI y la base de datos MongoDB.
