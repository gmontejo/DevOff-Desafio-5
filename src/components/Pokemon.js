import React from "react";
import "../styles/pokeMinicard.css";

export default function Pokemon(props) {
  const pokemon = props.pokemon;

  return (
    <div
      onClick={props.onClick}
      background={`${pokemon.types[0].type.name}`}
      className={`poke-mini-card`}
    >
      <h3 className="poke-name">{pokemon.name}</h3>
      <div className="poke-info">
        <div className="types">
          {pokemon.types.map((type, i) => {
            return <span key={i}>{type.type.name}</span>;
          })}
        </div>
        <img src={pokemon.img} alt="pokemon" />
      </div>
      <h5 className="poke-ID">
        #{pokemon.id < 10 ? "00" : pokemon.id < 100 ? "0" : ""}
        {pokemon.id}
      </h5>
    </div>
  );
}
