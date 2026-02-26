// ===============================
// GAMEMODE ICONS
// ===============================

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
function createTierBadges(player){

    let html = "";

    for(const gm in player.gamemodes){

        const tier = player.gamemodes[gm].tier;

        html += `<span class="tier ${tier}">${tier}</span>`;
    }

    return html;
}
fetch("player_points.json")
.then(res => res.json())
.then(data => {

    const container = document.getElementById("leaderboard");

    const players = Object.values(data);

    // sort leaderboard
    players.sort((a,b)=>b.total_points-a.total_points);

    players.forEach((player,index)=>{

        const row = document.createElement("div");
        row.className = "player";

        // =====================
        // GAMEMODE BADGES
        // =====================
        let tiersHTML = "";

        for(const gm in player.gamemodes){
            const tier = player.gamemodes[gm].tier;

            tiersHTML +=
                `<span class="tier ${tier}">
                    ${tier}
                 </span>`;
        }

        row.innerHTML = `
            <div class="rank">${index+1}.</div>

            <img class="skin"
            src="https://render.crafty.gg/3d/bust/${player.mc_username}">

            <div class="info">
                <h3>
                <a href="player.html?user=${player.mc_username}">
                    ${player.mc_username}
                </a>
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
