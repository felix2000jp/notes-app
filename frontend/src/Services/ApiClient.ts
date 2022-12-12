import axios from "axios";

const ApiClient = axios.create({ baseURL: "https://notes-web-app-backend-production.up.railway.app" });
export default ApiClient;
