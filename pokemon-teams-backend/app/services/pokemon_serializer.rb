class PokemonSerializer

  def initialize(poke_object)
    @pokemon = poke_object
  end

  def to_serialized_json
    options = {
      include: {
        trainer: {only: [:id, :name]}
      },
      except: [:updated_at]
    }
    @pokemon.to_json(options)
  end

end
