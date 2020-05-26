import axios from 'axios';
import { POKEDEX_SERVICE_URL, REQUEST_HEADERS, NATIONAL_POKEDEX_URL, GET_POKEMON_URL } from '../../constants/pokedex-api';
import { ERROR_CODES } from '../../constants/error-codes';

const getPokedexRequest = async () => {  
  const pokedexRequest = axios({
    method: 'GET',
    headers: REQUEST_HEADERS,
    url: `${POKEDEX_SERVICE_URL}${NATIONAL_POKEDEX_URL}`
  })
  
  return await pokedexRequest;
}

const getPokemonRequest = async (pokemonNumber) => {
  const pokemonRequest = axios({
    method: 'GET',
    headers: REQUEST_HEADERS,
    url: `${POKEDEX_SERVICE_URL}${GET_POKEMON_URL}/${pokemonNumber}`
  })

  return await pokemonRequest;
}

const getAllPokemonInfo = async (pokedexData) => {
  let pokemon = undefined; 
  let pokemonData = [];
  let newPokemon = {};
  const pokemonList = pokedexData.data.pokemon_entries;
  const FIRST_GEN_LENGTH = 150;
  let pokedexEntry = {};

  for(let index = 0 ; index < FIRST_GEN_LENGTH ; index++) {
    pokedexEntry = pokemonList[index];
    pokemon = undefined;

    if(pokedexEntry.entry_number === 31) {
      continue; 
    }

    try {

      pokemon = await getPokemonRequest(pokedexEntry.entry_number);
      
    } catch(error)  {
      
      throw new Error(
        'Error al recoger datos de la pokedex'
      )
    }

    if(pokemon) {
      
      newPokemon = {
        number: pokedexEntry.entry_number,
        name: pokemon.data.name,
        sprite: pokemon.data.sprites.front_default,
        type: pokemon.data.types
      }

      pokemonData.push(newPokemon)
    } else {
      
      throw new Error(        
        'Error al recoger datos del pokemon'
      );       
    }  
  }

  return pokemonData
}

export const getPokemonService = async () => {
  let pokedexData = undefined; 
  try {
    pokedexData = await getPokedexRequest();
    
  } catch(error) {
    throw new Error(
      ERROR_CODES.DEFAULT_ERROR
    )
  }

  let pokemonData = undefined;

  if(pokedexData) {
    try {
      pokemonData = await getAllPokemonInfo(pokedexData);
      
    } catch(error)  {
      throw new Error('Error en get allpokemonInfo')
    }
  }  

  return pokemonData
}