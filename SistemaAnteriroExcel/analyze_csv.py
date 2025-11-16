#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para analizar CSV y generar reporte completo en Markdown
"""

import pandas as pd
import numpy as np
from pathlib import Path
from collections import Counter
from datetime import datetime

def analyze_csv(csv_file: str, output_md: str = None):
    """
    Analiza un archivo CSV y genera un reporte completo en Markdown
    
    Args:
        csv_file: Ruta al archivo CSV
        output_md: Ruta al archivo Markdown de salida (opcional)
    """
    csv_path = Path(csv_file)
    
    if not csv_path.exists():
        print(f"❌ Error: El archivo {csv_file} no existe")
        return
    
    if output_md is None:
        output_md = csv_path.parent / (csv_path.stem + "_REPORTE.md")
    
    print(f"📖 Analizando {csv_path.name}...")
    
    # Leer CSV
    df = pd.read_csv(csv_file, encoding='utf-8-sig')
    
    # Preparar reporte
    report = []
    report.append(f"# REPORTE COMPLETO: {csv_path.name}\n")
    report.append(f"**Fecha de análisis:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    report.append(f"**Archivo fuente:** `{csv_path.name}`\n")
    report.append("---\n\n")
    
    # 1. RESUMEN GENERAL
    report.append("## 1. RESUMEN GENERAL\n\n")
    report.append(f"- **Total de filas:** {len(df)}\n")
    report.append(f"- **Total de columnas:** {len(df.columns)}\n")
    report.append(f"- **Filas de datos (sin contar encabezados):** {len(df) - 1 if len(df) > 0 else 0}\n")
    report.append(f"- **Memoria utilizada:** {df.memory_usage(deep=True).sum() / 1024:.2f} KB\n\n")
    
    # 2. ESTRUCTURA DE COLUMNAS
    report.append("## 2. ESTRUCTURA DE COLUMNAS\n\n")
    report.append(f"### 2.1. Lista de Columnas ({len(df.columns)} columnas)\n\n")
    report.append("| # | Nombre de Columna | Tipo | Valores No Nulos | Valores Nulos | % Completitud |\n")
    report.append("|---|-------------------|------|-------------------|---------------|---------------|\n")
    
    for idx, col in enumerate(df.columns, 1):
        non_null = df[col].notna().sum()
        null_count = df[col].isna().sum()
        completeness = (non_null / len(df)) * 100 if len(df) > 0 else 0
        dtype = str(df[col].dtype)
        report.append(f"| {idx} | `{col}` | {dtype} | {non_null} | {null_count} | {completeness:.1f}% |\n")
    
    report.append("\n")
    
    # 3. ANÁLISIS DETALLADO POR COLUMNA
    report.append("## 3. ANÁLISIS DETALLADO POR COLUMNA\n\n")
    
    for idx, col in enumerate(df.columns, 1):
        report.append(f"### 3.{idx}. Columna: `{col}`\n\n")
        
        # Tipo de datos
        report.append(f"**Tipo de dato:** `{df[col].dtype}`\n\n")
        
        # Estadísticas básicas
        non_null = df[col].notna().sum()
        null_count = df[col].isna().sum()
        unique_count = df[col].nunique()
        completeness = (non_null / len(df)) * 100 if len(df) > 0 else 0
        
        report.append(f"- **Valores no nulos:** {non_null}\n")
        report.append(f"- **Valores nulos:** {null_count}\n")
        report.append(f"- **Valores únicos:** {unique_count}\n")
        report.append(f"- **% Completitud:** {completeness:.1f}%\n\n")
        
        # Valores únicos (si no son demasiados)
        if unique_count <= 20 and unique_count > 0:
            report.append("**Valores únicos:**\n\n")
            unique_values = df[col].value_counts().head(20)
            for val, count in unique_values.items():
                if pd.notna(val):
                    percentage = (count / len(df)) * 100
                    report.append(f"- `{val}`: {count} ({percentage:.1f}%)\n")
            report.append("\n")
        
        # Estadísticas numéricas
        if df[col].dtype in ['int64', 'float64']:
            report.append("**Estadísticas numéricas:**\n\n")
            report.append(f"- **Media:** {df[col].mean():.2f}\n")
            report.append(f"- **Mediana:** {df[col].median():.2f}\n")
            report.append(f"- **Desviación estándar:** {df[col].std():.2f}\n")
            report.append(f"- **Mínimo:** {df[col].min()}\n")
            report.append(f"- **Máximo:** {df[col].max()}\n")
            report.append(f"- **Percentil 25:** {df[col].quantile(0.25)}\n")
            report.append(f"- **Percentil 75:** {df[col].quantile(0.75)}\n\n")
        
        # Muestra de valores (primeros no nulos)
        sample_values = df[col].dropna().head(5).tolist()
        if sample_values:
            report.append("**Muestra de valores (primeros 5 no nulos):**\n\n")
            for val in sample_values:
                report.append(f"- `{val}`\n")
            report.append("\n")
        
        # Valores más frecuentes
        if non_null > 0:
            most_common = df[col].value_counts().head(5)
            if len(most_common) > 0:
                report.append("**Valores más frecuentes:**\n\n")
                for val, count in most_common.items():
                    if pd.notna(val):
                        percentage = (count / non_null) * 100
                        report.append(f"- `{val}`: {count} ocurrencias ({percentage:.1f}%)\n")
                report.append("\n")
        
        report.append("---\n\n")
    
    # 4. ANÁLISIS DE FILAS DE DATOS
    report.append("## 4. ANÁLISIS DE FILAS DE DATOS\n\n")
    
    # Filas completas vs incompletas
    complete_rows = df.notna().all(axis=1).sum()
    incomplete_rows = len(df) - complete_rows
    
    report.append(f"- **Filas completamente llenas:** {complete_rows} ({complete_rows/len(df)*100:.1f}%)\n")
    report.append(f"- **Filas con datos faltantes:** {incomplete_rows} ({incomplete_rows/len(df)*100:.1f}%)\n\n")
    
    # Filas con más datos faltantes
    missing_per_row = df.isna().sum(axis=1)
    report.append("### 4.1. Filas con más datos faltantes\n\n")
    report.append("| Fila | Datos Faltantes | % Completitud |\n")
    report.append("|------|-----------------|---------------|\n")
    
    top_missing = missing_per_row.nlargest(10)
    for idx, missing_count in top_missing.items():
        completeness = ((len(df.columns) - missing_count) / len(df.columns)) * 100
        report.append(f"| {idx + 1} | {missing_count} | {completeness:.1f}% |\n")
    
    report.append("\n")
    
    # 5. ANÁLISIS DE VALORES ESPECÍFICOS
    report.append("## 5. ANÁLISIS DE VALORES ESPECÍFICOS\n\n")
    
    # Buscar columnas con valores específicos interesantes
    for col in df.columns:
        if df[col].dtype == 'object':
            # Valores vacíos o espacios
            empty_or_whitespace = df[col].astype(str).str.strip().isin(['', 'nan', 'None', 'NaT']).sum()
            if empty_or_whitespace > 0:
                report.append(f"### 5.{df.columns.get_loc(col) + 1}. Columna `{col}` - Valores vacíos\n\n")
                report.append(f"- Valores vacíos o espacios: {empty_or_whitespace}\n\n")
    
    # 6. PATRONES Y OBSERVACIONES
    report.append("## 6. PATRONES Y OBSERVACIONES\n\n")
    
    # Columnas con alta completitud
    report.append("### 6.1. Columnas con alta completitud (>90%)\n\n")
    high_completeness = []
    for col in df.columns:
        completeness = (df[col].notna().sum() / len(df)) * 100
        if completeness >= 90:
            high_completeness.append((col, completeness))
    
    if high_completeness:
        for col, completeness in sorted(high_completeness, key=lambda x: x[1], reverse=True):
            report.append(f"- `{col}`: {completeness:.1f}%\n")
    else:
        report.append("- No hay columnas con completitud >90%\n")
    report.append("\n")
    
    # Columnas con baja completitud
    report.append("### 6.2. Columnas con baja completitud (<50%)\n\n")
    low_completeness = []
    for col in df.columns:
        completeness = (df[col].notna().sum() / len(df)) * 100
        if completeness < 50:
            low_completeness.append((col, completeness))
    
    if low_completeness:
        for col, completeness in sorted(low_completeness, key=lambda x: x[1]):
            report.append(f"- `{col}`: {completeness:.1f}%\n")
    else:
        report.append("- No hay columnas con completitud <50%\n")
    report.append("\n")
    
    # 7. DATOS DE EQUIPOS (si hay columnas relevantes)
    report.append("## 7. DATOS DE EQUIPOS\n\n")
    
    # Buscar columnas clave
    key_columns = {
        'Proceso': 'Proceso',
        'Nombre del equipo': 'Nombre del equipo',
        'Código de inventario interno': 'Código de inventario interno del laboratorio y/o asignado por UdeA',
        'Código IPS': 'Código IPS',
        'Clasificación IPS': 'Clasificación IPS (IND-BIO-Gases)',
        'Sede': None,
    }
    
    for key, col_name in key_columns.items():
        if col_name and col_name in df.columns:
            report.append(f"### 7.{list(key_columns.keys()).index(key) + 1}. {key}\n\n")
            values = df[col_name].value_counts()
            report.append(f"**Total de valores únicos:** {len(values)}\n\n")
            report.append("**Distribución:**\n\n")
            for val, count in values.head(10).items():
                if pd.notna(val):
                    percentage = (count / len(df)) * 100
                    report.append(f"- `{val}`: {count} ({percentage:.1f}%)\n")
            report.append("\n")
    
    # 8. RESUMEN EJECUTIVO
    report.append("## 8. RESUMEN EJECUTIVO\n\n")
    
    report.append("### 8.1. Calidad de los Datos\n\n")
    total_cells = len(df) * len(df.columns)
    filled_cells = df.notna().sum().sum()
    data_quality = (filled_cells / total_cells) * 100
    report.append(f"- **Calidad general de datos:** {data_quality:.1f}%\n")
    report.append(f"- **Celdas llenas:** {filled_cells:,} de {total_cells:,}\n")
    report.append(f"- **Celdas vacías:** {total_cells - filled_cells:,}\n\n")
    
    report.append("### 8.2. Recomendaciones\n\n")
    
    if data_quality < 70:
        report.append("- ⚠️ **Atención:** La calidad de datos es baja (<70%). Se recomienda revisar y completar los datos faltantes.\n")
    
    if low_completeness:
        report.append(f"- ⚠️ **Atención:** {len(low_completeness)} columna(s) tienen completitud <50%. Considerar si son necesarias o completar los datos.\n")
    
    if complete_rows < len(df) * 0.5:
        report.append("- ⚠️ **Atención:** Menos del 50% de las filas están completas. Se recomienda revisar el proceso de captura de datos.\n")
    
    report.append("\n---\n\n")
    report.append(f"*Reporte generado el {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n")
    
    # Guardar reporte
    with open(output_md, 'w', encoding='utf-8') as f:
        f.write(''.join(report))
    
    print(f"✅ Reporte generado: {output_md}")
    print(f"   - Total de líneas: {len(report)}")
    print(f"   - Tamaño: {Path(output_md).stat().st_size / 1024:.2f} KB")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python analyze_csv.py <archivo.csv> [archivo_salida.md]")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    output_md = sys.argv[2] if len(sys.argv) > 2 else None
    
    analyze_csv(csv_file, output_md)

