import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : `https://${process.env.REACT_APP_SITE_NAME}/api`;

const publicFetch = axios.create({ baseURL });

export { publicFetch, baseURL }
