import React from 'react';
import styles from './PokemonCard.module.css';
import { v4 as uuidv4 } from 'uuid';

const PokemonCard = ({ pokemon }) => {
  return (
    <>
      <li
        className={`${styles.li} ${
          styles[`${pokemon.types[0].toLowerCase()}`]
        }`}
      >
        <div className={styles.texts}>
          <h3 className={styles.name}>{pokemon.name}</h3>

          <h4 className={styles.num}>{pokemon.id}</h4>
        </div>

        <div className={styles['img-container']}>
          <img className={styles.img} src={pokemon.img} alt={pokemon.name} />
        </div>

        <ul className={styles['type-container']}>
          {pokemon.types.map((type) => (
            <li key={uuidv4()}>{type}</li>
          ))}
        </ul>
      </li>
    </>
  );
};

export default PokemonCard;
