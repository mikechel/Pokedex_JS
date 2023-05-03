const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 150;
const colors = {
  fire:'orange',
  grass:'lightgreen',
  electric:'yellow',
  water:'#70ffea',
  ground:'darkgrey',
  rock:'grey',
  fairy:'pink',
  poison:'greenyellow',
  bug:'#94ecbe',
  dragon:'orange',
  psychic:'#7c7db6', 
  flying:'#fcca46',
  fighting:'darkgrey',
  normal:'lightgrey',
  ice:'#00f2f2',
  dark: '#4f7ecf',
  ghost: '#7685a7',
  steel: 'steelblue',
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async() => {
  for (let i = 1; i <= pokemonCount; i++){
    await getPokemons(i);
  }
}

const getPokemons = async(id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  createPokemonCard(data);
  //console.log(data.name);
}

const createPokemonCard = (poke) => {
  const card =  document.createElement('div');
  card.classList.add("pokemon");

  const name = poke.name[0].toUpperCase() + poke.name.slice(1); 

  const id = poke.id.toString().padStart(3, '0');

  const pokeTypes = poke.types.map(type => type.type.name);

  const type = mainTypes.reduce(type => pokeTypes);

  //console.log(type);
  
  const color = colors[type[0]];

  card.style.borderColor = color;
  card.style.boxShadow = `0 0 6px ${color}`

  const pokemonInnerHTML = `
    <div class="imgContainer">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="infos">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type.join(" | ")}</span></small>
    </div>
  `

  card.innerHTML = pokemonInnerHTML;
  pokeContainer.appendChild(card);
}

fetchPokemons();