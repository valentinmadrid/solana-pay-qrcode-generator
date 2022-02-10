import { createRef, useEffect, useState, useRef, useContext } from "react";
import {encodeURL, createQR} from '@solana/pay'
import { PublicKey } from '@solana/web3.js';
import BigNumber from "bignumber.js";
import config from "../config.json"


function QRCode() {

    const recipient = new PublicKey(config.recipient);
    const amount = new BigNumber(config.amount);
    const reference = new PublicKey(config.reference)
    const label = config.label
    const message = config.message
    const memo = config.memo

    const qrRef = createRef<HTMLDivElement>();

    const url = encodeURL({ recipient, amount, reference, label, message, memo })
    const qrCode = createQR(url);
    qrCode.append(qrRef.current);
    
    return (

        <div 
        ref={qrRef}
        >
        </div>
    )
    
}

export default QRCode;