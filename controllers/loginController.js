// get login page
function getLogin(req, res, next) {
    res.render("index", {
        title: "Login Page"
    })
}

module.exports = {
    getLogin
}