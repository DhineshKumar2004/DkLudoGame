document.addEventListener('DOMContentLoaded', () => {
    const diceBtn = document.querySelector('.dice-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const diceContainer = document.querySelector('.dice-container');
    const diceValueDisplay = document.querySelector('.dice-value');
    const activePlayerDisplay = document.querySelector('.active-player span');
    const playerAreas = document.querySelectorAll('.player');

    const players = ['blue', 'yellow', 'red', 'green'];
    const paths = {
        blue: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13',
               'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10', 'y11', 'y12', 'y13',
               'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13',
               'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12',
               'bh1', 'bh2', 'bh3', 'bh4', 'bh5'],
        yellow: ['y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10', 'y11', 'y12', 'y13',
                 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13',
                 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13',
                 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12',
                 'yh1', 'yh2', 'yh3', 'yh4', 'yh5'],
        red: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13',
              'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13',
              'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13',
              'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10', 'y11', 'y12',
              'rh1', 'rh2', 'rh3', 'rh4', 'rh5'],
        green: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13',
                'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13',
                'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'y10', 'y11', 'y12', 'y13',
                'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12',
                'gh1', 'gh2', 'gh3', 'gh4', 'gh5']
    };

    let currentPlayerIndex = 0;
    let diceValue = 0;

    const diceImages = [
        'images/dice-1.png',
        'images/dice-2.png',
        'images/dice-3.png',
        'images/dice-4.png',
        'images/dice-5.png',
        'images/dice-6.png'
    ];

    //changes
    const numPlayers = parseInt(localStorage.getItem('numPlayers') || 4);

    const rollDice = () => {
        const diceImage = document.createElement('div');
        diceImage.classList.add('dice-image', 'dice-rolling');
        diceContainer.innerHTML = ''; // Clear previous dice
        diceContainer.appendChild(diceImage);

        setTimeout(() => {
            diceValue = Math.floor(Math.random() * 6) + 1;
            diceImage.classList.remove('dice-rolling');
            diceImage.classList.add(`dice-${diceValue}`);
            diceValueDisplay.textContent = `You rolled: ${diceValue}`;
            highlightCurrentPlayer();
            highlightCoinsForCurrentPlayer();
        }, 1000); // After 1 second, stop animation and show result
    };

    const highlightCurrentPlayer = () => {
        
        playerAreas.forEach((area, index) => {
            //changes
            if (index >= numPlayers) {
                area.classList.add('disabled');
            } else {
                area.classList.remove('disabled');
            }

            area.classList.toggle('current-player', index === currentPlayerIndex);
        });

        //changes
        if (numPlayers === 2) {
            if (currentPlayerIndex === 0) {
                players[0] = 'blue';  // Player 1 is blue
                players[1] = 'red';   // Player 2 is red
            } else {
                players[0] = 'green'; // Player 1 is green
                players[1] = 'yellow'; // Player 2 is yellow
            }
        }
    };

    const highlightCoinsForCurrentPlayer = () => {
        cleanupListeners();
        const coins = document.querySelectorAll(`.coin[player-id="p${currentPlayerIndex + 1}"]`);
        coins.forEach((coin) => {
            coin.classList.add('highlighted-coin');
            coin.addEventListener('click', () => moveCoin(coin));
        });
    };

    const moveCoin = (coin) => {
        const player = players[currentPlayerIndex];
        const path = paths[player];
        const currentCellId = coin.parentElement.id;

        

        const currentIndex = path.indexOf(currentCellId);
        
        const targetIndex = currentIndex + diceValue;
        

        if (targetIndex < path.length) {
            stepByStepMove(coin, path, currentIndex, targetIndex);
        } else {
            alert('Invalid move! Try again.');
        }
    };

    const stepByStepMove = (coin, path, currentIndex, targetIndex) => {
        let stepIndex = currentIndex;

        const moveStep = () => {
            if (stepIndex < targetIndex) {
                stepIndex++;
                const nextCell = document.getElementById(path[stepIndex]);
                if (nextCell) {
                    nextCell.appendChild(coin);
                    setTimeout(moveStep, 400); // Delay for visual effect
                }
            } else {
                checkTargetCell(coin, path[targetIndex]);
            }
        };

        moveStep();
    };

    const checkTargetCell = (coin, targetCellId) => {
        const targetCell = document.getElementById(targetCellId);
        if (targetCell) {
            const occupyingCoin = targetCell.querySelector('.coin');
            if (occupyingCoin && occupyingCoin.getAttribute('player-id') !== `p${currentPlayerIndex + 1}`) {
                sendCoinHome(occupyingCoin);
                alert(`${players[currentPlayerIndex]} sent ${players[parseInt(occupyingCoin.getAttribute('player-id').slice(1)) - 1]}'s coin home!`);
            }
            endTurn();
        }
    };

    const sendCoinHome = (coin) => {
        const playerId = coin.getAttribute('player-id');
        
        const player = players[parseInt(playerId.slice(1)) - 1];
        
        const initialPlace = document.querySelector(`.coin-place.${player}:nth-child(${parseInt(coin.getAttribute('coin-number')) + 1})`);
        
        initialPlace.appendChild(coin);
    };

    const endTurn = () => {
        cleanupListeners();
        // Skip disabled players
        let nextPlayerIndex = (currentPlayerIndex + 1) % numPlayers;

        // Check if the next player is disabled
        while (nextPlayerIndex >= numPlayers) {
            nextPlayerIndex = (nextPlayerIndex + 1) % numPlayers; // Skip over disabled players
        }

    // Set the new current player
    currentPlayerIndex = nextPlayerIndex;
        diceValueDisplay.textContent = '';
        activePlayerDisplay.textContent = players[currentPlayerIndex].toUpperCase();
        highlightCurrentPlayer();
    };

    //chnages
    playerAreas.forEach((area, index) => {
        if (index >= numPlayers) {
            area.classList.add('blurred'); // Apply the blurred effect to disabled players
        } else {
            area.classList.remove('blurred');
        }
    });

    const cleanupListeners = () => {
        document.querySelectorAll('.highlighted-coin').forEach((coin) => {
            coin.classList.remove('highlighted-coin');
            coin.replaceWith(coin.cloneNode(true)); // Removing the click listener by cloning the node
        });
    };

    const resetGame = () => {
        diceValue = 0;
        currentPlayerIndex = 0;
        diceValueDisplay.textContent = '';
        activePlayerDisplay.textContent = players[0].toUpperCase();

        players.forEach((player, index) => {
            document.querySelectorAll(`.coin[player-id="p${index + 1}"]`).forEach((coin) => {
                const initialPlace = document.querySelector(`.coin-place.${player}:nth-child(${parseInt(coin.getAttribute('coin-number')) + 1})`);
                initialPlace.appendChild(coin);
            });
        });

        cleanupListeners();
    };

    // Event Listeners
    diceBtn.addEventListener('click', rollDice);
    resetBtn.addEventListener('click', resetGame);
});
