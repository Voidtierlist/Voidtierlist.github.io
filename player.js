const params = new URLSearchParams(window.location.search);
const name = params.get("user");

fetch("https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/player_points.json")
.then(res => res.json())
.then(data => {

    const player = Object.values(data)
        .find(p => p.mc_username.toLowerCase() === name.toLowerCase());

    if(!player){
        document.body.innerHTML = "<h1>Player not found</h1>";
        return;
    }

    document.getElementById("username").innerText = player.mc_username;
    document.getElementById("region").innerText = "Region: " + player.region;
    document.getElementById("points").innerText = player.total_points;

    document.getElementById("skin").src =
        `https://mc-heads.net/body/${player.mc_username}/256`;

    const gmDiv = document.getElementById("gamemodes");

    for(const gm in player.gamemodes){
        const info = player.gamemodes[gm];

        const card = document.createElement("div");
        card.innerHTML =
            `<b>${gm.toUpperCase()}</b> — ${info.tier} (${info.points} pts)`;

        gmDiv.appendChild(card);
    }
});
