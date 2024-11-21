import axios from "axios";

const BASEURL = "https://dummyjson.com";
const timeoutmsg = "waitinig for too long... Request aborted"

const config = {
    baseURL : BASEURL,
    timeout : 20000,
    timeoutErrorMessage : timeoutmsg
}

const axiosInstance = axios.create(config)

export default axiosInstance;
