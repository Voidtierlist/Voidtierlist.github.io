document.addEventListener("DOMContentLoaded", () => {

let allPlayersData = [];

/* ===============================
   GAMEMODE ICONS
================================ */

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

/* ===============================
   REGION COLORS
================================ */

function getRegionClass(region){
    if(!region) return "";

    region = region.toLowerCase();

    if(region==="na") return "region-na";
    if(region==="eu") return "region-eu";
    if(region==="as") return "region-as";

    return "";
}

/* ===============================
   BUILD TIERS (RIGHT SIDE)
================================ */

function buildTiers(player){

    if(!player.gamemodes) return "";

    let html="";

    for(const gm in player.gamemodes){

        const gmData = player.gamemodes[gm];
        const key = normalizeGamemode(gm);
        const icon = GAMEMODE_ICONS[key];

        if(!icon) continue;

        html += `
        <div class="tier-circle">
            <img src="${icon}">
            <span>${gmData.tier}</span>
        </div>`;
    }

    return html;
}

/* ===============================
   CREATE PLAYER CARD
================================ */

function createPlayer(player,index){

const card=document.createElement("div");
card.className="player-card";

card.innerHTML=`

<div class="rank">${index+1}.</div>

<div class="player-left">

<img class="player-render"
src="https://render.crafty.gg/3d/bust/${player.mc_username}">

<div class="player-info">
<div class="player-name">${player.mc_username}</div>
<div class="player-points">${player.total_points} points</div>
</div>

</div>

<div class="player-right">

<div class="region ${getRegionClass(player.region)}">
${player.region || ""}
</div>

<div class="tiers">
${buildTiers(player)}
</div>

</div>
`;

card.onclick=()=>openPlayerModal(player);

return card;
}

/* ===============================
   LOAD PLAYERS
================================ */

fetch("player_points.json")
.then(r=>r.json())
.then(data=>{

const container=document.getElementById("leaderboard");
container.innerHTML="";

const players = Object.values(data)
.sort((a,b)=>b.total_points-a.total_points);

allPlayersData = players;

players.forEach((player,index)=>{
container.appendChild(createPlayer(player,index));
});

});

/* ===============================
   PLAYER MODAL
================================ */

function openPlayerModal(player){

const modal=document.getElementById("playerModal");
modal.classList.add("show");

document.getElementById("modal-name").textContent=
player.mc_username;

document.getElementById("modal-region").textContent=
player.region;

document.getElementById("modal-skin").src=
`https://render.crafty.gg/3d/bust/${player.mc_username}`;

const pos=allPlayersData.findIndex(
p=>p.mc_username===player.mc_username)+1;

document.getElementById("modal-position")
.textContent=`#${pos} Overall (${player.total_points})`;

document.getElementById("modal-tiers")
.innerHTML = buildTiers(player);
}

/* CLOSE MODAL */

document.getElementById("closeModal").onclick=()=>{
document.getElementById("playerModal")
.classList.remove("show");
};

document.getElementById("playerModal").onclick=(e)=>{
if(e.target.id==="playerModal")
e.target.classList.remove("show");
};

});
