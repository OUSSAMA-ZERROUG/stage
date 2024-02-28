class RequestHandler {
  private apiPrefix: string;
  constructor(apiPrefix: string) {
    this.apiPrefix = apiPrefix;
  }

  /**
   * A method to make a request to the api. It will automatically add the api prefix to the url if it's not a full url. It allow to make a request to an external api.
   * @param url the url to make the request to
   * @param method the method to use for the request
   * @param nextConfig the next config to pass to the fetch function
   * @param body the body to send with the request
   * @returns the data from the response or an error if the request failed
   */
  private async handleRequest(
    url: string,
    method: string,
    nextConfig?: NextFetchRequestConfig,
    body?: object,
  ) {
    const stringifiedBody = JSON.stringify(body);

    let fullUrl = url;
    if (!this.isFullUrl(url)) {
      if (url[0] !== '/') url = `/${url}`;
      fullUrl = `${this.apiPrefix}${url}`;
    }

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      method,
      body: stringifiedBody,
      next: nextConfig,
    } as RequestInit;
    console.log('params', params);
    return fetch(fullUrl, params)
      .then((res) => res.json())
      .catch((err) => {
        console.error('An error occured while fetching :', err);
        return new Error('An error occured while fetching');
      });
  }

  /**
   * Check if the url is a full url (http:// or https://)
   * @param url the url to check
   * @returns true if the url is a full url (http:// or https://)
   */
  private isFullUrl(url: string) {
    return url.includes('http');
  }

  /**
   * A method to make a GET request. It will automatically add the api prefix to the url if it's not a full url. It allow to make a request to an external api.
   * It also automatically parse the response to json and return the data
   * @param url the url to make the request to
   * @param config the config to pass to the fetch function
   * @returns the data from the response
   */
  async GET(
    url: string,
    params: StringifiedKeyObjectAnyType,
    config?: NextFetchRequestConfig,
  ) {
    if (params) {
      url = `${url}?${new URLSearchParams(params).toString()}`;
    }
    return this.handleRequest(url, 'GET', config);
  }

  /**
   *  A method to make a POST request. It will automatically add the api prefix to the url if it's not a full url. It allow to make a request to an external api.
   * It also automatically parse the response to json and return the data
   * @param url the url to make the request to
   * @param body the body to send with the request
   * @param config the config to pass to the fetch function
   * @returns the data from the response
   */
  async POST(
    url: string,
    body: StringifiedKeyObjectAnyType,
    config?: NextFetchRequestConfig,
  ) {
    return this.handleRequest(url, 'POST', config, body);
  }

  /**
   * A method to make a PUT request. It will automatically add the api prefix to the url if it's not a full url. It allow to make a request to an external api.
   * @param url the url to make the request to
   * @param body the body to send with the request
   * @param config the config to pass to the fetch function
   * @returns the data from the response
   */
  async PUT(
    url: string,
    body: object,
    config?: NextFetchRequestConfig,
  ) {
    return this.handleRequest(url, 'PUT', config, body);
  }

  /**
   * A method to make a DELETE request. It will automatically add the api prefix to the url if it's not a full url. It allow to make a request to an external api.
   * @param url the url to make the request to
   * @param config the config to pass to the fetch function
   * @returns the data from the response
   */
  async DELETE(url: string, config?: NextFetchRequestConfig) {
    return this.handleRequest(url, 'DELETE', config);
  }

  /**
   * A method to make a PATCH request. It will automatically add the api prefix to the url if it's not a full url. It allow to make a request to an external api.
   * @param url the url to make the request to
   * @param body the body to send with the request
   * @param config the config to pass to the fetch function
   * @returns the data from the response
   */
  async PATCH(
    url: string,
    body: object,
    config?: NextFetchRequestConfig,
  ) {
    return this.handleRequest(url, 'PATCH', config, body);
  }
}

/**
 * The api instance to use to make request to the api. It's already configured to use the api prefix defined in the .env file
 * It allow to make request to an external api, by passing the full url to the method.
 * This instance bring some useful methods to make request to the api. All the methods are async and return the data from the response. If the response is not a json, it will return the response as is.
 * @example api.GET('posts');
 * @example api.GET('/posts');
 * @example api.GET('https://monapi.com/posts');
 */
const api = new RequestHandler('http://localhost:5000');
export default api;
