"use client"
import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePost = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({quote: '', tag : ''})
    const router = useRouter();
    const {data:session} = useSession()
    const createPost = async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/post/new',
            {
                method: 'POST',
                body: JSON.stringify({...post, userId: session?.user.id})
            })
            if(res.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
    }
  return (
    <Form
    type = "Create"
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit = {createPost}
    />
  )
}

export default CreatePost
