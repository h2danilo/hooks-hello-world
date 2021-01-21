// hook do useState;
import React, { useState } from 'react';

function App() {
  // useState retorna um array,
  // na 1º posicao (const [tech, setTech] = "tech") retorna o estado em si
  // na 2º posicao ((const [tech, setTech]) = "setTech") é uma funcao que serve para atualizar as informacoes do estado
  const [tech, setTech] = useState(['ReactJS', 'React Native']);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  }

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Atualizar
      </button>
    </>
  );
}

export default App;
