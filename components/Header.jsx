import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories));

  }, [])

  return (
    <div className='container mx-auto px-10 mb-8' >
      <div className='border-b w-full inline-block- border-blue-400 py-4' >
        <div className='block text-center' >
          <Link href="/" >
            <span className='font-serif cursor-pointer font-bold text-4xl text-white' >
              S-C-R-I-B-E
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header