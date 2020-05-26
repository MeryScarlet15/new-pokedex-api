import { PokemonModel } from "../../models/pokemon-model/pokemon-model";

export const getPokemonService = () => {
  return PokemonModel.find({});
};
