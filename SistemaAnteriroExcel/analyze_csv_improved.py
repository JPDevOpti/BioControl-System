#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script mejorado para analizar CSV y generar reporte completo en Markdown
Identifica automáticamente la fila de encabezados reales
"""

import pandas as pd
import numpy as np
from pathlib import Path
from collections import Counter
from datetime import datetime
import re

def find_header_row(csv_file: str):
    """
    Encuentra la fila que contiene los encabezados reales
    Busca una fila que tenga la palabra 'Proceso' o 'Nombre' en las primeras columnas
    """
    with open(csv_file, 'r', encoding='utf-8-sig') as f:
        for i, line in enumerate(f):
            if 'Proceso' in line and 'Nombre del equipo' in line:
                return i
    return 8  # Por defecto, asumimos que está en la línea 9 (índice 8)

def clean_column_name(col_name: str) -> str:
    """Limpia el nombre de columna"""
    if pd.isna(col_name):
        return "Sin nombre"
    return str(col_name).strip()

def analyze_csv_improved(csv_file: str, output_md: str = None):
    """
    Analiza un archivo CSV y genera un reporte completo en Markdown
    Versión mejorada que identifica correctamente los encabezados
    """
    csv_path = Path(csv_file)
    
    if not csv_path.exists():
        print(f"❌ Error: El archivo {csv_file} no existe")
        return
    
    if output_md is None:
        output_md = csv_path.parent / (csv_path.stem + "_REPORTE_COMPLETO.md")
    
    print(f"📖 Analizando {csv_path.name}...")
    
    # Encontrar la fila de encabezados
    header_row = find_header_row(csv_file)
    print(f"   📍 Fila de encabezados detectada: {header_row + 1}")
    
    # Leer CSV saltando las filas anteriores a los encabezados
    df = pd.read_csv(csv_file, encoding='utf-8-sig', skiprows=header_row)
    
    # Limpiar nombres de columnas
    df.columns = [clean_column_name(col) for col in df.columns]
    
    # Eliminar columnas completamente vacías
    df = df.dropna(axis=1, how='all')
    
    # Eliminar filas completamente vacías
    df = df.dropna(axis=0, how='all')
    
    print(f"   ✅ Datos cargados: {len(df)} filas, {len(df.columns)} columnas")
    
    # Preparar reporte
    report = []
    report.append(f"# REPORTE COMPLETO: {csv_path.name}\n\n")
    report.append(f"**Fecha de análisis:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
    report.append(f"**Archivo fuente:** `{csv_path.name}`\n\n")
    report.append(f"**Fila de encabezados:** {header_row + 1}\n\n")
    report.append("---\n\n")
    
    # 1. RESUMEN GENERAL
    report.append("## 1. RESUMEN GENERAL\n\n")
    report.append(f"- **Total de filas de datos:** {len(df)}\n")
    report.append(f"- **Total de columnas:** {len(df.columns)}\n")
    report.append(f"- **Memoria utilizada:** {df.memory_usage(deep=True).sum() / 1024:.2f} KB\n\n")
    
    # 2. ESTRUCTURA DE COLUMNAS
    report.append("## 2. ESTRUCTURA DE COLUMNAS\n\n")
    report.append(f"### 2.1. Lista de Columnas ({len(df.columns)} columnas)\n\n")
    report.append("| # | Nombre de Columna | Tipo | Valores No Nulos | Valores Nulos | % Completitud | Valores Únicos |\n")
    report.append("|---|-------------------|------|-------------------|---------------|---------------|----------------|\n")
    
    for idx, col in enumerate(df.columns, 1):
        non_null = df[col].notna().sum()
        null_count = df[col].isna().sum()
        completeness = (non_null / len(df)) * 100 if len(df) > 0 else 0
        dtype = str(df[col].dtype)
        unique_count = df[col].nunique()
        report.append(f"| {idx} | `{col}` | {dtype} | {non_null} | {null_count} | {completeness:.1f}% | {unique_count} |\n")
    
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
        if unique_count <= 30 and unique_count > 0:
            report.append("**Valores únicos y sus frecuencias:**\n\n")
            unique_values = df[col].value_counts().head(30)
            report.append("| Valor | Frecuencia | Porcentaje |\n")
            report.append("|-------|------------|------------|\n")
            for val, count in unique_values.items():
                if pd.notna(val) and str(val).strip() != '':
                    percentage = (count / non_null) * 100 if non_null > 0 else 0
                    val_str = str(val)[:50]  # Limitar longitud
                    report.append(f"| `{val_str}` | {count} | {percentage:.1f}% |\n")
            report.append("\n")
        elif unique_count > 30:
            report.append("**Valores más frecuentes (top 10):**\n\n")
            unique_values = df[col].value_counts().head(10)
            report.append("| Valor | Frecuencia | Porcentaje |\n")
            report.append("|-------|------------|------------|\n")
            for val, count in unique_values.items():
                if pd.notna(val) and str(val).strip() != '':
                    percentage = (count / non_null) * 100 if non_null > 0 else 0
                    val_str = str(val)[:50]  # Limitar longitud
                    report.append(f"| `{val_str}` | {count} | {percentage:.1f}% |\n")
            report.append("\n")
        
        # Estadísticas numéricas
        if df[col].dtype in ['int64', 'float64']:
            report.append("**Estadísticas numéricas:**\n\n")
            try:
                numeric_data = pd.to_numeric(df[col], errors='coerce')
                report.append(f"- **Media:** {numeric_data.mean():.2f}\n")
                report.append(f"- **Mediana:** {numeric_data.median():.2f}\n")
                report.append(f"- **Desviación estándar:** {numeric_data.std():.2f}\n")
                report.append(f"- **Mínimo:** {numeric_data.min()}\n")
                report.append(f"- **Máximo:** {numeric_data.max()}\n")
                report.append(f"- **Percentil 25:** {numeric_data.quantile(0.25)}\n")
                report.append(f"- **Percentil 75:** {numeric_data.quantile(0.75)}\n\n")
            except:
                pass
        
        # Muestra de valores (primeros no nulos)
        sample_values = df[col].dropna().head(5).tolist()
        if sample_values:
            report.append("**Muestra de valores (primeros 5 no nulos):**\n\n")
            for val in sample_values:
                val_str = str(val)[:100]  # Limitar longitud
                report.append(f"- `{val_str}`\n")
            report.append("\n")
        
        # Análisis de patrones para columnas específicas
        if 'Código' in col or 'código' in col.lower():
            # Analizar códigos
            codes = df[col].dropna().astype(str)
            report.append("**Análisis de códigos:**\n\n")
            report.append(f"- Total de códigos únicos: {codes.nunique()}\n")
            report.append(f"- Códigos duplicados: {len(codes) - codes.nunique()}\n")
            if codes.nunique() < len(codes):
                duplicates = codes[codes.duplicated(keep=False)]
                if len(duplicates) > 0:
                    report.append("**Códigos duplicados encontrados:**\n\n")
                    for code, count in duplicates.value_counts().head(10).items():
                        report.append(f"- `{code}`: {count} ocurrencias\n")
            report.append("\n")
        
        report.append("---\n\n")
    
    # 4. ANÁLISIS DE FILAS DE DATOS
    report.append("## 4. ANÁLISIS DE FILAS DE DATOS\n\n")
    
    # Filas completas vs incompletas
    complete_rows = df.notna().all(axis=1).sum()
    incomplete_rows = len(df) - complete_rows
    
    report.append(f"- **Filas completamente llenas:** {complete_rows} ({complete_rows/len(df)*100:.1f}%)\n")
    report.append(f"- **Filas con datos faltantes:** {incomplete_rows} ({incomplete_rows/len(df)*100:.1f}%)\n\n")
    
    # Calcular completitud por fila
    missing_per_row = df.isna().sum(axis=1)
    completeness_per_row = ((len(df.columns) - missing_per_row) / len(df.columns)) * 100
    
    report.append("### 4.1. Estadísticas de completitud por fila\n\n")
    report.append(f"- **Completitud promedio:** {completeness_per_row.mean():.1f}%\n")
    report.append(f"- **Completitud mínima:** {completeness_per_row.min():.1f}%\n")
    report.append(f"- **Completitud máxima:** {completeness_per_row.max():.1f}%\n\n")
    
    # Filas con más datos faltantes
    report.append("### 4.2. Filas con más datos faltantes (top 10)\n\n")
    report.append("| # Fila | Datos Faltantes | % Completitud |\n")
    report.append("|--------|-----------------|---------------|\n")
    
    top_missing = missing_per_row.nlargest(10)
    for idx, missing_count in top_missing.items():
        completeness = completeness_per_row[idx]
        report.append(f"| {idx + 1} | {missing_count} | {completeness:.1f}% |\n")
    
    report.append("\n")
    
    # 5. ANÁLISIS DE EQUIPOS (columnas clave)
    report.append("## 5. ANÁLISIS DE EQUIPOS\n\n")
    
    # Identificar columnas clave
    key_columns_map = {
        'Proceso': 'Proceso',
        'Nombre del equipo': 'Nombre del equipo',
        'Código de inventario interno': 'Código de inventario interno del laboratorio y/o asignado por UdeA',
        'Código IPS': 'Código IPS',
        'Clasificación IPS': 'Clasificación IPS (IND-BIO-Gases)',
        'Responsable': 'Responsable del proceso en el que interviene el equipo y/o inventario UdeA',
        'Ubicación': 'Ubicación física',
        'Marca': 'Marca',
        'Modelo': 'Modelo',
        'Serie': 'Serie',
    }
    
    for key_name, col_pattern in key_columns_map.items():
        # Buscar columna que coincida
        matching_cols = [col for col in df.columns if col_pattern in col or key_name.lower() in col.lower()]
        
        if matching_cols:
            col = matching_cols[0]
            report.append(f"### 5.{list(key_columns_map.keys()).index(key_name) + 1}. {key_name}\n\n")
            
            values = df[col].value_counts()
            non_null_count = df[col].notna().sum()
            
            report.append(f"- **Total de valores únicos:** {len(values)}\n")
            report.append(f"- **Valores no nulos:** {non_null_count} de {len(df)}\n")
            report.append(f"- **% Completitud:** {(non_null_count / len(df)) * 100:.1f}%\n\n")
            
            if len(values) > 0:
                report.append("**Distribución:**\n\n")
                report.append("| Valor | Cantidad | Porcentaje |\n")
                report.append("|-------|----------|------------|\n")
                
                for val, count in values.head(20).items():
                    if pd.notna(val) and str(val).strip() != '':
                        percentage = (count / non_null_count) * 100 if non_null_count > 0 else 0
                        val_str = str(val)[:60]  # Limitar longitud
                        report.append(f"| `{val_str}` | {count} | {percentage:.1f}% |\n")
                report.append("\n")
    
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
        report.append("| Columna | % Completitud |\n")
        report.append("|---------|---------------|\n")
        for col, completeness in sorted(high_completeness, key=lambda x: x[1], reverse=True):
            report.append(f"| `{col}` | {completeness:.1f}% |\n")
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
        report.append("| Columna | % Completitud |\n")
        report.append("|---------|---------------|\n")
        for col, completeness in sorted(low_completeness, key=lambda x: x[1]):
            report.append(f"| `{col}` | {completeness:.1f}% |\n")
    else:
        report.append("- No hay columnas con completitud <50%\n")
    report.append("\n")
    
    # 7. RESUMEN EJECUTIVO
    report.append("## 7. RESUMEN EJECUTIVO\n\n")
    
    report.append("### 7.1. Calidad de los Datos\n\n")
    total_cells = len(df) * len(df.columns)
    filled_cells = df.notna().sum().sum()
    data_quality = (filled_cells / total_cells) * 100
    report.append(f"- **Calidad general de datos:** {data_quality:.1f}%\n")
    report.append(f"- **Celdas llenas:** {filled_cells:,} de {total_cells:,}\n")
    report.append(f"- **Celdas vacías:** {total_cells - filled_cells:,}\n\n")
    
    # Estadísticas de equipos
    if 'Nombre del equipo' in df.columns or any('Nombre' in col for col in df.columns):
        name_col = [col for col in df.columns if 'Nombre del equipo' in col]
        if name_col:
            report.append("### 7.2. Estadísticas de Equipos\n\n")
            report.append(f"- **Total de equipos registrados:** {df[name_col[0]].notna().sum()}\n")
            report.append(f"- **Equipos únicos:** {df[name_col[0]].nunique()}\n")
            if df[name_col[0]].nunique() < df[name_col[0]].notna().sum():
                report.append(f"- **⚠️ Equipos duplicados:** {df[name_col[0]].notna().sum() - df[name_col[0]].nunique()}\n")
            report.append("\n")
    
    report.append("### 7.3. Recomendaciones\n\n")
    
    if data_quality < 70:
        report.append("- ⚠️ **Atención:** La calidad de datos es baja (<70%). Se recomienda revisar y completar los datos faltantes.\n\n")
    
    if low_completeness:
        report.append(f"- ⚠️ **Atención:** {len(low_completeness)} columna(s) tienen completitud <50%. Considerar si son necesarias o completar los datos.\n\n")
    
    if complete_rows < len(df) * 0.5:
        report.append("- ⚠️ **Atención:** Menos del 50% de las filas están completas. Se recomienda revisar el proceso de captura de datos.\n\n")
    
    # Verificar duplicados en códigos
    code_cols = [col for col in df.columns if 'Código' in col or 'código' in col.lower()]
    for col in code_cols:
        if df[col].notna().sum() > 0:
            duplicates = df[col][df[col].duplicated(keep=False)]
            if len(duplicates) > 0:
                report.append(f"- ⚠️ **Atención:** Se encontraron {len(duplicates)} códigos duplicados en la columna `{col}`.\n\n")
    
    report.append("\n---\n\n")
    report.append(f"*Reporte generado el {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n")
    report.append(f"*Generado automáticamente por el script de análisis de CSV*\n")
    
    # Guardar reporte
    with open(output_md, 'w', encoding='utf-8') as f:
        f.write(''.join(report))
    
    print(f"✅ Reporte generado: {output_md}")
    print(f"   - Total de líneas: {len(report)}")
    print(f"   - Tamaño: {Path(output_md).stat().st_size / 1024:.2f} KB")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python analyze_csv_improved.py <archivo.csv> [archivo_salida.md]")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    output_md = sys.argv[2] if len(sys.argv) > 2 else None
    
    analyze_csv_improved(csv_file, output_md)

