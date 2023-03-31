module.exports = {
    landingPage: (req, res) => {
        res.render('landing.ejs')
    },
    getHomePage: (req,res)=>{
        res.render('homepage.ejs' , {user: req.user})
    }
}