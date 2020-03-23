class PokemonsController < ApplicationController

  def index
    pokemon = Pokemon.all
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    trainer = Trainer.find(params['pokemon']['trainer_id'])
    if trainer.pokemons.count <= 6
      pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
      render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end
end
