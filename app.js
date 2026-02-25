const url = 'https://rickandmortyapi.com/api/character/'
const container = document.querySelector('.container')
const details = document.querySelector('.details')
const inputSearch = document.querySelector('#inputSearch')
const btnSeatch = document.querySelector('#btnSeatch')

const getData = (url) => fetch(url).then(response => response.json())

const createdCard = (character) => {
  const div = document.createElement('div')
  const html = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}">
    <button 
      onclick="switchInvisible()"
      class="btn"
      data-id="${character.id}">Detalles</button>
  `
  div.className = 'card'
  div.innerHTML = html
  return div
}

const switchInvisible = () => {
  container.classList.toggle('invisible')
  details.classList.toggle('invisible')
}

const searchByd = (e) => {
  if (e.target.classList.contains('btn')) {
    const id = e.target.getAttribute('data-id')
    getData(url + id)
      .then(character => {
        const html = `
          Nombre: ${character.name}<br>
          Imagen: <img src="${character.image}"><br>
          Genero: ${character.gender}<br>
          Esta vivo?: ${character.status}<br>
          Ubicacion: ${character.location.name}<br>
          Origen: ${character.origin.name}
        `
        details.querySelector('div').innerHTML = html
      })
  }
}


const searchByName = () => {
  const name = inputSearch.value
  if (name) {
    getData(url + '?name=' + name)
      .then(data => {
        container.innerHTML = ''
        data.results.forEach(character => {
          container.appendChild(createdCard(character))
        })
      })
      .catch(err => console.log(err))
  }
}

const page = Math.floor(Math.random() * 42) + 1
getData(url + '?page=' + page)
  .then(data => {
    data.results.forEach(character => {
      container.appendChild(createdCard(character))
    })
  })
  .catch(err => console.log(err))

container.addEventListener('click', searchByd)
btnSeatch.addEventListener('click', searchByName)
