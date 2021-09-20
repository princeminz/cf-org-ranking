console.log('cf extension loaded');
const orgStandings = document.createElement("li");
const anchorNode = document.createElement("a");
anchorNode.href = "#"
const textNode = document.createTextNode("Country and organization standings");
anchorNode.appendChild(textNode)
orgStandings.appendChild(anchorNode)

const isoCountries = {
    'Afghanistan': 'AF',
    'Aland Islands': 'AX',
    'Albania': 'AL',
    'Algeria': 'DZ',
    'American Samoa': 'AS',
    'Andorra': 'AD',
    'Angola': 'AO',
    'Anguilla': 'AI',
    'Antarctica': 'AQ',
    'Antigua and Barbuda': 'AG',
    'Argentina': 'AR',
    'Armenia': 'AM',
    'Aruba': 'AW',
    'Australia': 'AU',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Bahamas': 'BS',
    'Bahrain': 'BH',
    'Bangladesh': 'BD',
    'Barbados': 'BB',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Belize': 'BZ',
    'Benin': 'BJ',
    'Bermuda': 'BM',
    'Bhutan': 'BT',
    'Bolivia': 'BO',
    'Bosnia and Herzegovina': 'BA',
    'Botswana': 'BW',
    'Bouvet Island': 'BV',
    'Brazil': 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei': 'BN',
    'Bulgaria': 'BG',
    'Burkina Faso': 'BF',
    'Burundi': 'BI',
    'Bonaire, Saint Eustatius and Saba': 'BQ',
    'Cambodia': 'KH',
    'Cameroon': 'CM',
    'Canada': 'CA',
    'Cape Verde': 'CV',
    'Curacao': 'CW',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    'Chad': 'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    'Colombia': 'CO',
    'Comoros': 'KM',
    'Congo': 'CG',
    'Democratic Republic of the Congo': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Ivory Coast': 'CI',
    'Croatia': 'HR',
    'Cuba': 'CU',
    'Cyprus': 'CY',
    'Czechia': 'CZ',
    'Denmark': 'DK',
    'Djibouti': 'DJ',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'Egypt': 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    'Eritrea': 'ER',
    'Estonia': 'EE',
    'Ethiopia': 'ET',
    'Falkland Islands': 'FK',
    'Faroe Islands': 'FO',
    'Fiji': 'FJ',
    'Finland': 'FI',
    'France': 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    'Gabon': 'GA',
    'Gambia': 'GM',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greece': 'GR',
    'Greenland': 'GL',
    'Grenada': 'GD',
    'Guadeloupe': 'GP',
    'Guam': 'GU',
    'Guatemala': 'GT',
    'Guernsey': 'GG',
    'Guinea': 'GN',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Haiti': 'HT',
    'Heard Island and McDonald Islands': 'HM',
    'Vatican': 'VA',
    'Honduras': 'HN',
    'Hong Kong': 'HK',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'India': 'IN',
    'Indonesia': 'ID',
    'Iran': 'IR',
    'Iraq': 'IQ',
    'Ireland': 'IE',
    'Isle of Man': 'IM',
    'Israel': 'IL',
    'Italy': 'IT',
    'Jamaica': 'JM',
    'Japan': 'JP',
    'Jersey': 'JE',
    'Jordan': 'JO',
    'Kazakhstan': 'KZ',
    'Kenya': 'KE',
    'Kiribati': 'KI',
    'South Korea': 'KR',
    'North Korea': 'KP',
    'Kuwait': 'KW',
    'Kyrgyzstan': 'KG',
    'Laos': 'LA',
    'Latvia': 'LV',
    'Lebanon': 'LB',
    'Lesotho': 'LS',
    'Liberia': 'LR',
    'Libya': 'LY',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Macao': 'MO',
    'Macedonia': 'MK',
    'Madagascar': 'MG',
    'Malawi': 'MW',
    'Malaysia': 'MY',
    'Maldives': 'MV',
    'Mali': 'ML',
    'Malta': 'MT',
    'Marshall Islands': 'MH',
    'Martinique': 'MQ',
    'Mauritania': 'MR',
    'Mauritius': 'MU',
    'Mayotte': 'YT',
    'Mexico': 'MX',
    'Micronesia': 'FM',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Mongolia': 'MN',
    'Montenegro': 'ME',
    'Montserrat': 'MS',
    'Morocco': 'MA',
    'Mozambique': 'MZ',
    'Myanmar': 'MM',
    'Namibia': 'NA',
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    'Nicaragua': 'NI',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Niue': 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    'Norway': 'NO',
    'Oman': 'OM',
    'Pakistan': 'PK',
    'Palau': 'PW',
    'Palestine': 'PS',
    'Panama': 'PA',
    'Papua New Guinea': 'PG',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Pitcairn': 'PN',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Puerto Rico': 'PR',
    'Qatar': 'QA',
    'Reunion': 'RE',
    'Romania': 'RO',
    'Russia': 'RU',
    'Rwanda': 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts and Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre and Miquelon': 'PM',
    'Saint Vincent and the Grenadines': 'VC',
    'Samoa': 'WS',
    'San Marino': 'SM',
    'Sao Tome and Principe': 'ST',
    'Saudi Arabia': 'SA',
    'Senegal': 'SN',
    'Serbia': 'RS',
    'Serbia and Montenegro': 'CS',
    'Seychelles': 'SC',
    'Sierra Leone': 'SL',
    'Singapore': 'SG',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Solomon Islands': 'SB',
    'Somalia': 'SO',
    'South Africa': 'ZA',
    'South Georgia and the South Sandwich Islands': 'GS',
    'Spain': 'ES',
    'Sri Lanka': 'LK',
    'Sudan': 'SD',
    'South Sudan': 'SS',
    'Suriname': 'SR',
    'Svalbard and Jan Mayen': 'SJ',
    'Sint Maarten': 'SX',
    'Swaziland': 'SZ',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Syria': 'SY',
    'Taiwan': 'TW',
    'Tajikistan': 'TJ',
    'Tanzania': 'TZ',
    'Thailand': 'TH',
    'East Timor': 'TL',
    'Togo': 'TG',
    'Tokelau': 'TK',
    'Tonga': 'TO',
    'Trinidad and Tobago': 'TT',
    'Tunisia': 'TN',
    'Turkey': 'TR',
    'Turkmenistan': 'TM',
    'Turks and Caicos Islands': 'TC',
    'Tuvalu': 'TV',
    'Uganda': 'UG',
    'Ukraine': 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Minor Outlying Islands': 'UM',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vanuatu': 'VU',
    'Venezuela': 'VE',
    'Vietnam': 'VN',
    'British Virgin Islands': 'VG',
    'U.S. Virgin Islands': 'VI',
    'Wallis and Futuna': 'WF',
    'Western Sahara': 'EH',
    'Yemen': 'YE',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
};

const colorClass = {
    'unrated': 'black',
    'newbie': 'gray',
    'pupil': 'green',
    'specialist': 'cyan',
    'expert': 'blue',
    'candidate master': 'violet',
    'master': 'orange',
    'international master': 'orange',
    'grandmaster': 'red',
    'international grandmaster': 'red',
    'legendary grandmaster': 'legendary'
}

orgStandings.addEventListener('click', () => {
    let ele = document.getElementsByClassName('custom-links-pagination')[0]
    if (ele) ele.remove()
    ele = document.getElementsByClassName('contest-status')[0]
    if (!ele) ele = document.getElementsByClassName('contest-name')[0]
    ele.innerText = 'Country and organization standings'
    const orgLabel = document.createElement("label")
    orgLabel.htmlFor = "org-filter"
    orgLabel.id = "org-label"
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
    countryDiv.id = "country-div"


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
        optionText = document.createTextNode(org + " ( " + organizationWiseRankList[org].length + " )")
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
        optionText = document.createTextNode(country + " ( " + countryWiseRankList[country].length + " )")
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

    ele = document.getElementById("org-label")
    if (ele) {
        ele.remove()
    }
    ele = document.getElementById("org-filter")
    if (ele) {
        ele.remove()
    }
    ele = document.getElementById("country-div")
    if (ele) {
        ele.remove()
    }

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
            for (let handle in rankList) {
                if (currentCountry === "Any" || countryData[handle] === currentCountry) {
                    handles[handle] = [rankList[handle], countryRankList[handle], organizationRankList[handle]]
                }
            }
        } else {
            for (let users of organizationWiseRankList[currentOrg]) {
                let handle = users[1]
                if (currentCountry === "Any" || countryData[handle] === currentCountry) {
                    handles[handle] = [users[0], countryRankList[handle], organizationRankList[handle]]
                }
            }
        }

        handles = Object.keys((handles)).map(function (key) {
            return [key, handles[key]]
        })
        handles.sort(function (a, b) {
            return a[1][0] - b[1][0]
        })

        let i = 0
        for (let handle of handles) {
            let who = handle[0]
            let row
            if (i & 1) {
                row = light.cloneNode(true)
            } else {
                row = dark.cloneNode(true)
            }
            ++i
            row.getElementsByTagName('td')[0].innerText = handle[1][0]
            row.getElementsByTagName('td')[1].innerText = handle[1][1] ? handle[1][1] : "?"
            row.getElementsByTagName('td')[2].innerText = handle[1][2] ? handle[1][2] : "?"
            row.getElementsByTagName('td')[3].innerText = ""

            let country = countryData[who]
            const imgEle = document.createElement("img")
            const titleEle = document.createElement("a")
            if (country && isoCountries[country.trim()]) {
                country = country.trim()
                imgEle.src = "//codeforces.org/s/37729/images/flags-16/" + isoCountries[country].toLowerCase() + ".png"
                imgEle.alt = country
                imgEle.title = country
                imgEle.className = "standings-flag"
                row.getElementsByTagName('td')[3].append(imgEle)
            }
            titleEle.href = "/profile/" + who
            titleEle.className = "rated-user user-" + colorClass[ratingData[who] ? ratingData[who] : 'unrated']
            let rank = ""
            if (ratingData[who]) {
                let rankName = ratingData[who].split(' ')
                rankName.forEach(s => {
                    s = s.charAt(0).toUpperCase() + s.substring(1)
                    rank += s + " "
                })
            } else rank = "Unrated "
            titleEle.title = rank + who
            titleEle.innerText = who
            row.getElementsByTagName('td')[3].append(titleEle)
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
let countryWiseRankList = []
let countryList = new Set()
let countryData
let orgData
let ratingData
let id = location.href.split('/')[4]

async function getContestantHandles(contestId) {
    let response = await fetch('https://codeforces.com/api/contest.standings?contestId=' + contestId);
    return await response.json();
}

getContestantHandles(id).then(data => {
    data.result.rows.forEach(element => {
        rankList[element.party.members[0].handle] = element.rank
    });
    fetchDataFromAPI()
});

function generateRankList(org = 1) {
    let curRankList = []
    let data = org === 1 ? orgData : countryData
    for (let handle in data) {
        let belongsTo = data[handle]
        if (org === 0) countryList.add(belongsTo)
        if (belongsTo && rankList[handle]) {
            if (!curRankList[belongsTo]) curRankList[belongsTo] = []
            curRankList[belongsTo].push([rankList[handle], handle])
        }
    }
    if (org === 1) organizationWiseRankList = curRankList
    else countryWiseRankList = curRankList
    for (let key in curRankList) {
        let userList = curRankList[key].sort(function (a, b) {
            return a[0] - b[0];
        });
        let idx = 0
        userList.forEach(data => {
            if (org === 1) organizationRankList[data[1]] = ++idx
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

async function updateUI() {
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
        else rank += " (" + orgData[userHandle.trim()] + ")"
        cell.innerText = rank

        rank = countryRankList[userHandle.trim()]
        if (rank === undefined) rank = "?"
        cell2.innerText = rank
    }
}

async function fetchDataFromAPI() {
    let response
    let url = 'https://cf-api.vercel.app/api?contest=' + id
    do {
        response = await fetch(url)
    } while (response.status !== 200);
    let data = await response.json()
    orgData = data.organization
    countryData = data.country
    ratingData = data.rank
    await generateRankList()
    await generateRankList(0)
    await updateUI()
}
