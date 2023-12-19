import React from 'react'
import Feed  from '@components/Feed'
const Home = () => {
  return (
    <section className="w-full flex-center flex-col  mt-2">
      <h1 className='head_text text-center  '>
        Discover and share your qoutes and ideas.
      </h1>
      <p className='text-center px-20 mt-2 text-slate-100 text-lg md:px-40 '>
        This is an open-source platform to share you ideas and quotes with other
        people online. Other people can see your profile and quotes. Please add a new qoutte to get started.
      </p>
      <Feed/>
    </section>
  )
}

export default Home
