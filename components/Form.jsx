import React from 'react'
import Link from 'next/link'

const Form = ({type, post, setPost, submitting, handleSubmit,}) => {
  return (
    <section  className='w-full max-w-full flex-start flex-col ring-2 ring-green-500 py-2 px-3 shadow-2xl shadow-slate-600 rounded-lg bg-slate-200 '>
      <h1 className='text-slate-900 text-4xl font-bold  text-left'>{type} Post</h1>
      <p className=' desc text-left max-wd-md'>
        {type} and Share amazing quotes and ideas with world.
        Let your ideas change world and affect people.
      </p>
      <form 
      onSubmit={handleSubmit}
      className = 'mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Quote
          </span>
          <textarea  
        value = {post.quote} 
        onChange = {(e)=>setPost({...post, quote: e.target.value})}
        placeholder = {'Write your Quote here...'}
        required
        className='form_textarea ring-1 ring-offset-green-500 '
        />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tags {` `}
            <span className='font-normal'>(#science, #history, #idea)</span>
          </span>
          <input  
            value = {post.tag} 
            onChange = {(e)=>setPost({...post, tag: e.target.value})}
            placeholder = {'#your_tag....'}
            required
            pattern= '^#(?:\S+|$)$'
            className='form_input ring-1 ring-offset-green-500'
            title='Must start with # and no spaces allowed'
        />
        </label>

       <div className='flex-end  mx-3 mb-5 gap-4'>
        <Link href = "/" className='text-gray-500 text-sm'>
        Cancel
        </Link>
        <button
        type = "submit"
        disabled = {submitting}
        className = 'px-5 py-1.5 text-sm bg-green-500 text-white rounded-full active:ring-2 ring-blue-500  transition-all'
        >
          {submitting ? `${type}...`: type}
        </button>
       </div>
            

      </form>
    </section>
  )
}

export default Form
