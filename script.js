// ===============================
// LOAD PLAYER DATA FROM JSON
// ===============================

fetch("player_points.json")
.then(response => response.json())

.then(data => {

    // ===============================
    // THIS IS WHERE PLAYERS ARE DISPLAYED
    // ===============================

    const playersContainer = document.getElementById("players");

    // convert JSON object → list of players
    const players = Object.values(data);

    // sort players by points (highest first)
    players.sort((a, b) => b.total_points - a.total_points);

    // loop through every player
    players.forEach((player, index) => {

        // create player card
        const card = document.createElement("div");

        card.className = "player-card";

        // ===============================
        // PLAYER VISUAL DISPLAY
        // ===============================
        card.innerHTML = `
            <div class="rank">#${index + 1}</div>

            <img 
                src="https://mc-heads.net/avatar/${player.mc_username}"
                width="50"
                height="50"
            >

            <div class="info">
                <a href="player.html?user=${player.mc_username}">
                    <strong>${player.mc_username}</strong>
                </a>

                <p>${player.region}</p>
                <p>${player.total_points} Points</p>
            </div>
        `;

        // ===============================
        // 🔥 THIS LINE ADDS PLAYER TO WEBSITE
        // ===============================
        playersContainer.appendChild(card);

    });

});
