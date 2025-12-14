import { useState } from "react";
import { useWorkoutsContext } from "../hooks/userWorkoutsContext";

const WorkoutForm = ({ workout = null, mode = "create", onClose }) => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState(workout?.title || "");
  const [load, setLoad] = useState(workout?.load ?? "");
  const [reps, setReps] = useState(workout?.reps ?? "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutData = { title, load, reps };

    const url =
      mode === "edit" ? `/api/workouts/${workout._id}` : "/api/workouts";

    const method = mode === "edit" ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      body: JSON.stringify(workoutData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      if (mode === "create") {
        setTitle("");
        setLoad(0);
        setReps(0);
      }
      setError(null);
      setEmptyFields([]);

      dispatch({
        type: mode === "edit" ? "UPDATE_WORKOUT" : "CREATE_WORKOUT",
        payload: json,
      });
      console.log("New workout added");

      if (mode === "edit" && onClose) onClose();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{mode === "edit" ? "Edit Workout" : "Add a New Workout"}</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <div className={mode === "edit" ? "edit-buttons" : ""}>
        <button type="submit">
          {mode === "edit" ? "Save Changes" : "Add Workout"}
        </button>

        {mode === "edit" && (
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
