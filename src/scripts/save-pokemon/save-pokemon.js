import axios from "axios";
import {
  POKEDEX_SERVICE_URL,
  REQUEST_HEADERS,
  NATIONAL_POKEDEX_URL,
  GET_POKEMON_URL,
} from "../../constants/pokedex-api";
import { ERROR_CODES } from "../../constants/error-codes";
import { PokemonModel } from "../../models/pokemon-model/pokemon-model";
import createDBConnection from "../../config/db/db";

const getPokedexRequest = async () => {
  return await axios({
    method: "GET",
    headers: REQUEST_HEADERS,
    url: `${POKEDEX_SERVICE_URL}${NATIONAL_POKEDEX_URL}`,
  });
};

const getPokemonRequest = async (pokemonNumber) => {
  return await axios({
    method: "GET",
    headers: REQUEST_HEADERS,
    url: `${POKEDEX_SERVICE_URL}${GET_POKEMON_URL}/${pokemonNumber}`,
  });
};

const getAllPokemonInfo = async (pokedexData) => {
  let pokemon = undefined;
  let pokemonData = [];
  let newPokemon = {};
  const pokemonList = pokedexData.data.pokemon_entries;
  const FIRST_GEN_LENGTH = 150;
  let pokedexEntry = {};

  for (let index = 0; index < FIRST_GEN_LENGTH; index++) {
    pokedexEntry = pokemonList[index];
    pokemon = undefined;

    if (pokedexEntry.entry_number === 31) {
      continue;
    }

    try {
      pokemon = await getPokemonRequest(pokedexEntry.entry_number);
    } catch (error) {
      throw new Error("Error al recoger datos de la pokedex");
    }

    if (pokemon) {
      newPokemon = {
        number: pokedexEntry.entry_number,
        name: pokemon.data.name,
        sprite: pokemon.data.sprites.front_default,
        type: pokemon.data.types,
      };

      pokemonData.push(newPokemon);
    } else {
      throw new Error("Error al recoger datos del pokemon");
    }
  }

  return pokemonData;
};

const savePokemon = async () => {
  let pokedexData = undefined;
  console.log("Getting pokedex...");
  try {
    pokedexData = await getPokedexRequest();
  } catch (error) {
    throw new Error(ERROR_CODES.DEFAULT_ERROR);
  }

  let pokemonData = undefined;
  console.log("Getting pokemon info...");

  if (pokedexData) {
    try {
      pokemonData = await getAllPokemonInfo(pokedexData);
    } catch (error) {
      throw new Error("Error en get allpokemonInfo");
    }
  }
  console.log("Saving pokemon...");

  for (let pokemon of pokemonData) {
    new PokemonModel(pokemon).save();
    console.log("pokemon saved");
  }

  console.log("All the pokemons are saved");
};

createDBConnection()
  .then(() => {
    console.log("Mongodb is running");
    savePokemon();
  })
  .catch((error) => {
    console.log(error);
  });
