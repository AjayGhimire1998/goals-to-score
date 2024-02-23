import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createUserGoal, closeGoalForm, getUserGoals } from "../features/goals/goalSlice";

function GoalForm() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    tasks: [],
  });

  const [error, setError] = useState("")

  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTaskChange = (e) => {
    setTask(e.target.value);
  };

  const onTaskAdd = (e) => {
    if (task.trim() !== "") {
      setFormData((prevState) => ({
        title: title,
        tasks: [...prevState.tasks, task],
      }));
      setTask("");
    }
  };
  

  const onSubmit =async (e) => {
    e.preventDefault();
    const goalData = {
      goal: {
        title: title,
        // user_id: localStorage.getItem("user")._id,
        tasks: formData.tasks,
      },
    };

    try {
      await dispatch(createUserGoal(goalData))
      await dispatch(getUserGoals());
      setTitle("");
      setTask("");
      setFormData({ title: "", tasks: [] });
    } catch (error) {
        setError("Something went wrong.")
    }
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div>
              <h3>
                Set a New Goal
                <p style={{ float: "right", cursor: "pointer" }}>
                  <FaWindowClose
                    size={"25px"}
                    
                    onClick={() => dispatch(closeGoalForm())}
                  />
                </p>
              </h3>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onTitleChange}
              placeholder="Name Your Goal"
            />

            <input
              name="task"
              id="task"
              value={task}
              onChange={onTaskChange}
              placeholder="Add Task to Your Goal"
            />
            <IoAddCircle className="icon" size={"40px"} onClick={onTaskAdd} />
            <br />
            <div>
              <ul>
                {formData?.tasks.map((task, index) => {
                  return (
                    <li key={task[index]}>
                      {index + 1}: {task?.toUpperCase()}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
          <small style={{color: "red"}}>{error}</small>
        </form>
      </section>
    </>
  );
}

export default GoalForm;
