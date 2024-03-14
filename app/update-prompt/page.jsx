"use client"

import Form from '@components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import React, {useState, useEffect} from 'react'

const UpdatePrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [submitting, setSubmitting] = useState(false);
    const promptId = searchParams.get('id');
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
   
    useEffect(() => {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
            prompt: data.prompt,
            data: data.tag
        })
      }

      if(promptId) getPromptDetails();

    }, [promptId]);

    
    const updatePrompt = async (e)=> {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID is not found')

        // pass data we have in FE to this api request
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            });

            if(response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }finally {
            setSubmitting(false)
        }
    };

  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt

