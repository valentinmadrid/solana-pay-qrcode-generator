import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Form from '../components/form';
import GeneratedContext from '../context/data';
import BigNumber from 'bignumber.js';

import {
  Cluster,
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  Message,
} from '@solana/web3.js';
import {
  encodeURL,
  findTransactionSignature,
  FindTransactionSignatureError,
  createQR,
} from '@solana/pay';

import { useRef, useLayoutEffect } from 'react';

export default function Home() {
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [storeAdress, setStoreAdress] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentCurrency, setPaymentCurrency] = useState('SOL');
  const [memo, setMemo] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  let ref = useRef(null);

  const showQR = (e) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const showForm = (e) => {
    e.preventDefault();
    setIsGenerated(false);
    ref.current.innerHTML = '';
  };

  useEffect(() => {
    if (isGenerated) {
      const payment_recipient = new PublicKey(storeAdress);
      const payment_amount = new BigNumber(paymentAmount);
      console.log('f' + payment_amount);
      const payment_reference = new Keypair().publicKey;
      const payment_label = storeName;
      const payment_message = description;
      let r = (Math.random() + 1).toString(36).substring(7);
      const payment_memo = '#' + r;

      console.log(
        payment_recipient,
        payment_amount,
        payment_reference,
        payment_label,
        payment_message,
        payment_memo
      );

      const url = encodeURL({
        recipient: payment_recipient,
        amount: payment_amount,
        reference: payment_reference,
        label: payment_label,
        message: payment_message,
        memo: payment_memo,
      });
      console.log(url);
      const qrCode = createQR(url);
      console.log(qrCode);
      console.log(ref.current);
      if (ref.current && payment_amount.isGreaterThan(0)) {
        qrCode.append(ref.current);
      }
    }
  }, [isGenerated]);

  return (
    <GeneratedContext.Provider value={isGenerated}>
      <div className='bg-black w-full h-20'>
        <div className='flex flex-col items-center'>
          <h1 className='text-white align-center mt-6 font-bold'>
            Solana Pay QR Code Generator
          </h1>
        </div>
        {!isGenerated ? (
          <div>
            <div className='flex flex-col h-screen items-center'>
              <div className='py-5 mt-10'>
                <form className='w-full max-w-lg'>
                  <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        Store Name*
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                        type='text'
                        placeholder='Cheezy Chips'
                        onChange={(e) => setStoreName(e.target.value)}
                      />
                      {storeName.length < 1 ? (
                        <p className='text-red-500 text-xs italic'>
                          Please fill out this field.
                        </p>
                      ) : null}
                    </div>
                    <div className='w-full md:w-1/2 px-3'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        Description
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type='text'
                        placeholder='French Fries, Coke'
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        Wallet Address*
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type='text'
                        placeholder='0x0000000000000000000000000000000000000000'
                        onChange={(e) => setStoreAdress(e.target.value)}
                      />
                      {storeAdress.length <= 43 ? (
                        <p className='text-red-500 text-xs italic'>
                          Please enter a valid Solana adress
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-2'>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        Payment Amount*
                      </label>
                      <input
                        className={
                          paymentAmount <= 0
                            ? 'appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            : 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        }
                        type='number'
                        placeholder='1.00'
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </div>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        Currency
                      </label>
                      <div className='relative'>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                          <option>Solana</option>
                          <option>USDC</option>
                          <option>Bitcoin</option>
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                          <svg
                            className='fill-current h-4 w-4'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                        Memo
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        type='text'
                        placeholder='#103053'
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <button
                    className='flex flex-col items-center w-full bg-black text-white rounded-md mt-5 h-12 p-3'
                    onClick={showQR}
                  >
                    Generate
                  </button>
                </form>
                <div className='bg-gray-100 w-128 h-128' ref={ref}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col h-screen items-center'>
            <div className='mt-10'>
              <div className='' ref={ref}></div>
              <button
                className='flex flex-col items-center w-full bg-black text-white rounded-md mt-5 h-12 p-3'
                onClick={showForm}
              >
                Generate new Code
              </button>
            </div>
          </div>
        )}
      </div>
    </GeneratedContext.Provider>
  );
}
