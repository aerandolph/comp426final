import Game from "./game.js";

let game;
let card;
let cardURL;

export const setupPage = function(user) {
    $('#root').append(`<div id="root" style="height:100vh" class="has-background-light">
        <div class="section has-background-dark">
            <h1 class="title has-text-grey-lighter">The Dragon-Fighting Game</h1>
            <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
        </div>
        <br>
        <div style="padding:20px" class="section">

            <button id="logoutMain" class="button is-dark">Log Out and Return to Main Page</button>
            <br>
            <br>
            <p class="subtitle has-text-dark">Welcome ${user.email}! :) Glad to see you!</p>
            <br>
            <p class="subtitle has-text-dark">How to Play</p>
            <p class="has-text-grey">Each game a random number will be selected with help from an API and the dragon's damage and health</p>
            <p class="has-text-grey">(as well as yours) will be calculated from that number. Using another API, a deck of cards will also be shuffled and then drawn one by one.</p>
            <p class="has-text-grey">You or the dragon will get a buff each round based on the card drawn. Each round you can </p>
            <p class="has-text-grey">press the left key to hide in the cave (no damage to you or the dragon), press the right key </p>
            <p class="has-text-grey">to attack from behind a shield (half (rounded up) the dragon's damage to you and 3/4 (rounded up) your damage to the dragon), </p>
            <p class="has-text-grey">or press the up key to have full attack from both sides. If you go to or below 0 health, you lose. If the </p>
            <p class="has-text-grey">dragon goes to or below 0 health, you win. (If both happen at the same time, you win.) If you run out </p>
            <p class="has-text-grey">of cards with both above 0 health, you tie.</p>
            
            <br>
            <p class="has-text-dark"><span class="has-text-danger">Hearts Card:</span> hiding in the cave heals you to full health.</p>
            <p class="has-text-dark"><span class="has-text-danger">Spades Card:</span> shield prevents dragon from dealing damage </p>
            <p class="has-text-dark"><span class="has-text-danger">Clubs Card:</span> in attack, you deal twice as much damage to the dragon as normal </p>
            <p class="has-text-dark"><span class="has-text-danger">Diamonds Card:</span> the dragon heals an 8th of its remaining health (to a max of 100%)</p>
            <br>
            
            <div class="columns" stype="padding:10px">
                <div class="column has-background-dark">
                    <div id="gamePicture" class="box">
                        <img src="plain_background.png" alt="game_screen">
                    </div>
                </div>
                <div class="column has-background-dark">
                    <div id="gameInformation" class="box">
                        <button id="startGame" class="button is-dark">Start the Game</button>
                    </div>
                </div>
            </div>

        </div>
        </div>`);
};

export const setupBadPage = function() {
    $('#root').append(`<div id="root" style="height:100vh" class="has-background-light">
        <div class="section has-background-dark">
            <h1 class="title has-text-grey-lighter">The Dragon-Fighting Game</h1>
            <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
        </div>
        <br>
        <div style="padding:20px" class="section">

            <button id="logoutMain" class="button is-dark" onclick="window.location.href='/index.html'">Return to Main Page</button>
            <br>
            <br>
            <p class="subtitle has-text-dark">You aren't signed in. To play, please go back and sign in. :( (testing credentials provided below)</p>
            <p> email: alaina.randolph@gmail.com</P>
            <p> password: test123 </p>

        </div>
        </div>`);
};


export async function startGame(event) {
    const result = await axios({
        method: 'get',
        url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
        withCredentials: false,
      });
    cardURL = result.data.deck_id;
      const result2 = await axios({
        method: 'get',
        url: `https://deckofcardsapi.com/api/deck/${cardURL}/draw/?count=1`,
        withCredentials: false,
      });
    card = result2.data.cards[0].suit;
    const result3 = await axios({
        method: 'get',
        url: `https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8`,
        withCredentials: false,
      });
    let math1 = result3.data.data;
    math1 = parseInt(math1) + 100;
    game.restart(math1, Math.ceil(math1/10));
    let info = game.getGameReport();
    $('#gameInformation').replaceWith(`
    <div id="gameInformation" class="box">
        <p>Player health: ${info.pHealth}/${info.pHealthFull}</P>
        <p>Dragon health: ${info.dHealth}/${info.dHealthFull}</P>
        <p>Cards left: ${info.cardsLeft}/52</P>
        <br>
        <p>Dragon attack: ${info.dAttack}</P>
        <p>Player attack: ${info.pAttack}</P>
        <br>
        <p>Next Card: ${card}</P>
    </div>`);
    $('#gamePicture').replaceWith(`
        <div id="gamePicture" class="box">
            <img src="move_start.png" alt="game_screen">
        </div>`);
};


export async function handleMove(info) {
      const result = await axios({
        method: 'get',
        url: `https://deckofcardsapi.com/api/deck/${cardURL}/draw/?count=1`,
        withCredentials: false,
      });
    card = result.data.cards[0].suit;
    $('#gameInformation').replaceWith(`
    <div id="gameInformation" class="box">
        <p>Player health: ${info.pHealth}/${info.pHealthFull}</P>
        <p>Dragon health: ${info.dHealth}/${info.dHealthFull}</P>
        <p>Cards left: ${info.cardsLeft}/52</P>
        <br>
        <p>Dragon attack: ${info.dAttack}</P>
        <p>Player attack: ${info.pAttack}</P>
        <br>
        <p>Next Card: ${card}</P>
    </div>`);
};

export const handleWin = function(info) {
    $('#gameInformation').replaceWith(`
    <div id="gameInformation" class="box">
        <p class="subtitle has-text-dark">You won! :D Stats were:</p>
            <p>Player health: ${info.pHealth}/${info.pHealthFull}</P>
            <p>Dragon health: ${info.dHealth}/${info.dHealthFull}</P>
            <p>Cards left: ${info.cardsLeft}/52</P>
            <br>
            <p>Dragon attack: ${info.dAttack}</P>
            <p>Player attack: ${info.pAttack}</P>
        <button id="startGame" class="button is-dark">Play Again!</button>
    </div>`);
    $('#gamePicture').replaceWith(`
        <div id="gamePicture" class="box">
            <img src="win_screen.png" alt="game_screen">
        </div>`);
};

export const handleLose = function(info) {
    $('#gameInformation').replaceWith(`
    <div id="gameInformation" class="box">
        <p class="subtitle has-text-dark">You lost! :( Stats were:</p>
        <p>Player health: ${info.pHealth}/${info.pHealthFull}</P>
        <p>Dragon health: ${info.dHealth}/${info.dHealthFull}</P>
        <p>Cards left: ${info.cardsLeft}/52</P>
        <br>
        <p>Dragon attack: ${info.dAttack}</P>
        <p>Player attack: ${info.pAttack}</P>
        <button id="startGame" class="button is-dark">Play Again!</button>
    </div>`);
    $('#gamePicture').replaceWith(`
        <div id="gamePicture" class="box">
            <img src="loss_screen.png" alt="game_screen">
        </div>`);
};

export const handleTie = function(info) {
    $('#gameInformation').replaceWith(`
    <div id="gameInformation" class="box">
        <p class="subtitle has-text-dark">You tied! :/ Stats were:</p>
        <p>Player health: ${info.pHealth}/${info.pHealthFull}</P>
        <p>Dragon health: ${info.dHealth}/${info.dHealthFull}</P>
        <p>Cards left: ${info.cardsLeft}/52</P>
        <br>
        <p>Dragon attack: ${info.dAttack}</P>
        <p>Player attack: ${info.pAttack}</P>
        <button id="startGame" class="button is-dark">Play Again!</button>
    </div>`);
    $('#gamePicture').replaceWith(`
        <div id="gamePicture" class="box">
            <img src="tie_screen.png" alt="game_screen">
        </div>`);
};


export const setPicture = function(move) {
    if (move == 'cave'){
        $('#gamePicture').replaceWith(`
            <div id="gamePicture" class="box">
                <img src="move_hide.png" alt="game_screen">
            </div>`);
    } else if (move == 'shield') {
        $('#gamePicture').replaceWith(`
            <div id="gamePicture" class="box">
                <img src="move_shield.png" alt="game_screen">
            </div>`);
    } else {
        $('#gamePicture').replaceWith(`
            <div id="gamePicture" class="box">
                <img src="move_attack.png" alt="game_screen">
            </div>`);
    }
};




export const logout = function(event) {
    firebase.auth().signOut().then(() => {
      }).catch((error) => {
      });
    location.href = 'index.html';
};


export const pageManager = function() {
    const $root = $('#root');
    game = new Game(100, 10);
    game.onMove(handleMove);
    game.onLose(handleLose);
    game.onWin(handleWin);
    game.onTie(handleTie);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            setupPage(user);
        } else {
          setupBadPage();
        }
      });
    
    $root.on("click", "#logoutMain", (event) => logout(event));
    $root.on("click", "#startGame", (event) => startGame(event));
    $root.on("click", "#nextMove", (event) => nextMove(event));

    $(document).on('keydown', function(e) {
        if(e.code == "ArrowUp"){
            setPicture('attack');
            game.move('attack', card);
        }
        if(e.code == "ArrowLeft"){
            setPicture('cave');
            game.move('cave', card);
        }
        if(e.code == "ArrowRight"){
            setPicture('shield');
            game.move('shield', card);
        }
    });


};


$(function() {
    pageManager();
});
