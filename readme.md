# Angular JWT Authentication Example
This repo provides a fully implemented reference example of how to
implement authentication using JWT tokens, Angular and Express.

## Overall Summary Descriptions

Here's several student explanations about what's going on at a high level here:

* A user makes a request to login,  the server authenticates the user. If the
  user is authenticated the server sends back the user and token. If the user
  is not authenticated then the server sends an error message as a response. If
  authenticated (the token passes the secret that’s stored in the dot env) the
  token is appended to the header of each ajax request. Angular serves up AJAX
  requests every time a request is made to load a page. We use Auth
  Interceptors to attach token to the headers of these requests, much like a
  hook. The response to the client request is based on the token.
* Log In Process 
  1. view: log in button
  2. button controller/service: get authenticate; save JWT token to localStorage
  3. authentication service: store/delete tokens
  4. server: authorization header->each request; configure angular app to use the header
* Go to login. Email and password sent via ajax.  Server checks if password is
  the correct hash for that email.  If authenticated it sends back a token. The
  token is saved to local storage.  Each request to the server from the client
  is intercepted and a token is added to the request. Each request that requires
  authorization on the server will make sure there is a token present.
* you make a request to log in with email and password, if those fields are
  correct the server sends back a token which is saved in your local storage.
  then when you navigate through the website the server checks if you have a
  token and if so, allows you to access otherwise restricted areas. if you
  logout or leave the page the token is removed from localstorage and it's not
  sent to the server anymore, so the server will block access to restricted requests.
* login calls db, if it's true, then send back a token to save on the localStorage.

  Every new request will then send along the the auth token in the header via the
  intersceptor, and then the routes check for that and then send responses based
  on if you have the right auth token or not.

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
