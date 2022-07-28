import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PokemonCard from './PokemonCard';
import styles from './PokemonList.module.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const PokemonList = ({ pokemons, onGetPokemonData }) => {
  const { type: typeToUse } = useParams();

  const pokemonTypesStr = !typeToUse ? 'all' : `${typeToUse} type`;

  const filterPokemon = (arr, bool = 0, type) => {
    if (bool)
      return arr.filter((pokemon) => {
        return pokemon.types.some(
          (pokemonType) => pokemonType.toLowerCase() === type
        );
      });

    return arr;
  };

  return (
    <>
      <Navigation types={pokemons.pokemonTypes} loadMore={onGetPokemonData} />

      <p className={styles.title}>{pokemonTypesStr} pokemons</p>
      <section className={styles['main-container']}>
        <ul className={styles.ul}>
          {filterPokemon(pokemons.pokemonData, typeToUse, typeToUse).map(
            (pokemon) => {
              return (
                <Link
                  key={uuidv4()}
                  className={styles.link}
                  to={`/${pokemon.name}`}
                >
                  <PokemonCard pokemon={pokemon} />
                </Link>
              );
            }
          )}
        </ul>
      </section>
    </>
  );
};

export default PokemonList;
