import axios from "axios";
import { useNotifierContext } from "../../../providers";

const useHallsHook = () => {
  const { setNotifiers } = useNotifierContext();

  const getHalls = async () => {
    try {
      let response = await axios.post("/api/halls/get", { type: 1 });
      let data = await response.data;

      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      console.log(data);
      return data.halls;
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/

  const deleteHall = async (_id) => {
    try {
      let response = await axios.post("/api/halls/delete", {
        _id,
        type: 1,
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

  const addHall = async (formRef) => {
    try {
      let hallData = new FormData(formRef.current);

      let subscriptions = hallData.get("subscriptions"),
        name = hallData.get("name"),
        city = hallData.get("city"),
        brief = hallData.get("brief");

      //Manibulate subscriptions
      subscriptions = subscriptions.split("\n");
      subscriptions = subscriptions.map((s) => ({
        name: s.split(",")[1],
        price: s.split(",")[0],
      }));
      hallData.set("subscriptions", JSON.stringify(subscriptions));

      let location = { lng: 30.156347123, lat: 29.156841536 };

      let response = await axios.post("/api/halls/add", {
        brief,
        name,
        city,
        subscriptions,
        location,
      });
      let data = await response.data;

      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      setNotifiers({ success: data.messages });
      return data.hall;
    } catch (e) {
      alert(e.message);
    }
  };
  /******************************************************/

  const editHall = async (formRef) => {
    try {
      let hallData = new FormData(formRef.current);

      let response = await axios.post("/api/halls/edit", hallData);
      let data = await response.data;

      if (!data.status) {
        setNotifiers({ errors: data.errors });
        return false;
      }
      setNotifiers({ success: data.messages });
      return data.hall;
    } catch (e) {
      alert(e.message);
    }
  };

  return {
    getHalls,
    deleteHall,
    addHall,
    editHall,
  };
};

export default useHallsHook;
