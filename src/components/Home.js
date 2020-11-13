import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import PokemonInfo from "./PokemonInfo";
import femaleSymbol from "../img/femaleSymbol.png";
import maleSymbol from "../img/maleSymbol.png";
import About from "./About";
import Loading from "./Loading";
import backToTop from "../img/backToTopButtonN.png";
import pokedexImg from "../img/pokedex.png";
import clearButton from "../img/clearButton.png";
import "../styles/desktop.css";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [showPokeInfo, setShowPokeInfo] = useState();
  const [allPokemons, setAllPokemons] = useState();
  const [displaySection, setDisplaySection] = useState();
  const [selectedEvo, setSelectedEvo] = useState([]);
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    getPoke();
  }, []);

  useEffect(() => {
    if (doneLoading) {
      let backToTopButton = document.getElementById("back-to-top");
      window.addEventListener("scroll", (e) => {
        if (window.scrollY > 600) {
          backToTopButton.style.display = "flex";
        } else {
          backToTopButton.style.display = "none";
        }
      });
    }
  }, [doneLoading]);

  const getSingleEvolution = async (url) => {
    let evoArray = [];
    let evolution = await axios(url);

    let lastEvo = evolution.data.chain;

    do {
      let pokeID = lastEvo.species.url.replace(/\D/g, "").split("");
      pokeID.shift();
      evoArray.push({
        name: lastEvo.species.name,
        pokeID: pokeID.join(""),
      });
      lastEvo = lastEvo["evolves_to"][0];
    } while (lastEvo);
    setSelectedEvo(evoArray);
  };

  let getPoke = async () => {
    let result = await axios("https://pokeapi.co/api/v2/pokemon?limit=721");
    let pokeArray = result.data.results;
    let pokeData = [];

    pokeData = await Promise.all(
      pokeArray.map(async (pokemon) => {
        let query = await axios(pokemon.url);
        let moreData = await axios(
          `https://pokeapi.co/api/v2/pokemon-species/${query.data.id}/`
        );

        let about = "";

        for (let i = 0; i < moreData.data.flavor_text_entries.length; i++) {
          if (moreData.data.flavor_text_entries[i].language.name === "en") {
            about = moreData.data.flavor_text_entries[i].flavor_text;
            break;
          }
        }

        let species = "";
        let abilites = query.data.abilities;
        abilites = abilites.map((ability) => {
          return ability.ability.name;
        });

        try {
          species =
            moreData.data.genera[7] &&
            moreData.data.genera[7].genus.replace("Pokémon", "");
        } catch (err) {
          species = "Missing Data =(";
        }

        let male = ((8 - moreData.data.gender_rate) / 8) * 100;
        let female = (moreData.data.gender_rate / 8) * 100;
        let gender = moreData.data.gender_rate;

        if (gender === -1) {
          gender = <span>Genderless</span>;
        } else {
          gender = (
            <span>
              <img src={maleSymbol} alt="male symbol" /> {`${male}%`}{" "}
              <img src={femaleSymbol} alt="male symbol" /> {`${female}%`}
            </span>
          );
        }

        let displayImg =
          query.data.id > 151
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${query.data.id}.png`
            : `img/${query.data.id}.png`;

        let eggGroups = "";

        try {
          eggGroups = moreData.data.egg_groups[0].name.replace("1", "");
        } catch (err) {
          eggGroups = "Missing Data =(";
        }

        let poke = {
          id: query.data.id,
          name: query.data.name,
          types: query.data.types,
          stats: query.data.stats,
          abilities: abilites.join(", "),
          height: query.data.height * 10,
          weight: query.data.weight / 10,
          img: displayImg,
          shape: moreData.data.shape.name,
          growthRate: moreData.data.growth_rate.name,
          gender: gender,
          eggGroups: eggGroups,
          about: about.replace("\f", " "),
          species: species,
          evoChain:
            moreData.data.evolution_chain && moreData.data.evolution_chain.url,
        };

        return poke;
      })
    );

    setShowPokeInfo(pokeData[0]);
    setPokemonList(pokeData);
    setAllPokemons(pokeData);
    setDoneLoading(true);
  };

  const handleInfoOpener = (pokemon) => {
    // Info Section Animation
    setShowPokeInfo(pokemon);
    let infoContainer = document.getElementById("cardInfoContainer");
    infoContainer.classList.remove("slide-out");
    infoContainer.classList.add("slide-in");
    infoContainer.classList.add(pokemon.types[0].type.name);
    let scroll = window.pageYOffset || document.documentElement.scrollTop;
    localStorage.setItem("scrollPos", scroll);

    // Pokeball and pokemon animation
    let pokeball = document.getElementById("pokeball");
    let openPokeball = document.getElementById("openPokeball");
    let pokeImg = document.getElementById("pokemonImg");
    pokeball.classList.add("pokeball-in");
    openPokeball.classList.add("open-pokeball-animation");
    pokeImg.classList.add("poke-appear");

    //Set Section to display
    setDisplaySection(<About id="aboutSection" pokemon={pokemon} />);

    //Get evolution chain PRUEBA
    getSingleEvolution(pokemon.evoChain);

    let elem = document.getElementById("pokeContainer");
    setTimeout(() => {
      elem.classList.add("poke-info-opened");
    }, 500);
  };

  const handlePokeSearch = (e) => {
    let pokeFilter = allPokemons.filter((poke) => {
      let namePass = poke.name.includes(
        e.target.value.toLowerCase().replace(/\s+/g, "")
      );
      let typePass = poke.types[0].type.name.includes(
        e.target.value.toLowerCase().replace(/\s+/g, "")
      );
      let idPass = poke.id.toString().includes(e.target.value) ? true : false;

      if (namePass || typePass || idPass) {
        return true;
      }

      return false;
    });
    setPokemonList(pokeFilter);
  };

  const handleClearSearch = () => {
    const search = document.getElementById("searchValue");
    search.value = "";
    setPokemonList(allPokemons);
  };

  const handleChangeDisplay = (section) => {
    setDisplaySection(section);
  };

  useEffect(() => {
    let sections = document.getElementsByClassName("info-title");
    for (let section of sections) {
      section.classList.remove("selected-section");
    }
    if (displaySection) {
      let sectionTitle = document.getElementById(
        `${displaySection.props.id}-title`
      );
      sectionTitle.classList.add("selected-section");
    }
  }, [displaySection]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return !doneLoading ? (
    <Loading />
  ) : (
    <div id="pokeContainer" className="poke-container">
      <img className="pokedex-title" src={pokedexImg} alt="pokedex title" />
      <div className="search-bar">
        <input
          id="searchValue"
          onChange={handlePokeSearch}
          type="text"
          placeholder="Search by Name, Main Type or ID"
        />
        <img
          className="clear-search-button"
          onClick={handleClearSearch}
          src={clearButton}
          alt=""
        />
      </div>
      <div id="poke-catalog" className="poke-catalog">
        {pokemonList &&
          pokemonList.map((pokemon, i) => {
            return (
              <Pokemon
                key={i}
                pokemon={pokemon}
                onClick={() => handleInfoOpener(pokemon)}
              />
            );
          })}
      </div>
      {showPokeInfo && (
        <PokemonInfo
          evoChain={selectedEvo}
          handleChangeDisplay={handleChangeDisplay}
          displaySection={displaySection}
          pokemon={showPokeInfo}
        />
      )}
      <div id="back-to-top" onClick={handleBackToTop} className="back-to-top">
        <img src={backToTop} alt="back to top button" />
      </div>
      <div className="curtain-one"></div>
      <div className="curtain-two"></div>
    </div>
  );
}
