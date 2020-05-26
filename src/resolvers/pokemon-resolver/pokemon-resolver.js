import { getPokemonService } from "../../services/pokemon-services/get-pokemon";

export const PokemonResolver = { 

  Query: {
    getPokemon: () => getPokemonService()
  }
}