
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_aiWXcLI6AE2Pze5an7GYo6AomRbslckk0WbPBrJ1hYG",
})
export default async function handler(req, res) {
  console.log(req.query.month)
    const myPage = await notion.databases.query({
      database_id: "170ed7a3f0d94065bb2b5f7bd939f1fd",
      filter: {
        property: "Date", 
        date:{
           equals:req.query.date
        }
      }
    })
    res.status(200).json({ name: myPage })
  
}
