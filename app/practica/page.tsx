import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getVariant } from '@/lib/experiment';
import Cta from '@/components/cta';
import { pool } from '@/lib/db';

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
    
    if (!preview) {
      try {
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
    <main className="min-h-screen bg-[#1c1511] text-[#a69c95] flex flex-col items-center pt-24 px-6 font-sans">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        
        <div className="uppercase tracking-[0.15em] text-[10px] text-[#8c827a]">
          LABORATORIO 01 · PRÁCTICA
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-[#f2ece4] leading-tight">
          {isVariantA
            ? 'Ocho semanas para un oficio que se puede cobrar.'
            : 'El curso empieza el 14 de abril. El cupo, no.'} 
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-[#a69c95]">
          La oferta y el caso de prueba ya están. Acá tenés los detalles para la cohorte actual.
        </p>

        <div className="flex items-center gap-4">
          <Cta text={isVariantA ? 'Ver cupos de abril' : 'Reservar mi lugar'} />
        </div>

        <div className="flex flex-col border-t border-[#362b25] mt-8">
          
          <div className="py-6 border-b border-[#362b25] flex flex-col gap-2">
            <span className="text-[#756a62] text-xs font-mono">01</span>
            <div>
              <h3 className="text-[#f2ece4] font-mono text-sm">Inicio y duración</h3>
              <p className="text-[#a69c95] text-sm mt-1">14 de abril, con una extensión de 8 semanas de práctica real.</p>
            </div>
          </div>

          <div className="py-6 border-b border-[#362b25] flex flex-col gap-2">
            <span className="text-[#756a62] text-xs font-mono">02</span>
            <div>
              <h3 className="text-[#f2ece4] font-mono text-sm">Condiciones</h3>
              <p className="text-[#a69c95] text-sm mt-1">Cupo máximo limitado a 12 personas por grupo.</p>
            </div>
          </div>

          <div className="py-6 border-b border-[#362b25] flex flex-col gap-2">
            <span className="text-[#756a62] text-xs font-mono">03</span>
            <div>
              <h3 className="text-[#f2ece4] font-mono text-sm">Oficios</h3>
              <p className="text-[#a69c95] text-sm mt-1">Carpintería, electricidad y cocina.</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}