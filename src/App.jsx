import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'

import api from './Services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if(input === '') {
      alert("Preencha algum CEP.")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }catch{
      alert("Ops, Erro CEP não encontrado.")
    }
  }

  return (
      <div className="container">
        <h1 className="tittle">Buscador CEP</h1>
        <div className="container--input">
          <input 
          type="text"
          placeholder="Informe o seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

          <button className="button--search" onClick={handleSearch}>
            <FiSearch size={25} color='#fff'/>
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>

            <span>Rua: {cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} {cep.uf}</span>
          </main>
        )}

      </div>
  )
}

export default App
