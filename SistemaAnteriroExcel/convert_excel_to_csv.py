#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para convertir archivos Excel (.xlsx) a CSV
Convierte cada hoja del Excel en un archivo CSV separado
"""

import pandas as pd
import os
import sys
from pathlib import Path

def convert_excel_to_csv(excel_file: str, output_dir: str = None):
    """
    Convierte un archivo Excel a CSV(s)
    
    Args:
        excel_file: Ruta al archivo Excel
        output_dir: Directorio de salida (opcional, por defecto el mismo que el Excel)
    """
    excel_path = Path(excel_file)
    
    if not excel_path.exists():
        print(f"❌ Error: El archivo {excel_file} no existe")
        return False
    
    if output_dir is None:
        output_dir = excel_path.parent
    else:
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
    
    try:
        # Leer el archivo Excel
        print(f"📖 Leyendo {excel_path.name}...")
        excel_data = pd.ExcelFile(excel_file)
        
        # Obtener nombres de las hojas
        sheet_names = excel_data.sheet_names
        print(f"   Encontradas {len(sheet_names)} hoja(s): {', '.join(sheet_names)}")
        
        # Convertir cada hoja a CSV
        for sheet_name in sheet_names:
            print(f"   📄 Procesando hoja: {sheet_name}")
            
            # Leer la hoja
            df = pd.read_excel(excel_file, sheet_name=sheet_name)
            
            # Crear nombre del archivo CSV
            # Si hay una sola hoja, usar el nombre del Excel
            # Si hay múltiples hojas, agregar el nombre de la hoja
            if len(sheet_names) == 1:
                csv_filename = excel_path.stem + ".csv"
            else:
                # Limpiar el nombre de la hoja para el nombre de archivo
                safe_sheet_name = sheet_name.replace("/", "_").replace("\\", "_").replace(":", "_")
                csv_filename = excel_path.stem + "_" + safe_sheet_name + ".csv"
            
            csv_path = output_dir / csv_filename
            
            # Guardar como CSV con codificación UTF-8
            df.to_csv(csv_path, index=False, encoding='utf-8-sig', sep=',')
            print(f"   ✅ Creado: {csv_path.name} ({len(df)} filas, {len(df.columns)} columnas)")
        
        print(f"✅ Conversión completada: {excel_path.name}\n")
        return True
        
    except Exception as e:
        print(f"❌ Error al convertir {excel_path.name}: {str(e)}\n")
        return False

def main():
    """Función principal"""
    # Directorio actual
    current_dir = Path(__file__).parent
    
    # Buscar todos los archivos Excel (.xlsx) en el directorio
    excel_files = list(current_dir.glob("*.xlsx"))
    
    if not excel_files:
        print("❌ No se encontraron archivos Excel (.xlsx) en el directorio")
        return
    
    print(f"🔍 Encontrados {len(excel_files)} archivo(s) Excel:\n")
    
    # Convertir cada archivo
    success_count = 0
    for excel_file in excel_files:
        if convert_excel_to_csv(str(excel_file)):
            success_count += 1
    
    print(f"\n📊 Resumen:")
    print(f"   ✅ {success_count}/{len(excel_files)} archivo(s) convertido(s) correctamente")

if __name__ == "__main__":
    main()

