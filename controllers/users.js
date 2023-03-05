module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getRegister: (req, res) => {
        res.render('register.ejs')
    },
    postRegister: (req, res) => {
        let {username, email, password, password2 } = req.body
        console.log({username, email, password, password2})
    }
}