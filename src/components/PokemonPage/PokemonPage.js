import React from 'react';
import { useParams } from 'react-router';
import styles from './PokemonPage.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const PokemonPage = ({ pokemons }) => {
  const { pokemon } = useParams();
  const navigate = useNavigate();

  const pokemonToUse = pokemons.find((el) => el.name === pokemon);
  console.log(pokemonToUse.img);

  const prevPageHandler = () => {
    navigate(-1);
  };

  const pokemonHeight = pokemonToUse.height * 10;
  const pokemonWeight = pokemonToUse.weight / 10;

  return (
    <div className={styles['main-container']}>
      <button className={styles.back} onClick={prevPageHandler}>
        Back
      </button>

      <div className={styles.pokemon}>
        <div className={styles.header}>
          <p className={styles.name}>{pokemonToUse.name}</p>
          <p className={styles.id}>{pokemonToUse.id}</p>
        </div>

        <div className={styles['img-container']}>
          <img
            className={styles.img}
            src={pokemonToUse.img}
            alt={pokemonToUse.name}
          />
        </div>

        <div className={styles.texts}>
          <p className={styles.entry}>{pokemonToUse.entry}</p>

          <p className={styles.height}>
            <strong>Height:</strong> {pokemonHeight} cm
          </p>

          <p className={styles.weight}>
            <strong>Weight:</strong> {pokemonWeight} kg
          </p>

          <ul className={styles['type-container']}>
            {pokemonToUse.types.map((type) => (
              <li
                className={`${styles.list}  ${styles[`${type}`]}`}
                key={uuidv4()}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
