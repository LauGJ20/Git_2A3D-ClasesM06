// =====================
// PATRONES DE ENEMIGOS
// =====================
const patterns = [
    [[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0],[0,0,1,1,0,1,1,1,0,1,1,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,0,1,1,1,1,1,1,1,0,1,0],[0,1,0,1,0,0,0,0,0,1,0,1,0],[0,0,0,0,1,1,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0],[0,0,0,1,0,0,1,0,0,0],[0,0,1,0,1,1,0,1,0,0],[0,1,0,1,0,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,1,0,0,0],[0,1,0,0,1,0,0,0,1,0,0,1,0],[0,1,0,1,1,1,1,1,1,1,0,1,0],[0,1,1,1,0,1,1,1,0,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,1,0,0],[0,0,0,1,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0]]
];

// =====================
// CONFIGURACIÓN CANVAS
// =====================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// =====================
// ESTADO DEL JUEGO
// =====================
let gameOver = false;
let gameWin = false;

// =====================
// CLASE ENEMY
// =====================
class Enemy {
    constructor(pattern, x, y) {
        this.pattern = pattern;
        this.x = x;
        this.y = y;
        this.width = pattern[0].length * 5;
        this.height = pattern.length * 5;
        this.alive = true;
        this.color = "#0ff"; // color neón cyan
    }
    draw() {
        if(!this.alive) return;
        for(let y=0; y<this.pattern.length; y++){
            for(let x=0; x<this.pattern[0].length; x++){
                ctx.fillStyle = this.pattern[y][x]? this.color : "#000";
                ctx.fillRect(this.x + x*5, this.y + y*5, 5, 5);
            }
        }
    }
}

// =====================
// JUGADOR
// =====================
const player = {x: 285, y: 660, width:30, height:10, color:"#ff0", speed:5};

// =====================
// BALAS
// =====================
let bullets=[];
function shoot(){
    bullets.push({x:player.x+player.width/2-2, y:player.y, width:4, height:8, speed:7, color:"#f0f"});
}

// =====================
// ENEMIGOS
// =====================
const enemies=[];
for(let r=0;r<3;r++){
    for(let c=0;c<8;c++){
        const pattern = patterns[(r+c)%patterns.length];
        enemies.push(new Enemy(pattern, 30+c*60, 30+r*50));
    }
}

// =====================
// MOVIMIENTO ENEMIGOS
// =====================
let enemyDir=1;
function updateEnemies(){
    let moveDown=false;
    enemies.forEach(e=>{
        if(!e.alive) return;
        e.x+=enemyDir*1.5;
        if(e.x+e.width>canvas.width || e.x<0) moveDown=true;
    });
    if(moveDown){enemyDir*=-1; enemies.forEach(e=>e.y+=10);}
}

// =====================
// COLISIONES
// =====================
function checkCollisions(){
    bullets.forEach(b=>{
        enemies.forEach(e=>{
            if(!e.alive) return;
            if(b.x < e.x + e.width &&
               b.x + b.width > e.x &&
               b.y < e.y + e.height &&
               b.y + b.height > e.y){
                e.alive = false;
                b.hit = true;
            }
        });
    });
    bullets = bullets.filter(b => !b.hit && b.y > -b.height);
}

// =====================
// GAME OVER
// =====================
function checkGameOver() {
    for (let enemy of enemies) {
        if (enemy.alive && enemy.y + enemy.height >= player.y) {
            gameOver = true;
            break;
        }
    }
}

function drawGameOver() {
    ctx.fillStyle = "#ff00ff"; // neón magenta
    ctx.font = "30px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2 - 20);
    ctx.fillText("Pulsa R para reiniciar", canvas.width/2, canvas.height/2 + 30);
}

// =====================
// YOU WIN
// =====================
function checkGameWin() {
    if(enemies.every(e => !e.alive)) gameWin = true;
}

function drawGameWin() {
    ctx.fillStyle = "#0f0"; // neón verde
    ctx.font = "30px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("YOU WIN!", canvas.width/2, canvas.height/2 - 20);
    ctx.fillText("Pulsa R para reiniciar", canvas.width/2, canvas.height/2 + 30);
}

// =====================
// REINICIO
// =====================
function restartGame() {
    player.x = 285;
    player.y = 660;
    bullets = [];
    enemies.length = 0;
    for(let r=0;r<3;r++){
        for(let c=0;c<8;c++){
            const pattern = patterns[(r+c)%patterns.length];
            enemies.push(new Enemy(pattern, 30+c*60, 30+r*50));
        }
    }
    enemyDir = 1;
    gameOver = false;
    gameWin = false;
    gameLoop();
}

// =====================
// TECLADO
// =====================
const keys={};
document.addEventListener("keydown", e=>{
    keys[e.key] = true;
    if(e.key === " " && !gameOver && !gameWin) shoot();
    if(e.key.toLowerCase() === "r" && (gameOver || gameWin)) restartGame();
});
document.addEventListener("keyup", e=>keys[e.key]=false);

// =====================
// LOOP PRINCIPAL
// =====================
function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // GAME OVER / WIN
    if(gameOver){
        drawGameOver();
        return;
    }
    if(gameWin){
        drawGameWin();
        return;
    }

    // MOVIMIENTO JUGADOR
    if(keys["ArrowLeft"] && player.x>0) player.x-=player.speed;
    if(keys["ArrowRight"] && player.x+player.width<canvas.width) player.x+=player.speed;

    // ENEMIGOS
    updateEnemies();

    // BALAS
    bullets.forEach(b=>b.y-=b.speed);

    // COLISIONES
    checkCollisions();

    // DIBUJAR JUGADOR
    ctx.fillStyle=player.color;
    ctx.fillRect(player.x,player.y,player.width,player.height);

    // DIBUJAR ENEMIGOS
    enemies.forEach(e=>e.draw());

    // DIBUJAR BALAS
    bullets.forEach(b=>{
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x,b.y,b.width,b.height);
    });

    // COMPROBAR ESTADO
    checkGameOver();
    checkGameWin();

    requestAnimationFrame(gameLoop);
}

gameLoop();
