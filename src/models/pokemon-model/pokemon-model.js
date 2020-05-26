import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  number: Number,
  name: String,
  sprite: String,
});

export const PokemonModel = mongoose.model("pokemon", pokemonSchema);
