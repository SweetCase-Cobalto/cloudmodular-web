import axios from "axios";

export const getUserInfoByID = async (token, userId) => {
    // UserID를 이용한 데이터 가져오기
    let server_url = process.env.REACT_APP_SERVER_URL;
    let data = await axios({
        method: 'get',
        url: `${server_url}/api/users/${userId}`,
        headers: {'token': token},
    }).then((res) => {
        return {err: 200, data: res.data}
    }).catch((err) => {
        if(err.code === 401)        return {err: 401, data: "권한이 없습니다."};
        else if(err.code == 404)    return {err: 404, data: "없는 사용자 입니다."};
        else                        return {err: 500, data: "server error"};
    });
    return data;
}

export const getDataListByRoot = async (token, userName, rootId) => {
    // 데이터 검색이 아닌 해당 루트에 존재하는 데이터를 가져올 때 사용
    let server_url = process.env.REACT_APP_SERVER_URL;
    let data = await axios({
        method: 'get',
        url: `${server_url}/api/search/datas`,
        headers: {'token': token},
        params: {
            'user': userName,
            'root_id': rootId,
            'sort_create': 1,
            'sort_name': 1,
        }
    }).then((res) => {
        return {err: 200, data: res.data}
    }).catch((err) => {
        if(err.code === 401)        return {err: 401, data: "권한이 없습니다."};
        else if(err.code == 404)    return {err: 404, data: "없는 사용자 입니다."};
        else                        return {err: 500, data: "server error"};
    });
    return data;
}