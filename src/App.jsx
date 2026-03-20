import { useState } from "react";
import "./App.css";

function App() {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  function adicionarItem() {
    if (novoItem.trim() === "") return;

    const novoObjeto = {
      id: Date.now(),
      nome: novoItem,
    };

    setItens([...itens, novoObjeto]);
    setNovoItem("");
  }

  function atualizarItem(id) {
    const itemSelecionado = itens.find((item) => item.id === id);
    setNovoItem(itemSelecionado.nome);
    setEditandoId(id);
  }

  function salvarItem() {
    if (novoItem.trim() === "") return;

    const novaLista = itens.map((item) =>
      item.id === editandoId ? { ...item, nome: novoItem } : item
    );

    setItens(novaLista);
    setNovoItem("");
    setEditandoId(null);
  }

  function removerItem(id) {
    const novaLista = itens.filter((item) => item.id !== id);
    setItens(novaLista);
  }

  function pressionarEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      if (editandoId === null) {
        adicionarItem();
      } else {
        salvarItem();
      }
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>CONTROLE DE ITENS</h1>

        <div className="input-group">
          <input
            type="text"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            onKeyDown={pressionarEnter}
            placeholder="Digite um item"
          />

          {editandoId === null ? (
            <button onClick={adicionarItem}>Adicionar</button>
          ) : (
            <button onClick={salvarItem}>Salvar</button>
          )}
        </div>

        <ul>
          {itens.map((item) => (
            <li key={item.id}>
              <span>{item.nome}</span>

              <div>
                <button onClick={() => atualizarItem(item.id)}>
                  Atualizar
                </button>
                <button onClick={() => removerItem(item.id)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;