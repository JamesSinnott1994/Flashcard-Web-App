const express = require('express'); // To use Express we must require it with Node's require statement
const router = express.Router(); // Like a mini-router

const { data } = require('../data/flashcardData.json'); // Gets our json data
const { cards } = data; // Equivalent to: const cards = data.cards;

// Our /cards route
router.get( '/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor( Math.random() * numberOfCards ); // Picks a random card
  res.redirect( `/cards/${flashcardId}` ); // Redirects to our cards route with the random card as the id
});

// Our /cards/card id route
router.get('/:id', (req, res) => {
    const { side } = req.query; // Tries to get the "side" of the card in the query string i.e. question or answer
    const { id } = req.params; // Gets our card id

    if ( !side ) { // If there is no side, make it equal to question as the default
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username; // Get username from cookie
    const text = cards[id][side]; // Gets the text associated with the side of the given card id in the flashcardData.json file
    const { hint } = cards[id]; // Gets the hint associated with the given card id in the flashcardData.json file
    
    // The data that we will pass into our template
    const templateData = { id, text, name, side };

    if ( side === 'question' ) {
      templateData.hint = hint;
      templateData.sideToShow = 'answer';
      templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ) {
      templateData.sideToShow = 'question';
      templateData.sideToShowDisplay = 'Question';
    }

    res.render('card.pug', templateData);
});

// Exports the router so it can be referenced in the app.js file
module.exports = router;