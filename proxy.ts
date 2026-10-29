import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest)  {
  const url = request.nextUrl;

  // 1. Separa el preview de la asignación. No escribe cookies.
  if (url.searchParams.has('preview')) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  let visitorId = request.cookies.get('visitor_id')?.value;

  // 2. Persiste visitante y variante[cite: 3].
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    
    // Cookie httpOnly, con path, dura 30 días[cite: 3].
    response.cookies.set('visitor_id', visitorId, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      secure: true, // Necesario para la vista previa embebida[cite: 4].
      sameSite: 'none' // Necesario para la vista previa embebida[cite: 4].
    });
  }

  // TODO: BASE DE DATOS - Anotar impresión
  // Aquí debes insertar la impresión asegurando que sea una por sesión de 30 minutos[cite: 3].
  // fetch('TU_BD/impresion', { method: 'POST', body: JSON.stringify({ visitorId }) });

  return response;
}

export const config = {
  matcher: '/practica', // Aplica solo a la landing.
};