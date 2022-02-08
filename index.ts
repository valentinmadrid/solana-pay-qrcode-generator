import { Cluster, clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
import { Keypair } from '@solana/web3.js';
import {createQR, encodeURL} from '@solana/pay';

console.log("hello")

async function main() {
    // Variable to keep state of the payment status
    let paymentStatus: string;

    // Connecting to devnet for this example
    console.log('1. ✅ Establish connection to the network');
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
}

console.log('2. 🛍 Simulate a customer checkout \n');
const amount = new BigNumber(20);
const reference = new Keypair().publicKey;
const label = 'Jungle Cats store';
const message = 'Jungle Cats store - your order - #001234';
const memo = 'JC#4098';
let recipient = new PublicKey("Bxp8yhH9zNwxyE4UqxP7a7hgJ5xTZfxNNft7YJJ2VRjT");

console.log('3. 💰 Create a payment request link \n');
const url = encodeURL({ recipient: recipient, amount, reference, label, message, memo });

console.log(url)



