// Code to fetch all the posts for a specific user from mongo DB
import { connectToDB } from "@utils/database"
import Post from "@models/post"

export const GET = async (req, {params})=>{

    try {
      await connectToDB();
      const posts = await Post.find({creator : params.id}).populate('creator');
      return new Response(JSON.stringify(posts), {status : 200})
    } catch (error) {
        return new Response("Failed to Load Quotes!", {status: 500} )
    }
}