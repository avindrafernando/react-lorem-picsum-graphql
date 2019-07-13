
import axios from "axios";

export default {
  getPosts() {
    return axios.get("https://picsum.photos/list")
      .then(response => {
        return response.data;
      });
  }
};
