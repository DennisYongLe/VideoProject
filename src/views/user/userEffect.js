import { get } from "../../utils/request";
const getUserImage = async function (params) {
  const result = await get("/api/users");

  if (result.code === "555") {
    localStorage.removeItem("usertoken");
    return null;
  }

  const imgSRC = "/api/users-avatar?url=" + result?.data?.userInfo?.avatar;
  return imgSRC;
};

export default getUserImage;
