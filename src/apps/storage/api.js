import { getUserInfoByID, getDataListByRoot, getDataInfoByID } from "../../util/apis"

export const receiveDataForStoragePage = async (token, userId, rootId) => {
    // root_id를 0에서 시작
    const res = {err: 200};
    // UserInfo 
    let userData = await getUserInfoByID(token, userId);
    if(userData.err !== 200) return userData;
    res.user = userData.data;
    // Get Directory Information
    // 단 rootId == 0인 경우 최상위이므로 검색 제외
    rootId = parseInt(rootId);
    if(rootId === 0) res.rootName = '/';
    else {
        let rootInfo = await getDataInfoByID(token, userId, rootId);
        if(rootInfo.err !== 200) return rootInfo;
        if(!rootInfo.is_dir) return {err: 404, data: "해당 데이터가 존재하지 않습니다."};
        res.rootName = `${rootInfo.data.root}/${rootInfo.data.name}/`
    }
    // Directory From Root
    let dirData = await getDataListByRoot(token, res.user.name, rootId);
    if(dirData.err !== 200) return dirData;
    res.storages = dirData.data;
    return res;
}