"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { checkLoginAndRedirect } from "@common_code/check_login_and_redirect";
import { useSearchParams } from "next/navigation";
const ProfilePage = () => {

  const user_id = useSearchParams().get('id')
  if(!user_id) checkLoginAndRedirect()

  const { data: session } = useSession();
  const [userData, setUserData] = useState({})
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const fetchUserData = async()=>{
    const response = await fetch(`/api/profile/${user_id}`);
    const data = await response.json()
    setUserData(data)
  }


  useEffect(() => {
    
    const fetchPost = async () => {
      let id  = ''
      if(user_id){
        const response = await fetchUserData()
        id = user_id
      }
      else{
        id = session?.user.id
      }
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id || user_id) {
      fetchPost();
    }
  }, [session]);

  // handle edit to a post made by user logged in
  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirm = confirm("Are you sure want to delete this post ?");
    if (hasConfirm) {
      try {
        const response = await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // p iterartes over all posts in the post array while the post contains deleted post
          const filteredPost = posts.filter((p) => p._id != post._id);
          setPosts(filteredPost);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  let profileMetaData = {
    name: `My`,
    desc:" Welcome to your personalized profile page",
  }
  if( user_id && user_id !== session?.user.id){
    profileMetaData = {
      name: userData?.username &&  `${userData?.username}'s` ,
      desc:` Welcome to ${userData?.email ? userData?.email:'' } profile page.`
    }
  }
  return (
    <Profile
      {...profileMetaData}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
