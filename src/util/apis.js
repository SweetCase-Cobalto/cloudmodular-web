import axios from "axios";

let serverUrl = process.env.REACT_APP_SERVER_URL;

export const login = async (email, passwd) => {
    // 로그인
    let param = {
        issue: 'login',
        email: email,
        passwd: passwd,
    }
    let data = await axios({
        method: "post",
        url: `${serverUrl}/api/auth/token`,
        data: JSON.stringify(param),
        headers: {'Content-Type': 'Application/json'}
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const updateUser = async (token, userId, name, passwd) => {
    // 사용자 정보 업데이트
    let param = {
        name: name,
        passwd: passwd,
    }
    let data = await axios({
        method: "patch",
        url: `${serverUrl}/api/users/${userId}`,
        data: JSON.stringify(param),
        headers: {'Content-Type': 'Application/json', token: token}
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const removeUser = async (token, userId) => {
    
    let data = await axios({
        method: "delete",
        url: `${serverUrl}/api/users/${userId}`,
        headers: {token: token},
    }).then(() => {
        return {err: 204}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const getUserList = async (token, page) => {
    // 유저 리스트 가져오기
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/users/search?page_size=20&page=${page}`,
        headers: {token: token}
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const getUserInfoByID = async (token, userId) => {
    // UserID를 이용한 데이터 가져오기
    let data = await axios({
        method: 'get',
        url: `${serverUrl}/api/users/${userId}`,
        headers: {'token': token},
    }).then((res) => {
        return {err: 200, data: res.data}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
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
        return {err: err.response.status, data: err.response.data.detail};
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
        return {err: err.response.status, data: err.response.data.detail};
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
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const uploadFile = async (token, userId, directoryId, file) => {
    // 파일 업로드
    const formData = new FormData();
    formData.append("files", file);
    let data = await axios({
        method: "post",
        url: `${serverUrl}/api/users/${userId}/datas/${directoryId}`,
        headers: {"token": token, "Content-Type": "multipart/form-data"},
        data: formData,
    }).then((res) => {
        return {err: 201, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const downloadData = async (token, userId, dataId) => {
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}`,
        headers: {token: token},
        params: {method: "download"},
        responseType: "blob"
    }).then((res) => {
        return {err: 200, data: res};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const getInfoSharedDataBySharedId = async (sharedId) => {
    // Shared ID로 Shared File/Directory 정보 가지고 오기
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/datas/shares/${sharedId}/info`
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const downloadShared = async (sharedId) => {
    // 공유 데이터 다운로드
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/datas/shares/${sharedId}/download`,
        responseType: "blob"
    }).then((res) => {
        return {err: 200, data: res}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const removeData = async (token, userId, dataId) => {
    // 데이터 삭제
    let data = await axios({
        method: "delete",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}`,
        headers: {token: token}
    }).then(() => {
        return {err: 204}
    }).catch((err) => {
        return {err: err.response.status, message: err.response.data.detail};
    });
    return data;
}

export const changeDataName = async (token, userId, dataId, newName) => {
    // 데이터 이름 변경
    let data = await axios({
        method: "patch",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}`,
        headers: {'token': token, 'Content-Type': 'application/json' },
        data: JSON.stringify({name: newName})
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const setSharingToData = async (token, userId, dataId) => {
    // 데이터 공유
    let data = await axios({
        method: "post",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}/shares`,
        headers: {"token": token}
    }).then((res) => {
        return {err: 201, data: {sharedId: res.data.shared_id}}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const unsetSharingToData = async (token, userId, dataId) => {
    let data = await axios({
        method: "delete",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}/shares`,
        headers: {token: token}
    }).then(() => {
        return {err: 204}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const setDataFavorite = async (token, userId, dataId) => {
    let data = await axios({
        method: "post",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}/favorites`,
        headers: {token: token}
    }).then(() => {
        return {err: 201}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const unSetDataFavorite = async (token, userId, dataId) => {
    let data = await axios({
        method: "delete",
        url: `${serverUrl}/api/users/${userId}/datas/${dataId}/favorites`,
        headers: {token: token}
    }).then(() => {
        return {err: 201}
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const getFavoriteDatas = async (token, userName) => {
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/search/datas`,
        headers: {token: token},
        params: {
            user: userName,
            root_id: 0,
            recursive: 1,
            sort_name: 1,
            favorite: 1,
        }
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}

export const searchData = async (token, params) => {
    let data = await axios({
        method: "get",
        url: `${serverUrl}/api/search/datas`,
        headers: {token: token},
        params: {...params}
    }).then((res) => {
        return {err: 200, data: res.data};
    }).catch((err) => {
        return {err: err.response.status, data: err.response.data.detail};
    });
    return data;
}