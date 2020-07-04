const handleErrors = (error) => {
  // Error 😨
  if (error.response) {
    /*
    * The request was made and the server responded with a
    * status code that falls out of the range of 2xx
    */
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (error.response.status === 401 || error.response.status === 403)
      return {status: 403}
    if(error.response === 422) {
      console.log(error.response.data)
      return {status:error.response.status, message:error.response.data}
    }

  } else if (error.request) {
    /*
    * The request was made but no response was received, `error.request`
    * is an instance of XMLHttpRequest in the browser and an instance
    * of http.ClientRequest in Node.js
    */
    console.log(error.request);
  } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
  }
  console.log(error);
}
export default handleErrors
