import axios from "axios";

let serverUrl = process.env.REACT_APP_SERVER_URL;
export const getUserInfoByID = async (token, userId) => {
    // UserID를 이용한 데이터 가져오기
    let data = await axios({
        method: 'get',
        url: `${serverUrl}/api/users/${userId}`,
        headers: {'token': token},
    }).then((res) => {
        return {err: 200, data: res.data}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.statusText};
    });
    return data;
}

export const getDataInfoByID = async(token, userId, dataId) => {
    // ID를 이용해 데이터정보 조회
    let data = await axios({
        method: 'get',
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}`,
        headers: {'token': token},
        params: {"method": "info"},
    })
    .then((res) => {
        return {err: 200, data: res.data};
    })
    .catch((err) => {
        return {err: err.response.status, data: err.response.statusText};
    });
    return data;
}

export const getDataListByRoot = async (token, userName, rootId) => {
    // 데이터 검색이 아닌 해당 루트에 존재하는 데이터를 가져올 때 사용
    let data = await axios({
        method: 'get',
        url: `${serverUrl}/api/search/datas`,
        headers: {'token': token},
        params: {
            'user': userName,
            'root_id': rootId,
            'sort_create': 1,
            'sort_name': 1,
        }
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.statusText};
    });
    return data;
}

export const createDirectory = async (token, userId, directoryId, directoryName) => {
    // 디렉토리 생성
    let data = await axios({
        method: "post",
        url: `${serverUrl}/api/users/${userId}/datas/${directoryId}`,
        headers: {'token': token, 'Content-Type': 'application/json' },
        data: JSON.stringify({dirname: directoryName})
    }).then((res) => {
        return {err: 201, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.statusText};
    });
    return data;
}

export const removeData = async (token, userId, dataId) => {
    // 데이터 삭제
    let data = await axios({
        method: "delete",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}`,
        headers: {"token": token}
    }).then(() => {
        return {err: 204}
    }).catch((err) => {
        return {err: err.response.status, message: err.response.statusText};
    });
    return data;
}