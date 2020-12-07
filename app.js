let app = (function() {

  // UI
  const formElem = document.getElementById('dino-compare');
  const gridElem = document.getElementById('grid');

  // Global
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
			weight: weight, // in lbs
			height: height, // in inches
			diet: diet,
			where: where,
			when: when,
      fact: fact,
      compareDiet: function(human) {
        if (this.diet === human.diet) {
          return `${this.species} had the same diet as you.`;
        }

        return `${this.species} had a different diet from you.`;
      },
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
      },
      compareWeight: function(human) {
        const diff = this.weight - human.weight
        if (diff === 0) {
          return `You are the same weight as ${this.species}`
        }

        if (diff > 0) {
          return `You are lighter than ${this.species}`
        }

        if (diff < 0) {
          return `You are heavier than ${this.species}`
        }
      },
      getRandomFact: function(human) {
        if (this.species === 'Pigeon') {
          return this.fact
        }

        const randomFact = Math.floor(Math.random() * 4 + 1)

        switch (randomFact) {
          case 1:
            return this.compareDiet(human)
            break;
          case 2:
            return this.compareHeight(human)
            break;
          case 3:
            return this.compareWeight(human)
            break;
          case 4:
            return this.fact
            break;

          default:
            return this.fact
            break;
        }
      },
      generateTile: function(human) {
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item');
        gridItem.innerHTML = `
          <h3>${this.species}</h3>
          <img src="images/${this.species}.png" alt="${this.species}"/>
          <p>${this.getRandomFact(human)}</p>
        `
        return gridItem
      }
		})
  }

  // Create an object representing a human.
  function _humanFactory (name, height, weight, diet) {
    return Object.assign({}, basicAnimal, {
      name: name,
      weight: weight, // in lbs
      height: height, // in inches
      diet: diet,
      generateTile: function(human) {
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item');
        gridItem.innerHTML = `
          <h3>${human.name}</h3>
          <img src="images/human.png" alt="human"/>
        `
        return gridItem
      }
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

  function _shuffle(array) {
    array.sort(function() { return Math.random() - 0.5 });
  }


  function _formToObj(elements) {
    return [].reduce.call(elements, function(data, element) {
      data[element.name] = element.value
      return data
    }, {})
  }

  function _toggleFormVisibility() {
    formElem.classList.toggle("hide");
  }

  function _initEventListeners() {
    formElem.addEventListener('submit', function(event){
      event.preventDefault();

      const formData = _formToObj(formElem.elements)

      const human = _humanFactory(
        formData.name,
        (formData.feet * 12 + formData.inches),
        formData.weight,
        formData.diet,
      )

      _toggleFormVisibility()

      _generateGrid(human)
    })
  }

  function _generateGrid(human) {
    _shuffle(dinos)

    // Create array with human in the center
    const items = dinos.slice() // clone array
    items.splice(dinos.length / 2, 0, human)

    items.forEach(function(item){
      gridElem.append(item.generateTile(human))
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