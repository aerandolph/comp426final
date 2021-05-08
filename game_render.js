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


            <br>
            <p class="subtitle has-text-dark">How The Game Works</p>
            <p class="has-text-grey">In each game a random number is selected with help from an API. The damage and health of the player and dragon are determined using a formula based on this random number. The goal of the game is to get the dragon's health to drop below 0 before the player's health drops below 0.</p>
            <br>
            <p class="subtitle has-text-dark">Controls</p>
            <p class="has-text-grey">Up Arrow Button: You perform a standard attack. You and the dragon take damage.</p>
            <p class="has-text-grey">Left Arrow Button: You hide in the cave, and neither you nor the dragon take damage.</p>
            <p class="has-text-grey">Right Arrow Button: You hide behind a shield and shoot an arrow at the dragon. You take half damage (if fractional number, rounded up). The dragon takes 3/4 damage (if fractional number, rounded up).</p>
            <br>
            <p class="subtitle has-text-dark">Cards</p>
            <p class="has-text-grey">Cards add healing or change the damage inflicted by each move. Make sure to check which card you have coming up each round before making a decision! During each game, 52 cards are shuffled and then drawn one by one using an API.</p>
            <br>
            <p class="has-text-dark"><span class="has-text-danger">Hearts Card:</span> hiding in the cave heals you to full health</p>
            <p class="has-text-dark"><span class="has-text-danger">Spades Card:</span> shield prevents dragon from dealing damage </p>
            <p class="has-text-dark"><span class="has-text-danger">Clubs Card:</span> in attack, you deal twice as much damage to the dragon as normal </p>
            <p class="has-text-dark"><span class="has-text-danger">Diamonds Card:</span> the dragon heals an 8th of its remaining health (to a max of 100%)</p>
            <br>
           
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
            <p> email: alaina.filter (at google's free email service--not writing it out fully to avoid web spider spammers :) )</P>
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
