fetch("player_points.json")
.then(res => res.json())
.then(data => {

    const players = Object.values(data);

    players.forEach(player => {

        const mode = player.gamemodes["vanilla"];
        if(!mode) return;

        const tier = mode.tier;

        // Convert HT1/LT1 → Tier column
        let tierNumber = tier.replace(/[A-Z]/g,"");

        const column =
            document.getElementById("tier"+tierNumber);

        if(!column) return;

        const card = document.createElement("div");
        card.className = "tier-player";

        card.innerHTML = `
            <img src="https://mc-heads.net/avatar/${player.mc_username}">
            ${player.mc_username}
        `;

        column.appendChild(card);
    });

});
