// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  var requestedJoke = jokes[requestedJokeKey]
  // If the requestedJoke is not undefined, display its setup and punchline
  if (requestedJoke) {
    jokeBox.innerHTML =
      '<p>' + requestedJoke.setup + '</p>' +
      '<p>' + requestedJoke.punchline + '</p>'
  } else {
    jokeBox.innerHTML = 'No matching joke'
  }
}

// Add the requested joke
var addJokeInput = document.getElementById('add-joke')
var addJokeSetup = document.getElementById('setup-joke')
var addJokePunch = document.getElementById('punchline-joke')
var addJoke = function () {
  jokes[addJokeInput.value] = {
    setup: addJokeSetup.value,
    punchline: addJokePunch.value
  }
  setJokes()
  updateJokesMenu()
}

// Delete on button press then update the Jokes Menu
var DeleteJokeInput = document.getElementById('delete-joke')
var deleteJoke = function () {
  var deleteJokeKey = DeleteJokeInput.value
  delete jokes[deleteJokeKey]
  setJokes()
  updateJokesMenu()
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  getJokes()
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------------
// Local Storage
// -------------

var setJokes = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  if (stringifiedJokes) {
    window.localStorage.setItem('jokes', stringifiedJokes)
  }
  updatePage()
}

var getJokes = function () {
  var stringifiedJokes = window.localStorage.getItem('jokes')
  if (stringifiedJokes) {
    jokes = JSON.parse(stringifiedJokes)
  }
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
