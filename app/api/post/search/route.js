//code to search a text in mongo DB using mongoose returning all matches
import { connectToDB } from "@utils/database";
import Post from "@models/post";

const getQuery = (searchText) => {
  console.log(searchText);
  return {
    $or: [
      { quote: { $regex: searchText, $options: "i" } }, 
      { tag: { $regex: searchText, $options: "i" } },   
      {
        $or: [
          { "creator.username": { $regex: searchText, $options: "i" } }, // Case-insensitive regex for username
          { "creator.email": { $regex: searchText, $options: "i" } },    // Case-insensitive regex for email
        ],
      },
    ],
  
  };
};

export const POST = async (req, res) => {
  const {searchText} = await req.json();
  const query = getQuery(searchText);
  try {
    //code to fetch posts based on the query
    await connectToDB();
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users", // Assuming your User model is named "User"
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator", // Unwind the array created by $lookup
      },
      {
        $match: {
          $or: [
            { quote: { $regex: searchText, $options: "i" } },
            { tag: { $regex: searchText, $options: "i" } },
            { "creator.username": { $regex: searchText, $options: "i" } },
            { "creator.email": { $regex: searchText, $options: "i" } },
          ],
        },
      },
    ])
      .exec();
      
    console.log(posts);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Error while searching!", { status: 500 });
  }
};
