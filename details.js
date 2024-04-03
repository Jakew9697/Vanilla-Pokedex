document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded."); // Log to check if DOMContentLoaded is firing
  
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get("id");
  
    if (pokemonId) {
      const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      
      fetch(detailsUrl)
        .then((res) => res.json())
        .then((data) => {
          displayPokemonDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon details:", error);
        });
    } else {
      console.error("Pokemon ID not found in the URL");
    }
  });
  
  const displayPokemonDetails = async (pokemon) => {
    console.log(pokemon); // Log the entire pokemon object to the console

    const pokemonDetails = document.getElementById("pokemonDetails");
  
    pokemonDetails.innerHTML = `
        <h1>Shiny</h1>
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites["front_shiny"]}" alt="${pokemon.name}" />
      <img src="${pokemon.sprites["front_default"]}" alt="${pokemon.name}" />

      <p>Stats:</p>
      <ul>
      ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
      </ul>

      <p>Types: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
      <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
      <p>Height: ${pokemon.height}'</p>
      <p>Weight: ${pokemon.weight}lbs</p>  
      <!-- Add more details as needed -->
      
    `;

      // Toggle Shiny button below w/ eventlistener
  const toggleShiny = () => {
    const shinyToggle = document.getElementById("shinyToggle");
    const pokemonImage = document.getElementById("pokemonImage");

    shinyToggle.addEventListener("change", () => {
      // Update the image source based on the toggle state
      if (shinyToggle.checked) {
        pokemonImage.src = pokemon.sprites["front_shiny"];
      } else {
        pokemonImage.src = pokemon.sprites["front_default"];
      }
    });
  };

  // Call the toggleShiny function to set up the event listener
  toggleShiny();
};
  
  