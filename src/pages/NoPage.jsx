import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "90px" }}>404</h1>
      <h3 className="mb-3">This Page is not found</h3>
      <Link to="/">
        <button className="btn btn-primary">Go Back to Home</button>
      </Link>
      <img
        className="img-fluid mt-3"
        style={{ height: "300px" }}
        alt="not found"
        src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/not-found.svg"
      />
    </div>
  );
}
