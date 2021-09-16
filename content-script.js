console.log('cf extension loaded');
const orgstandings = document.createElement("li");
const anchornode = document.createElement("a");
anchornode.href = "#"
const textnode = document.createTextNode("Organization Standings");
anchornode.appendChild(textnode)
orgstandings.appendChild(anchornode)
var parent = document.querySelector("ul.second-level-menu-list")
parent.appendChild(orgstandings)

// orgstandings.addEventListener('mouseenter', () => {
//     orgstandings.classList.add("backLava")
// })
// orgstandings.addEventListener('mouseleave', () => {
//     orgstandings.classList.remove("backLava")
// })



orgstandings.addEventListener('click', () => {
    console.log("clicked")

    const label = document.createElement("label")
    label.htmlFor = "org-filter"
    const labeltext = document.createTextNode("Select Organization")
    label.appendChild(labeltext)
    label.style.marginRight = "5px";
    const dropdown = document.createElement("select")
    dropdown.id = "org-filter"
    
    const clp = document.querySelector(".custom-links-pagination")
    clp.innerHTML = " "
    
    for( let el in organizationWiseRankList){
        const orgoption = document.createElement("option")
        orgoption.value = el
        const optiontext = document.createTextNode(el)
        orgoption.appendChild(optiontext)
        dropdown.appendChild(orgoption)
    }
    
    const tableOuterDiv = document.querySelector(".datatable")
    const oldStandingsTable = document.querySelector("table.standings").cloneNode(true)
    tableOuterDiv.innerHTML = ""
    tableOuterDiv.appendChild(label)
    tableOuterDiv.appendChild(dropdown)

    console.log(oldStandingsTable)
    const tbody = oldStandingsTable.querySelector("tbody")
    const tablerows = tbody.childNodes
    console.log(tablerows)

    const orgtable = document.createElement("table")


    const renderTable = () => {
        
        console.log("table renders")
        
        const headerrow = document.createElement("tr")
        const h1 = document.createElement("th")
        const h2 = document.createElement("th")
        const h3 = document.createElement("th")
        const h1Text = document.createTextNode("Organization Rank")
        const h2Text = document.createTextNode("Global Rank")
        const h3Text = document.createTextNode("Who")
        h1.appendChild(h1Text)
        h2.appendChild(h2Text)
        h3.appendChild(h3Text)
        headerrow.appendChild(h1)
        headerrow.appendChild(h2)
        headerrow.appendChild(h3)

        headerrow.style.fontWeight = 'bold'

        orgtable.appendChild(headerrow)
        
        const currentOrg = dropdown.options[ dropdown.selectedIndex ].value
        console.log(organizationWiseRankList[currentOrg])

        let handles = organizationWiseRankList[currentOrg]

        for(let i=0; i<handles.length; ++i){
            const globalRank = handles[i][0]
            const who = handles[i][1]
            const orgRank = organizationRankList[who]
            const contentrow = document.createElement("tr")
            if(i%2 == 0) contentrow.style.background = 'white'
            const t1 = document.createElement("td")
            const t2 = document.createElement("td")
            const t3 = document.createElement("td")
            const t1Text = document.createTextNode(orgRank)
            const t2Text = document.createTextNode(globalRank)
            const t3Text = document.createTextNode(who)
            t1.appendChild(t1Text)
            t2.appendChild(t2Text)
            t3.appendChild(t3Text)
            contentrow.appendChild(t1)
            contentrow.appendChild(t2)
            contentrow.appendChild(t3)    
            orgtable.appendChild(contentrow)
        }

        tableOuterDiv.appendChild(orgtable)
    }

    renderTable();

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    dropdown.addEventListener('change', () => {   
        removeAllChildNodes(orgtable)
        renderTable();
    })

})


let rankList = []
let organizationRankList = []
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

    getOrganizations()
});



function retrieveDataFromStorage(data) {
    organizationWiseRankList = []    
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