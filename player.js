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
        `https://render.crafty.gg/3d/bust/${player.mc_username}`;

    const gmDiv = document.getElementById("gamemodes");

    for(const gm in player.gamemodes){

        const key = gm.toLowerCase().replace(/\s/g,"");
        const icon = GAMEMODE_ICONS[key];

        if(!icon) continue;

        const card = document.createElement("div");
        card.className = "tier-icon";

        card.innerHTML = `
            <img src="${icon}" title="${gm}">
        `;

        gmDiv.appendChild(card);
    }
});
