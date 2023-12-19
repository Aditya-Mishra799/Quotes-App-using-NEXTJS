import { connectToDB } from "@utils/database"
import Post from "@models/post"

//GET to read request
// fetch posts
export const GET = async (req, {params})=>{
    try {
      await connectToDB();
      const posts = await Post.findById(params.id);

      if(!posts){
        return new Response("Post not found", {status: 404})
      }

      return new Response(JSON.stringify(posts), {status : 200})
    } catch (error) {
        return new Response("Failed to Load Quotes!", {status: 500} )
    }
}

//Patch (update)
export const PATCH = async (req, {params})=>{
    const {quote, tag}  = await req.json();
    console.log(`${quote}, ${tag}`)
    try {
        await connectToDB()
        const existingPost = await Post.findById(params.id);
        if(!existingPost){
            return new Response("Post not found", {status: 404})
        }
        // update the data
        existingPost.quote = quote;
        existingPost.tag = tag;
        // save the data to mono DB
        await existingPost.save();

        return new Response(JSON.stringify(existingPost), {status: 200})

    } catch (error) {
        return new Response("Failed to Update Quotes!" + error + 'Patch', {status: 500} )
    }
}

//Delete (delete)
export const DELETE = async (req, {params})=>{
    let post = {}
    try {
        await connectToDB();
        await Post.findByIdAndDelete(params.id);
        return new Response("Post Deleted", {status: 200})
    } catch (error) {
        return new Response('Failed to Delete Post!', {status: 500})
    }
}