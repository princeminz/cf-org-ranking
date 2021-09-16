console.log('cf extension loaded');
const orgstandings = document.createElement("li");
const anchornode = document.createElement("a");
anchornode.href = "#"
const textnode = document.createTextNode("Country and organization standings");
anchornode.appendChild(textnode)
orgstandings.appendChild(anchornode)
var parent = document.querySelector("ul.second-level-menu-list")


orgstandings.addEventListener('click', () => {
    console.log("clicked")
    document.getElementsByClassName('contest-status')[0].innerText = 'Country and organization standings'
    const label = document.createElement("label")
    label.htmlFor = "org-filter"
    const labeltext = document.createTextNode("Select Organization")
    label.appendChild(labeltext)
    label.style.marginRight = "5px";
    const dropdown = document.createElement("select")
    dropdown.id = "org-filter"

    for( let el in organizationWiseRankList){
        const orgoption = document.createElement("option")
        orgoption.value = el
        const optiontext = document.createTextNode(el)
        orgoption.appendChild(optiontext)
        dropdown.appendChild(orgoption)
    }
    
    const standingsTable = document.querySelector("table.standings")
    Array.prototype.slice.call(standingsTable.getElementsByTagName('th'), 4).forEach( ele => ele.remove())
    const dark = standingsTable.getElementsByTagName('tr')[1]
    Array.prototype.slice.call(dark.getElementsByTagName('td'), 4).forEach( ele => ele.remove())
    const light = standingsTable.getElementsByTagName('tr')[2]
    Array.prototype.slice.call(light.getElementsByTagName('td'), 4).forEach( ele => ele.remove())
    const tbody = standingsTable.getElementsByTagName('tbody')[0]
    Array.prototype.slice.call(tbody.children, 1).forEach( ele => ele.remove())
    
    document.querySelector("#pageContent").insertBefore(label, document.querySelector("#pageContent > div.datatable"))
    document.querySelector("#pageContent").insertBefore(dropdown, document.querySelector("#pageContent > div.datatable"))

    const renderTable = () => {
        const currentOrg = dropdown.options[ dropdown.selectedIndex ].value
        let handles = organizationWiseRankList[currentOrg]
        for(let i=0; i<handles.length; ++i){
            const who = handles[i][1]
            let row
            if(i&1){
                row = light.cloneNode(true)
            } else {
                row = dark.cloneNode(true)
            }
            row.getElementsByTagName('td')[0].innerText = handles[i][0]
            row.getElementsByTagName('td')[1].innerText = countryRankList[who]
            row.getElementsByTagName('td')[2].innerText = organizationRankList[who]
            row.getElementsByTagName('td')[3].innerText = who
            tbody.appendChild(row)
        }
    }
    renderTable()
    dropdown.addEventListener('change', () => {   
        Array.prototype.slice.call(tbody.children, 1).forEach( ele => ele.remove())
        renderTable();
    })

})


let rankList = []
let organizationRankList = []
let countryRankList = []
let organizationWiseRankList = []
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
    if(org === 1) organizationWiseRankList = curRankList
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
    th.innerText = title + ' Rank'
    document.getElementsByClassName('standings')[0].rows[0].insertBefore(th, document.getElementsByClassName('standings')[0].rows[0].getElementsByTagName('th')[1])
}

async function updateUI(data) {
    document.querySelector("#pageContent > div.second-level-menu > ul").insertBefore(orgstandings, document.querySelector("#pageContent > div.second-level-menu > ul > li:nth-child(5)"))
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
        else rank += " (" + data[userHandle.trim()] + ")"
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