import axios from "axios";
const instance = axios.create({
  // baseURL: ,
  timeout: 20000,
  responseType: "json",
  withCredentials: false, // 表示跨域请求时是否需要使用凭证
});
export const postComments = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("usertoken"),
        },
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
export const postVideoLike = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("usertoken"),
        },
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
export const getComment = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
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
export const getDanmuById = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params: { videoId: params.videoId } }).then(
      (respnse) => {
        resolve(respnse.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

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
// export const getCollections = (url,)
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
export const postVideos = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("usertoken"),
        },
        body: {
          url: data.url,
          title: data.title,
          thumbnail: data.thumbnail,
          duration: data.duration,
          type: data.type,
          area: data.area,
          videoTagList: data.videoTagList,
          description: data.description,
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

export const postVideolike = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, {
        headers: {
          token: localStorage.getItem("usertoken"),
          "Content-Type": "application/json",
        },
        body: { videoId: params.videoId },
      })
      .then(
        (respnse) => {
          console.log(respnse);
          resolve(respnse);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
export const dislikeVideolike = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, params, {
        headers: {
          token: localStorage.getItem("usertoken"),
          "Content-Type": "application/json",
        },
        body: { videoId: params.videoId },
      })
      .then(
        (respnse) => {
          console.log(respnse);
          resolve(respnse);
        },
        (err) => {
          reject(err);
        }
      );
  });
};

export const getDanmu = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: { videoId: params.videoId },
        headers: {
          responseType: "arraybuffer",
        },
      })
      .then(
        (respnse) => {
          resolve(respnse.data.data);
        },
        (err) => {
          reject(err);
        }
      );
  });
};
export const getVideolike = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        headers: {
          token: localStorage.getItem("usertoken"),
        },
        params: { videoId: data.videoId.value },
      })
      .then(
        (respnse) => {
          console.log(respnse);
          resolve(respnse);
        },
        (err) => {
          reject(err);
        }
      );
  });
};

export const postVideoFile = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          // "Content-Type": "application/json",
          token: localStorage.getItem("usertoken"),
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
