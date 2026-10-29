export default function BitacoraPage() {
  // Los números fijos para probar el cálculo[cite: 5].
  const impresionesA = 240;
  const conversionesA = 18;
  const tasaA = impresionesA > 0 ? (conversionesA / impresionesA) * 100 : 0; 

  const impresionesB = 236;
  const conversionesB = 31;
  const tasaB = impresionesB > 0 ? (conversionesB / impresionesB) * 100 : 0; 

  const diferencia = tasaB - tasaA; 

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Bitácora del Experimento</h1>
      
      <h2>Caso Fijo Evaluado</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Variante</th>
            <th>Impresiones</th>
            <th>Conversiones</th>
            <th>Tasa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A. Control</td>
            <td>{impresionesA}</td>
            <td>{conversionesA}</td>
            {/* Los porcentajes salen de la fórmula y se redondean a dos decimales con coma[cite: 5]. */}
            <td>{tasaA.toFixed(2).replace('.', ',')}%</td> 
          </tr>
          <tr>
            <td>B. Tratamiento</td>
            <td>{impresionesB}</td>
            <td>{conversionesB}</td>
            <td>{tasaB.toFixed(2).replace('.', ',')}%</td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: '1rem' }}>
        <strong>Diferencia:</strong> {diferencia.toFixed(2).replace('.', ',')} pp
      </p>

      {/* TODO: BASE DE DATOS - Tasas Reales
          Aquí deberías renderizar otra tabla similar a la de arriba, 
          pero trayendo las impresiones y conversiones reales de tu base de datos. */}
    </main>
  );
}