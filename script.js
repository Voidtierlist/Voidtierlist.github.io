document.addEventListener("DOMContentLoaded",()=>{

let allPlayersData=[];

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

/* LOAD PLAYERS */

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

if(player.gamemodes){
for(const gm in player.gamemodes){

const gmData=player.gamemodes[gm];
const key=normalizeGamemode(gm);
const icon=GAMEMODE_ICONS[key];

if(!icon) continue;

tiersHTML+=`
<div class="tier-circle">
    <div class="tier-bubble">
        <img src="${icon}">
    </div>
    <div class="tier-label">${gmData.tier}</div>
</div>`;
}
}

const row=document.createElement("div");
row.className="player";

row.innerHTML=`
<div class="rank">${index+1}</div>

<img class="skin"
src="https://render.crafty.gg/3d/bust/${player.mc_username}">

<div class="info">
<h3>${player.mc_username}</h3>
<p>${player.total_points} Points</p>
<div class="tiers">${tiersHTML}</div>
</div>

<div class="region">${player.region}</div>
`;

row.onclick=()=>openPlayerModal(player);

container.appendChild(row);

});

});

/* MODAL */

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

let tiersHTML="";

for(const gm in player.gamemodes){

const gmData=player.gamemodes[gm];
const key=normalizeGamemode(gm);
const icon=GAMEMODE_ICONS[key];

if(!icon) continue;

tiersHTML+=`
<div class="tier-circle">
<div class="tier-bubble">
<img src="${icon}">
</div>
<div class="tier-label">${gmData.tier}</div>
</div>`;
}

document.getElementById("modal-tiers").innerHTML=tiersHTML;
}

/* CLOSE MODAL */

document.getElementById("closeModal")
.onclick=()=>{
document.getElementById("playerModal")
.classList.remove("show");
};

document.getElementById("playerModal")
.onclick=(e)=>{
if(e.target.id==="playerModal")
e.target.classList.remove("show");
};

});
