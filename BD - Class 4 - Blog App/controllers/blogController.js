const dummyLink = (req, resp) => {
    resp.send('This is a dummy link');
}

module.exports = { dummyLink };