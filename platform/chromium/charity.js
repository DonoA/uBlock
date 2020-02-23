const ALL_CHARITIES = [
    'Redcross', 'WWF', 'unicef', 'unesco', 'code.org', 'natureconservancy'
];

chrome.runtime.sendMessage({ cmd: "getName" }, function (response) {
    [...document.getElementsByClassName("charity_selection")].forEach(elt => {
        elt.addEventListener("click", selectCharity(response.username, elt.getAttribute("selectId")));
    });
});

function updateStats() {
    chrome.runtime.sendMessage({ cmd: "getName" }, function (response) {
        fetch(`https://adsforgood.dallen.io/stat?user=${response.username}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then((data) => {
                document.getElementById("current_charity").innerHTML = data.user.charity;

                [...document.getElementsByClassName("charity_stat")].forEach(elt => {
                    const charityName = ALL_CHARITIES[elt.getAttribute("selectId")];
                    if(data.user.donations[charityName] !== undefined) {
                        elt.innerHTML = `$${data.user.donations[charityName].toFixed(2)}`;
                    }
                });
            });
        });
    });
}

updateStats();

function selectCharity(user, id) {
    return function () {
        fetch(`https://adsforgood.dallen.io/charity?user=${user}&id=${id}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then((res) => {
            updateStats();
        });
    }
}