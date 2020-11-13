import React from "react";

export default function About(props) {
  let pokemon = props.pokemon;
  return (
    <div id="aboutSection" className="about">
      <div className="text-flavor">{pokemon.about}</div>
      <ul className="main-data">
        <li>
          <span className="info-name">Species</span> {pokemon.species}
        </li>
        <li>
          <span className="info-name">Height</span> {pokemon.height} cm
        </li>
        <li>
          <span className="info-name">Weight</span> {pokemon.weight} kg
        </li>
        <li>
          <span className="info-name">Abilities</span> {pokemon.abilities}
        </li>
      </ul>
      <h4>Breeding</h4>
      <ul>
        <li>
          <span className="info-name">Gender</span> {pokemon.gender}
        </li>
        <li>
          <span className="info-name">Growth Rate</span> {pokemon.growthRate}
        </li>
        <li>
          <span className="info-name">Egg Groups</span> {pokemon.eggGroups}
        </li>
        <li>
          <span className="info-name">Shape</span> {pokemon.shape}
        </li>
      </ul>
    </div>
  );
}
