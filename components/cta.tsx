'use client'

import { registrarConversion } from '../app/practica/actions';

export default function CTA({ text }: { text: string }) {
  const handleClick = async () => {
    // La conversión ocurre estrictamente al hacer clic en el CTA[cite: 4].
    await registrarConversion(); 
    alert('Acción registrada correctamente.');
  };

  return (
    <button 
      onClick={handleClick}
      style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: 'black', color: 'white', borderRadius: '6px' }}
    >
      {text}
    </button>
  );
}