"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPost = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({quote: '', tag : ''})
    const router = useRouter();
    // Get the data sent to page in url after ?=
    const searchParams = useSearchParams()
    const postId = searchParams.get('id')

    useEffect(()=>{
        const fetchPost = async ()=>{
            const response = await fetch(`/api/post/${postId}`)
            const data = await response.json()
            const {quote, tag} = data
            setPost({quote, tag})
        }
        if(postId) fetchPost()
    }, [postId])

    const updatePost = async (e)=>{
        e.preventDefault();
        setSubmitting(true);

        if (!postId) return alert('Missing Post id !!')

        try {
            const res = await fetch(`/api/post/${postId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({...post})
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
    type = "Edit"
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit = {updatePost}
    />
  )
}

export default EditPost
