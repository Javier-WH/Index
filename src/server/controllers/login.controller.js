const path = require("path");


function homePage(req, res) {
    res.sendFile(res.sendFile(path.join(__dirname, "../../client/index.html")))
}

module.exports = {
    homePage,
}