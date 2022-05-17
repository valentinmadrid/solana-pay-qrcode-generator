const Form = ({ showQR, set }) => {
  return (
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
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  type='text'
                  placeholder='Cheezy Chips'
                  onChange={(e) => setStoreName(e.target.value)}
                />
                <p className='text-red-500 text-xs italic'>
                  Please fill out this field.
                </p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Description
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  type='text'
                  placeholder='French Fries, Coke'
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
                />
                <p className='text-gray-600 text-xs italic'>
                  Please enter a valid Solana adress
                </p>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Payment Amount*
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  type='number'
                  placeholder='1.00'
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
        </div>
      </div>
    </div>
  );
};

export default Form;
