import React from "react";
import "../styles/evolutions.css";
import arrowDown from "../img/arrowDown.png";

export default function Evolutions(props) {
  let evoChain = props.evoChain;

  return (
    <div id="evolutionsSection" className="evolutions">
      {evoChain &&
        evoChain.map((evo, index) => {
          let yCord =
            (parseInt(evo.pokeID) / 28) % 1 === 0
              ? Math.floor(parseInt(evo.pokeID) / 28) * 80 - 80
              : Math.floor(parseInt(evo.pokeID) / 28) * 80;

          let coordinades = `-${
            (parseInt(evo.pokeID) -
              (Math.floor(28 * Math.floor(parseInt(evo.pokeID) / 29)) + 1)) *
            80
          }px -${yCord}px`;

          return (
            <div
              key={index}
              className={`evolution-container ${`evo-number-${index}`}`}
            >
              {index === 0 ? null : (
                <img
                  className="arrow-down"
                  src={arrowDown}
                  alt="arrow down"
                ></img>
              )}

              <span className="evo-name">
                {evo.name} #
                {evo.pokeID < 10 ? "00" : evo.pokeID < 100 ? "0" : ""}
                {evo.pokeID}
              </span>
              <div
                className="evo-img"
                style={{
                  backgroundPosition:
                    evo.pokeID < "494" ? coordinades : "-1360px -1360px",
                }}
              >
                {evo.pokeID < "494" ? null : (
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.pokeID}.png`}
                    alt="evolution"
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
