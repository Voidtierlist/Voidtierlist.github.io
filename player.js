const GAMEMODE_ICONS = {
    smp: "https://mctiers.com/tier_icons/smp.svg",
    sword: "https://mctiers.com/tier_icons/sword.svg",
    nethpot: "https://mctiers.com/tier_icons/nethop.svg",
    mace: "https://mctiers.com/tier_icons/mace.svg",
    pot: "https://mctiers.com/tier_icons/pot.svg",
    crystal: "https://mctiers.com/tier_icons/vanilla.svg",
    uhc: "https://mctiers.com/tier_icons/uhc.svg",
    axe: "https://mctiers.com/tier_icons/axe.svg",
    diasmp: "https://subtiers.net/assets/dia_smp-523efa38.svg"
};
const params = new URLSearchParams(window.location.search);
const name = params.get("user");

fetch("player_points.json")
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
        card.innerHTML = `
        

        <img class="skin"
        src="https://render.crafty.gg/3d/bust/${player.mc_username}">

        <div class="info">
        <a href="player.html?user=${player.mc_username}">
        <strong>${player.mc_username}</strong>
        </a>

        <p>${player.region}</p>
        <p>${player.total_points} Points</p>

        <div class="tiers">
        ${
        Object.entries(player.gamemodes).map(([gm,data])=>`
        <div class="tier-icon">
        <img src="${GAMEMODE_ICONS[gm]}" title="${gm}">
        </div>
        `).join("")
        }
        </div>

        </div>
        `;
            

        gmDiv.appendChild(card);
    }
});
