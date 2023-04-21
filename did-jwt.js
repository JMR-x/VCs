//3. Sign and verify JSON Web Tokens 

import { createJWT, verifyJWT, ES256KSigner, hexToBytes, decodeJWT } from 'did-jwt';
import { Resolver } from 'did-resolver'
import { getResolver } from 'web-did-resolver'

// Create a singer by using a private key (hex).
const key = '281757c5c3a1033ef92d477e75cf842a2d761124339091d8affb43a9b98784f4';
const signer = ES256KSigner(hexToBytes(key))

// Use the previous signer to create a signed JWT
const jwt = await createJWT(
  { aud: 'did:web:jesusmariaromo.com', name: 'Bob Smith' },
  { issuer: 'did:web:jesusmariaromo.com', signer },
  { alg: 'ES256K' }
)

console.log('\nSigned Arbitrary JWT')
console.log(`//// JWT:\n${jwt}`)

// Decode and display a friendly version of the JWT
const decoded = decodeJWT(jwt)
console.log('\n Displaying friendly version of JWT')
console.log('\n//// JWT Decoded:\n',decoded)

// Verify the arbitrary JWT 
//This process resolves the DID:WEB and uses its public key to verify the signature of the JWT. 
//If the signature verifies the code returns (and displays) the payload. Otherwise an error message (exception)
const webResolver = getResolver()
const resolver = new Resolver({
  ...webResolver
})


console.log('\nVerifying Arbitrary JWT')

verifyJWT(jwt, {
  resolver,
  audience: 'did:web:jesusmariaromo.com'
}).then(({ payload, doc, did, signer, jwt }) => {
  console.log('\n//// Verified:\n', payload)
})