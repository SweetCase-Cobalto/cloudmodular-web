import axios from "axios";
import { getUserInfoByID, getDataListByRoot, getDataInfoByID, getFavoriteDatas } from "../../util/apis"

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
        if(!rootInfo.data.is_dir) return {err: 404, data: "해당 데이터가 존재하지 않습니다."};
        res.rootName = `${rootInfo.data.root}${rootInfo.data.name}/`
    }
    // Directory From Root
    let dirData = await getDataListByRoot(token, res.user.name, rootId);
    if(dirData.err !== 200) return dirData;
    res.storages = dirData.data;
    return res;
}

export const receiveDataForFavoritePage = async (token, userId) => {
    const res = {err: 200};
    // UserInfo
    let userData = await getUserInfoByID(token, userId);
    if(userData.err !== 200) return userData;   // Error occur
    res.user = userData.data;
    // Get Favorite Data
    let result = await getFavoriteDatas(token, userData.data.name);
    if(result.err !== 200) return result;   // Error occur
    res.storages = result.data;
    return res;
}

export const getDirectoryIDForMoveByTag = async (token, user, root, name) => {
    // 태그 클릭시 해당 태그에 대한 위치로 이동
    // 이때 name, root를 이용해서 먼저 데이터의 ID부터 검색한다.
    let serverUrl = process.env.REACT_APP_SERVER_URL;
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/search/datas`,
        headers: {"token": token},
        params: {
            "user": user,
            "root": root,
            "word": name,
        }
    }).then((res) => {
        // 찾기
        // root/name과 일치하는 데이터가 없을 수 있음
        let id = -1;
        res.data.forEach(data => {
            if((data.name === name) && data.is_dir) {
                id = data.id;
                return false;
            }
        });
        if(id === -1)
            // 못찾음
            return {err: 404, data: "해당 폴더는 존재하지 않습니다."};
        else
            return {err: 200, data: {id: id}};
    }).catch((err) => {
        return {err: err.response.status, message: err.response.statusText};
    });
    return data;
}
