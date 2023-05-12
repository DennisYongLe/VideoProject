import axios from "axios";
const instance = axios.create({
  // baseURL: ,
  timeout: 10000,
  responseType: "json",
  withCredentials: false, // 表示跨域请求时是否需要使用凭证
});
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { headers: { token: localStorage.getItem("usertoken") } })
      .then(
        (respnse) => {
          // resolve(respnse.data?.data?.userInfo?.avatar);

          resolve(respnse.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
export const getUserInfoById = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: { upUserId: params.upUserId },
      })
      .then(
        (respnse) => {
          // resolve(respnse.data?.data?.userInfo?.avatar);

          resolve(respnse);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
export const getWithoutToken = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: { size: params.size, no: params.no, area: params.area },
        headers: {
          responseType: "arraybuffer",
        },
      })
      .then(
        (respnse) => {
          resolve(respnse);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
export const getVideoAndUpInfo = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: { videoId: params.videoId },
        headers: { token: localStorage.getItem("usertoken") },
      })
      .then(
        (respnse) => {
          resolve(respnse.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
};

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (respnse) => {
          // console.log(respnse.data);
          resolve(respnse.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
