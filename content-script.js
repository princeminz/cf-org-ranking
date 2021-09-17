console.log('cf extension loaded');
const orgStandings = document.createElement("li");
const anchorNode = document.createElement("a");
anchorNode.href = "#"
const textNode = document.createTextNode("Country and organization standings");
anchorNode.appendChild(textNode)
orgStandings.appendChild(anchorNode)

orgStandings.addEventListener('click', () => {
    let ele = document.getElementsByClassName('contest-status')[0]
    if (!ele) ele = document.getElementsByClassName('contest-name')[0]
    ele.innerText = 'Country and organization standings'
    const orgLabel = document.createElement("label")
    orgLabel.htmlFor = "org-filter"
    let labelText = document.createTextNode("Select Organization")
    orgLabel.appendChild(labelText)
    orgLabel.style.marginRight = "5px"
    const orgDropdown = document.createElement("select")
    orgDropdown.id = "org-filter"

    const countryDiv = document.createElement("div")
    const countryLabel = document.createElement("label")
    countryLabel.htmlFor = "country-filter"
    labelText = document.createTextNode("Select Country")
    countryLabel.appendChild(labelText)
    countryLabel.style.marginRight = "5px"
    const countryDropdown = document.createElement("select")
    countryDropdown.id = "country-filter"
    countryDropdown.style.marginLeft = "2.5em"


    orgList = []
    for (let org in organizationWiseRankList) orgList.push(org)
    orgList.sort()

    let orgOption = document.createElement("option")
    orgOption.value = "Any"
    let optionText = document.createTextNode("Any")
    orgOption.appendChild(optionText)
    orgDropdown.appendChild(orgOption)
    for (let org of orgList) {
        orgOption = document.createElement("option")
        orgOption.value = org
        optionText = document.createTextNode(org)
        orgOption.appendChild(optionText)
        orgDropdown.appendChild(orgOption)
    }
    countryList = Array.from(countryList).sort()
    let countryOption = document.createElement("option")
    countryOption.value = "Any"
    optionText = document.createTextNode("Any")
    countryOption.appendChild(optionText)
    countryDropdown.appendChild(countryOption)
    countryList.forEach(country => {
        countryOption = document.createElement("option")
        countryOption.value = country
        optionText = document.createTextNode(country)
        countryOption.appendChild(optionText)
        countryDropdown.appendChild(countryOption)
    })

    const standingsTable = document.querySelector("table.standings")
    Array.prototype.slice.call(standingsTable.getElementsByTagName('th'), 4).forEach(ele => ele.remove())
    const dark = standingsTable.getElementsByTagName('tr')[1]
    Array.prototype.slice.call(dark.getElementsByTagName('td'), 4).forEach(ele => ele.remove())
    const light = standingsTable.getElementsByTagName('tr')[2]
    Array.prototype.slice.call(light.getElementsByTagName('td'), 4).forEach(ele => ele.remove())
    const tbody = standingsTable.getElementsByTagName('tbody')[0]
    Array.prototype.slice.call(tbody.children, 1).forEach(ele => ele.remove())

    document.querySelector("#pageContent").insertBefore(orgLabel, document.querySelector("#pageContent > div.datatable"))
    document.querySelector("#pageContent").insertBefore(orgDropdown, document.querySelector("#pageContent > div.datatable"))

    countryDiv.appendChild(countryLabel)
    countryDiv.appendChild(countryDropdown)
    countryDiv.style.paddingTop = "1em"
    countryDiv.style.marginBottom = "1em"
    document.querySelector("#pageContent").insertBefore(countryDiv, document.querySelector("#pageContent > div.datatable"))

    const renderTable = () => {
        const currentOrg = orgDropdown.options[orgDropdown.selectedIndex].value
        const currentCountry = countryDropdown.options[countryDropdown.selectedIndex].value
        let handles = []
        // handles[i][0] => who, handles[i][1][0] => global rank, handles[i][1][1] => country rank, handles[i][1][2] => org rank
        if (currentOrg === "Any") {
            // iterate over rankList
            // check presence in countryData, orgData

            for(let handle in rankList) {
                if (currentCountry === "Any" || countryData[handle] === currentCountry) {
                    handles[handle] = [rankList[handle], organizationRankList[handle], countryRankList[handle]]
                }
            }
        } else {
            for (let users of organizationWiseRankList[currentOrg]) {
                let handle = users[1]
                if (currentCountry === "Any" || countryData[handle] === currentCountry) {
                    handles[handle] = [users[0], organizationRankList[handle], countryRankList[handle]]
                }
            }
        }

        let i = 0
        for (let who in handles) {
            let row
            if (i & 1) {
                row = light.cloneNode(true)
            } else {
                row = dark.cloneNode(true)
            }
            ++i
            row.getElementsByTagName('td')[0].innerText = handles[who][0]
            row.getElementsByTagName('td')[1].innerText = handles[who][1] ? handles[who][1] : "?"
            row.getElementsByTagName('td')[2].innerText = handles[who][2] ? handles[who][2] : "?"
            row.getElementsByTagName('td')[3].innerText = who
            tbody.appendChild(row)
        }
    }
    renderTable()
    orgDropdown.addEventListener('change', () => {
        Array.prototype.slice.call(tbody.children, 1).forEach(ele => ele.remove())
        renderTable();
    })
    countryDropdown.addEventListener('change', () => {
        Array.prototype.slice.call(tbody.children, 1).forEach(ele => ele.remove())
        renderTable()
    })

})


let rankList = []
let organizationRankList = []
let countryRankList = []
let organizationWiseRankList = []
let countryList = new Set()
let countryData
let orgData
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
        let belongsTo = data[handle]
        if (org === 0) countryList.add(belongsTo)
        if (belongsTo && rankList[handle]) {
            if (!curRankList[belongsTo]) curRankList[belongsTo] = []
            curRankList[belongsTo].push([rankList[handle], handle])
        }
    }
    if (org === 1) organizationWiseRankList = curRankList
    for (let key in curRankList) {
        let userList = curRankList[key].sort(function (a, b) {
            return a[0] - b[0];
        });
        let idx = 0
        userList.forEach(data => {
            if (org) organizationRankList[data[1]] = ++idx
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
    document.querySelector("#pageContent > div.second-level-menu > ul").insertBefore(orgStandings, document.querySelector("#pageContent > div.second-level-menu > ul > li:nth-child(5)"))
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
    let response
    let url = 'https://cf-api.vercel.app/api?contest=' + id
    do {
        response = await fetch(url)
    } while (response.status !== 200);
    orgData = await response.json()
    await generateRankList(orgData)
    url = 'https://cf-api.vercel.app/api?contest=' + id + '&country=1'
    do {
        response = await fetch(url)
    } while (response.status !== 200);
    countryData = await response.json()
    await generateRankList(countryData, 0)
    await updateUI(orgData)
}