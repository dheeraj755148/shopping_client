import React, {useContext} from "react";
import { LoginContext } from "./context/contextProvider";
function Delete({ deleteId, get }) {


  const { account, setAccount } = useContext(LoginContext);

  const removeData = async (req, res) => {
    try {
      const res = await fetch(`http://localhost:8005/remove/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 400 || !data) {
        console.log("error");
      } else {
       // console.log("Data deleted");
        setAccount(data)
        get();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return <button onClick={() => removeData(deleteId)}>Delete</button>;
}

export default Delete;
