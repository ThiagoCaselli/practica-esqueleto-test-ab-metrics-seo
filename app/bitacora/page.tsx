export default function BitacoraPage() {
  return (
    <main className="min-h-screen bg-[#1c1511] text-[#a69c95] flex flex-col items-center pt-24 px-6 font-sans">
      <div className="max-w-2xl w-full flex flex-col gap-8">
        
        <div className="uppercase tracking-[0.15em] text-[10px] text-[#8c827a]">
          LABORATORIO 01 · BITÁCORA
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-[#f2ece4] leading-tight">
          Métricas del experimento.
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-[#a69c95]">
          Resultados del caso fijo evaluado con el visitante de prueba exigido por la cátedra.
        </p>

        <div className="flex flex-col border-t border-[#362b25] mt-8">
          
          <div className="py-6 border-b border-[#362b25] flex flex-col gap-2">
            <span className="text-[#756a62] text-xs font-mono">VARIANTE A</span>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[#f2ece4] font-mono text-sm">Control</h3>
                <p className="text-[#a69c95] text-sm mt-1">240 impresiones anotadas por sesión.<br/>18 conversiones únicas.</p>
              </div>
              <div className="text-[#f2ece4] font-serif text-2xl">
                7,50%
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-[#362b25] flex flex-col gap-2">
            <span className="text-[#756a62] text-xs font-mono">VARIANTE B</span>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[#f2ece4] font-mono text-sm">Tratamiento</h3>
                <p className="text-[#a69c95] text-sm mt-1">236 impresiones anotadas por sesión.<br/>31 conversiones únicas.</p>
              </div>
              <div className="text-[#f2ece4] font-serif text-2xl">
                13,14%
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-[#362b25] flex flex-col gap-2">
            <span className="text-[#756a62] text-xs font-mono">IMPACTO</span>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[#f2ece4] font-mono text-sm">Diferencia de rendimiento</h3>
                <p className="text-[#a69c95] text-sm mt-1">Brecha porcentual entre ambas variantes.</p>
              </div>
              <div className="text-[#e4c27a] font-serif text-3xl">
                5,64 pp
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}