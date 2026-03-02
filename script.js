document.addEventListener("DOMContentLoaded",()=>{

let allPlayersData=[];

/* ===============================
   GAMEMODE ICONS
================================ */
const ALL_GAMEMODES = [
    "smp",
    "sword",
    "crystal",
    "nethpot",
    "diamondpot",
    "uhc",
    "axe",
    "diamondsmp",
    "mace"
];
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

function normalizeGamemode(name){
return name.toLowerCase().replace(/[^a-z]/g,"");
}

/* ===============================
   LOAD PLAYERS
================================ */

fetch("player_points.json")
.then(r=>r.json())
.then(data=>{

const container=document.getElementById("leaderboard");
container.innerHTML="";

const players=Object.values(data)
.sort((a,b)=>b.total_points-a.total_points);

allPlayersData=players;

players.forEach((player,index)=>{

let tiersHTML="";

ALL_GAMEMODES.forEach(mode=>{

const icon=GAMEMODE_ICONS[mode];
if(!icon) return;

let tier="-";
let opacity="0.35";

if(player.gamemodes){
for(const gm in player.gamemodes){

if(normalizeGamemode(gm)===mode){
tier=player.gamemodes[gm].tier;
opacity="1";
}
}
}

tiersHTML+=`
<div class="tier-circle">
<div class="tier-bubble" style="opacity:${opacity}">
<img src="${icon}">
</div>
<div class="tier-label">${tier}</div>
</div>`;
});
const row=document.createElement("div");
row.className="player";

row.innerHTML=`

<div class="rank">${index+1}.</div>

<img class="skin"
src="https://render.crafty.gg/3d/bust/${player.mc_username}">

<div class="info">
<h3>${player.mc_username}</h3>
<p>${player.total_points} Points</p>
</div>

<div class="region region-${player.region}">
${player.region}
</div>

<div class="tiers">
${tiersHTML}
</div>
`;

row.onclick=()=>openPlayerModal(player);

container.appendChild(row);

});

});

/* ===============================
   OPEN PLAYER MODAL
================================ */

function openPlayerModal(player){

const modal=document.getElementById("playerModal");

modal.classList.remove("hidden");

document.getElementById("modal-name").textContent=
player.mc_username;

document.getElementById("modal-region").textContent=
player.region;

document.getElementById("modal-skin").src=
`https://render.crafty.gg/3d/bust/${player.mc_username}`;

const pos=allPlayersData.findIndex(
p=>p.mc_username===player.mc_username)+1;

document.getElementById("modal-position")
.textContent=`#${pos} Overall • ${player.total_points} Points`;

let tiersHTML="";

ALL_GAMEMODES.forEach(mode=>{

const icon=GAMEMODE_ICONS[mode];
if(!icon) return;

let tier="-";
let opacity="0.35";

if(player.gamemodes){
for(const gm in player.gamemodes){

if(normalizeGamemode(gm)===mode){
tier=player.gamemodes[gm].tier;
opacity="1";
}
}
}

tiersHTML+=`
<div class="tier-circle">
<div class="tier-bubble" style="opacity:${opacity}">
<img src="${icon}">
</div>
<div class="tier-label">${tier}</div>
</div>`;
});

document.getElementById("modal-tiers").innerHTML=tiersHTML;

}

/* ===============================
   CLOSE MODAL
================================ */

document.getElementById("closeModal")
.addEventListener("click",()=>{
document.getElementById("playerModal")
.classList.add("hidden");
});

document.getElementById("playerModal")
.addEventListener("click",(e)=>{
if(e.target.id==="playerModal"){
e.target.classList.add("hidden");
}
});

/* ===============================
   MCTIERS LIVE SEARCH FILTER
================================ */

const searchInput=document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const query=searchInput.value.toLowerCase();

const players=document.querySelectorAll(".player");

players.forEach(player=>{

const name=player.querySelector("h3")
.textContent.toLowerCase();

player.style.display=
name.includes(query) ? "flex" : "none";

});

});

}

});
