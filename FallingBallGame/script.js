var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft(){ // mover para esquerda
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){ //parar na parede
        character.style.left = left - 2 + "px";
    }
}
function moveRight(){ //mover para a direita
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){ //parar na parede
        character.style.left = left + 2 + "px";
    }
}
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){ //verificando se o jogador apertou a seta para esquerda
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){ //verificando se o jogador apertou a seta para direita
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval); //para quando o usuario soltar o botão parar de se mexer
    both=0;
});

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){ //limites onde podem aparecer os blocos
        var block = document.createElement("div"); //parte onde o usuario não pode passar
        var hole = document.createElement("div"); //buraco onde o usuario pode passar
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360); //para a aparição do burado ser randomica
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){ //para caso o usuario perca batendo no top da tela
        alert("Game over. Score: "+(counter-9)); //mostrando o score do usuario
        clearInterval(blocks);
        location.reload();
    }
    for(var i = 0; i < currentBlocks.length;i++){ //para que os blocos fiquem se movendo para cima
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px"; //onde coloca o bloco para cima
        ihole.style.top = iblockTop - 0.5 + "px"; //onde coloca o buraco para cima
        if(iblockTop < -20){ //para remover os blocos que ja passaram do limite
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){ //para que o usuario sempre fique a cima dos blocos
            drop++; 
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0; 
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){ //para que o usuario sempre fique a cima dos blocos
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
},1);