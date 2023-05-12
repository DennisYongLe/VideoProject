import { useRoute } from "vue-router";
import { getVideoAndUpInfo } from "../../utils/request";
const getVideoInfo = async function (params) {
  const route = useRoute();
  const videoId = route.params.id;

  const result = await getVideoAndUpInfo("/api/video", {
    videoId: videoId,
  });

  return { result };
};
export default getVideoInfo;
