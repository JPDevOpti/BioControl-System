#!/bin/zsh
# Script de control para el Front-End de MedInventory

set -e

ROOT_DIR=$(cd "$(dirname "$0")" && pwd)
FRONTEND_DIR="${ROOT_DIR}/Front-End"
FRONTEND_PORT=${FRONTEND_PORT:-5180}
FRONTEND_LOG_FILE="${TMPDIR:-/tmp}/medinventory-frontend.log"

ensure_prerequisites() {
  if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm no está instalado. Instálalo con Homebrew: brew install node" >&2
    exit 1
  fi
}

ensure_frontend_deps() {
  if [ ! -d "${FRONTEND_DIR}/node_modules" ]; then
    echo "📦 Instalando dependencias del Front-End..."
    (cd "${FRONTEND_DIR}" && npm install)
  fi
}

ensure_env_file() {
  local env_file="${FRONTEND_DIR}/.env"
  local example_file="${FRONTEND_DIR}/.env.example"
  if [ ! -f "$env_file" ] && [ -f "$example_file" ]; then
    cp "$example_file" "$env_file"
    echo "📝 Archivo .env creado a partir de .env.example"
  fi
}

kill_port() {
  local port=$1
  local label=$2
  local pids
  pids=$(lsof -ti:"$port" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "⚠️  Liberando puerto $port (${label})..."
    echo "$pids" | xargs kill -9 2>/dev/null || true
    sleep 1
  fi
}

report_port() {
  local port=$1
  local label=$2
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ $label activo (puerto $port)"
  else
    echo "❌ $label detenido"
  fi
}

wait_http() {
  local url=$1
  local label=$2
  for _ in {1..15}; do
    if curl -s "$url" >/dev/null 2>&1; then
      echo "✅ $label operativo"
      return 0
    fi
    sleep 1
  done
  echo "⚠️  $label no respondió"
  return 1
}

start_frontend() {
  ensure_prerequisites
  ensure_frontend_deps
  ensure_env_file
  kill_port "$FRONTEND_PORT" "Frontend"
  echo "🚀 Iniciando Front-End MedInventory en puerto ${FRONTEND_PORT}..."
  (
    cd "$FRONTEND_DIR"
    npm run dev -- --host 0.0.0.0 --port "$FRONTEND_PORT" >"$FRONTEND_LOG_FILE" 2>&1 &
  )
  sleep 2
  wait_http "http://localhost:${FRONTEND_PORT}" "Frontend"
  echo "📄 Log: $FRONTEND_LOG_FILE"
  echo "🌐 URL: http://localhost:${FRONTEND_PORT}"
}

stop_frontend() {
  echo "🛑 Deteniendo Front-End..."
  kill_port "$FRONTEND_PORT" "Frontend"
  if [ -f "$FRONTEND_LOG_FILE" ]; then
    echo "🧹 Eliminando log temporal $FRONTEND_LOG_FILE"
    rm -f "$FRONTEND_LOG_FILE"
  fi
  echo "✅ Front-End detenido"
}

status_frontend() {
  echo "📊 Estado del Front-End MedInventory"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  report_port "$FRONTEND_PORT" "Servidor Vite"
  if [ -f "${FRONTEND_DIR}/.env" ]; then
    echo "✅ Front-End/.env presente"
    local api_url
    api_url=$(grep -m1 '^VITE_API_BASE_URL' "${FRONTEND_DIR}/.env" | cut -d'=' -f2-)
    [ -n "$api_url" ] && echo "   └─ API configurada: $api_url"
  else
    echo "❌ Falta Front-End/.env"
  fi
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  if [ -f "$FRONTEND_LOG_FILE" ]; then
    echo "🪵 Log disponible en: $FRONTEND_LOG_FILE"
  fi
}

show_help() {
  cat <<EOF
 MedInventory Front-End - Script de control
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Comandos disponibles:

  local        - Instala dependencias si hace falta y levanta Vite en segundo plano
  stop         - Detiene el servidor en el puerto ${FRONTEND_PORT}
  status       - Muestra el estado actual del Front-End
  help         - Muestra esta ayuda

 Ejemplos:
  ./Run.sh local
  ./Run.sh status
  ./Run.sh stop
EOF
}

COMMAND=${1:-help}
shift || true

case "$COMMAND" in
  local)
    start_frontend "$@"
    ;;
  stop)
    stop_frontend "$@"
    ;;
  status)
    status_frontend "$@"
    ;;
  help)
    show_help
    ;;
  *)
    echo "❌ Comando no reconocido: $COMMAND" >&2
    show_help
    exit 1
    ;;
esac
