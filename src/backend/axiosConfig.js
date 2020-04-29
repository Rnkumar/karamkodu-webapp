import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    const url = originalRequest.url.replace("http://localhost/karamkoduapi/","");

    if(url === "login"){
      return Promise.reject(error);  
    }

    if (error.response.status === 401) {
        switch(url){
            case "profile":
                window.location.url = "http://localhost:3000/login";
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
  }
);
