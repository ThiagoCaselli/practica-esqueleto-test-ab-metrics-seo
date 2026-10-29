import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getVariant } from '../../lib/experiment';
import Cta from '../../components/cta';
import { pool } from '../../lib/db'; 

type Props = {
  searchParams: { preview?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const preview = searchParams.preview;
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('visitor_id')?.value;

  let variant = 'A'; 
  
  if (preview === 'a' || preview === 'b') {
    variant = preview.toUpperCase();
  } else if (visitorId) {
    variant = getVariant(visitorId);
  }

  const isVariantA = variant === 'A';

  return {
    title: isVariantA
      ? 'Cursos de oficio en ocho semanas, con salida laboral' 
      : 'Abril abre cupos: cursos de oficio en grupos de 12',
    description: isVariantA
      ? 'Aprendé carpintería, electricidad o cocina en ocho semanas. Grupos de doce personas y práctica real, con una salida laboral que se puede cobrar.' 
      : 'El 14 de abril empiezan grupos de doce. En la cohorte anterior, ocho de cada diez consiguieron trabajo en el rubro antes de los noventa días.',
    alternates: {
      canonical: '/practica',
    },
    robots: {
      index: !preview,
    }
  };
}

export default async function PracticaPage({ searchParams }: Props) {
  const preview = searchParams.preview;
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('visitor_id')?.value;

  let variant = 'A';
  if (preview === 'a' || preview === 'b') {
    variant = preview.toUpperCase();
  } else if (visitorId) {
    variant = getVariant(visitorId);
    
    // REGISTRO DE IMPRESIÓN EN BASE DE DATOS
    if (!preview) {
      try {
        // Validar: Una impresión por sesión de 30 minutos[cite: 3].
        const check = await pool.query(
          `SELECT 1 FROM impresiones 
           WHERE visitor_id = $1 
           AND creado_en >= NOW() - INTERVAL '30 minutes' 
           LIMIT 1`,
          [visitorId]
        );

        if (check.rowCount === 0) {
          await pool.query(
            `INSERT INTO impresiones (visitor_id, variante) VALUES ($1, $2)`,
            [visitorId, variant]
          );
          console.log(`✅ Impresión registrada en BD para ${visitorId} (Variante ${variant})`);
        }
      } catch (error) {
        console.error("Error guardando impresión en BD:", error);
      }
    }
  }

  const isVariantA = variant === 'A';

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>
        {isVariantA
          ? 'Ocho semanas para un oficio que se puede cobrar.'
          : 'El curso empieza el 14 de abril. El cupo, no.'} 
      </h1>
      
      <section style={{ margin: '2rem 0' }}>
        <h2>Detalles del programa</h2>
        <ul>
          <li>Inicio: 14 de abril</li>
          <li>Duración: 8 semanas</li>
          <li>Cupo: 12 personas</li>
          <li>Oficios: carpintería, electricidad y cocina</li>
        </ul>
      </section>

      <Cta 
        text={isVariantA ? 'Ver cupos de abril' : 'Reservar mi lugar'} 
      />
    </main>
  );
}