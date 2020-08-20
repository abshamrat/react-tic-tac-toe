/**
 * This function is used to get all service uri in central place
 */

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || window.REACT_APP_API_BASE_URL


const apiService = {
  // Can be multiple as well
  // we just do it for one
  logEndpoint: `${apiBaseUrl}/v1/action-logs`
} 

export {
  apiService
}