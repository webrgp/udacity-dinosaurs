let app = (function() {

  // UI
  const formElem = document.getElementById('dino-compare');

  let dinos = []

  const basicAnimal = {
    weight: 0,
    height: 0,
    diet: ''
  }

  // Create an object representing a dinosaur.
  function _dinoFactory(species, weight, height, diet, where, when, fact) {
    return Object.assign({}, basicAnimal, {
			species: species,
			weight: weight,
			height: height,
			diet: diet,
			where: where,
			when: when,
      fact: fact,
      compareHeight: function(human) {
        const diff = this.height - human.height
        if (diff === 0) {
          return `You are the same height as ${this.species}`
        }

        if (diff > 0) {
          return `You are shorter than ${this.species}`
        }

        if (diff < 0) {
          return `You are taller than ${this.species}`
        }
      }
		})
  }

  // Create an object representing a human.
  function _humanFactory (name, height, weight, diet) {
    return Object.assign({}, basicAnimal, {
      name: name,
      height: height,
      weight: weight,
      diet: diet
    })
  }

  // Create Dino Objects
  async function _loadDinos() {
    const data = await _loadDinoData()
    if ('Dinos' in data) {
      data.Dinos.forEach( function(dino) {
        dinos.push(_dinoFactory(
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.fact
        ))
      })
    }
  }

  async function _loadDinoData() {
    const url = './dino.json'
    try {
      const response = await fetch(url, {
        mode: 'no-cors'
      })
      return response.json()
    } catch (e) {
      console.log('Error loading dino data:', e);
    }
  }

  function _formToObj(elements) {
    return [].reduce.call(elements, function(data, element) {
      data[element.name] = element.value
      return data
    }, {})
  }

  function _initEventListeners() {
    formElem.addEventListener('submit', function(event){
      event.preventDefault();
      const formData = _formToObj(formElem.elements)
      console.log(formData);
    })
  }

  async function init() {
    console.log('Initialize application')
    // load dinos
    await _loadDinos()
    // initialize event listeners
    _initEventListeners()
  }

  return {
    init: init
  }

}())

app.init()


// Create Human Object

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

    // Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
