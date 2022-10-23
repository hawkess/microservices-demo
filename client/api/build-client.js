import axios from "axios";

const buildClient = ({ req }) => {
  let baseUri = "/";
  let headers = {};
  if (typeof window === "undefined") {
    baseUri = "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";
    headers = req.headers;
  }
  return axios.create({
    baseURL: baseUri,
    headers: headers,
  });
};

export default buildClient;
