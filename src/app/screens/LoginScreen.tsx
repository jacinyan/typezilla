import { useAuth } from "hooks";
import { FormEvent } from "react";

const LoginScreen = () => {
  const { login, user } = useAuth();

  //HTMLFormElement extends Elements
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user && <div>Successful logged in, username: {user?.name}</div>}
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id={"password"} />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginScreen;
