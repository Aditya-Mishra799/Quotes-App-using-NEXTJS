// Code to fetch all the posts for a specific user from mongo DB
import { connectToDB } from "@utils/database"
import User from "@models/user"

export const GET = async (req, {params})=>{
    console.log("fetch user", params.id)
    try {
      await connectToDB();
      const user = await User.findById(params.id);
      console.log(user)
      return new Response(JSON.stringify(user), {status : 200})
    } catch (error) {
      console.log(error)
        return new Response("Failed to Load Profile!", {status: 500} )
    }
}