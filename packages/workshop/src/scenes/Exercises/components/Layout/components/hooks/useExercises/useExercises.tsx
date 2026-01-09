import { exerciseMapping, exercises } from "./exercises";
import { useLocation } from "react-router-dom";

const getActive = (path: string): number => {
  const exercise = path.split("/").at(-1);

  if (!exercise) return 0;

  return exerciseMapping[exercise];
};

export const useExercises = () => {
  const location = useLocation();

  return {
    exercises,
    active: getActive(location.pathname) ?? 0,
  };
};
