import React, { FormEvent } from "react";

const api_URL = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  //HTMLFormElement extends Element, ok to just pass Element
  // TS duck typing: 'interface oriented programming'
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  // const test = () => {};
  const login = (params: { username: string; password: string }) => {
    fetch(`${api_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (response) => {
      if (response.ok) {
        // return await response.json();
      } else {
        // throw new Error(await response.json());
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id={"password"} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginScreen;
