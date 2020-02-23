chrome.runtime.sendMessage({ cmd: "getName" }, function (response) {
    fetch('https://adsforgood.dallen.io/raised?user=' + response.username, {
        method: 'get',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then((res) => {
        res.json().then((data) => {
            document.getElementById("cpmGenerated").innerHTML = `$${data.usd}`;
        })
    });
});

