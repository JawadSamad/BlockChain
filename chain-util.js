/*Jawad Samad
  Novi Hogeschool
  Blockchain "BLC"
*/

const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1');
const ec = new EC('secp256k1');

class ChainUtil {
  //Using the genKeyPair method of elliptic which generates a keypair object
  static genKeyPair() {
    return ec.genKeyPair();
  }

  //Creates a random string of 32 char partly based on the current time which generates a unique ID 
  static id() {
    return uuidV1();
  }

  //Returing a stringified SHA256 representation of the provided data
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  //Verifying the signature 
  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }
}

module.exports = ChainUtil;