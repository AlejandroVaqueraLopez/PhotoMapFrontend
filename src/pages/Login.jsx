import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Login(){

// The action function can be async
  const myAction2 = async () => {
    // Server-side logic or client-side logic in a Transition
    const response = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error to login " + error));
  };


// The action function can be async
  const getAll = async () => {
    const response = await fetch('http://localhost:5000/users', {
      method: 'GET',
      credentials: 'include' 
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error to login " + error));
  };

  

// The action function can be async
  const myAction = async (formData) => {
    const data = Object.fromEntries(formData);
    // Server-side logic or client-side logic in a Transition
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // 2. Tell the server to expect JSON
      },
      // 3. Stringify the object for the body
      body: JSON.stringify(data),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error to login " + error));
  };

  return (
    // When using a function for 'action', method defaults to POST
    <>
    <div className="main">
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-5">
              <form action={myAction}>
                  <fieldset >
                    <legend>Login</legend>
                      <div class="mb-3">
                        <input type="text" name="username" id="disabledTextInput" class="form-control" placeholder="username"/>
                      </div>
                      <div class="mb-3">
                        <input type="text" name="password" id="disabledTextInput" class="form-control" placeholder="password"/>
                      </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                  </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

    </>
  );
  /**
   * 
              <form action={myAction2}>
                <button type="submit" class="btn btn-primary"> Logout </button>
              </form>

              <form action={getAll}>
                <button type="submit" class="btn btn-primary">GetAll users</button>
              </form>
   * 
   */

  }

export default Login