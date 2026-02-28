const GAMEMODE_ICONS = {
    smp:"https://mctiers.com/tier_icons/smp.svg",
    sword:"https://mctiers.com/tier_icons/sword.svg",
    crystal:"https://mctiers.com/tier_icons/vanilla.svg",
    nethpot:"https://mctiers.com/tier_icons/nethop.svg",
    uhc:"https://mctiers.com/tier_icons/uhc.svg",
    axe:"https://mctiers.com/tier_icons/axe.svg",
    mace:"https://mctiers.com/tier_icons/mace.svg",
    diamondpot:"https://mctiers.com/tier_icons/pot.svg",
    diasmp:"https://subtiers.net/assets/dia_smp-523efa38.svg"
};

function normalizeGamemode(name){
    return name.toLowerCase().replace(/[^a-z]/g,"");
}

const params = new URLSearchParams(window.location.search);
const name = params.get("user");

fetch("player_points.json")
.then(res=>res.json())
.then(data=>{

    const player = Object.values(data)
    .find(p=>p.mc_username.toLowerCase()===name.toLowerCase());

    if(!player){
        document.body.innerHTML="<h1>Player not found</h1>";
        return;
    }

    document.getElementById("username").textContent =
        player.mc_username;

    document.getElementById("region").textContent =
        player.region || "NA";

    document.getElementById("points").textContent =
        player.total_points;

    document.getElementById("skin").src =
        `https://render.crafty.gg/3d/bust/${player.mc_username}`;

    const gmDiv=document.getElementById("gamemodes");
    gmDiv.innerHTML="";

    for(const gm in player.gamemodes){

        const gmData=player.gamemodes[gm];

        const key=normalizeGamemode(gm);
        const icon=GAMEMODE_ICONS[key];

        if(!icon || !gmData.tier) continue;

        const card=document.createElement("div");
        card.className="tier-card";

        card.innerHTML=`
            <img class="tier-icon" src="${icon}">
            <span class="tier-rank">${gmData.tier}</span>
        `;



        gmDiv.appendChild(card);
    }

});
