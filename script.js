let ALL_PLAYERS = [];
let currentMode = "all";

fetch("player_points.json")
.then(r=>r.json())
.then(data=>{

    ALL_PLAYERS = Object.values(data);
    render();
});

function filterMode(mode){
    currentMode = mode;
    render();
}

function render(){

    const board = document.getElementById("leaderboard");
    board.innerHTML="";

    let players=[...ALL_PLAYERS];

    players.sort((a,b)=>b.total_points-a.total_points);

    players.forEach((p,index)=>{

        Object.entries(p.gamemodes).forEach(([mode,info])=>{

            if(currentMode!="all" && mode!=currentMode) return;

            const skin=`https://mc-heads.net/avatar/${p.mc_username}/100`;

            const div=document.createElement("div");
            div.className="player";

            div.innerHTML=`
            <div class="rank">#${index+1}</div>

            <img src="${skin}">

            <div class="info">
                <h3>${p.mc_username}</h3>
                <p>${mode.toUpperCase()}</p>
            </div>

            <div class="tier ${info.tier}">
                ${info.tier}
            </div>

            <div>
                ${info.points} pts
            </div>
            `;

            board.appendChild(div);
        });
    });
}
