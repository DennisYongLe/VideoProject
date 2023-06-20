import { get } from "../../utils/request";
const getUserImage = async function (params) {
  const result = await get("/api/users");

  if (result.code === "555") {
    localStorage.removeItem("usertoken");
    return null;
  }
  if (result?.data?.userInfo?.avatar) {
    const imgSRC = "/api/users-avatar?url=" + result?.data?.userInfo?.avatar;
    return imgSRC;
  }
  return null;
};

export default getUserImage;
