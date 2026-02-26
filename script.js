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

/* ===========================
   LOAD PLAYERS
=========================== */

fetch("player_points.json")
.then(res=>res.json())
.then(data=>{

    const container = document.getElementById("leaderboard");

    const players = Object.values(data)
        .sort((a,b)=>b.total_points-a.total_points);

    allPlayersData = players;

    players.forEach((player,index)=>{

        const row = document.createElement("div");
        row.className="player";

        row.innerHTML=`
            <div class="rank">${index+1}.</div>

            <img class="skin"
            src="https://render.crafty.gg/3d/bust/${player.mc_username}">

            <div class="info">
                <h3>${player.mc_username}</h3>
                <p>${player.total_points} Points</p>
            </div>

            <div class="region">${player.region}</div>
        `;

        /* CLICK WHOLE CARD */
        row.addEventListener("click",()=>{
            openPlayerModal(player);
        });

        container.appendChild(row);
    });

});

/* ===========================
   OPEN MODAL
=========================== */

function openPlayerModal(player){

    const modal=document.getElementById("playerModal");

    modal.classList.remove("hidden");

    document.getElementById("modal-name").textContent=
        player.mc_username;

    document.getElementById("modal-region").textContent=
        player.region;

    document.getElementById("modal-skin").src=
        `https://render.crafty.gg/3d/bust/${player.mc_username}`;

    /* POSITION */
    const position =
        allPlayersData.findIndex(
            p=>p.mc_username===player.mc_username
        )+1;

    document.getElementById("modal-position").textContent=
        `#${position} Overall (${player.total_points} points)`;


    /* TIERS */
    let tiersHTML="";

    for(const gm in player.gamemodes){

        const data=player.gamemodes[gm];

        const key=gm.toLowerCase().replace(/\s/g,"");

        const icon=GAMEMODE_ICONS[key];

        if(!icon) continue;

        tiersHTML+=`
        <div class="tier-item">
            <img src="${icon}">
            <span>${data.tier}</span>
        </div>
        `;
    }

    document.getElementById("modal-tiers").innerHTML=tiersHTML;
}

/* ===========================
   CLOSE MODAL
=========================== */

document.getElementById("closeModal")
.addEventListener("click",()=>{
    document
        .getElementById("playerModal")
        .classList.add("hidden");
});

/* CLICK OUTSIDE TO CLOSE */

document.getElementById("playerModal")
.addEventListener("click",(e)=>{
    if(e.target.id==="playerModal"){
        e.target.classList.add("hidden");
    }
});
