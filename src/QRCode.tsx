import { createRef, useEffect, useState, useRef, useContext, useLayoutEffect } from "react";
import {encodeURL, createQR} from '@solana/pay'
import { PublicKey } from '@solana/web3.js';
import BigNumber from "bignumber.js";
import config from "./config.json"


function QRCode() {

    const recipient = new PublicKey(config.recipient);
    const amount = new BigNumber(config.amount);
    const reference = new PublicKey(config.reference)
    const label = config.label
    const message = config.message
    const memo = config.memo
 


    const url = encodeURL({ recipient, amount, reference, label, message, memo })
    const qrCode = createQR(url);


    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (ref.current) {
        qrCode.append(ref.current);
      }
    }, [ref, qrCode]);
    
    return (

        <div 
        ref={ref}
        >
        </div>
    )
    
}

export default QRCode;