    const FabricCAServices = require('fabric-ca-client')
    const { FileSystemWallet,Gateway,X509WalletMixin} = require('fabric-network');
    const fs =require('fs')
    const path = require('path');
    const util = require("util")
    const logger = require('../Util/logger.js');

    const CONFIG_CHANNEL_NAME = "mychannel"
    const CONFIG_CHAINCODE_NAME = "mychaincode"

    // read package.json<Scripts> 
    const ORG = process.env.ORG
    const CA = process.env.CA
    const CONNECTTION = process.env.CONNECTTION

    // read file
    const ccpPath = path.resolve(__dirname, `config/${CONNECTTION}`);
    const ccpJSON= fs.readFileSync(ccpPath,'utf8');
    const ccp= JSON.parse(ccpJSON);
    
    const walletPath = path.join(process.cwd(), `./blockchain/config/wallet${ORG}`);
    const wallet = new FileSystemWallet(walletPath);

class service {
    async Init() {
        try {
            let functionname ='[blockchain.service.Init()]'
            // Create a new CA client for interacting with the CA.
            const caInfo = ccp.certificateAuthorities[CA];
            // const caTLSCACertsPath = path.resolve(__dirname, '..', '..', 'basic-network', caInfo.tlsCACerts.path);
            // const caTLSCACerts = fs.readFileSync(caTLSCACertsPath);
            const ca = new FabricCAServices(caInfo.url, /*{ trustedRoots:"", verify: false }, caInfo.caName*/);
        
            // Create a new file system based wallet for managing identities.
            logger.debug(`Wallet path: ${walletPath}`);
    
            // Check to see if we've already enrolled the admin user.
            const adminExists = await wallet.exists('admin');
            if (!adminExists) {
                const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
                const identity = X509WalletMixin.createIdentity(`${ORG}MSP`, enrollment.certificate, enrollment.key.toBytes());
                await wallet.import('admin', identity);
                logger.info('Successfully enrolled admin user "admin" and imported it into the wallet');
                return ;
            }
                logger.info(`${functionname}:We are already`);
                return (`${functionname}:We are already`);
        } catch (error) {
            logger.error(`Failed to enroll admin user "admin": ${error}`);
            process.exit(1);
        }
    }
    async registerUSER(user,OrgDepartment) {
        try {
            // Create a new file system based wallet for managing identities.
            logger.debug(`Wallet path: ${walletPath}`);
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(user);
            if (userExists) {
                logger.info(`An identity for the user ${user} already exists in the wallet`);
                return (`An identity for the user ${user} already exists in the wallet`);
            }
            // Check to see if we've already enrolled the admin user.
            const adminExists = await wallet.exists('admin');
            if (!adminExists) {
                logger.error('An identity for the admin user "admin" does not exist in the wallet');               
                logger.error('Run the enrollAdmin.js application before retrying');
                return  ('An identity for the admin user "admin" does not exist in the wallet'+'\n'+
                         'Run the enrollAdmin.js application before retrying');
            }
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled:false /*ture, asLocalhost: true*/ } });
            
            // Get the CA client object from the gateway for interacting with the CA.
            const ca = gateway.getClient().getCertificateAuthority(); 
            const adminIdentity = gateway.getCurrentIdentity();
    
            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register({ affiliation: OrgDepartment, enrollmentID: user, role: 'client' }, adminIdentity);
            const enrollment = await ca.enroll({ enrollmentID: user, enrollmentSecret: secret });
            const userIdentity = X509WalletMixin.createIdentity(`${ORG}MSP`, enrollment.certificate, enrollment.key.toBytes());
            await wallet.import(user, userIdentity);
            logger.info(`Successfully registered and enrolled admin user ${user} and imported it into the wallet`);
            return (`Successfully registered and enrolled admin user ${user} and imported it into the wallet`);
        } catch (error) {
            logger.error(`Failed to register user ${user}: ${error}`);
            return (`Failed to register user ${user}: ${error}`);

            // process.exit(1);
        }
    }
    
    
    // functionname :createusers
    // args :{ford,0000,1111,hash}
    async invoke (user,funcname,args) {
        try {
            // Create a new file system based wallet for managing identities.
            logger.debug(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(user);
            if (!userExists) {
                logger.error('An identity for the user "user" does not exist in the wallet');
                logger.error('Run the registerUser.js application before retrying');
                return;
            }
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: false, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(CONFIG_CHANNEL_NAME);

            // Get the contract from the network.
            const contract = network.getContract(CONFIG_CHAINCODE_NAME);
            
            // Submit the specified transaction.
            const argsString = args.map((arg) => util.format('%s', arg)).join('|');

            await contract.submitTransaction(funcname, argsString);
            logger.info(`Transaction has been submitted :${argsString}`);
            // Disconnect from the gateway.
            await gateway.disconnect();
            return (`Transaction has been submitted :${argsString}`);
        } catch (error) {
            logger.error(`Failed to submit transaction: ${error}`);
            return (`Failed to submit transaction: ${error}`);
            // process.exit(1);     
        }
    }
    async query(user,valkey) {
        try {
            // Create a new file system based wallet for managing identities.
            logger.debug(`Wallet path: ${walletPath}`);
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists(user);
            if (!userExists) {
                logger.error(`An identity for the user "${user}" does not exist in the wallet`);
                logger.error('Run the registerUser.js application before retrying');
                return;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('mychaincode');

            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('query',valkey);
            logger.info(`Transaction has been evaluated, result is: ${result}`);
            // return  JSON.parse(result.toString());
            return  result.toString();

        } catch (error) {
            logger.error(`Failed to evaluate transaction: ${error}`);
            // process.exit(1);
            return (`Failed to evaluate transaction: ${error}`);
        }
    }

}
module.exports = service