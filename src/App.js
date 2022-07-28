import React, { useState, useEffect, useReducer } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import axios from 'axios';

import Navigation from './components/Navigation/Navigation';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonPage from './components/PokemonPage/PokemonPage';

const COMMAND_POKEMON = {
  ADD_TYPE: 'add-type',
  ADD_POKEMON_DATA: 'add-pokemon-data',
};

const pokemonsReducer = (pokemons, action) => {
  if (action.type === COMMAND_POKEMON.ADD_TYPE) {
    return {
      ...pokemons,
      pokemonTypes: [...pokemons.pokemonTypes, ...action.data],
    };
  }

  if (action.type === COMMAND_POKEMON.ADD_POKEMON_DATA) {
    const newData = [...pokemons.pokemonData, action.data].sort(
      (a, b) => a.id - b.id
    );

    return { ...pokemons, pokemonData: newData };
  }

  return pokemons;
};

function App() {
  const [pokemons, dispatchPokemon] = useReducer(pokemonsReducer, {
    pokemonTypes: ['all'],
    pokemonData: [],
  });

  const [loadPokemonData, setLoadPokemonData] = useState(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60'
  );

  const getPokemonTypes = () => {
    axios
      .get('https://pokeapi.co/api/v2/type/')
      .then((res) => {
        const types = res.data.results.map((el) => el.name);

        dispatchPokemon({
          type: COMMAND_POKEMON.ADD_TYPE,
          data: types,
        });
      })
      .catch((err) => console.error(err));
  };

  const getPokemonData = () => {
    axios
      .get(loadPokemonData)
      .then((res) => {
        setLoadPokemonData(res.data.next);

        res.data.results.forEach(async (pokemon) => {
          const resObject = await axios.get(pokemon.url);
          const resEntry = await axios.get(resObject.data.species.url);
          const entryText = resEntry.data.flavor_text_entries[1].flavor_text
            .replaceAll('\u000c', ' ')
            .replaceAll('\n', ' ');

          const pokemonObj = {
            name: resObject.data.name,
            height: resObject.data.height,
            weight: resObject.data.weight,
            id: resObject.data.id,
            img: resObject.data.sprites.other.dream_world.front_default,
            types: resObject.data.types.map((el) => {
              return el.type.name;
            }),
            // entry: resEntry.data.flavor_text_entries[1].flavor_text,
            entry: entryText,
          };

          dispatchPokemon({
            type: COMMAND_POKEMON.ADD_POKEMON_DATA,
            data: pokemonObj,
          });
        });
      })
      .catch((err) => console.error(err));
  };

  // GET INITIAL DATA FOR POKEMON
  useEffect(() => {
    return () => {
      getPokemonTypes();
      getPokemonData();
    };
  }, []);

  useEffect(() => {
    pokemons.pokemonTypes.length > 0 && console.log(pokemons.pokemonTypes);
  }, [pokemons.pokemonTypes]);

  useEffect(() => {
    pokemons.pokemonData.length > 0 &&
      pokemons.pokemonData.length % 60 === 0 &&
      console.log(pokemons.pokemonData);
  }, [pokemons.pokemonData]);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <PokemonList
              pokemons={pokemons}
              onGetPokemonData={getPokemonData}
            />
          }
        />

        <Route
          path='/types/:type'
          element={
            <PokemonList
              pokemons={pokemons}
              onGetPokemonData={getPokemonData}
            />
          }
        />

        <Route
          path='/:pokemon'
          element={<PokemonPage pokemons={pokemons.pokemonData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
