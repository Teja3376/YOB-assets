import React from 'react'

const index = () => {
    const getYear = new Date().getFullYear();
    return (
      <footer className='text-sm text-gray-500 p-4 sticky bottom-0 w-full bg-white'>
        © {getYear} <span className='text-black'> YOB Assets, Inc</span>
      </footer>
    );
}

export default index