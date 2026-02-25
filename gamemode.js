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
        <div class="rank">${index + 1}.</div>

        <img class="skin"
        src="https://mc-heads.net/body/${player.mc_username}/100">

        <div class="info">
        <a href="player.html?user=${player.mc_username}">
        ${player.mc_username}
        </a>

        <p>${player.total_points} Points</p>
        </div>

       <div class="tiers">
       ${createTierBadges(player)}
       </div>
`      ;



        column.appendChild(card);
    });

});
