const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const quoteText = document. getElementById('quote');
const twitterBtn = document. getElementById('twitter');
const newQuoteBtn = document. getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loader
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}
// Hide loader
function complete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show new quote
// Thought: Having this in a separate function allows us to use the quotes array we already loaded.
// Otherwise we'd have to load the array over and over again.
function newQuote()
{
	loading();
	const quote = apiQuotes[ Math.floor( Math.random() * apiQuotes.length)];
	// We set 'quoteText' and 'authorText' to represent an element in the HTML file 
	// Check if author field is 'Anonymous' and replace with 'Unknown'
	if( quote.author == 'Anonymous') 
	{
			authorText.textContent = 'Unknown';
	} else 
	{
		authorText.textContent = quote.author;
	}
	// Check the code length to determine styling
	if( quote.text.length > 120)
	{
		quoteText.classList.add('long-quote')
	} else 
	{
		quoteText.classList.remove('long-quote');
	}	
	quoteText.textContent = quote.text;
	// Hide Loader
 	complete();
	
}

// Get quotes from API
async function getQuotes() 
{
	loading();
	// With free APIs we might run into a CORS issue. Here's a way to get around it:
	// const proxyURL = 'https://cors-anywhere.herokuapp.com/'
	// 	const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
	//  [...] const response = await fetch(proxyURL + apiURL);
	const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
	try {
		const response = await fetch(apiURL);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
	}
}

// Tweet quotes
function tweetQuote() 
{
	// Open an new window (_blank)with a given URL
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// EventListeners for the two button elements
newQuoteBtn.addEventListener( 'click', newQuote);
twitterBtn.addEventListener ('click', tweetQuote);

// On Load
getQuotes();
