const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 900
canvas.height = 500

let score = 0
let health = 100

const scoreText = document.getElementById("score")
const healthText = document.getElementById("health")

const hero = new Image()
hero.src = "images/hero.png"

const enemyImg = new Image()
enemyImg.src = "images/enemy.png"

let player = {
x:100,
y:350,
width:80,
height:80,
speed:6
}

let bullets = []
let enemies = []
let keys = {}

document.addEventListener("keydown", e => keys[e.key] = true)
document.addEventListener("keyup", e => keys[e.key] = false)

function shoot(){

bullets.push({
x:player.x + 60,
y:player.y + 30,
width:15,
height:5
})

}

document.addEventListener("keydown", e=>{
if(e.key === " ") shoot()
})

function spawnEnemy(){

enemies.push({
x:canvas.width,
y:Math.random()*450,
width:60,
height:60,
speed:3
})

}

setInterval(spawnEnemy,2000)

function updatePlayer(){

if(keys["ArrowLeft"]) player.x -= player.speed
if(keys["ArrowRight"]) player.x += player.speed
if(keys["ArrowUp"]) player.y -= player.speed
if(keys["ArrowDown"]) player.y += player.speed

if(player.x < 0) player.x = 0
if(player.x > canvas.width-player.width) player.x = canvas.width-player.width

if(player.y < 0) player.y = 0
if(player.y > canvas.height-player.height) player.y = canvas.height-player.height

}

function updateBullets(){

bullets.forEach((b,i)=>{

b.x += 10

if(b.x > canvas.width){
bullets.splice(i,1)
}

})

}

function updateEnemies(){

enemies.forEach((e,i)=>{

e.x -= e.speed

if(e.x < 0){

health -= 10
healthText.textContent = health

enemies.splice(i,1)

}

})

}

function collision(){

bullets.forEach((b,bi)=>{

enemies.forEach((e,ei)=>{

if(
b.x < e.x + e.width &&
b.x + b.width > e.x &&
b.y < e.y + e.height &&
b.y + b.height > e.y
){

score += 10
scoreText.textContent = score

bullets.splice(bi,1)
enemies.splice(ei,1)

}

})

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.drawImage(hero,player.x,player.y,player.width,player.height)

bullets.forEach(b=>{

ctx.fillStyle="yellow"
ctx.fillRect(b.x,b.y,b.width,b.height)

})

enemies.forEach(e=>{

ctx.drawImage(enemyImg,e.x,e.y,e.width,e.height)

})

}

function gameLoop(){

updatePlayer()
updateBullets()
updateEnemies()
collision()
draw()

if(health > 0){

requestAnimationFrame(gameLoop)

}else{

ctx.fillStyle="white"
ctx.font="60px Arial"
ctx.fillText("GAME OVER",300,250)

}

}

hero.onload = function(){

gameLoop()

}

document.getElementById("left").onclick = ()=>player.x -= 20
document.getElementById("right").onclick = ()=>player.x += 20
document.getElementById("up").onclick = ()=>player.y -= 20
document.getElementById("down").onclick = ()=>player.y += 20
document.getElementById("shoot").onclick = shoot