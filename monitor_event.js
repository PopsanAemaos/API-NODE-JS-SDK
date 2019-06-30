var Fabric_Client = require('fabric-client');
var path = require('path');
const fs = require('fs');
var util = require('util');
var ChannelEventArray = []
const logger = require('./Util/logger');

// อ่าน Scripts 
const USER = process.env.USER
const CONNECTTION = process.env.CONNECTTION
const ORG = process.env.ORG
const PORT = process.env.PORT
//อ่านไฟล์ con   
const ccpPath = path.resolve(__dirname,'blockchain', 'config/'+CONNECTTION);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
var fabric_client = new Fabric_Client();


var peer = fabric_client.newPeer(`grpc://localhost:${PORT}`);
var order = fabric_client.newOrderer('grpc://localhost:7050');

// setup the fabric network
var channelArray = []

var store_path = path.join(__dirname, `blockchain/config/wallet${ORG}/${USER}`)
logger.debug('Store path:'+store_path);

event()

async function event()  {
    try {
    const state_store  = await Fabric_Client.newDefaultKeyValueStore({ path: store_path})
    fabric_client.setStateStore(state_store);
    var crypto_suite = Fabric_Client.newCryptoSuite();
    var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
    crypto_suite.setCryptoKeyStore(crypto_store);
    fabric_client.setCryptoSuite(crypto_suite);
    const user_from_store = await fabric_client.getUserContext(USER, true);
    if (user_from_store && user_from_store.isEnrolled()) {
            logger.info('Successfully loaded USER from persistence');
            member_user = user_from_store;
        } else {
            throw new Error('Failed to get USER.... run registerUser.js');
        }      
    const name = await fabric_client.queryChannels(peer)

    name.channels.forEach(channelName => {
        logger.info(`${channelName.channel_id}`);
        channelArray.push(fabric_client.newChannel(channelName.channel_id))
        })
    channelArray.forEach(element => {
        element.addPeer(peer)
        element.addOrderer(order)
        ChannelEventArray.push(element.newChannelEventHub(`localhost:${PORT}`))
        })
        ChannelEventArray.forEach(ChannelEvent => {        
            ChannelEvent.registerBlockEvent(
                    (block) => {
                        const buffer =block.data.data[0].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args[1]                            
                        var Data =Buffer.from(buffer).toString("utf8")  
                        logger.info(Data)        
                    },
                    (err) => {
                        ChannelEvent.unregisterBlockEvent(blockid);
                        logger.error(util.format('Error %s! Transaction listener has been ' +
                            'deregistered for %s', err, ChannelEvent.getPeerAddr()));
                    }
                );
                ChannelEvent.connect(true);
    });

}catch(err) {
        logger.error('Failed to invoke successfully :: ' + err);
            }
}