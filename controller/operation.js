const service  = require('../blockchain/service.js') 
const attribute  = require('./attribute') 


const FUNCTION_NAME= "createuser"
const FUNCTION_NAME1= "createwallet"

class request{
    async createusers(req){
        var att  = await new attribute().createusers(req)
        console.log(att)
        var result  = await new service().invoke(req.user,FUNCTION_NAME,att)
        return result
    }
    async createwallets(req){
        var att  = await new attribute().createwallets(req)
        console.log(att)
        var result  = await new service().invoke(req.user,FUNCTION_NAME1,att)
        return result
   }

    async queryUser(req){
        var valkey="StudentID|"+req.stdID
        console.log('-------------------------------------------------------------------------------------------');
        console.log(valkey)
        var result  = await new service().query(req.user,valkey)
        return JSON.parse(result.toString())
   }
   async queryWallet(req){
        var valkey="Walletname|"+req.walletname.toString()
        console.log('-------------------------------------------------------------------------------------------');
        console.log(valkey)
        var result  = await new service().query(req.user,valkey)
        return result

    }
   async registerUSER(req){
        // var att  = await new attribute().regiserUSER(req)
        // console.log(att)
        var result  = await new service().registerUSER(req.user)
        return result
}

}
module.exports = request