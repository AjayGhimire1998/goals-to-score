import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserGoal,
  openAddTaskForm,
  setGoalId,
  replaceUpdatedGoal,
  setTaskId,
} from "../features/goals/goalSlice";
import TaskForm from "./TaskForm";
import axios from "axios";
// import { API_URL } from "../features/goals/goalServices";

function GoalItem({ goal }) {
  const API = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const { isAddTaskFormOpen, goalId, goals} = useSelector(
    (store) => store.goals
  );

  const dateAndTime = new Date(goal.created_at).toLocaleString("en-AU");
  const indexOfComma = dateAndTime.indexOf(",");
  const dateCreated = dateAndTime.slice(0, indexOfComma);
  const timeCreated = dateAndTime.slice(indexOfComma + 1);
// console.log(goals);
  // console.log(taskId);


  const onToggle = async (e, task_id) => {
    e.preventDefault();
    dispatch(setTaskId(task_id));
    const updatingTask = goals
      ?.find((item) => item.id === goal.id)
      .goals_to_score_tasks.find((task) => task.id === task_id);

    const data = {
      active: !updatingTask.active,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    const res = await axios.put(
      `${API}goal/goals/${goal.id}/tasks/${task_id}/toggle`,
      data,
      config
    );
    // console.log(res.data);
    dispatch(replaceUpdatedGoal(res.data));

  };

  return (
    <div className="goal">
      <div>
        <div className="edit-delete">
          <small>Date: {dateCreated}</small>
          <small>Time: {timeCreated}</small>
        </div>
        <br />
        <br />
        <h1>{goal && goal.title && goal.title.toUpperCase()}</h1>
        <br />
        <ul>
          {goal && goal.goals_to_score_tasks && goal.goals_to_score_tasks.slice().sort((a, b) => a.id - b.id).map((task, index) => {
            return (
              <div key={index}>
                <div className="task-items">
                  <li
                    // key={task.id}
                    style={
                      task.active === false
                        ? { textDecoration: "line-through" }
                        : {
                            textShadow: " 0 0 1em white, 0 0 0.2em white",
                            fontWeight: "bolder",
                          }
                    }
                  >
                    {index + 1}: {task?.task.toUpperCase()}
                  </li>
                  <div>
                    <small style={{ fontSize: "10px" }}>pending..</small>
                    <label className="switch">
                      <input
                        type="checkbox"
                        value={task.active}
                        className="checkbox"
                        checked={!task.active}
                        onChange={(e) => onToggle(e, task.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                    <small style={{ fontSize: "10px" }}>..done</small>
                  </div>
                </div>
                <hr />
                <br />
              </div>
            );
          })}
        </ul>
        <br />
        {isAddTaskFormOpen && goal && goal.id === goalId ? (
          <TaskForm goal={goal} />
        ) : null}
        <br />
        <div className="edit-delete">
          <FaPlus
            size={"30px"}
            className="icon"
            onClick={() => {
              dispatch(setGoalId(goal.id));
              dispatch(openAddTaskForm());
            }}
          />
          <IoMdDoneAll
            size={"30px"}
            className="icon"
            onClick={() => dispatch(deleteUserGoal(goal.id))}
          />
        </div>
      </div>
    </div>
  );
}

export default GoalItem;
