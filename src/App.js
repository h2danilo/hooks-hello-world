// hook do useState;
// hook useEffect => basicamente sobrepoe os metodos dos ciclos de vida que tinha na aplicacao. (componentDidMount(), componentdidUpdate(), componentWillUnmount())
// hook useMemo => importante utilizar qdo nao desejar chamar algo todas as vezes que renderize a tela, ex. algum calculo, ou algo complexo,
// useCallback => como se fosse useMemo, porém, ao inves de retornar um unico valor retorna uma funcao.
import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // useState retorna um array,
  // na 1º posicao (const [tech, setTech] = "tech") retorna o estado em si
  // na 2º posicao ((const [tech, setTech]) = "setTech") é uma funcao que serve para atualizar as informacoes do estado
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  /* function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  } */
  // da forma acima toda vez que altera alguma variavel (tech, newTech), a function é montada, gastando processamento do JS.
  // para evitar isso utiliza-se o useCallback, conforme abaixo:
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [tech, newTech]);

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

  //nesse cenario soh irá verificar tamanho do array, qdo variavel tech atualizar.
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {/* Cenario abaixo o tech.length é executado toda vez que a tela renderiza, ou seja, toda vez que atualiza qq variavel da tela */}
      <strong>Você possui {tech.length} tecnologia</strong>
      <br />
      {/* nesse cenario resultado é o mesmo do acima, porém, evita da variavel ficar atualizando cada vez que tela renderiza, só vai atualizar qdo tiver alteracao na variavel informada no memo */}
      <strong>Você possui {techSize} tecnologia</strong>
      <br />
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Atualizar
      </button>
    </>
  );
}

export default App;
