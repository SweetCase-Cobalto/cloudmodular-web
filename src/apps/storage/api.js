import { getUserInfoByID, getDataListByRoot } from "../../util/apis"

export const receiveDataForStoragePage = async (token, userId, rootId) => {
    // root_id를 0에서 시작

    const res = {err: 200};
    // UserInfo 
    let userData = await getUserInfoByID(token, userId);
    if(userData.err !== 200) return userData;
    res.user = userData.data;
    // Directory From Root
    let dirData = await getDataListByRoot(token, res.user.name, rootId);
    if(dirData.err !== 200) return dirData;
    res.storages = dirData.data;

    return res;
}