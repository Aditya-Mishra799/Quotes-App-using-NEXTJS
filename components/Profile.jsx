"use client";
import React from "react";
import QuoteCard from "./QuoteCard";
const Profile = ({ name, desc, data, handleEdit, handleDelete, handleTagClick }) => {
  
  return (
    <section className="w-full ">
      <h1 className="text-2xl font-bold text-left text-white font-satoshi ">
        <span className="text-primary">{name} Profile</span>
      </h1>
      <p className="text-gray-200  font-satoshi text-md mt-2 text-left ">
        {desc}
      </p>
      {data.length === 0 && (
        <p className="mt-5 text-xl text-emerald-50 font-inter">
          You have no posts, please create a new post.
        </p>
      )}
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <QuoteCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
