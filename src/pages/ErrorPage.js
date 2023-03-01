import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <main>
        <h1>Oops, an error has occurred</h1>
        <p>Could not find this page😥</p>
        <p>
          Go back <Link to="/">home</Link>
        </p>
      </main>
    </>
  );
};
export default ErrorPage
