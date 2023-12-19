"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
    //destructure the data from useSession return object and rename it as sessio
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    // set providers
    useEffect(()=>{
         const setUpProviders = async () => {
            const result = await getProviders();
            setProviders(result);
        }
        setUpProviders();
    }, [])

  return (
    <nav className='flex-between w-full mb-16 py-2 bg-white mt-3 px-4 border rounded-full ring-4 ring-stone-200'>
        <Link href={"/"} className = 'flex gap-2 flex-center ring-1 rounded-full px-1.5 py-1'>
            <Image 
            src={'/assets/images/logo.png'}   
            alt='logo'
            width={30}
            height= {30}
            className ='object-contain'
            title = 'Home Page'
            />
            <p className='logo_text'>"Quotes"</p>
        </Link>
        <p className='sm:hidden text-xl font-semibold '>"Quotes"</p>
        <div className='sm:flex hidden'>
            {session?.user  ? (
                <div className='flex gap-3 md:gap-5 flex-center'>
                    <Link className='black_btn' href='/create-post'>
                        Create Post
                    </Link>
                    <button type='button' onClick={signOut} className= 'outline_btn active:ring-2 active:ring-slate-900'>
                        Sign Out
                    </button>
                    <Link href={'/profile'}>
                        <Image src={session.user.image} alt='profile' width={28} height={28} className='rounded-full ring-2 ring-slate-500 active:ring-2 active:ring-slate-900' title='profile'/>
                    </Link>
                </div>
            ):(
                <>
                {providers && 
                Object.values(providers).map(provider=> (
                    <button
                    type='button'
                    key={provider.name}
                    onClick = {()=>signIn(provider.id, {callbackUrl: '/'})}
                    className = 'black_btn active:ring-2 active:ring-slate-900'
                    >
                        {provider.name} Login
                    </button>
                ))}
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user ?(
                <div className='flex'>
                     <Image 
                     src={session.user.image} 
                     alt='profile' 
                     width={35} 
                     height={35} 
                     className='rounded-full ring-2 ring-slate-500 active:ring-2 active:ring-slate-900' 
                     title='profile'
                     onClick={()=>{setToggleDropDown(prevState => !prevState)}}
                     />
                     {toggleDropDown && (
                        <div className='dropdown'>
                            <Link
                                href={'/profile'}
                                className = "dropdown_link"
                                onClick={()=>{setToggleDropDown(false)}}
                            >
                              My Profile
                            </Link>
                            
                            <Link
                                href={'/create-post'}
                                className = "dropdown_link"
                                onClick={()=>{setToggleDropDown(false)}}
                            >
                              Create Post
                            </Link>

                            <button
                            type='button'
                            onClick={()=>{
                                signOut();
                                setToggleDropDown(false)
                            }}
                            className = 'mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </div>
                     )}
                </div>

            ):(
                <>
                {providers && 
                Object.values(providers).map(provider=> (
                    <button
                    type='button'
                    key={provider.name}
                    onClick = {()=>signIn(provider.id, {callbackUrl: '/'})}
                    className = 'black_btn active:ring-2 active:ring-slate-900'
                    >
                        {provider.name} Login
                    </button>
                ))}
                </> 
            )}

        </div>
    </nav>
  )
}

export default Nav
