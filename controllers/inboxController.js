// get inbox page
function getInbox(req, res, next) {
    res.render("inbox", {
        title: "Inbox Page"
    })
}

module.exports = {
    getInbox
}