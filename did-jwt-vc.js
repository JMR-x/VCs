// import { JwtCredentialPayload, createVerifiableCredentialJwt } from 'did-jwt-vc'
import { ES256KSigner, hexToBytes } from 'did-jwt';
import { createVerifiableCredentialJwt, createVerifiablePresentationJwt, verifyCredential, verifyPresentation } from 'did-jwt-vc'
import { Resolver } from 'did-resolver'
import { getResolver } from 'web-did-resolver'


// STEP 1: Create a signer by using my private key (hex).
//Reusing the signer 
const key = '281757c5c3a1033ef92d477e75cf842a2d761124339091d8affb43a9b98784f4';
const signer = ES256KSigner(hexToBytes(key))


//(INTERMEDIATE STEP) 
//Before creating our Verifiable Credential, we prepare our issuer object. Which carries our did and the signer from previous step
// Prepare an issuer
const issuer = {
    did: 'did:web:jesusmariaromo.com',
    signer: signer
}

//STEP 2: Prepare the Verifiable Credential Payload
const vcPayload = {
  sub: 'did:web:jesusmariaromo.com',
  nbf: 1562950282,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      degree: {
        type: 'BachelorDegree',
        name: 'Bachelor in Computer and Information Systems'
      }
    }
  }
}

//STEP 3: Create the Verifiable Credential (JWT)
//With the issuer and the vcPayload prepared, we use the did-jwt-vc library and create the credential as follows:
const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
console.log('//// Verifiable Credential:\n', vcJwt)
//This gives us back our VC in the form of JWT.



//STEP 4 Create Verifiable Presentation:

//4.1: Prepare the Verifiable Presentation Payload
const vpPayload = {
  vp: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiablePresentation'],
    verifiableCredential: [vcJwt],
    foo: "bar"
  }
}

//4.2 Create the Verifiable Presentation (JWT)
const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer)
console.log('\n//// Verifiable Presentation:\n', vpJwt)



//now we can resolve and verify Credentials and Presentation 

// Prepare the did:web resolver
const resolver = new Resolver(getResolver())

// Verify the Credentantial and the Presentation

//Credentials
const verifiedVC = await verifyCredential(vcJwt, resolver)
console.log('//// Verified Credentials:\n', verifiedVC)

//presentations
const verifiedVP = await verifyPresentation(vpJwt, resolver)
console.log('\n//// Verified Presentation:\n', verifiedVP)

