const converthash  = require('../Util/hash256.js')

class attribute {

    createusers(req){

        var user =[
            req.stdID.toString().toLowerCase(),
            req.name.toString().toLowerCase(),
            req.tel.toString().toLowerCase(),
            converthash.hash(req.stdID.toString().toLowerCase()),

        ] 

    return user
    }

    createwallets(req){
        var wallet =[
            req.walletname.toString().toLowerCase(),
            req.money.toString().toLowerCase(),
            req.owner.toString().toLowerCase(),
            converthash.hash(req.walletname.toString().toLowerCase())

        ]
        return wallet
    } 
    queryUser(req){
            var hash =converthash.hash(req.stdID.toString().toLowerCase())
            var valkey = "StudentID|"+hash
            return valkey
    }
    queryWallet(req){
            var hash =converthash.hash(req.walletname.toString().toLowerCase())
            var valkey = "Walletname|"+hash
            return valkey
    }
        
}
module.exports = attribute