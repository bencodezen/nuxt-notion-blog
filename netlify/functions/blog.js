const { Client } = require('@notionhq/client')

exports.handler = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const databaseId = 'dfc3566dfaf24e9995a169682d6d4aaf'

  const myPage = await notion.databases.query({
    database_id: databaseId,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
