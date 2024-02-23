import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import { getUserGoals, openGoalForm, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { goals, isLoading, isGoalFormOpen } = useSelector(
    (store) => store.goals
  );

  useEffect(() => {
    // if (isError) {
    //   console.log(message);
    // }
    if (!user) {
      navigate("/login");
    }
    dispatch(getUserGoals());
    // if(user){
    //   toast.success(user.message)
    // }
    // if (message) {
    //   toast.error(message);
    // }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h3> Welcome {user && user.name}</h3>
      </section>

      {isGoalFormOpen ? (
        <GoalForm />
      ) : (
        <div className="form">
          <button
            className="btn btn-block"
            onClick={() => dispatch(openGoalForm())}
          >
            Set A Goal !
          </button>
        </div>
      )}
      <br />
      <section className="content">
        {!isLoading && goals ? (
          <div className="goals">
            {goals.map((goal, index) => (
              <GoalItem key={index} goal={goal} />
            ))}
          </div>
        ) : (
          <>
            <br />
            <h2>You have not set any goals.</h2>
          </>
        )}
      </section>
    </>
  );
}

export default Dashboard;
