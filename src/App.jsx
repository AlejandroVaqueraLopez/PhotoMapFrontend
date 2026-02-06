import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


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
    <form action={myAction}>
          <fieldset >
            <legend>Login</legend>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">username</label>
                  <input type="text" name="username" id="disabledTextInput" class="form-control" placeholder="username"/>
                </div>
                <div class="mb-3">
                  <label for="disabledSelect" class="form-label">password</label>
                  <input type="text" name="password" id="disabledTextInput" class="form-control" placeholder="password"/>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled/>
                    <label class="form-check-label" for="disabledFieldsetCheck">
                      check your info
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </fieldset>
        </form>

      <form action={myAction2}>
        <button type="submit" class="btn btn-primary"> Logout </button>
      </form>

      <form action={getAll}>
        <button type="submit" class="btn btn-primary">GetAll users</button>
      </form>

    </>
  );

  
}

export default App
