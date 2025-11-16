# MedInventory

Repositorio monorepo para el sistema de gestión de equipos médicos. El proyecto se organiza en dos capas principales:

- `Front-End/`: aplicación web construida con Vue 3, TypeScript, Vite y Tailwind CSS.
- `Back-End/`: servicios de API a implementar con Python (FastAPI) y base de datos MongoDB.

## Estructura

```text
MedInventory/
├── Front-End/   # SPA del sistema (reutiliza estilos de PathSys)
└── Back-End/    # API y tareas de dominio (pendiente de implementación)
```

Cada carpeta tendrá su propia documentación específica. El README dentro de `Front-End/` contiene los pasos detallados para desarrollar y ejecutar la interfaz.

## Configuración inicial

1. Clonar el repositorio.
2. Revisar la documentación de cada módulo:
   - [`Front-End/README.md`](Front-End/README.md)
   - `Back-End/README.md` (se agregará cuando se inicialice el servicio).
3. Configurar las variables de entorno correspondientes a cada capa utilizando los archivos `.env.example` disponibles.

## Script de desarrollo

El archivo [`Run.sh`](Run.sh) en la raíz permite administrar rápidamente el entorno del Front-End mientras el backend aún no está disponible:

- `./Run.sh local`: instala dependencias si faltan y levanta Vite en segundo plano (`http://localhost:5180`).
- `./Run.sh status`: reporta el estado del puerto y la configuración de `.env`.
- `./Run.sh stop`: detiene el servidor y limpia el log temporal.

> Requiere Node.js/npm instalados. El script crea automáticamente `Front-End/.env` a partir de `.env.example` la primera vez que se ejecuta.

## Próximos pasos

- Definir la estructura base del `Back-End/` y proveer plantilla de configuración.
- Establecer scripts o herramientas de desarrollo comunes (por ejemplo, linters, pre-commit) en el nivel raíz cuando ambos módulos estén activos.
- Documentar el flujo de despliegue que abarque front y back de forma conjunta.
