console.log('cf extension loaded')

let rankList = []
let organizationRankList = []
let countryRankList = []

let id = location.href.split('/')[4]

async function getContestantHandles(contestId) {
    let response = await fetch('https://codeforces.com/api/contest.standings?contestId=' + contestId);
    return await response.json();
}

getContestantHandles(id).then(data => {
    data.result.rows.forEach(element => {
        rankList[element.party.members[0].handle] = element.rank
    });
    getOrganizationsAndCountry()
});

function generateRankList(data, org = 1) {
    let curRankList = []
    for (let handle in data) {
        let org = data[handle]
        if (org && rankList[handle]) {
            if (!curRankList[org]) curRankList[org] = []
            curRankList[org].push([rankList[handle], handle])
        }
    }

    for (let key in curRankList) {
        let userList = curRankList[key].sort(function (a, b) {
            return a[0] - b[0];
        });
        let idx = 0
        userList.forEach(data => {
            if(org) organizationRankList[data[1]] = ++idx
            else countryRankList[data[1]] = ++idx
        });
    }
}

function addHeader(title) {
    let th = document.createElement("th")
    th.className = 'top'
    th.style = 'width:2em;'
    th.innerText = title + ' #'
    document.getElementsByClassName('standings')[0].rows[0].insertBefore(th, document.getElementsByClassName('standings')[0].rows[0].getElementsByTagName('th')[1])
}

async function updateUI(data) {
    addHeader("Organization")
    addHeader("Country")

    let userHandle;
    for (let row of document.getElementsByClassName('standings')[0].rows) {
        if (!row.getElementsByTagName('td')[1]) continue;

        userHandle = row.getElementsByTagName('td')[1].innerText.toString()

        const cell = document.createElement("td");
        cell.className = row.getElementsByTagName('td')[1].className

        const cell2 = document.createElement("td");
        cell2.className = row.getElementsByTagName('td')[1].className

        row.insertBefore(cell, row.getElementsByTagName('td')[1]);
        row.insertBefore(cell2, row.getElementsByTagName('td')[1]);

        let rank = organizationRankList[userHandle.trim()]
        if (rank === undefined) rank = "?"
        else rank += " ( " + data[userHandle.trim()] + " )"
        cell.innerText = rank

        rank = countryRankList[userHandle.trim()]
        if (rank === undefined) rank = "?"
        cell2.innerText = rank
    }
}

async function getOrganizationsAndCountry() {
    let url = 'https://cf-api.vercel.app/api?contest=' + id
    let response = await fetch(url);
    let orgData = await response.json()
    await generateRankList(orgData)
    url = 'https://cf-api.vercel.app/api?contest=' + id + '&country=1'
    response = await fetch(url);
    let countryData = await response.json()
    await generateRankList(countryData, 0)
    await updateUI(orgData)
}