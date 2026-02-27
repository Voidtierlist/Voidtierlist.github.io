document.addEventListener("DOMContentLoaded", () => {

let allPlayersData = [];

/* ===========================
   GAMEMODE ICONS
=========================== */

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

/* NORMALIZE GAMEMODE */
function normalizeGamemode(name){
    return name.toLowerCase().replace(/[^a-z]/g,"");
}

/* ===========================
   LOAD PLAYERS
=========================== */

fetch("player_points.json")
.then(res => res.json())
.then(data => {

    const container = document.getElementById("leaderboard");
    container.innerHTML = "";

    const players =
        Object.values(data)
        .sort((a,b)=>b.total_points-a.total_points);

    allPlayersData = players;

    players.forEach((player,index)=>{

        const row=document.createElement("div");
        row.className="player";

       row.innerHTML=`
       <div class="rank">${index+1}</div>

       <img class="skin"
       src="https://render.crafty.gg/3d/bust/${player.mc_username}">

       <div class="info">
           <h3>${player.mc_username}</h3>
           <p>${player.total_points} Points</p>

           <div class="tiers">
               ${createTierBadges(player)}
           </div>
       </div>

       <div class="region">${player.region || "NA"}</div>
       `;



        row.addEventListener("click",()=>{
            openPlayerModal(player);
        });

        container.appendChild(row);
    });
});


/* ===========================
   OPEN PLAYER MODAL
=========================== */

function openPlayerModal(player){

    const modal=document.getElementById("playerModal");
    modal.style.display="flex";

    document.getElementById("modal-name").textContent =
        player.mc_username;

    document.getElementById("modal-region").textContent =
        player.region || "NA";

    document.getElementById("modal-skin").src =
        `https://render.crafty.gg/3d/bust/${player.mc_username}`;

    const position =
        allPlayersData.findIndex(
            p=>p.mc_username===player.mc_username
        )+1;

    document.getElementById("modal-position").textContent =
        `#${position} Overall (${player.total_points} points)`;


    const tiersDiv =
        document.getElementById("modal-tiers");

    tiersDiv.innerHTML="";

    if(!player.gamemodes) return;

    for(const gm in player.gamemodes){

        const gmData=player.gamemodes[gm];

        const key=normalizeGamemode(gm);
        const icon=GAMEMODE_ICONS[key];

        if(!icon || !gmData.tier) continue;

        tiersDiv.innerHTML+=`
        <div class="tier-item">
            <img src="${icon}">
            <span>${gmData.tier}</span>
        </div>`;
    }
}


/* ===========================
   CLOSE MODAL
=========================== */

document.getElementById("closeModal")
.addEventListener("click",()=>{
    document.getElementById("playerModal").style.display="none";
});


document.getElementById("playerModal")
.addEventListener("click",(e)=>{
    if(e.target.id==="playerModal"){
        e.target.style.display="none";
    }
});

});
