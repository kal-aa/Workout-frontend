import { useState } from "react";
import { useWorkoutsContext } from "../hooks/userWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import WorkoutForm from "./WorkoutForm";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <WorkoutForm
          workout={workout}
          mode="edit"
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <h4>{workout.title}</h4>
          <p>
            <strong>Load (kg): </strong>
            {workout.load || 0}
          </p>
          <p>
            <strong>Reps: </strong>
            {workout.reps || 0}
          </p>
          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
          <span className="material-symbols-outlined" onClick={handleClick}>
            delete
          </span>
          <button
            className="material-symbols-outlined icon-button"
            onClick={() => setIsEditing(true)}
          >
            edit
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
