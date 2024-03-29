import axios from "axios";
import { useNotifierContext } from "../../../providers";

const useVideoExercisesHook = () => {
  const { setNotifiers } = useNotifierContext();

  const getVideoExercises = async () => {
    try {
      let response = await axios.post("/api/exercises/get", { type: 2 });
      let data = await response.data;

      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      console.log(data);
      return data.exercises;
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/

  const deleteVideoExercise = async (_id) => {
    try {
      let response = await axios.post("/api/exercises/delete", {
        _id,
        type: 2,
      });
      let data = await response.data;

      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      setNotifiers({ success: data.messages });
      return true;
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/

  const addVideoExercise = async (formRef) => {
    try {
      let videoExerciseData = new FormData(formRef.current);

      let response = await axios.post("/api/exercises/add", videoExerciseData);
      let data = await response.data;

      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      setNotifiers({ success: data.messages });
      return data.videoExercise;
    } catch (e) {
      alert(e.message);
    }
  };
  /******************************************************/

  const editVideoExercise = async (formRef) => {
    try {
      let videoExerciseData = new FormData(formRef.current);

      let response = await axios.post("/api/exercises/edit", {
        ...videoExerciseData,
        type: 2,
      });
      let data = await response.data;

      console.log(data);
      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      setNotifiers({ success: data.messages });
      return data.videoExercise;
    } catch (e) {
      alert(e.message);
    }
  };

  return {
    getVideoExercises,
    deleteVideoExercise,
    addVideoExercise,
    editVideoExercise,
  };
};

export default useVideoExercisesHook;
