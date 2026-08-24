/* Mini game description: Built a mini-game for Assigment 1.2 to create an HTML using JavaScript and CSS to give a few 
facts about myself. I'm calling this my Super Mario Themed 3-Hit Intro game. The user hits the iconic question block, 
from the Super Mario Bros Universe, three times to reveal three surprise items which I'm calling cards. Hit #1 - Name card
appears (introducing myself), Hit #2 - My Favorite Mario game card appears, Hit #3 - Princess Peach card appears. After 
the third and final hit the game resets and the question block is disabled. User must click "Start Over" button to 
re-run the game again */

/* Coin Sound - the audio object is created when the page loads. The browser recognizes the mp3 player before the user \
clicks the Question block */
const jumpAudio = new Audio("./Audio/mario_coin_sound.mp3");
/* loads the audio file ahead of time */
jumpAudio.preload = "auto";

/* Name card sound */
const nameCardAudio = new Audio("./Audio/super-mario-bros.mp4");
/* loads the audio file ahead of time */
nameCardAudio.preload = "auto";

/* Favorite Game card sound */
const favoriteGameAudio = new Audio("./Audio/super-mario_intro music.mp3");
/* loads the audio file ahead of time */
favoriteGameAudio.preload = "auto";

/* Princess Peach Card sound */
const peachAudio = new Audio("./Audio/princess-peach-showtime.mp3");
/* loads the audio file ahead of time */
peachAudio.preload = "auto";

/* Audio play function - this function creates playAudio() as an audio object: playAudio(jumpAudio),
playAudio(nameCardAduio), and playAudio(peachAudio).*/
function playAudio(audioObject) {
    /* Checks whether the audioObject exists before tyring to play it. If the audio object is missing, it displays
    an error in the console and stops the function with return so the program doesn't crash */
    if (!audioObject) {
        console.error(
            "Audio object was not found."
        );
        return;
    }
    /* starts the sound from the beginning */
    audioObject.currentTime = 0;
    /* Due to issues I was having with the sound playing, I implemented a success message in the console to 
    to tell me if it works. If the audio cannot play, it uses the .catch() section to display an error message
    explaining what went wrong*/
    audioObject.play().then(function () {
        console.log("Audio successfully playing!");
    })
    .catch(function (error) {
        console.error("Audio could not play:", error
        );
    });
    
}

/* function that tell JavaScript to play the jumpAudio sound which is a coin sound. Each time the Question block
is hit, the function is called to play the jump sound */
function playJumpSound() { playAudio(jumpAudio);}

/* Clickable Question block: finds the id with "question-block" and stores it in the variable questionBlock. 
Purpose is to detect clicks, simulate the block being hit with animation, and controls other game actions */
const questionBlock =
    document.getElementById("question-block");
/* Caption for the Question block: finds the id with "block-message" and stores the code in the blockMessage variable.
JavaScript then uses the variable to change the instructions displayed above the question block */
const blockMessage =
    document.getElementById("block-message");
/* Game cards appear in this variable after each hit. Finds the id with "item-display" and stores the item the 
itemDisplay variable. JavaScript then uses the variable to display three different cards after each Question block hit */
const itemDisplay =
    document.getElementById("item-display");
/* Visible hit counter: finds the id with "hit-number" and stores the number in the hitNumber variable. JavaScript then
uses the variable to update the number of Question block hits displayed on the screen */
const hitNumber =
    document.getElementById("hit-number");
/* Resets message: finds the id with "reset-message" and stores the message in the resetMessage variable. JavaScript
then uses the variable to show or hide the message that tells the user they have found all three items */ 
const resetMessage =
    document.getElementById("reset-message");
/* Set the game to take three clicks before reseting the it */
const MAX_HITS = 3;
/* Keeps track of how many times the block has been hit (0-3) */
let hitCount = 0;
/* Boolean variable created to determine whether the block is responding to clicks */
let gameActive = true;
/* YouTube video URL that takes user to my Favorite Super Mario Bros game tutorial */
const favoriteGameYouTubeURL =
    "https://youtu.be/iDyC-gIfJcw?si=2KoCGDeEMvUzQXix";
/* Nintendo online store URL that takes user to the actual product page to purchase this game */
const nintendoStoreURL =
    "https://www.nintendo.com/us/store/products/new-super-mario-bros-u-deluxe-switch/";

/* Question block animation: simulates the Question block being hit with a small bounce */
function animateBlock() {
    /* Adds the CSS animation clss */
    questionBlock.classList.add("block-hit");
    /* removes the class after the animation is finished to allow the animation to run again on the next click */
    setTimeout(function() {
        questionBlock.classList.remove("block-hit");
    }, 450);
}

/* Updates Hit counter: displays the current hit number on the page */
function updateHitCounter() {
      hitNumber.textContent = hitCount;
}

/* Hit #1: the first click displays the name card */
function showNameCard() {
   /* Replaces whatever was previously stored in the item display */
   /* This article element creates the name card that appears after the first Question block hit, which includes my name, 
   greeting, and instructions. Using h2 for my card heading and using paragraph tag to display my introduction  */
   itemDisplay.innerHTML = `
        
        <article class="item-card name-card">
            <h2>
                Hello There!
            </h2> 
            <p>
                <strong>I'm Jena Kahili</strong>
            </p>
            <p>Welcome to my page! </p>
            <p>
                My major is <strong>Artificial Intelligence</strong><br>
                Email: jkahili30387@uat.edu<br>
                Expected Graduation May 2028
            </p>
            <p>
                Hit the block another time to claim
                your next item!
            </p>
        </article>
    `; 
    /* Plays the sound associated with the name card */
    playAudio(nameCardAudio);
    /* Updates the message above the Quesion block */
     blockMessage.textContent =
        "Great! You found your first item! Hit the block again!";
}

/* Hit #2: the second click displays my Favorite Super Mario Bros game, which is a clickable YouTube link (using innerHTML)
to a tutorial of the game. It also uses CSS classes to style the card and image and 
included accessibility info with alt and aria-label. */
function showFavoriteGameCard() {
   itemDisplay.innerHTML = `
        <article class="item-card">
            <h2>
                My Favorite Super Mario Game
            </h2>
            <a
                id="favorite-game-link"
                class="card-image-link"
                href="${favoriteGameYouTubeURL}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch my favorite Mario game on YouTube"
            >
                <img
                    class="card-image"
                    src="./Images/SuperMario bros U deluxe.jpg"
                    alt="My favorite Super Mario game"
                >
            </a>
            <p class="card-instruction">
                Click the picture to watch the game on YouTube!
            </p>
            <p>
                Hit the block one more time to discover
                your final item!
            </p>
        </article>
    `;
    /* Plays the Super Mario Bros Intro sound */
    playAudio(favoriteGameAudio);
    /* Searches HTML element whose ID is favorite-game-link and saves it in a variable
    called favoriteGameLink so I can control it with JavaScript */
    const favoriteGameLink =
        document.getElementById("favorite-game-link");
    /* Finds the YouTube link after the button is click */
    favoriteGameLink.addEventListener("click", function () {
        /* stops the sound from continuing to play */
        favoriteGameAudio.pause();
        /* Stops the card #2 sound when the user clicks the image/link. Without this the sound just kept going */
        favoriteGameAudio.currentTime = 0;
    });  
 /* Updates the instructions above the block */
 blockMessage.textContent =
        "You found my favorite game! Hit the block one more time!"
}
/* Hit #3: the third click displays an image card of Princess Peach which is a clickable link to the Nintendo 
store. The card will continue to stay visible until the user clicks the "Start over" button in the card. To prevent 
the hit counter from exceeding the 3 hits total I had to disable the Question block after the Peach card appears. 
The start over button is created and attached to the event listener after the button is created */
function showPrincessPeachCard() {
    /* I was having issues with the favorite Game sound still playing in the background even when the user hits
    the Question block for the third time. This stops the audio immediately before showing the Princess Peach card */
    favoriteGameAudio.pause();
    /* Resets my Favorite Game sound to the beginning, preventing it from continuing if the user starts the game over */
    favoriteGameAudio.currentTime = 0;
    /* Cerate the Princess Peach card: replaces whatever card was previously displayed. The Princess Peach card contains
    the Peach heading, is a clickable image, the description of why this is my favorite character, instructions to click
    the image to link to the Nintendo online store and the start over button */
    itemDisplay.innerHTML = `
        
        <article class="item-card">
            
            <h2>
                Princess Peach
            </h2>

            <a
                id="peach-store-link"
                class="card-image-link"
                href="${nintendoStoreURL}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the Nintendo online store"
            >
                <img
                    class="card-image"
                    src="./Images/Princess Peach.JPG"
                    alt="Princess Peach"
                >
            </a>

            <p class="peach-caption">
                Princess Peach is my favorite character to play
                because she can float with her dress, jump high,
                and change into Toadette.
            </p>

            <p class="card-instruction">

                Click the picture to visit the Nintendo online store!
            </p>

            <button
                id="start-over-button"
                class="start-over-button"
                type="button"
            >
                ⭐ Start Over ⭐
            </button>
        </article>
    `;

    /* Princess Peach image card sound: only plays when HIT #3 is executed and does not play when the page loads */
    playAudio(peachAudio);

    /* Nintendo online store link created inside the Princess Peach card */
const peachStoreLink =
    document.getElementById("peach-store-link");

/* Stops Peach audio when the image is clicked: pauses the Peach card sound, resets it to the beginning, then opens
the Nintendo online store in a new tab. */
peachStoreLink.addEventListener("click", function () {
    peachAudio.pause();
    peachAudio.currentTime = 0;
});
/* Updates the message text */
blockMessage.textContent =
        "You found all three items! Great job!";
        /* Disables Question block: After the user has reached 3 out 3 hits, the Question block will stop responding. 
        The code is inside the function, so it does not run when the page loads. It only runs after the third hit */
        gameActive = false;
        questionBlock.disabled = true;
        /* Start Over Button: button is created using itemDisplay.innerHTML */
        const startOverButton =
            document.getElementById("start-over-button");
        /* Using JavaScript to run the resetPreview() of the game when the user clicks the "Start Over" button */
        startOverButton.addEventListener(
        "click",
        resetPreview
    );
}

/* Reset Preview: only resets when the user clicks the "Start Over" button, will not automatically dissapear */
function resetPreview() {
    /* Resets the number of hits back to zero */
    hitCount = 0;
    /* Updates the visible counter on the screen to reflect the reset */
    updateHitCounter();
    /* Removes the Princess Peach card */
    itemDisplay.innerHTML = "";
    /* Restore Original message: this is the message that appears above the question block when the page first loads.
    Changes the instructions back to the original Question Block message */
    blockMessage.textContent =
        "Hit the block to begin again!";
        /* Hides the reset message so user can now click the Question block again to start over */
        resetMessage.classList.add("hidden");
        /* Re-enables the Question block */
        gameActive = true;
        questionBlock.disabled = false;
}
/* JavaScript function that creates the instructions for how to handle a block being clicked */
function handleBlockClick() {
    /* Using if statement to set condition that if game is temporarily inactive, dont allow clicks if the game
    is resetting */
    if (!gameActive) {
        return;
    }
    /* Increases the number of hits by one */
    hitCount++;
    /* Updates the visible counter */
    updateHitCounter();
    /* Calls the animateBlock function to make the Question block bounce(hit simulation) to show the user 
    the block was successfully hit (clicked) */ 
    animateBlock();
    /* Calls the playJumpSound fuction to play the coin sound immediately, which happens on all three hits */
    playJumpSound();
    /* Using if Statements to determine which card should appear. Did not randomize, so I'm using the hit number */
    if (hitCount === 1) {
        /* On the first click display the name card */
        showNameCard();
        }
    /* Checks if the previous condition was false and whether the hitCount was exactly 2 */
    else if (hitCount === 2) {
        /* On the second click display my Favorite game image card */
        showFavoriteGameCard();
    }
    /* Checks if the previous condition was false and whether the hitCount was exactly 3 */
    else if (hitCount === 3) {
    /* Stops the sound from card #2 before displaying card #3 */
    favoriteGameAudio.pause();
    favoriteGameAudio.currentTime = 0;
    /* On the third click show the final Princess Peach card */
    showPrincessPeachCard();
    }
}

/* Using JavaScript, the handleBlockClick runs when the user clicks the Question block */
questionBlock.addEventListener(
    "click",
    handleBlockClick
);

/* Ensures the hit counter starts at zero */
updateHitCounter();