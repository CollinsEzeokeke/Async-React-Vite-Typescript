import React, { useState, useEffect } from 'react'
import PromisePool from "@supercharge/promise-pool"
import { getPokemonList, getPokemon, Pokemon } from "./getPokemon"
import './App.css'

function App() {
  const [ pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getData = async () => {
      
    const list = await getPokemonList();
    const { results } = await PromisePool
    .withConcurrency(2)
    .for(list.results)
    .process(async data => {
        return await getPokemon(data.url);
    })
    setPokemon(results)    
    }
    getData();  
  }, []);


  return (
    <div>
      <ul>
  {pokemon.map((pokemon) => {
        return <li key={pokemon.id}>{pokemon.name}</li>
    })}  
    </ul>  
    </div>
  )
}

export default App
