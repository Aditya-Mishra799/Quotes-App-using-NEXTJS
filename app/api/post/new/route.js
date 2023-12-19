// create new posts
import { connectToDB } from "@utils/database"
import Post from "@models/post"

export const POST = async (req, res)=>{
    const {userId, quote, tag} = await req.json()
    try {
        await connectToDB()
        const newPost = new Post({creator: userId, quote, tag })
        await newPost.save()

        //Response is a fetch Api Class and it sends a response to clien
        //it contains message and stutus and other meta data 
        return new Response(JSON.stringify(newPost), {status: 201})

    } catch (error) {
        return new Response("Failed to create a new prompt!", {status: 500} )
    }
}