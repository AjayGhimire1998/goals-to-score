import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <header className="header">
        {user ? (
          <>
            <div className="logo">
              <Link to="/">GoalsToScore</Link>
            </div>
            <ul>
              <li>
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="logo">
              <Link to="/">GoalsToScore</Link>
            </div>
            <ul>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </ul>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
