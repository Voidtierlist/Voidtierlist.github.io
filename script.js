document.addEventListener("DOMContentLoaded",()=>{

let allPlayers=[];

const GAMEMODE_ICONS={
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

function normalize(name){
return name.toLowerCase().replace(/_| /g,"");
}

/* ======================
   LOAD PLAYERS
====================== */

fetch("player_points.json")
.then(r=>r.json())
.then(data=>{

const container=document.getElementById("leaderboard");
container.innerHTML="";

allPlayers=Object.values(data)
.sort((a,b)=>b.total_points-a.total_points);

allPlayers.forEach((player,index)=>{

let tiersHTML="";

if(player.gamemodes){
for(const gm in player.gamemodes){

const icon=GAMEMODE_ICONS[normalize(gm)];
if(!icon) continue;

tiersHTML+=`
<div class="tier">
<img src="${icon}">
<span>${player.gamemodes[gm].tier}</span>
</div>`;
}
}

const card=document.createElement("div");
card.className="player-card";

card.innerHTML=`

<div class="player-left">

<div class="rank">${index+1}.</div>

<img class="player-render"
src="https://render.crafty.gg/3d/bust/${player.mc_username}">

<div class="player-info">
<h3>${player.mc_username}</h3>
<p>${player.total_points} Points</p>
</div>

</div>

<div class="player-right">

<div class="tiers">${tiersHTML}</div>

<div class="region ${player.region}">
${player.region}
</div>

</div>
`;

card.onclick=()=>openModal(player);

container.appendChild(card);
});
});

/* ======================
   MODAL
====================== */

function openModal(player){

const modal=document.getElementById("playerModal");
modal.classList.remove("hidden");

document.getElementById("modal-name").textContent=player.mc_username;
document.getElementById("modal-region").textContent=player.region;
document.getElementById("modal-skin").src=
`https://render.crafty.gg/3d/bust/${player.mc_username}`;

let tiers="";

if(player.gamemodes){
for(const gm in player.gamemodes){

const icon=GAMEMODE_ICONS[normalize(gm)];
if(!icon) continue;

tiers+=`
<div class="tier">
<img src="${icon}">
<span>${player.gamemodes[gm].tier}</span>
</div>`;
}
}

document.getElementById("modal-tiers").innerHTML=tiers;
}

/* CLOSE BUTTON */

document.getElementById("closeModal")
.onclick=()=>{
document.getElementById("playerModal")
.classList.add("hidden");
};

/* CLICK OUTSIDE */

document.getElementById("playerModal")
.onclick=e=>{
if(e.target.id==="playerModal")
e.target.classList.add("hidden");
};

});
