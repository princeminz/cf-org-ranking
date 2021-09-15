console.log('cf extension loaded')

let rankList = []
let organizationRankList = []

let id = location.href.split('/')[4]

async function getContestantHandles(contestId) {
    let response = await fetch('https://codeforces.com/api/contest.standings?contestId=' + contestId);
    return await response.json();
}

getContestantHandles(id).then(data => {
    data.result.rows.forEach(element => {
        rankList[element.party.members[0].handle] = element.rank
    });
    getOrganizations()
});

function retrieveDataFromStorage(data) {
    let organizationWiseRankList = []
    for (let handle in data) {
        let org = data[handle]
        if (org && rankList[handle]) {
            if (!organizationWiseRankList[org]) organizationWiseRankList[org] = []
            organizationWiseRankList[org].push([rankList[handle], handle])
        }
    }

    for (let key in organizationWiseRankList) {
        let userList = organizationWiseRankList[key].sort(function (a, b) {
            return a[0] - b[0];
        });
        let idx = 0
        userList.forEach(data => {
            organizationRankList[data[1]] = ++idx
        });
    }
}

async function updateUI() {
    let th = document.createElement("th")
    th.className = 'top'
    th.style = 'width:2em;'
    th.innerText = 'Organization #'
    document.getElementsByClassName('standings')[0].rows[0].insertBefore(th, document.getElementsByClassName('standings')[0].rows[0].getElementsByTagName('th')[1])

    let userHandle;
    for (let row of document.getElementsByClassName('standings')[0].rows) {
        if (!row.getElementsByTagName('td')[1]) continue;
        const cell = document.createElement("td");
        cell.className = row.getElementsByTagName('td')[1].className
        userHandle = row.getElementsByTagName('td')[1].innerText.toString()
        row.insertBefore(cell, row.getElementsByTagName('td')[1]);
        let rank = organizationRankList[userHandle.trim()]
        if (rank === undefined) rank = "?"
        cell.innerText = rank
    }
}

async function getOrganizations() {
    let url = 'https://cf-api.vercel.app/api'
    let response = await fetch(url);
    let data = await response.json()
    await retrieveDataFromStorage(data)
    await updateUI()
}