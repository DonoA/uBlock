

chrome.runtime.sendMessage({ cmd: "getName" }, function (response) {
    [...document.getElementsByClassName("charity_selection")].forEach(elt => {
        elt.addEventListener("click", selectCharity(response.username, elt.getAttribute("selectId")));
    });
});

function selectCharity(user, id) {
    return function () {
        fetch(`https://adsforgood.dallen.io/charity?user=${user}&id=${id}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });
    }
}