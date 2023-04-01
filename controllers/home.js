module.exports = {
    landingPage: (req, res) => {
        res.render('landing.ejs')
    },
    getHomePage: (req,res)=>{
        console.log(req.user)
        res.render('homepage.ejs', { user: req.user })
    }
}