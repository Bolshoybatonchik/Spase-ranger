let canvas = document.getElementById('game')
let start = document.getElementById('start')
let context = canvas.getContext('2d')

// first mission

let numberMission = 1
let missionCompleted = ''
let aster = [];
let timer = 0
let ship = {x: 450, y: 750, hp: null}
let fire = []
let boom = []
let starting = false
let blownUpAster = 0
let enemyShipCount = 0
let end = false

// two mission
let enemyLaser = []
let enemyShips = []
let laserBoom = []
let ambassadorsShip = {x: 400, y: 800, hp: 100}
let finishGame = false

// first mission

let fireLeftImg = new Image()
fireLeftImg.src = './img/fire.png'

let testImg = new Image()
testImg.src = './img/black.jpeg'

let boomImg = new Image()
boomImg.src = './img/explosion.png'

let completedImg = new Image()
completedImg.src = './img/completed.jpeg'

let fireRightImg = new Image()
fireRightImg.src = './img/fire.png'

let fonImg = new Image()
fonImg.src = './img/flat-earth.jpeg'

let shipImg = new Image()
shipImg.src = './img/ship.png'

let asterImg = new Image()
asterImg.src = './img/kis.png'

let gameOverImg = new Image()
gameOverImg.src = './img/game-over.jpeg'

let galzorianImg = new Image()
galzorianImg.src = './img/galzorian.jpeg'

let astronautImg = new Image()
astronautImg.src = './img/astronaut.jpeg'

// two mission

let laserBoomImg = new Image()
laserBoomImg.src = './img/laser-explosion.png'


let enemyShipImg = new Image()
enemyShipImg.src = './img/enemy-ship.png'


let ambassadorsShipImg = new Image()
ambassadorsShipImg.src = './img/ambassadors-ship.png'

let laserImg = new Image()
laserImg.src = './img/laser.png'


fonImg.onload = function () {
    game()
}

const updateMission = () => {
    if (blownUpAster === 500) {
        numberMission = 2
    }
    if (enemyShipCount === 50) {
        numberMission = 3
    }
}

const finishedGame = () => {
    if (enemyShipCount === 50) {
    }
    finishGame = true
}

const MessageMission = (data) => {
    if (data) {
        if (finishGame) {
            return (
                ' excellent, you have completed the mission, you have protected the ambassador and the galaxy will be safe for you.' +
                'Maybe sometime in the future the game will be expanded.' +
                ' Would you like to start over? press start'
            )
        }
        return ('great, you completed the mission, do you want to start the next one?' +
            'press start')
    } else {
        if (numberMission === 2) {
            return (
                'Your task is to co-ordinate and protect the Gozlorian ambassador to the inter-regional summit, be careful, the ambassador has many enemies,minimum 50'
            )
        }
        return ('Mission' +
            'You have received a task, you need to fly to the base,' +
            ' on the planet Flat Earth, for instructions.' +
            ' Beware of asteoid clusters.' +
            'To reach your destination, ' +
            'you usually need to destroy about 500 asteroids')
    }
}

const resetData = () => {
    aster = [];
    timer = 0
    ship = {x: 450, y: 750, hp: null}
    fire = []
    boom = []
    starting = false
    blownUpAster = 0
    enemyShipCount = 0
    ambassadorsShip.hp = 0
    if (numberMission === 2) {
        enemyShips = []
        laserBoom = []
        enemyLaser = []
        enemyShipCount = 0
        starting = false
        ambassadorsShip.hp = 0
    }
    if (numberMission === 3) {
        enemyShips = []
        laserBoom = []
        enemyLaser = []
        enemyShipCount = 0
        numberMission = 1
    }
}

const updateAster = () => {
    if (numberMission === 1) {
        document.getElementById("blownUpAster").innerHTML = 'destroyed asteroids - ' + blownUpAster;
        document.getElementById("blownUpAster").style.display = "inline"
    } else {
        document.getElementById("blownUpAster").style.display = "none";
    }
}

const updateHp = () => {
    document.getElementById("hp").innerHTML = 'Ship hp - ' + ship.hp;
}

const updateEnemyShipCount = () => {
    if (numberMission === 2) {
        document.getElementById("destroyedEnemyShips").innerHTML = 'Уничтоженно кораблей - ' + enemyShipCount;
        document.getElementById("destroyedEnemyShips").style.display = "inline"
    } else {
        document.getElementById("destroyedEnemyShips").style.display = "none";
    }
}

const ambassadorsShipHp = () => {
    if (numberMission === 2) {
        document.getElementById("ambassadorsShipHp").innerHTML = 'ambassadorsShipHp - ' + ambassadorsShip.hp;
        document.getElementById("ambassadorsShipHp").style.display = "inline"
    } else {
        document.getElementById("ambassadorsShipHp").style.display = "none";
    }
}

const updateMissionText = (data) => {
    document.getElementById("mission").innerHTML = MessageMission(data);
}


const startGame = () => {
    starting = true
    missionsCompleted(false)
    end = false
    blownUpAster = 0
    if (ship.hp === 0 || ship.hp === null) {
        ship.hp += 100
    }
    updateEnemyShipCount()
    if (ambassadorsShip.hp === 0 || ambassadorsShip.hp === null) {
        ambassadorsShip.hp += 100
    }
    ambassadorsShipHp()
}

const missionsCompleted = (data) => {
    missionCompleted = data
}

const endGame = () => {
    if (ship.hp <= 0) {
        starting = false
        end = true
    }
    if (ambassadorsShip.hp <= 0) {
        starting = false
        end = true
    }
}

const deleteLaserBoom = (num) => {
    setTimeout(() => laserBoom.splice(num, 1), 50)
}

canvas.addEventListener("mousemove", (event) => {
    if (ship.hp !== 0)
        ship.x = event.offsetX - 40,
            ship.y = event.offsetY - 80
})

start.addEventListener("click", (event) => {
    startGame()
    updateHp()
    updateAster()
})


function game() {
    update()
    render()
    requestAnimFrame(game)
}

async function update() {
    finishedGame()
    if (missionCompleted) {
        resetData() ,
            updateMissionText(missionCompleted)
    }
    if (!starting) {
        resetData()
    }
    if (starting && !missionCompleted) {
        timer++;
        updateMission()
        updateMissionText()

        endGame()
        if (blownUpAster === 500) {
            missionsCompleted(true)
        }
        if (enemyShipCount === 50) {
            missionsCompleted(true)
        }

        if (numberMission === 2 && starting) {
            if (timer % 100 === 0) {
                enemyShips.push({
                        x: Math.random() * 900,
                        y: -50,
                        dx: Math.random() * 2 - 1,
                        dy: Math.random() * 2 + 1,
                        hp: 100
                    }
                )
            }
        }

        if (numberMission === 1) {
            if (timer % 10 == 0) {
                aster.push({
                        x: Math.random() * 900,
                        y: -50,
                        dx: Math.random() * 2 - 1,
                        dy: Math.random() * 2 + 1,
                        del: 0
                    }
                )
            }
        }

        if (timer % 13 == 0) {
            fire.push({
                    x: ship.x + 10,
                    y: ship.y - 50,
                    dx: 0,
                    dy: -5.2
                }
            )
        }

        for (let i in laserBoom) {
            deleteLaserBoom(i)
        }

        for (i in boom) {
            boom[i].animx = boom[i].animx + 1
            if (boom[i].animx >= 8) {
                boom[i].animy++, boom[i].animx = 0
            }
            if (boom[i].animx >= 8) boom.splice(i, 1)
        }

// fizicle
        for (i in enemyShips) {
            enemyShips[i].x = enemyShips[i].x + enemyShips[i].dx
            enemyShips[i].y = enemyShips[i].y + enemyShips[i].dy
            if (enemyShips[i].x >= 850 || enemyShips[i].x < 0) enemyShips[i].dx = -enemyShips[i].dx;
            if (timer % 40 == 0) {
                enemyLaser.push({
                    x: enemyShips[i].x + 30,
                    y: enemyShips[i].y + 50,
                    dx: 0,
                    dy: 5.2
                })
            }
            for (j in fire) {
                if (Math.abs(enemyShips[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(enemyShips[i].y - fire[j].y) < 25) {
                    fire.splice(j, 1);
                    enemyShips[i].hp -= 20
                    if (enemyShips[i].hp === 0) {
                        boom.push({x: enemyShips[i].x, y: enemyShips[i].y, animx: 0, animy: 0})
                        enemyShips.splice(i, 1)
                        enemyShipCount += 1
                        updateEnemyShipCount()
                    }
                    break
                }
            }
            for (j in enemyLaser) {
                if (Math.abs(ship.x + 25 - enemyLaser[j].x - 15) < 50 && Math.abs(ship.y - enemyLaser[j].y) < 25) {
                    laserBoom.push({x: enemyLaser[j].x, y: enemyLaser[j].y})
                    enemyLaser[i].del = 1,
                        ship.hp -= 10
                    updateHp()
                    enemyLaser.splice(j, 1);
                    break
                }
                if (Math.abs(ambassadorsShip.x + 25 - enemyLaser[j].x - 15) < 50 && Math.abs(ambassadorsShip.y - enemyLaser[j].y) < 25) {
                    laserBoom.push({x: enemyLaser[j].x, y: enemyLaser[j].y})
                    enemyLaser[i].del = 1
                    ambassadorsShip.hp -= 10
                    ambassadorsShipHp()
                    enemyLaser.splice(j, 1)
                    break
                }
            }
        }
        for (i in aster) {
            aster[i].x = aster[i].x + aster[i].dx
            aster[i].y = aster[i].y + aster[i].dy
            if (aster[i].x >= 850 || aster[i].x < 0) aster[i].dx = -aster[i].dx

            if (Math.abs(aster[i].x + 25 - ship.x - 40) < 50 && Math.abs(aster[i].y - ship.y) < 25) {
                boom.push({x: aster[i].x - 25, y: aster[i].y - 25, animx: 0, animy: 0})
                updateHp()
                ship.hp = ship.hp - 20
                updateHp()
                aster[i].del = 1
                if (aster[i].del === 1) aster.splice(i, 1)
            }

            if (aster[i].y > 900) aster.splice(i, 1)
            for (j in fire) {
                if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {
                    boom.push({x: aster[i].x - 25, y: aster[i].y - 25, animx: 0, animy: 0})
                    aster[i].del = 1,
                        fire.splice(j, 1);
                    break
                }
            }
            if (aster[i].del === 1) {
                aster.splice(i, 1), blownUpAster++, updateAster();
            }

        }
        for (i in fire) {
            fire[i].x = fire[i].x + fire[i].dx
            fire[i].y = fire[i].y + fire[i].dy
            if (fire[i].y < -60) fire.splice(i, 1)
        }
        for (i in enemyLaser) {
            enemyLaser[i].x = enemyLaser[i].x + enemyLaser[i].dx
            enemyLaser[i].y = enemyLaser[i].y + enemyLaser[i].dy
            if (enemyLaser[i].y > 950) enemyLaser.splice(i, 1)
        }
    }
}

function render() {
    if (numberMission === 1) context.drawImage(astronautImg, 0, 0, 900, 900)
    if (!missionCompleted && starting && numberMission === 2) context.drawImage(galzorianImg, 0, 0, 900, 900)
    if (starting && numberMission === 1) context.drawImage(fonImg, 0, 0, 900, 900)
    if (missionCompleted) context.drawImage(completedImg, 300, 300, 300, 200)


// first mission
    if (!missionCompleted) {
        if (starting) context.drawImage(shipImg, ship.x, ship.y, 80, 80)
        for (i in fire) context.drawImage(fireRightImg, fire[i].x + 40, fire[i].y, 20, 40)
        for (i in fire) context.drawImage(fireLeftImg, fire[i].x, fire[i].y, 20, 40)
        for (i in aster) context.drawImage(asterImg, aster[i].x, aster[i].y, 50, 50)
        for (i in boom) context.drawImage(boomImg, 240 * Math.floor(boom[i].animx,), 240 * Math.floor(boom[i].animy), 240, 240, boom[i].x, boom[i].y, 100, 100);
    }
    if (end) {
        context.drawImage(gameOverImg, 250, 250, 400, 400)
    }

    // two mission

    for (i in laserBoom) context.drawImage(laserBoomImg, laserBoom[i].x - 90, laserBoom[i].y - 50, 190, 190)
    if (!missionCompleted && starting && numberMission === 2) context.drawImage(ambassadorsShipImg, ambassadorsShip.x, ambassadorsShip.y, 80, 80)
    for (i in enemyLaser) context.drawImage(laserImg, enemyLaser[i].x, enemyLaser[i].y + 20, 20, 30)
    for (i in enemyShips) context.drawImage(enemyShipImg, enemyShips[i].x, enemyShips[i].y, 80, 80)

}


let requestAnimFrame = (function () {
    return window.requestanimationframe ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 20)
        }
})();


