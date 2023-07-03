// First aproach-------------
let planetNavs = document.querySelectorAll('li')
let infoButton = document.querySelectorAll('.info-button')
let container = document.querySelector('.planet-div')
let overviewButton = document.getElementById('overview-button')
let structureButton = document.getElementById('structure-button')
let geologyButton = document.getElementById('geology-button')

//Data to update in current planet
let planetName = document.getElementById('planet-name-h1')
let planetImage = document.querySelector('.planet-image')
let geologyPlanetImage = document.querySelector('.geology-planet-image')
let infoParagraph = document.getElementById('info-paragraph')
let wikiLink = document.getElementById('wiki-link')
let rotation = document.getElementById('rotation')
let revolution = document.getElementById('revolution')
let radius = document.getElementById('radius')
let temperature = document.getElementById('temp')

//Planets options in header
let mercury = document.getElementById('mercury')
let venus = document.getElementById('venus')
let earth = document.getElementById('earth')
let mars = document.getElementById('mars')
let jupiter = document.getElementById('jupiter')
let saturn = document.getElementById('saturn')
let uranus = document.getElementById('uranus')
let neptune = document.getElementById('neptune')

//Colors
let colorsPerPlanet = [
  '#419ebb',
  '#eda249',
  '#6f2ed6',
  '#d83a34',
  '#d83a34',
  '#d14c32',
  '#1ec2a4',
  '#2d68f0',
]

//Request Fetch
var planets
fetch('./data.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Status Code Error: ${response.status}`)
    response.json().then((data) => {
      // for (let planet of data) {
      //   console.log(data)
      // }
      planets = data
      setCurrentPlanetData(0)
    })
  })
  .catch((err) => {
    console.log('SOMETHING WENT WRONG WITH FETCH!')
    console.log(err)
  })

planetNavs.forEach((nav) => {
  nav.addEventListener('click', () => {
    updatePlanetLi()

    let currentPlanet = 0
    switch (nav.textContent) {
      case 'Mercury':
        currentPlanet = 0
        mercury.style.borderTop = 'solid 5px #419ebb'
        mercury.style.borderBottom = 'solid 5px transparent'
        break
      case 'Venus':
        currentPlanet = 1
        venus.style.borderTop = 'solid 5px #eda249'
        venus.style.borderBottom = 'solid 5px transparent'
        break
      case 'Earth':
        currentPlanet = 2
        earth.style.borderTop = 'solid 5px #6f2ed6'
        earth.style.borderBottom = 'solid 5px transparent'

        break
      case 'Mars':
        currentPlanet = 3
        mars.style.borderTop = 'solid 5px #d83a34'
        mars.style.borderBottom = 'solid 5px transparent'
        break
      case 'Jupiter':
        currentPlanet = 4
        jupiter.style.borderTop = 'solid 5px #d83a34'
        jupiter.style.borderBottom = 'solid 5px transparent'
        break
      case 'Saturn':
        currentPlanet = 5
        saturn.style.borderTop = 'solid 5px #d14c32'
        saturn.style.borderBottom = 'solid 5px transparent'
        break
      case 'Uranus':
        currentPlanet = 6
        uranus.style.borderTop = 'solid 5px #1ec2a4'
        uranus.style.borderBottom = 'solid 5px transparent'
        break
      case 'Neptune':
        currentPlanet = 7
        neptune.style.borderTop = 'solid 5px #2d68f0'
        neptune.style.borderBottom = 'solid 5px transparent'
        break
    }

    setCurrentPlanetData(currentPlanet)
  })
})

var updatePlanetLi = () => {
  planetNavs.forEach((element) => {
    element.style.borderTop = 'solid 5px transparent'
    element.style.borderBotton = 'solid 5px transparent'
  })
}

var setCurrentPlanetData = (pos) => {
  planetName.textContent = planets[pos].name
  infoParagraph.textContent = planets[pos].overview.content
  wikiLink.href = planets[pos].overview.source
  planetImage.src = planets[pos].images.planet
  geologyPlanetImage.style.display = 'none'
  overviewButton.style.backgroundColor = colorsPerPlanet[pos]
  structureButton.style.backgroundColor = 'transparent'
  geologyButton.style.backgroundColor = 'transparent'
  rotation.textContent = planets[pos].rotation
  revolution.textContent = planets[pos].revolution
  temperature.textContent = planets[pos].temperature
  radius.textContent = planets[pos].radius

  infoButton.forEach((button) => {
    button.addEventListener('click', () => {
      infoButton.forEach((btn) => (btn.style.backgroundColor = 'transparent'))
      button.style.backgroundColor = colorsPerPlanet[pos]
      if (button.innerText === '02    INTERNAL STRUCTURE') {
        geologyPlanetImage.style.display = 'none'
        infoParagraph.textContent = planets[pos].structure.content
        planetImage.src = planets[pos].images.internal
      } else if (button.innerText === '03    SURFACE GEOLOGY') {
        button.style.backgroundColor = colorsPerPlanet[pos]
        planetImage.src = planets[pos].images.planet
        infoParagraph.textContent = planets[pos].geology.content
        geologyPlanetImage.src = planets[pos].images.geology
        geologyPlanetImage.style.display = 'block'
      } else {
        button.style.backgroundColor = colorsPerPlanet[pos]
        planetImage.src = planets[pos].images.planet
        infoParagraph.textContent = planets[pos].overview.content
        geologyPlanetImage.style.display = 'none'
      }
    })
  })
}
