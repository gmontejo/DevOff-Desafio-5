import React from "react";
import "../styles/loading.css";
import pokemonTitle from "../img/pokemonTitle.png";
import pokeball from "../img/pokeball-loading.png";

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={pokemonTitle} className="pokemon-title" alt="pokemon title" />
      <h2 className="loading-text">Please wait until we catch 'em all!</h2>
      <img src={pokeball} className="pokeball-loading" alt="pokeball" />
    </div>
  );
}
