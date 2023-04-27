module.exports = {
    getProfile: (req,res)=>{
        console.log(req.user)
        res.render('profile.ejs', { user: req.user })
    }
}