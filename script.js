//Planet Object
class Planet {
  constructor(
    name,
    overview,
    structure,
    geology,
    overviewSource,
    structureSource,
    geologySource,
    rotation,
    revolution,
    radius,
    temperature,
    imagePlanet,
    imageInternal,
    imageGeology,
    activeClass,
    secondaryActiveClass
  ) {
    this.name = name
    this.overview = overview
    this.structure = structure
    this.geology = geology
    this.overviewSource = overviewSource
    this.structureSource = structureSource
    this.geologySource = geologySource
    this.rotation = rotation
    this.revolution = revolution
    this.radius = radius
    this.temperature = temperature
    this.imagePlanet = imagePlanet
    this.imageInternal = imageInternal
    this.imageGeology = imageGeology
    this.activeClass = activeClass
    this.secondaryActiveClass = secondaryActiveClass
  }
}

let planets = []
//Request
fetch('./data.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Status Code Error: ${response.status}`)
    return response.json()
  })
  .then((data) => {
    planets = data.map((planetData, index) => {
      return new Planet(
        planetData.name,
        planetData.overview.content,
        planetData.structure.content,
        planetData.geology.content,
        planetData.overview.source,
        planetData.structure.source,
        planetData.geology.source,
        planetData.rotation,
        planetData.revolution,
        planetData.radius,
        planetData.temperature,
        planetData.images.planet,
        planetData.images.internal,
        planetData.images.geology,
        getClassByPosition(index),
        getSecondaryClasses()[index]
      )
    })
    updateTab(0)

    window.addEventListener('resize', maybeShowMenu)
    maybeShowMenu()

    const navPlanets = document.querySelectorAll('#planetItem')
    navPlanets.forEach((navPlanet, index) => {
      navPlanet.addEventListener('click', () => {
        updateTab(index)
        //Here
        if (isPhoneVersion()) {
          let headerList = document.querySelector('.header__list')
          headerList.classList.toggle('visually-hidden')
        }
      })
    })
  })
  .catch((err) => {
    console.log('SOMETHING WENT WRONG WITH FETCH!')
    console.log(err)
  })

function updateTab(index) {
  const navPlanets = document.querySelectorAll('#planetItem')
  const planet = planets[index]

  resetNavColors(navPlanets)

  navPlanets[index].classList.add(getClassByPosition(index))

  updatePlanetData(planet)
}

function resetNavColors(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove(getClassByPosition(i))
  }
}

function updatePlanetData(planet) {
  let title = document.querySelector('.info__title')
  title.textContent = planet.name

  let info = document.querySelector('.info__paragraph')
  info.textContent = planet.overview

  let wiki = document.querySelector('#wiki-link')
  wiki.href = planet.structureSource

  let imagePlanet = document.querySelector('.planet__main-image')
  imagePlanet.src = planet.imagePlanet

  let rotation = document.querySelector('#rotation')
  let revolution = document.querySelector('#revolution')
  let radius = document.querySelector('#radius')
  let temp = document.querySelector('#temp')

  rotation.textContent = planet.rotation
  revolution.textContent = planet.revolution
  radius.textContent = planet.radius
  temp.textContent = planet.temperature

  updateInfoButtons(planet)

  let secundaryImage = document.querySelector('.planet__secondary-image')
  secundaryImage.classList.add('visually-hidden')
}

function updateInfoButtons(planet) {
  let buttons = document.querySelectorAll('.buttons__div button')
  let infoParagraph = document.querySelector('.info__paragraph')
  let secundaryImage = document.querySelector('.planet__secondary-image')
  let imagePlanet = document.querySelector('.planet__main-image')

  resetActiveColor(buttons, 0, planet.secondaryActiveClass)

  buttons.forEach((button, pos) => {
    button.addEventListener('click', () => {
      resetActiveColor(buttons, pos, planet.secondaryActiveClass)
      if (pos === 0) {
        infoParagraph.textContent = planet.overview
        imagePlanet.src = planet.imagePlanet
        secundaryImage.classList.add('visually-hidden')
      } else if (pos === 1) {
        infoParagraph.textContent = planet.structure
        secundaryImage.classList.add('visually-hidden')
        imagePlanet.src = planet.imageInternal
      } else {
        infoParagraph.textContent = planet.geology
        secundaryImage.src = planet.imageGeology
        secundaryImage.classList.remove('visually-hidden')
        imagePlanet.src = planet.imagePlanet
      }
    })
  })
}

function resetActiveColor(buttons, pos, cssSecondaryClass) {
  let activeSecundaryClasses = getSecondaryClasses()
  buttons.forEach((button) => {
    activeSecundaryClasses.forEach((cssClass) => {
      button.classList.remove(cssClass)
    })
  })
  buttons[pos].classList.add(cssSecondaryClass)
}

function getClassByPosition(position) {
  const accentClasses = [
    'accent-mercury',
    'accent-venus',
    'accent-earth',
    'accent-mars',
    'accent-jupiter',
    'accent-saturn',
    'accent-uranus',
    'accent-neptune',
  ]

  return accentClasses[position]
}

function getSecondaryClasses() {
  return [
    'secondary-accent-mercury',
    'secondary-accent-venus',
    'secondary-accent-earth',
    'secondary-accent-mars',
    'secondary-accent-jupiter',
    'secondary-accent-saturn',
    'secondary-accent-uranus',
    'secondary-accent-neptune',
  ]
}

function maybeShowMenu() {
  const menu = document.querySelector('.header__burger-menu')
  const headerList = document.querySelector('.header__list')
  if (isPhoneVersion()) {
    // Mostrar el menú en pantallas más pequeñas
    menu.classList.remove('visually-hidden')
    headerList.classList.add('visually-hidden')
  } else {
    // Ocultar el menú en pantallas más grandes
    menu.classList.add('visually-hidden')
    headerList.classList.remove('visually-hidden')
  }
}

function isPhoneVersion() {
  return window.innerWidth <= 712
}

let burguer = document.querySelector('#burger-menu')
burguer.addEventListener('click', () => {
  let headerList = document.querySelector('.header__list')
  headerList.classList.toggle('visually-hidden')
})
