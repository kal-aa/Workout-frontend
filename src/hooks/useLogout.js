import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = async () => {
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "RESET_WORKOUTS" });
  };

  return { logout };
};
