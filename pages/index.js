import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Form from '../components/form';
import Generated from '../context/generate';

export default function Home() {
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [storeAdress, setStoreAdress] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCurrency, setPaymentCurrency] = useState('SOL');
  const [memo, setMemo] = useState('');
  const [isGenerated, setIsGenerated] = useState(true);

  const showForm = () => {
    setIsGenerated(false);
  };
  const showQR = () => {
    console.log('show QR');
    setIsGenerated(true);
  };

  return (
    <Generated.Provider value={isGenerated}>
      <div className='bg-black w-full h-20'>
        <div className='flex flex-col items-center'>
          <h1 className='text-white align-center mt-6 font-bold'>
            Solana Pay QR Code Generator
          </h1>
        </div>
        {isGenerated ? (
          <div>
            <Form onClick={() => setIsGenerated(true)} />
          </div>
        ) : (
          <p>hello</p>
        )}
      </div>
    </Generated.Provider>
  );
}
