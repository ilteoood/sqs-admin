import { ApiCall } from "../types";
import config from "../config.json";

const callApi = async (apiCall: ApiCall) => {
  fetch(`${config.apiEndpoint}/sqs`, {
    method: apiCall.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: apiCall.queue
      ? JSON.stringify({
          action: apiCall.action,
          queue: apiCall.queue,
        })
      : null,
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      apiCall.onSuccess(data);
    })
    .catch((error) => {
      apiCall.onError(error.message);
    });
};

export { callApi };
