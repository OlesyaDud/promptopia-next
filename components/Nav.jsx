"use client"

import React, {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';


const Nav = () => {
  const {data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  // only runs at the start
  // will allow to sign in using google and next auth
  useEffect(() => {
    const setAppProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setAppProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={'/'} className='flex gap-2 flex-center'>
        <Image 
          src={'/assets/images/logo.svg'}
          width={30}
          height={30}
          alt='logo'
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>


{/* {alert(providers)} */}

      {/* nav */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href={'/create-prompt'}>
            create
            </Link>

            <button type='button'
              onClick={signOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href={'/profile'}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />

            </Link>
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider) => (
            <button
              type='button'
              key={provider.name}
              onClick={()=> signIn(provider.id)}
              className='black-btn'
            >
                Sign In
            </button>
          ))}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className='sm:hidden flex relative '>
            {session?.user ? (
              <div className='flex'>
                  <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                  onClick={()=> setToggleDropdown((prevState)=> !prevState)}
                />

                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href={'/profile'}
                      className='dropdown_link'
                      onClick={()=> setToggleDropdown(false)}
                    >
                    My Profile
                    </Link>

                    <Link
                      href={'/create-prompt'}
                      className='dropdown_link'
                      onClick={()=> setToggleDropdown(false)}
                    >
                    Create Prompt
                    </Link>

                    <button
                      type='button'
                      onClick={()=> {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className='mt-5 w-full black_btn'
                    >
                        Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
              {providers && Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={()=> signIn(provider.id)}
                  className='black-btn'
                >
                    Sign In
                </button>
              ))}
              </>
            )}
      </div>
    </nav>
  )
}

export default Nav
