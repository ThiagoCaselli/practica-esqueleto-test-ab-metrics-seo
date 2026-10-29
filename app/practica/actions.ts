'use server'

import { cookies } from 'next/headers';
import { getVariant } from '../../lib/experiment';
import { pool } from '../../lib/db';

export async function registrarConversion() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('visitor_id')?.value;

  if (!visitorId) return { success: false };

  const variant = getVariant(visitorId);

  try {
    // Validar: Una conversión por visitante. Un segundo clic no suma otra[cite: 4].
    await pool.query(
      `INSERT INTO conversiones (visitor_id, variante) 
       VALUES ($1, $2) 
       ON CONFLICT (visitor_id) DO NOTHING`,
      [visitorId, variant]
    );
    console.log(`🚀 Conversión registrada en BD para: ${visitorId}`);
    return { success: true };
  } catch (error) {
    console.error('Error al registrar conversión en BD:', error);
    return { success: false };
  }
}