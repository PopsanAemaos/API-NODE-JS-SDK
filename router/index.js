module.exports = function (app) {
    var request = require('../controller/operation')

// //adduser
//     app.post('/adduser',async(req, res) =>{
//     var result = (await new index().adduser(req.body))
//     res.json(result)
//     })

// createuser
    app.post('/createuser',async(req,res) => {
        var result = (await new request().createusers(req.body))
        res.json(result)
        })
// createwallet
    app.post('/createwallet',async(req,res) => {
        var result = (await new request().createwallets(req.body))
        res.json(result)
    })
// query
    app.post('/queryUser',async(req,res) => {
        var result = (await new request().queryUser(req.body))
        res.json(result)
    })
// query
    app.post('/queryWallet',async(req,res) => {
        var result = (await new request().queryWallet(req.body))
        res.json(result)
    })
// registerUSER
    app.post('/registerUSER',async(req,res) => {
        var result = (await new request().registerUSER(req.body))
        res.json(result)
    })
    

}
