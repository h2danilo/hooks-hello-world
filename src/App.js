// hook do useState;
// hook useEffect => basicamente sobrepoe os metodos dos ciclos de vida que tinha na aplicacao. (componentDidMount(), componentdidUpdate(), componentWillUnmount())
import React, { useState, useEffect } from 'react';

function App() {
  // useState retorna um array,
  // na 1º posicao (const [tech, setTech] = "tech") retorna o estado em si
  // na 2º posicao ((const [tech, setTech]) = "setTech") é uma funcao que serve para atualizar as informacoes do estado
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  }

  // se desejar que o hook execute apenas uma vez, somente qdo componente montar em tela
  // entao cria-se um novo useEffect(), e no 2º param passa um array vazio, assim como nao tem nenhuma dependencia (nao fica monitorando nenhuma variavel)
  // executa apenas um vez (qdo carrega).
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // 1º param = funcao que sera executada
  // 2º param = qdo sera executada, é um array dependencias que fica monitorando alteracoes em certas variaveis.
  // ex: useEffect(() => {}, [tech]); ----> a funcao (1º param) sera executada toda vez que a variavel tech for alterada.
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

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
