document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('player-form');
    const playerCountSelect = document.getElementById('player-count');

    // When the form is submitted, store the selected number of players
    playerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the number of players selected
        const playerCount = parseInt(playerCountSelect.value);

        // Store the number of players in localStorage
        localStorage.setItem('numPlayers', playerCount);

        // Redirect to the game page (or load the game setup with the selected player count)
        window.location.href = 'home.html';  // Replace 'game.html' with your actual game page file
    });
});
