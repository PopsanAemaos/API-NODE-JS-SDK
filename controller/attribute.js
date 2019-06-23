class attribute {

    createusers(req){

        var user =[  
            req.stdID.toString().toLowerCase(),
            req.name.toString().toLowerCase(),
            req.tel.toString().toLowerCase()
        ] 

    return user
    }

    createwallets(req){
        var wallet =[
            req.walletname.toString().toLowerCase(),
            req.money.toString().toLowerCase(),
            req.owner.toString().toLowerCase()
        ]
        return wallet
    } 
    // regiserUSER(req){
    //     var USER =[
    //         req.USERID.toString(),
    //         req.USERname.toString(),
    //     ]
    //     return USER
    // } 
}
module.exports = attribute