console.log('cf extension loaded')
// https://codeforces.com/api/contest.standings?contestId=566
// console.log()

let rankList = []
let organizationRankList = []

let id = location.href.split('/')[4]
async function getContestantHandles(contestId) {
    let response = await fetch('https://codeforces.com/api/contest.standings?contestId='+contestId);
    let data = await response.json()
    return data;
}


getContestantHandles(id).then( data => {
    // https://codeforces.com/api/user.info?handles=DmitriyH;Fefer_Ivan

    data.result.rows.forEach( element => {
        rankList[element.party.members[0].handle] = element.rank
    });

    getOrganizations()
});

// async function retrieveDataFromStorage() {
    
// }

async function updateUI() {
    // retrieveDataFromStorage();
    let result = await chrome.storage.local.get(['res'])
    console.log(result)
    console.log('Value currently is ' + result.res);
    let organizationWiseRankList = []
    result.res.result.forEach( user => {
        if(user.organization && rankList[user.handle] ) {
            if(!organizationWiseRankList[user.organization]) organizationWiseRankList[user.organization] = []
            organizationWiseRankList[user.organization].push([rankList[user.handle], user.handle])
        }
    });
    console.log(organizationWiseRankList)
    for(let key in organizationWiseRankList) {
        let userList = organizationWiseRankList[key].sort(function(a, b) {
            return a[0] - b[0];
        });
        let idx = 0
        userList.forEach(data => {
            organizationRankList[data[1]] = ++idx
        });
    }
    // chrome.storage.local.get(['res'], function(result) {
        
    // })


    // console.log(organizationWiseRankList)
    console.log(organizationRankList)
    let th = document.createElement("th")
    th.className = 'top'
    th.style = 'width:2em;'
    th.innerText = 'Organization #'
    document.getElementsByClassName('standings')[0].rows[0].insertBefore(th, document.getElementsByClassName('standings')[0].rows[0].getElementsByTagName('th')[1])
    
    for (let row of document.getElementsByClassName('standings')[0].rows){
        if(!row.getElementsByTagName('td')[1]) continue;
        var cell = document.createElement("td")
        cell.className = row.getElementsByTagName('td')[1].className
        userHandle = row.getElementsByTagName('td')[1].innerText.toString()
        row.insertBefore(cell, row.getElementsByTagName('td')[1]);
        console.log("hello" + userHandle)
        let rank = organizationRankList[userHandle.trim()]
        if(rank == undefined) rank = "?"
        cell.innerText = rank
    }
}

async function getOrganizations() {
    let ret;
    await chrome.storage.local.get(['time'], function(result) {
        console.log('Value currently is ' + result.time );
        if( result.key && ( (Date.now() - result.time) / (1000 * 60 * 60)  < 6 ) ) {
            updateUI();
            ret = 1;
        }
    });
    if(ret) return;

    let url = 'https://codeforces.com/api/user.ratedList'
    console.log(url)
    let response = await fetch(url);
    let data = await response.json()
    
    await chrome.storage.local.set({'res': data}, function() {
        console.log('Value is set to ' + data);
    });
    await chrome.storage.local.set({'time' : Date.now()}, function() {
        console.log('Value is set to ' + Date.now());
    });
    await chrome.storage.local.get(['time'], function(result) {
        console.log('Value currently is ' + result.time );
    });
    updateUI();
};