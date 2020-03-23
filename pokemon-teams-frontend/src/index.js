const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

function fetchTrainers() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(obj => renderCards(obj))
}

function renderCards(obj) {
  obj.forEach(trainer => {
    renderTrainer(trainer)
  });
};

//RENDER POKEMON LIST
function renderPokemon(pokemon, pokelist) {
  let pokeItem = document.createElement('li');
  let releaseButton = document.createElement('button')
  releaseButton.innerHTML = 'Release'
  releaseButton.classList.add('release')
  releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
  pokeItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  pokeItem.appendChild(releaseButton)
  pokelist.appendChild(pokeItem);
};

//RENDER TRAINER CARDS
function renderTrainer(trainer) {
  //create elements
  let card = document.createElement('div');
  let name = document.createElement('p')
  let addButton = document.createElement('button');
  let pokelist = document.createElement('ul');

  //add results of rendering pokemon list
  trainer.pokemons.forEach(pokemon => {
    renderPokemon(pokemon, pokelist)
  });

  //assign attrs & classes to elements
  card.classList.add('card');
  card.setAttribute('data-id', `${trainer.id}`)
  name.innerHTML = `${trainer.name}`
  addButton.innerHTML = 'Add Pokemon'
  addButton.setAttribute('data-trainer-id', `${trainer.id}`)

  //append elements to document
  card.append(name, addButton, pokelist)
  main.appendChild(card)
};

//HANDLE CLICK EVENTS
main.addEventListener('click', (e) => {
  //add pokemon when add button is clicked
  if (e.target.hasAttribute('data-trainer-id')) {
    let pokelist = e.target.nextSibling
    const trainerId = e.target.dataset.trainerId;

    if (pokelist.children.length < 6) {
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'trainer_id': trainerId
        })
      })
      .then(resp => resp.json())
      .then(pokemon => {
        renderPokemon(pokemon, pokelist)
        console.log(pokemon)
      })
    }
  }
  //remove pokemon when release button is clicked
  if (e.target.classList.contains('release')) {
    let pokeId = e.target.dataset.pokemonId
    fetch(`${POKEMONS_URL}/${pokeId}`, {method: 'DELETE'})
      .then(resp => resp.json())
      .then(pokemon = e.target.parentElement.remove())
  }
})

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers()
})
