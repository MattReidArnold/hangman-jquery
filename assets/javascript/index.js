$(() => {
    const appData = {
      words: ['Chopper', 'Dot', 'Carl'],
      guessLimit: 8,
    };
  
    let appState = {};
    
    const initAppState = () => {
      const randomWordIndex = Math.floor(Math.random() * appData.words.length);
      const word = appData.words[randomWordIndex];
      const wordBoard = Array(word.length).fill('_');
      appState = {
        currentWord: randomWordIndex,
        guessedLetters: [],
        remainingGuesses: appData.guessLimit,
        wordBoard: wordBoard,
      };
    };
    
    const isLoser = () => {
      return appState.remainingGuesses === 0;
    }
    
    const isWinner = () => {
      return !appState.wordBoard.includes('_');
    }
    
    const renderWordBoard = () => {
      $('#wordBoard').text(appState.wordBoard.join(' '));
    }
    
    const renderGuessedLetters = () => {
      const upperCaseWord = appData.words[appState.currentWord].toUpperCase();
      let incorrectlyGuessedLetters = appState.guessedLetters.filter(letter => !upperCaseWord.includes(letter));
      $('#guessedLetters').text(incorrectlyGuessedLetters.join(', '));
    }
    
    const renderStatus = () => {
      if(isLoser()){
        $('#gameStatus').text('You loose!!!');
        $('#playAgain').show();
      } else if(isWinner()){
        $('#gameStatus').text('You Win!!!');
        $('#playAgain').show();
      } else {
        $('#gameStatus').text(`Remaining Guesses: ${appState.remainingGuesses}`);
      }
    }
  
    const guess = (letter) => {
      const word = appData.words[appState.currentWord];
      appState.guessedLetters.push(letter);
      
      let correctGuess = false;
      for(let i = 0; i < word.length; i++){
        const wordLetter = word.charAt(i);
        if(wordLetter.toUpperCase() === letter){
          appState.wordBoard[i] = wordLetter;
          correctGuess = true;
        }
      }
      
      if(!correctGuess){
        appState.remainingGuesses--;
      }
      
      renderStatus();
      renderWordBoard();
      renderGuessedLetters();
    }
    
    const isLetterKeyCode = (keyCode) => {
      return (keyCode >= 65 && keyCode <= 90)
    };
  
    const handleKeyDown = (event) => {
      const keyCode = event.keyCode;
      const key = String.fromCharCode(keyCode);
  
      if (appState.guessedLetters.includes(key) || !isLetterKeyCode(keyCode) || isLoser() || isWinner()) {
        return;
      }
      guess(key);
    };
    
    const startGame = () => {
      initAppState();
      renderStatus();
      renderWordBoard();
    };
    
    const handleStart = () => {
      $('#start').hide();
      $('#gameBoard').show();
      startGame();
    };
    
    const handlePlayAgain = () => {
      $('#playAgain').hide();
      startGame();
    };
  
    const initApp = () => {
      document.onkeydown = handleKeyDown;
      $('#btnStart').on('click', handleStart);
      $('#btnPlayAgain').on('click', handlePlayAgain)
    };
    
    initApp();
  });
  