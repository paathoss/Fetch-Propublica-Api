var url = "https://api.propublica.org/congress/v1/113/house/members.json";

if (document.title.includes("Senate")) {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}

const key = {
    method: 'GET',
    datatype: 'json',
    headers: {
        'X-API-Key': 'zW2i3pVYMhdHCxvI51kEY8xjJwcSEN5Kkw1EC1sW'
    }
}
fetch(url, key)
    .then(response => response.json())
    .then(data => {  

        app.senators = data.results[0].members;
       
        if (document.getElementById("app") != undefined) {
            tablaInicio(app.senators)
            tablaOrdenada(app.senators)
        }

        if (data) {
            hideLoader();
        }
        if (data) {
            hideLoader2();
        }
    })

var app = new Vue({
    el: '#app',
    data: {
        senators: [],
        checkbox: [],
        stateSelected: "",
        statistics: {


            numberD: [],
            numberR: [],
            numberID: [],
            numberTotal: [],

            votesPerD: [],
            votesPerR: [],
            votesPerID: [],
            votesPerTotal: [],

            topLoyalS: [],
            leastLoyalS: [],

            topAttS: [],
            leastAttS: [],
        }
    },
    methods: {
        filter(member) {
            return this.checkbox.includes(member)
        },
    }
});


function tablaOrdenada(cualquiera) {

    var porcentajeLimpio = [];

    cualquiera.forEach(member => {
        if (member.votes_with_party_pct > 0) {
            porcentajeLimpio.push(member);
        }

    });

    var porcentaje = Math.round((cualquiera.length) * 0.1);

    var topLoyal = porcentajeLimpio.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct).slice(0, porcentaje - 1);
    var leastLoyal = cualquiera.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct).slice(0, porcentaje - 1);

    var topAtt = cualquiera.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct).slice(0, porcentaje - 1);
    var leastAtt = cualquiera.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct).slice(0, porcentaje - 1);


    app.statistics.topLoyalS = topLoyal;
    app.statistics.leastLoyalS = leastLoyal;

    app.statistics.topAttS = topAtt;
    app.statistics.leastAttS = leastAtt;
}


function tablaInicio(num) {

    sumaD = 0;
    sumaR = 0;
    sumaID = 0;
    suma = 0;
    votesPercentD = [];
    votesPercentR = [];
    votesPercentID = [];
    votesPercentTotal = [];

    numberDem = [];

    num.forEach(proeba => {
        if (proeba.party === "D") {
            votesPercentD.push(proeba.votes_with_party_pct);
        }
    });

    for (let i = 0; i < votesPercentD.length; i++) {
        vp = votesPercentD[i];
        sumaD += vp;
    }
    app.statistics.votesPerD.push(Math.round(sumaD / votesPercentD.length)).toFixed(2)



    num.forEach(proeba => {
        if (proeba.party === "R") {
            votesPercentR.push(proeba.votes_with_party_pct);
        }
    });

    for (let i = 0; i < votesPercentR.length; i++) {
        vp = votesPercentR[i];
        sumaR += vp;
    }
    app.statistics.votesPerR.push(Math.round(sumaR / votesPercentR.length)).toFixed(2)



    num.forEach(proeba => {
        if (proeba.party === "ID") {
            votesPercentID.push(proeba.votes_with_party_pct);
        }
    });

    for (let i = 0; i < votesPercentID.length; i++) {
        vp = votesPercentID[i];
        sumaID += vp;
    }
    app.statistics.votesPerID.push(Math.round(sumaID / votesPercentID.length))



    num.forEach(proeba => {
        if (proeba.party) {
            votesPercentTotal.push(proeba.votes_with_party_pct);
        }
    });

    for (let i = 0; i < votesPercentTotal.length; i++) {
        vp = votesPercentTotal[i];
        suma += vp;
    }
    app.statistics.votesPerTotal.push(Math.round(suma / votesPercentTotal.length))


    app.statistics.numberD = votesPercentD.length
    app.statistics.numberR = votesPercentR.length
    app.statistics.numberID = votesPercentID.length
    app.statistics.numberTotal = votesPercentTotal.length
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loader2').style.display = 'none';
    document.getElementById('loader3').style.display = 'none';
}
function hideLoader2() {
    document.getElementById('loader3').style.display = 'none';
}