require('dotenv').config()
const persephonySDK = require('@persephony/sdk')

const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const persephony = persephonySDK(accountId, authToken)

getConferences().then(conferences => {
  // Use conferences
}).catch(err => {
  // Catch Errors
})

async function getConferences() {
  // Create array to store all conferences
  const conferences = []
  // Invoke GET method to retrieve initial list of conferences information
  const first = await persephony.api.conferences.getList()
  conferences.push(...first.conferences)
  // Get Uri for next page
  let nextPageUri = first.nextPageUri
  // Retrieve entire conferences list 
  while (nextPageUri) {
    const nextPage = await persephony.api.conferences.getNextPage(nextPageUri)
    conferences.push(...nextPage.conferences)
    nextPageUri = nextPage.nextPageUri
  }
  return conferences
}