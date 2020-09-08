document.addEventListener('keydown', startRun )
document.addEventListener('keyup', stopRun)  
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
}
const setting = {
  start: false,
  score: 0,
  speed: 3,
}
const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div')
  car.classList.add('car')
  
  

start.addEventListener('click', startGame)

function startGame() {
  console.log('asdasd')
  setting.start = true
  gameArea.appendChild(car)
  requestAnimationFrame(playGame)
}
function playGame() {
  console.log('Play')
  if (setting.start) {
    requestAnimationFrame(playGame)
  }
}
function startRun(event) {
  event.preventDefault()
  keys[event.key] = true
}
function stopRun() {
  event.preventDefault()
  keys[event.key] = false
}