import { get_users } from "../reducers/users.reducer";
import axios from "axios";

const getUsers = () => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/user`)
        .then((res) => {
            
          console.log('getUsers ex...: '+ res.data)
          dispatch( get_users( res.data ) );
        })
        .catch((err) => console.log(err));
    };
  };

  export default getUsers ;