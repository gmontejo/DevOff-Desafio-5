import React, { useEffect } from "react";
import "../styles/pokeInfoCard.css";
import "../styles/animations.css";
import "../styles/desktop.css";

import About from "./About";
import BaseStats from "./BaseStats";
import Evolutions from "./Evolutions";
import pokeball from "../img/pokeball.png";
import openPokeball from "../img/openPokeball.png";
import backButton from "../img/backButton.png";

export default function PokemonInfo(props) {
  const pokemon = props.pokemon;
  const displaySection = props.displaySection;
  const handleChangeDisplay = props.handleChangeDisplay;

  const handleInfoCloser = () => {
    let scrollPos = localStorage.getItem("scrollPos");
    let aboutSection = document.getElementById("aboutSection");
    if (aboutSection) {
      setTimeout(() => {
        aboutSection.scrollTo(0, 0);
      }, 500);
    }

    let elem = document.getElementById("pokeContainer");
    elem.classList.remove("poke-info-opened");
    let infoContainer = document.getElementById("cardInfoContainer");
    infoContainer.classList.remove("slide-in");
    infoContainer.classList.add("slide-out");
    infoContainer.classList.remove(pokemon.types[0].type.name);

    let pokeball = document.getElementById("pokeball");
    let openPokeball = document.getElementById("openPokeball");
    let pokeImg = document.getElementById("pokemonImg");

    setTimeout(() => {
      pokeball.classList.remove("pokeball-in");
      openPokeball.classList.remove("open-pokeball-animation");
      pokeImg.classList.remove("poke-appear");
    }, 500);

    document.documentElement.scrollTop = document.body.scrollTop = scrollPos;
  };

  useEffect(() => {
    if (displaySection && displaySection.props.id === "statsSection") {
      let progressBar = document.getElementsByClassName("full-bar");
      for (let bar of progressBar) {
        bar.classList.add("progress-bar");
      }
    }
  }, [displaySection]);

  return (
    <div id="cardInfoContainer" className={`card-info-container`}>
      <div
        background={`${pokemon.types[0].type.name}`}
        className="card-info-top"
      >
        <img
          onClick={handleInfoCloser}
          className="back-button"
          src={backButton}
          alt="back button"
        />
        <div className="name-and-typee">
          <div>
            <h2>{pokemon.name}</h2>
            <div className="types">
              {pokemon.types.map((type, i) => {
                return <span key={i}>{type.type.name}</span>;
              })}
            </div>
          </div>
          <h4 className="pokemonId">PokeID: #{pokemon.id}</h4>
        </div>
        <div className="poke-imgs">
          <img
            id="pokeball"
            src={pokeball}
            alt="pokeball"
            className="pokeball"
          />
          <img
            id="openPokeball"
            src={openPokeball}
            alt="open pokeball"
            className="open-pokeball"
          />
          <img
            id="pokemonImg"
            src={pokemon.img}
            alt={`Pokemon ${pokemon.name}`}
            className="pokemon-img"
          />
        </div>
      </div>
      <div className="card-info-bottom">
        <ul className="titles-list">
          <li
            onClick={() =>
              handleChangeDisplay(
                <About
                  className="info-section"
                  id="aboutSection"
                  pokemon={pokemon}
                />
              )
            }
            className={`${pokemon.types[0].type.name} info-title selected-section`}
            id="aboutSection-title"
          >
            About
          </li>
          <li
            onClick={() =>
              handleChangeDisplay(
                <BaseStats
                  className="info-section"
                  id="statsSection"
                  stats={pokemon.stats}
                />
              )
            }
            className={`${pokemon.types[0].type.name} info-title`}
            id="statsSection-title"
          >
            Base Stats
          </li>
          <li
            onClick={() =>
              handleChangeDisplay(
                <Evolutions
                  className="info-section"
                  id="evolutionSection"
                  evoChain={props.evoChain}
                />
              )
            }
            className={`${pokemon.types[0].type.name} info-title`}
            id="evolutionSection-title"
          >
            Evolution
          </li>
        </ul>
        {props.displaySection}
      </div>
    </div>
  );
}
