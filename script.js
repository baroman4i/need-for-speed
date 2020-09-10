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
  
  
  let bgRandom = 0
start.addEventListener('click', startGame)

function startGame() {
  start.classList.add('hide')
  gameArea.innerHTML = ''
  setting.start = true
  car.style.bottom = '10px'
  car.style.left = '125px'
  car.style.top = 'auto'
  keys.ArrowLeft = false
  keys.ArrowRight = false
  for (let i = 0; i < 20; i++) {
      const line = document.createElement('div')
      line.classList.add('line')
      line.style.top = (i * 75)+'px'
      gameArea.appendChild(line)
  }
  for (let i = 0; i < getQuantityElements(100*setting.traffic); i++) {
    bgRandom = Math.floor(Math.random()*2)
    const enemy = document.createElement('div')
    enemy.classList.add('enemy')
    enemy.y = -100*setting.traffic*(i+1)
    enemy.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px'
    if (bgRandom >= 1) {
          enemy.style.backgroundImage = 'url(image/enemy2.png)'
        }
        else {
          enemy.style.backgroundImage = 'url(image/enemy.png)'
        }
    enemy.style.top = enemy.y+'px'
    
    gameArea.appendChild(enemy)
    
  }
  setting.score = 0
  gameArea.appendChild(car)
  setting.x = car.offsetLeft
  setting.y = car.offsetTop
  requestAnimationFrame(playGame)
}
function playGame() {
  moveRoad()
  moveEnemy()
  if (setting.start) {
    setting.score += setting.speed
    score.innerHTML = setting.score
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
    let carRect = car.getBoundingClientRect()
    let enemyRect = en.getBoundingClientRect()

    if (carRect.top <= enemyRect.bottom-10 && carRect.right-10 >= enemyRect.left && carRect.left <= enemyRect.right-10 && carRect.bottom-10 >= enemyRect.top) {
      setting.start = false
      alert('GAME OVER. score = '+setting.score)
      start.classList.remove('hide')
    }
    topEn = en.offsetTop + setting.speed*1.3
    en.style.top = topEn+'px'
      if (topEn >= document.documentElement.clientHeight) {
        topEn = -75
        en.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px'
        en.style.top = topEn+'px'
      }
    });
    
}