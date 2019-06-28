module.exports = function (app) {
    var request = require('../controller/operation')

// //adduser
//     app.post('/adduser',async(req, res) =>{
//     var result = (await new index().adduser(req.body))
//     res.json(result)
//     })

// createuser
    app.post('/createUser',async(req,res) => {
        var result = (await new request().createusers(req.body))
        res.status(200)
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        // res.header('X-Content-Type-Options', 'nosniff');
        // res.header('X-Frame-Options', 'DENY');
        // res.header('X-XSS-Protection', '1; mode=block');
        // res.header('Content-Security-Policy', "script-src 'self'");

        res.json(result)
        })
// createwallet
    app.post('/createWallet',async(req,res) => {
        var result = (await new request().createwallets(req.body))
        res.status(200)
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.json(result)
    })
// query
    app.post('/queryUser',async(req,res) => {
        var result = (await new request().queryUser(req.body))
        res.status(200)
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.json(result)
    })
// query
    app.post('/queryWallet',async(req,res) => {
        var result = (await new request().queryWallet(req.body))
        res.status(200)
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.json(result)
    })
// registerUSER
    app.post('/registerUser',async(req,res) => {
        var result = (await new request().registerUSER(req.body))
        res.status(200)
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(result)
    })
    

}
