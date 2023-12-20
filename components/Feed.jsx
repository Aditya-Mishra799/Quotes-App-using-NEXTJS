"use client";

import React from "react";
import { useState, useEffect } from "react";
import QuoteCard from "@components/QuoteCard";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const router = useRouter()
  const pathname = usePathname();

  const handleSearchSubmit = async (e, searchText) => {
    e.preventDefault();
    try {
      //perform a query to search all matching posts
      const response = await fetch(
        `/api/post/search`,{
          method : 'POST',
          body: JSON.stringify({searchText})
        }
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagClick = async (event, tag)=>{
    setSearchText(tag)
    await handleSearchSubmit(event,tag )
  }
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  const QuoteCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <QuoteCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };
  return (
    <section className="feed">
      <form
        className="relative w-full flex-center gap-2"
        onSubmit={(e)=>handleSearchSubmit(e,searchText)}
      >
        <input
          type="text"
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer focus:border-0 focus:ring-2  focus:ring-emerald-500"
        />
        <div className="p-2 rounded bg-white max-h-full ">
          <Image
            src = '/assets/icons/search.png'
            height={29}
            width = {29}
            className ='object-contain cursor-pointer '
            title="search"
            onClick={(e)=>handleSearchSubmit(e, searchText)}
          />
        </div>
      </form>
      <QuoteCardList data={posts}  handleTagClick = {handleTagClick}/>
    </section>
  );
};

export default Feed;
