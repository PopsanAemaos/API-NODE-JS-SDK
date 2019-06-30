const service  = require('../blockchain/service.js') 
const attribute  = require('./attribute') 

const FUNCTION_NAME= "createuser"
const FUNCTION_NAME1= "createwallet"

class request{
    async createusers(req){
        var att  = await new attribute().createusers(req)
        var result  = await new service().invoke(req.user,FUNCTION_NAME,att)
        return result
    }
    async createwallets(req){
        var att  = await new attribute().createwallets(req)
        var result  = await new service().invoke(req.user,FUNCTION_NAME1,att)
        return result
   }
    async queryUser(req){
        var valkey  = await new attribute().queryUser(req)
        var result  = await new service().query(req.user,valkey)
        return JSON.parse(result.toString())
   }
   async queryWallet(req){
        var valkey  = await new attribute().queryWallet(req)
        var result  = await new service().query(req.user,valkey)
        return JSON.parse(result.toString())

    }
   async registerUSER(req){
        var result  = await new service().registerUSER(req.user,req.OrgDepartment)
        return result
}

}
module.exports = request