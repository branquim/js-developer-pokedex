const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function abrirModal(visModal) {
	let modal = document.getElementById(visModal)
	modal.style.display = 'block'
	document.body.style.overflow = 'hidden'
}

function fecharModal(fecharmodal) {
	let modal = document.getElementById(fecharmodal)
	modal.style.display = 'none'
	document.body.style.overflow = 'auto'
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <button class="btn" onclick="abrirModal('modal-${pokemon.number}')"><img src="${pokemon.photo}"
                     alt="${pokemon.name}"></button>
            </div>

            <div id='modal-${pokemon.number}' class="modal" onclick="fecharModal('modal-${pokemon.number}')">
                <div class="conteudo-modal ${pokemon.type}">
                    <h1 class="name">${pokemon.name}</h1>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <p align="right" style="color:#fff">#${pokemon.number}</p>
                    </div>
		    <div align="center">
		        <img src="${pokemon.photo}" alt="${pokemon.name}">
		    </div>
		    <div class="conteudo-modal-relativo">
		        <div>
		            <h2>Habilidades</h2>
		            <ol class="abilities">
		               ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
	                    </ol>
	                </div>
		        <div>
		            <h2>Formas</h2>
		            <ol class="abilities">
		                ${pokemon.forms.map((form) => `<li>${form}</li>`).join('')}
		            </ol>
		        </div>
		    </div>
                </div>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join(''))
}
//function loadPokemonItens(offset, limit) {
//    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
//        const newHtml = pokemons.map(convertPokemonToLi).join('')
//        pokemonList.innerHTML += newHtml
//    })
//}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
