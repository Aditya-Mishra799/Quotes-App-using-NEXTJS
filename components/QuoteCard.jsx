"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const QuoteCard = ({ post:postData, handleTagClick, handleEdit, handleDelete }) => {
  const {data : session} = useSession()
  const pathname = usePathname();
  const [copied, setCopied] = useState("");
  const  router = useRouter()

  const [post, setPost] = useState(postData)

  const handleCopy = (e)=>{
    setCopied(post.quote);
    navigator.clipboard.writeText(post.quote)
    setTimeout(()=>setCopied(''), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer ">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={()=>router.push(`/profile/?id=${post.creator._id}`)}
          />
          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>

            <p className="font-inter text-sm text-gary-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => {}}>
          <Image
            src={
              copied === post.quote
                ? "assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            width={20}
            height={20}
            title="copy"
            onClick={handleCopy}
            alt ='copy-icon'
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.quote}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={(e) => handleTagClick && handleTagClick(e,post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.email === post.creator.email && 
      pathname === '/profile' && (
        <div className="flex gap-4 mt-3 items-center border-t flex-center border-gray-200 pt-2">
          <p 
            className="font-inter text-sm text-green-500 cursor-pointer" 
            onClick={()=>handleEdit()}
          >
            Edit
          </p>
          <p 
          className="font-inter text-sm text-red-500 cursor-pointer"
          onClick={()=>handleDelete()}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
