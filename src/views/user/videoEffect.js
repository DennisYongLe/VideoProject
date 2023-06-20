import { useRoute } from "vue-router";
import { getVideoAndUpInfo, getWithoutToken } from "../../utils/request";
const getVideoInfo = async function (params) {
  const route = useRoute();
  const videoId = route.params.id;
  const result = await getVideoAndUpInfo("/api/video", {
    videoId: videoId,
  });

  return { result };
};
export default getVideoInfo;
export const videoInfoEffect = function () {
  const getvideoInfo = async function () {
    const result = await getWithoutToken("/api/videos", {
      size: 100,
      no: 1,
      area: 1,
    });
    return result.data;
  };
  return { getvideoInfo };
};
