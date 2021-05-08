export const setupLoginOrCreate = function() {
    $('#root').append(`
    <div style="height:100vh" class="has-background-grey">
    <div class="section has-background-dark">
        <h1 class="title has-text-grey-lighter">Login Page for Dragon-Fighting Game</h1>
        <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
    </div>
    <br>
    <div style="padding:20px" class="section has-background-grey">

        <p class="has-text-grey-lighter">Please log in or make an account to play! :)</p>
        <br>
        <button id="loginButton" class="button is-dark" type="button">I already have an account.</button>
        <button id="createButton" class="button is-dark" type="button">I need to make an account.</button>
        <button class="button is-dark" onclick="window.location.href='points_credits.html'">Points and Credits</button>
        <br>
        <br>
        <button class="button is-dark" onclick="window.location.href='rEnder_it.html'">Bypass Login to Play the Game (Provided for testing purposes)</button>
    </div>
    </div>`);
};

export const setupMain = function(event) {
    const $root = $('#root');
    $(event.target.parentNode.parentNode).replaceWith(`<div id="root" style="height:100vh" class="has-background-grey">
    <div class="section has-background-dark">
        <h1 class="title has-text-grey-lighter">Login Page for Dragon-Fighting Game</h1>
        <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
    </div>
    <br>
    <div style="padding:20px" class="section has-background-grey">

        <p class="has-text-grey-lighter">Please log in or make an account to play! :)</p>
        <br>
        <button id="loginButton" class="button is-dark" type="button">I already have an account.</button>
        <button id="createButton" class="button is-dark" type="button">I need to make an account.</button>
        <button class="button is-dark" onclick="window.location.href='points_credits.html'">Points and Credits</button>
        <br>
        <br>
        <button class="button is-dark" onclick="window.location.href='rEnder_it.html'">Bypass Login to Play the Game (Provided for testing purposes)</button>
    </div>
    </div>`);
};


export const setupLogin = function(event) {
    const $root = $('#root');
    $(event.target.parentNode.parentNode).replaceWith(`<div id="root" style="height:100vh" class="has-background-grey">
    <div class="section has-background-dark">
        <h1 class="title has-text-grey-lighter">Login Page for Dragon-Fighting Game</h1>
        <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
    </div>
    <br>
    <div style="padding:20px" class="section has-background-grey">

        <p class="has-text-grey-lighter">Please log in or select to make an account instead! :)</p>
        <br>
        <input class="input" type="text" id="emailLogin" value="Your email"></input>
        <input class="input" type="text" id="passwordLogin" value="Your password"></input>
        <br>
        <button id="submitLogin" class="button is-dark" type="button">Submit!</button>
        <button id="createButton" class="button is-dark" type="button">I need to make an account instead.</button>
        <button class="button is-dark" onclick="window.location.href='points_credits.html'">Points and Credits</button>
        <button id="mainPage" class="button is-dark">Main Page</button>
    </div>
    </div>`);
};

export const setupError = function(event) {
    const $root = $('#root');
    $(event.target.parentNode.parentNode).replaceWith(`<div id="root" style="height:100vh" class="has-background-grey">
    <div class="section has-background-dark">
        <h1 class="title has-text-grey-lighter">Login Page for Dragon-Fighting Game</h1>
        <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
    </div>
    <br>
    <div style="padding:20px" class="section has-background-grey">

        <p class="subtitle has-text-grey-lighter">Something went wrong. :( Maybe you tried to make an account with the same email address, had a bad password or email address, or there was a glitch. Please try again or log in using the provided testing credentials.</p>
        <p class="has-text-grey-lighter"> Testing Credentials Available:</p>
        <p class="has-text-grey-lighter"> email: alaina.randolph@gmail.com </p>
        <p class="has-text-grey-lighter"> password: test123 </p>
        <br>
        <button id="loginButton" class="button is-dark" type="button">I already have an account.</button>
        <button id="createButton" class="button is-dark" type="button">I need to make an account.</button>
        <button class="button is-dark" onclick="window.location.href='points_credits.html'">Points and Credits</button>
        <button id="mainPage" class="button is-dark">Main Page</button>
        <br>
        <br>
        <button class="button is-dark" onclick="window.location.href='rEnder_it.html'">Bypass Login to Play the Game (Provided for testing purposes)</button>
    </div>
    </div>`);
};

export const setupCreate = function(event) {
    const $root = $('#root');
    $(event.target.parentNode.parentNode).replaceWith(`<div id="root" style="height:100vh" class="has-background-grey">
    <div class="section has-background-dark">
        <h1 class="title has-text-grey-lighter">Login Page for Dragon-Fighting Game</h1>
        <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
    </div>
    <br>
    <div style="padding:20px" class="section has-background-grey">
        <p class="has-text-grey-lighter">Please create an account or select to log in instead! :) (The email address you use must be a real email account. The password must be at least 6 characters.) </p>
        <br>
        <input class="input" type="text" id="emailCreate" value="Your email"></input>
        <input class="input" type="text" id="passwordCreate" value="Your password"></input>
        <br>
        <button id="submitCreate" class="button is-dark" type="button">Make Account!</button>
        <button id="loginButton" class="button is-dark" type="button">Actually, I already have an account.</button>
        <button class="button is-dark" onclick="window.location.href='points_credits.html'">Points and Credits</button>
        <button id="mainPage" class="button is-dark">Main Page</button>
    </div>
    </div>`);
};

export const successfulLogin = function(event, user) {
    const $root = $('#root');
    $(event.target.parentNode.parentNode).replaceWith(`<div id="root" style="height:100vh" class="has-background-grey">
    <div class="section has-background-dark">
        <h1 class="title has-text-grey-lighter">Login Page for Dragon-Fighting Game</h1>
        <h3 class="subtitle has-text-grey-lighter">made by Alaina Randolph (aer)</h3>
    </div>
    <br>
    <div style="padding:20px" class="section has-background-grey">
        <p class="has-text-grey-lighter">Welcome ${user}! :)</p>
        <br>
        <button class="button is-dark" onclick="window.location.href='rEnder_it.html'">Play the Game!</button>
        <button id="logout" class="button is-dark" >Logout and Return to Main Page</button>
    </div>
    </div>`);
};



export const submitLogin = function(event) {
    let email = $(`#emailLogin`).val();
    let password = $(`#passwordLogin`).val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user.email;
            successfulLogin(event, user);
        })
        .catch((error) => {
            setupError(event);
        });
};

export const logout = function(event) {
    firebase.auth().signOut().then(() => {
        setupLogin(event);
      }).catch((error) => {
        setupLogin(event);
      });
};

export const submitCreate = function(event) {
    let email = $(`#emailCreate`).val();
    let password = $(`#passwordCreate`).val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user.email;
            successfulLogin(event, user);
        })
        .catch((error) => {
            setupError(event);
        });
};


export const pageManager = function() {
    const $root = $('#root');
    setupLoginOrCreate();
    
    $root.on("click", "#loginButton", (event) => setupLogin(event));
    $root.on("click", "#mainPage", (event) => setupMain(event));
    $root.on("click", "#createButton", (event) => setupCreate(event));
    $root.on("click", "#submitLogin", (event) => submitLogin(event));
    $root.on("click", "#submitCreate", (event) => submitCreate(event));
    $root.on("click", "#logout", (event) => logout(event));

};

$(function() {
    pageManager();
});
