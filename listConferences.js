require('dotenv').config()
const freeclimbSDK = require('@freeclimb/sdk')

// your freeclimb API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY

const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

getConferences().then(conferences => {
  console.log('got conferences')
  console.log(conferences)
  // Use conferences
}).catch(err => {
  console.errer(err)
  // Catch Errors
})

async function getConferences() {
  // Create array to store all conferences
  const conferences = []
  // Invoke GET method to retrieve initial list of conferences information
  let response = await freeclimb.listConferences()
  conferences.push(...response.conferences)
  // Retrieve entire conferences list 
  while (response.nextPageUri) {
    response = await freeclimb.getNextPage(response)
    conferences.push(...nextPage.conferences)
  }
  return conferences
}