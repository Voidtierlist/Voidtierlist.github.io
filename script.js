fetch("player_points.json")
.then(res => res.json())
.then(data => {

    const players = Object.values(data);

    // sort by points
    players.sort((a,b)=> b.total_points - a.total_points);

    const board = document.getElementById("leaderboard");

    players.forEach((p,index)=>{

        const skin =
        `https://mc-heads.net/avatar/${p.mc_username}/100`;

        const div = document.createElement("div");
        div.className = "player";

        div.innerHTML = `
            <div class="rank">#${index+1}</div>

            <img src="${skin}">

            <div>
                <h2>${p.mc_username}</h2>
                <p>Points: ${p.total_points}</p>
            </div>
        `;

        board.appendChild(div);
    });

});
