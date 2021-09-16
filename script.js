
// 
const jokeContainer = document.getElementById('jokes-container');
const jokeText = document.getElementById('joke');
const jokeAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newJokeBtn = document.getElementById('new-joke');
const loader  = document.getElementById('loader');
// Get Qoutes From API

let apiJokes = [];



function ShowLoadingSpinner(){
    
    loader.hidden = false;
    jokeContainer.hidden = true;
}



function HideLoadingSpinner(){
    
    loader.hidden = true;
    jokeContainer.hidden = false;
}


//Show new Quote
function newJoke(){



    ShowLoadingSpinner();
    //Pick a random quote
    const joke = apiJokes[Math.floor(Math.random() * apiJokes.length)];

    //Using Local Storage
   // const quote = localJokes[ Math.floor(Math.random() * localJokes.length)];
    
    jokeAuthor.textContent = joke.author;

    //Check Joke length to determine the styling

    if(joke.quote.length > 50){
        jokeText.classList.add('long-joke');
    }else{
        jokeText.classList.remove('long-joke');
    }

    jokeText.textContent = joke.quote;
    HideLoadingSpinner();
    //console.log(joke);
}

async function GetJokes(){

    ShowLoadingSpinner();
    const apiUrl = 'http://quotes.stormconsultancy.co.uk/popular.json';

    try {
        
        const response = await fetch(apiUrl);
        apiJokes = await response.json();
        console.log(apiJokes[2]);
        newJoke();
       

    } catch (error) {
        console.log(error);
    }
}


//Tweet Quote
function tweetJoke(){

    const twitterUrl = `https://twitter.com/intent/tweet?text=${jokeText.textContent} - ${jokeAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}


//Event Listeners
newJokeBtn.addEventListener('click' , newJoke);

twitterBtn.addEventListener('click' , tweetJoke);

GetJokes();


