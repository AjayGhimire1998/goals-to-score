import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      // toast.success(localStorage.getItem("user").message)
      console.log(message);
      navigate("/");
    }

    dispatch(reset());
    // return () => {
    //   dispatch(reset());
    // };
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const handleGuestLogin = () => {
    const userData = {
      email: "iamguestuser@gmail.com",
      password: "guest123",
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={onChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "500px",
            }}
          >
            <div className="form-froup">
              <button
                type="submit"
                className="btn btn-block"
                style={{ maxWidth: "300px" }}
              >
                Login
              </button>
            </div>
            <div className="form-froup">
              <button
                className="btn btn-block"
                onClick={handleGuestLogin}
                style={{ backgroundColor: "purple", maxWidth: "300px" }}
              >
                Quick Guest Login
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
