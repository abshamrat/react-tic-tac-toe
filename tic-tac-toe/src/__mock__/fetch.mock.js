/**
 * This is a mocking function will be used for component testing
 * @param {object} response to be return 
 * TODO: we will extend the functionality for specific uri, path etc
 */
export const fetchMock = {
  get: (uri) => {
    // Right now we are not implementing for uri setting
    console.log(`Mocking uri: ${uri}`);
    return {
      reply: (response) => {
        const mockFetchPromise =  Promise.resolve( {
          status: response.status || 200,
          json: () => response.data
        });        
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      }
    }
  },
  clear: () => {
    global.fetch.mockClear();
    delete global.fetch;
  }
}

