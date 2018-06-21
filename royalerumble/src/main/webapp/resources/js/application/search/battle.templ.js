var battleLogTempl = {
    battleLog: function (data) {
        var templ = '';
        var prevResult = '';
        var winCount = 0, loseCount = 0, drawCount = 0;
        var svCount = 0, sdCount = 0;
        var svMax = [], sdMax = [];
        var summaryTopTempl = '';
        var summaryBottomTempl = '';
        for (var i = 0; i < data.length; i++) {
            var teamPlayer = '', teamMember = '', opponent1 = '', opponent2 = '';
            var winner = '', pannelColor = '';
            var clanName = '', clanBadge = '';

            if (data[i].winner > 0) {
                winner = '<span style="color:dodgerblue">승</span>'
                pannelColor = 'blue'
                winCount++;
                svCount++;
                sdCount = 0;
                if (prevResult === 'win') {
                    svMax.push(svCount);
                }
                prevResult = 'win';
            } else if (data[i].winner == 0) {
                winner = '<span style="color:gray">무</span>'
                prevResult = 'draw';
                drawCount++;
                svCount = 0;
                sdCount = 0;
            } else {
                winner = '<span style="color:red">패</span>'
                pannelColor = 'red'
                loseCount++;
                sdCount++;
                svCount = 0;
                if (prevResult === 'lose') {
                    sdMax.push(sdCount);
                }
                prevResult = 'lose';
            }
            //편법...화면정렬 너무어려워서 ....나눠서붙임
            if(i < 10) {
                summaryTopTempl += `
                <td class="_battle_${pannelColor}" style="border: #DDDDDD solid 1px; width: 35px; height: 35px;">
                    ${winner}
                </td>`
            } else {
                summaryBottomTempl += `
                <td class="_battle_${pannelColor}" style="border: #DDDDDD solid 1px; width: 35px; height: 35px;">
                    ${winner}
                </td>`
            }

            if (data[i].teamSize == 2) {
                for (var j = 0; j < data[i].team.length; j++) {
                    if (opt.keyword === data[i].team[j].tag) {
                        var card = '';
                        for (var k = 0; k < data[i].team[j].deck.length; k++) {
                            card += `
                                <div class="_battle_card" style="float:left; margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].team[j].deck[k].key}.png')">
                                    <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].team[j].deck[k].elixir}</div>
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:15px;">Lv.${data[i].team[j].deck[k].level}</div>
                                    </div>
                                </div>`
                        }
                        if (!(data[i].team[j].clan === null)) {
                            clanName = data[i].team[j].clan.name;
                            clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].team[j].clan.badge.name}.png" style="height: 13px;">`
                        }
                        teamPlayer = `
                        <div class="_battle_inner" style="width:300px; height:100px;">
                            <div style="width: 160px; height:100px;float:left">
                                ${card}
                            </div>
                            <div style="width:130px; height:100px; margin-top:4px; float: left; padding-left: 10px">
                                <a>
                                    <span class="font-weight-bold">
                                        ${data[i].team[j].name}
                                    </span>
                                </a>
                                <a>
                                    <p style="font-size: 13px">
                                        ${clanBadge}
                                        ${clanName}
                                    </p>
                                </a>
                            </div>
                        </div>`
                    } else {
                        var card = '';
                        var clanName = '<br>';
                        var clanBadge = '';
                        for (var k = 0; k < data[i].team[j].deck.length; k++) {
                            card += `
                                <div class="_battle_card" style="float:left; margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].team[j].deck[k].key}.png')">
                                    <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].team[j].deck[k].elixir}</div>
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:15px;">Lv.${data[i].team[j].deck[k].level}</div>
                                    </div>
                                </div>`
                        }
                        if (!(data[i].team[j].clan === null)) {
                            clanName = data[i].team[j].clan.name;
                            clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].team[j].clan.badge.name}.png" style="height: 13px;">`
                        }
                        teamMember = `
                        <div class="_battle_inner" style="width:300px; height:100px; margin-top: 10px">
                            <div style="width: 160px; height:100px;float:left">
                                ${card}
                            </div>
                            <div style="width:130px; height:100px; margin-top:4px; float: left; padding-left: 10px">
                                <a>
                                    <span class="font-weight-bold">
                                        ${data[i].team[j].name}
                                    </span>
                                </a>
                                <a>
                                    <p style="font-size: 13px">
                                        ${clanBadge}
                                        ${clanName}
                                    </p>
                                </a>
                            </div>
                        </div>`
                    }
                }

                for (var j = 0; j < data[i].opponent.length; j++) {
                    if (j == 0) {
                        var card = '';
                        var clanName = '<br>';
                        var clanBadge = '';
                        for (var k = 0; k < data[i].opponent[j].deck.length; k++) {
                            card += `
                                <div class="_battle_card" style="float: right;  margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].opponent[j].deck[k].key}.png')">
                                    <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].opponent[j].deck[k].elixir}</div>
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; top:15px;">Lv.${data[i].opponent[j].deck[k].level}</div>
                                    </div>
                                </div> 
                            `
                        }
                        if (!(data[i].opponent[j].clan === null)) {
                            clanName = data[i].opponent[j].clan.name;
                            clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].opponent[j].clan.badge.name}.png" style="height: 13px;">`
                        }
                        opponent1 = `
                            <div class="_battle_inner" style="width:300px; height:100px; float: right;">
                                <div style="width:130px; height:100px; margin-top:4px; float: left; text-align: right">
                                    <a>
                                        <span class="font-weight-bold">
                                            ${data[i].opponent[j].name}
                                        </span>
                                    </a>
                                    <a>
                                        <p style="font-size: 13px">
                                            ${clanBadge}
                                            ${clanName}
                                        </p>
                                    </a>
                                </div>
                                <div style="width: 170px; height:100px;float:left">
                                    ${card}
                                </div>
                            </div>`
                    } else {
                        var card = '';
                        var clanName = '<br>';
                        var clanBadge = '';
                        for (var k = 0; k < data[i].opponent[j].deck.length; k++) {
                            card += `
                            <div class="_battle_card" style="float: right;  margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].opponent[j].deck[k].key}.png')">
                                <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                    <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].opponent[j].deck[k].elixir}</div>
                                    <div class="ml-2 _app_font position-relative" style="font-size: 10px; top:15px;">Lv.${data[i].opponent[j].deck[k].level}</div>
                                </div>
                            </div>                       
                            `
                        }
                        if (!(data[i].opponent[j].clan === null)) {
                            clanName = data[i].opponent[j].clan.name;
                            clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].opponent[j].clan.badge.name}.png" style="height: 13px;">`
                        }
                        opponent2 = `
                        <div class="_battle_inner" style="width:300px; height:100px; margin-top: 10px; float: right;">
                            <div style="width:130px; height:100px; margin-top:4px; float: left; text-align: right">
                                <a>
                                    <span class="font-weight-bold">
                                        ${data[i].opponent[j].name}
                                    </span>
                                </a>
                                <a>
                                    <p style="font-size: 13px">
                                        ${clanBadge}
                                        ${clanName}
                                    </p>
                                </a>
                            </div>
                            <div style="width: 170px; height:100px;float:left; ">
                                ${card}
                            </div>
                        </div>`
                    }
                }

                templ += `
                <li class="list-group-item mt-2 z-depth-1 _battle_log_team _battle_${pannelColor}">
                    <div class="_battle_wrapper" style="width:300px; height:230px; float:left">
                        ${teamPlayer}
                        <div style="width:250px; height:1px; background-color: #DDDDDD; margin-top:14px">
                        </div>
                        ${teamMember}
                    </div>
                    <div class="_battle_info" style="width:80px; height:100px; float:left; margin-top:75px">
                        <div class="pt-3 text-center" style="width:80px; height: 35px;">
                            <span class="_app_font mr-2" style="font-size: 18px; width:14px; display:inline-block">${data[i].teamCrowns}</span>
                            <img class="position-relative" src="resources/image/icon/attack.png" style="top:-4px; height: 18px;">
                            <span class="_app_font ml-2" style="font-size: 18px; width:14px; display:inline-block">${data[i].opponentCrowns}</span>
                        </div>
                        <div class="font-weight-bold text-center" style="font-size: 16px">
                            ${data[i].type}
                        </div>
                        <div class="font-weight-bold text-center" style="font-size: 15px">
                            ${winner}
                        </div>
                    </div>
                    <div class="_battle_wrapper" style="width:300px; height:230px; float:left">
                        ${opponent1}
                        <div style="width:250px; height:1px; background-color: #DDDDDD; margin-top: 14px; float: right;">
                        </div>
                        ${opponent2}
                    </div>
                </li>`
                //팀전이 아닐경우
            } else {
                var team = '', opponent = '';
                for (var j = 0; j < data[i].team.length; j++) {
                    var card = '';
                    var clanName = '<br>';
                    var clanBadge = '';
                    var trophyChange = ''
                    for (var k = 0; k < data[i].team[j].deck.length; k++) {
                        card += `
                        <div class="_battle_card" style="float:left;  margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].team[j].deck[k].key}.png')">
                            <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].team[j].deck[k].elixir}</div>
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:15px;">Lv.${data[i].team[j].deck[k].level}</div>
                            </div>
                        </div>`

                    }
                    if (!(data[i].team[j].clan === null)) {
                        clanName = data[i].team[j].clan.name;
                        clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].team[j].clan.badge.name}.png" style="height: 13px;">`
                    }
                    if (!(data[i].team[j].trophyChange === undefined)) {
                        if (data[i].team[j].trophyChange > 0) {
                            trophyChange = `<span style="color:dodgerblue">+${data[i].team[j].trophyChange}</span>`
                        } else {
                            trophyChange = `<span style="color:red">${data[i].team[j].trophyChange}</span>`
                        }

                    }
                    team = `
                        <div class="_battle_inner"style="width:300px; height:110px; float:left">
                            <div style="width: 160px; height:100px;float:left">
                                ${card}
                            </div>
                            <div style="width:130px; height:100px; margin-top:4px; float: left; padding-left: 10px">
                                <a>
                                    <span class="font-weight-bold">
                                        ${data[i].team[j].name}
                                    </span>
                                </a>
                                <a>
                                    <p style="font-size: 13px">
                                        ${clanBadge}
                                        ${clanName}
                                    </p>
                                </a>
                                <div class="mt-4">
                                    <img src="${opt.context}resources/image/icon/trofe.png" style="height: 12px;">
                                    <span class="_app_font" style="font-size: 12px">
                                        ${data[i].team[j].startTrophies}
                                    </span>
                                    <span class="_battle_font" style="font-size: 12px;">
                                        ${trophyChange}
                                    </span>
                                </div>
                            </div>
                        </div>`
                }

                for (var j = 0; j < data[i].opponent.length; j++) {
                    var card = '';
                    var clanName = '<br>';
                    var clanBadge = '';
                    for (var k = 0; k < data[i].opponent[j].deck.length; k++) {
                        card += `
                        <div class="_battle_card" style="float: right; margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].opponent[j].deck[k].key}.png')">
                            <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].opponent[j].deck[k].elixir}</div>
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; top:15px;">Lv.${data[i].opponent[j].deck[k].level}</div>
                            </div>
                        </div>`

                    }
                    if (!(data[i].opponent[j].clan === null)) {
                        clanName = data[i].opponent[j].clan.name;
                        clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].opponent[j].clan.badge.name}.png" style="height: 13px;">`
                    }
                    opponent = `
                    <div class="_battle_inner" style="width:300px; height:110px; float: left">
                        <div style="width:130px; height:100px; margin-top:4px; float: left; text-align: right">
                            <a>
                                <span class="font-weight-bold">
                                    ${data[i].opponent[j].name}
                                </span>
                            </a>
                            <a>
                                <p style="font-size: 13px">
                                    ${clanBadge}
                                    ${clanName}
                                </p>
                            </a>
                            <div class="mt-4">
                                <img src="${opt.context}resources/image/icon/trofe.png" style="height: 12px;">
                                <span class="_app_font" style="font-size: 12px">
                                    ${data[i].opponent[j].startTrophies}
                                </span>
                            </div>
                        </div>
                        <div style="width: 170px; height:100px;float:left">
                            ${card}
                        </div>
                    </div>
                    `
                }


                templ += `
                <li class="list-group-item mt-2 z-depth-1 _battle_log _battle_${pannelColor}">
                    ${team}
                    <div class="_battle_info" style="width:80px; height:100px; float:left; padding-top: 10px">
                        
                            <div class="pt-3 text-center" style="height: 35px">                  
                                <span class="_app_font mr-2" style="font-size: 18px width:14px; display:inline-block">${data[i].teamCrowns}</span>
                                <img class="position-relative" src="${opt.context}resources/image/icon/attack.png" style="top:-4px; height: 20px;">
                                <span class="_app_font ml-2" style="font-size: 18px width:14px; display:inline-block">${data[i].opponentCrowns}</span>  
                            </div>
                            <div class="font-weight-bold text-center" style="font-size: 16px">
                                ${data[i].type}
                            </div>
                            <div class="font-weight-bold text-center" style="font-size: 15px">
                                ${winner}
                            </div>
                        
                    </div>
                    ${opponent}     
                </li>`
            }
        }
        //summary 만들기
        var battleSummaryId = document.getElementById('battleSummary');
        function resultMax(array) {
            var max = 0;
            for (var i = 0; i < array.length; i++) {
                if (array[i] > max) {
                    max = array[i];
                }
            }
            return max;
        }

        var summaryTempl = `
            <div class="row">
                <canvas id="doughnutChart" style="max-width: 230px;"></canvas>
                <div class="position-relative text-center" style="left:-30px; top:25px">
                    <span class="font-weight-bold">최근 20경기 전적</span>
                    <br>
                    <span style="color:dodgerblue">${winCount}승</span>
                    <span> / </span>
                    <span style="color:gray">${drawCount}무</span>
                    <span> / </span>
                    <span style="color:red">${loseCount}패</span>
                    <br>
                    <span style="font-size:13px; color:dodgerblue">최다연승 : ${resultMax(svMax)}</span>
                    <span style="font-size:13px; color:red">최다연패 : ${resultMax(sdMax)}</span>
                </div>
                <table class="mt-3">
                    <tbody>
                        <tr class="text-center" id="summaryTop">
                        </tr>
                        <tr style="height: 10px;">
                        </tr>
                        <tr class="text-center" id="summaryBottom">
                        </tr>                            
                    </tbody>
                </table>
                </div>
            </div>`
        battleSummaryId.innerHTML = summaryTempl;

        var summaryTopId = document.getElementById('summaryTop');
        var summaryBottomId = document.getElementById('summaryBottom');

        summaryTopId.innerHTML = summaryTopTempl;
        summaryBottomId.innerHTML = summaryBottomTempl;

        var ctxD = document.getElementById("doughnutChart").getContext('2d');

        Chart.defaults.global.legend.display = false;

        var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels:["승","무","패"],
                datasets: [
                    {
                        data: [winCount, drawCount, loseCount],
                        backgroundColor: ["dodgerblue", "gray", "red"],
                    }
                ]
            },
            options: {
                responsive: true,
            }
        });

        return templ;
    }
};