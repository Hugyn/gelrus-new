// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_aiWXcLI6AE2Pze5an7GYo6AomRbslckk0WbPBrJ1hYG",
})
export default async function handler(req, res) {
    const listUsersResponse = await  notion.users.list()

    res.status(200).json({ name: listUsersResponse.results[0].name })
  
}
