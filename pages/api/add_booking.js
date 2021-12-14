
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_aiWXcLI6AE2Pze5an7GYo6AomRbslckk0WbPBrJ1hYG",
})

export default async function handler(req, res) {
  //Get availiable times
  
    const database_id = "170ed7a3f0d94065bb2b5f7bd939f1fd";
    let date = new Date()


    const response = await notion.pages.create({
        parent: {database_id: database_id},
        properties: {
            Name: {
              title: [
                {
                  text: {
                    content: 'Tuscan Kale',//Tittle
                  },
                },
              ],
            },
            
            Date: {
                date:{
                    start: date //Date of booking
                }
            }
        }
        
    })
    // console.log(response)
    res.status(200).json(response)
  

}
