// ===============================
// GAMEMODE ICONS
// ===============================

const GAMEMODE_ICONS = {
    smp: "https://mctiers.com/tier_icons/smp.svg",
    sword: "https://mctiers.com/tier_icons/sword.svg",
    nethpot: "https://mctiers.com/tier_icons/nethop.svg",
    mace: "https://mctiers.com/tier_icons/mace.svg",
    diamondpot: "https://mctiers.com/tier_icons/pot.svg",
    crystal: "https://mctiers.com/tier_icons/vanilla.svg",
    uhc: "https://mctiers.com/tier_icons/uhc.svg",
    axe: "https://mctiers.com/tier_icons/axe.svg",
    diasmp: "https://subtiers.net/assets/dia_smp-523efa38.svg"
};

fetch("player_points.json")
.then(res => res.json())
.then(data => {

    const container = document.getElementById("leaderboard");
    container.innerHTML = "";

    const players = Object.values(data);

    // sort leaderboard
    players.sort((a,b)=>b.total_points-a.total_points);

    players.forEach((player,index)=>{

        const row = document.createElement("div");
        row.className = "player";
        row.addEventListener("click", () => openPlayerModal(player));

        let tiersHTML = "";

        for(const gm in player.gamemodes){

            const tier = player.gamemodes[gm].tier;

            const key = gm.toLowerCase().replace(/\s/g,"");

            const icon = GAMEMODE_ICONS[key];

            if(!icon) continue;

            tiersHTML += `
                <div class="tier-icon" title="${gm} ${tier}">
                    <img src="${icon}">
                    <span>${tier}</span>
                </div>
            `;
        }

        row.innerHTML = `
            <div class="rank">${index+1}.</div>

            <img class="skin"
            src="https://render.crafty.gg/3d/bust/${player.mc_username}">

            <div class="info">
                 <h3 class="player-name">
                     ${player.mc_username}
                 </h3>
            
                <p>${player.total_points} Points</p>
            </div>

            <div class="region">${player.region}</div>

            <div class="tiers">
                ${tiersHTML}
            </div>
        `;

        container.appendChild(row);
    });

});
const modal = document.getElementById("playerModal");

function openPlayerModal(player){

    modal.style.display = "flex";

    document.getElementById("modalName").textContent =
        player.mc_username;

    document.getElementById("modalRegion").textContent =
        "Region: " + player.region;

    document.getElementById("modalPoints").textContent =
        "Points: " + player.total_points;

    const skin = document.getElementById("modalSkin");

    skin.src =
        `https://render.crafty.gg/3d/bust/${player.mc_username}`;

    skin.onerror = function(){
        this.src =
        `https://mc-heads.net/body/${player.mc_username}/100`;
    };

    /* TIERS */
    const tierBox = document.getElementById("modalTiers");
    tierBox.innerHTML = "";

    for(const gm in player.gamemodes){

        const key = gm.toLowerCase().replace(/\s/g,"");
        const icon = GAMEMODE_ICONS[key];

        if(!icon) continue;

        tierBox.innerHTML += `
            <div class="tier-icon">
                <img src="${icon}" title="${gm}">
            </div>
        `;
    }
}

/* CLOSE */
document.getElementById("closeModal").onclick = () =>
    modal.style.display = "none";

window.onclick = (e)=>{
    if(e.target === modal)
        modal.style.display = "none";
};
