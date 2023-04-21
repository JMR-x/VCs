import crypto from 'crypto';         //using to generate random 32 byte string. 
import elliptic from 'elliptic';     //to create its public key 

// Request a 32 byte key
const size = parseInt(process.argv.slice(2)[0]) || 32;
const randomString = crypto.randomBytes(size).toString("hex");
const key = randomString;

console.log(`Key (hex): ${key}`)  // ee48d32e6c724c4d

// Calculate the `secp256k1` curve and build the public key
const ec = new elliptic.ec('secp256k1');
const prv = ec.keyFromPrivate(key, 'hex');
const pub = prv.getPublic();
console.log(`Public (hex): ${prv.getPublic('hex')}`)
console.log(`x (hex): ${pub.x.toBuffer().toString('hex')}`)
console.log(`y (hex): ${pub.y.toBuffer().toString('hex')}`)
console.log(`x (base64): ${pub.x.toBuffer().toString('base64')}`)
console.log(`y (base64): ${pub.y.toBuffer().toString('base64')}`)
console.log(`-- kty: EC, crv: secp256k1`)


// Key (hex): 281757c5c3a1033ef92d477e75cf842a2d761124339091d8affb43a9b98784f4            //private key to issue and sign credentials
// Public (hex): 042ac8b0bf7d9bba866a9169e665d855c6461f57ff3056903cfee52c3862cd3b56ca3115207e66f93dc06edcbc9ebf77544e8cab79f2886359a393691c4e1781b7
// x (hex): 2ac8b0bf7d9bba866a9169e665d855c6461f57ff3056903cfee52c3862cd3b56
// y (hex): ca3115207e66f93dc06edcbc9ebf77544e8cab79f2886359a393691c4e1781b7
// x (base64): Ksiwv32buoZqkWnmZdhVxkYfV/8wVpA8/uUsOGLNO1Y=            //goes in our did.json file
// y (base64): yjEVIH5m+T3Abty8nr93VE6Mq3nyiGNZo5NpHE4Xgbc=            //goes in our did.json file
// -- kty: EC, crv: secp256k1