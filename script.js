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
  traffic: 3
}
function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement +1 
}
const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div')
  car.classList.add('car')
  
  

start.addEventListener('click', startGame)

function startGame() {
  start.classList.add('hide')
  setting.start = true
  for (let i = 0; i < 20; i++) {
      const line = document.createElement('div')
      line.classList.add('line')
      line.style.top = (i * 75)+'px'
      gameArea.appendChild(line)
  }
  for (let i = 0; i < getQuantityElements(100*setting.traffic); i++) {
    const enemy = document.createElement('div')
    enemy.classList.add('enemy')
    enemy.y = -100*setting.traffic*(i+1)
    enemy.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px'
    enemy.style.top = enemy.y+'px'
    gameArea.appendChild(enemy)
  }
  gameArea.appendChild(car)
  setting.x = car.offsetLeft
  setting.y = car.offsetTop
  requestAnimationFrame(playGame)
}
function playGame() {
  moveRoad()
  moveEnemy()
  if (setting.start) {
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed
    }
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed
    }
    car.style.left = setting.x+'px'
    car.style.top = setting.y+'px'
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
let topItem = 0
function moveRoad() {
  let lines = document.querySelectorAll('.line')
  lines.forEach(item => {
    topItem = item.offsetTop + setting.speed
    item.style.top = topItem+'px'
    if (topItem >= document.documentElement.clientHeight) {
      topItem = -75
      item.style.top = topItem+'px'
    }
  });

}
let topEn = 0
function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy')
  enemy.forEach(en => {
    topEn = en.offsetTop + setting.speed*1.3
    en.style.top = topEn+'px'
      if (topEn >= document.documentElement.clientHeight) {
        topEn = -75
        en.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px'
        en.style.top = topEn+'px'

      }
    });
    
}