import { login, updateUser } from "../../util/apis"

export const updateMyAccountFromServer = async (token, userId, email, name, passwd, newPasswd) => {
    const result = {
        success: true,
        msg: null,
    };
    if(passwd !== '') {
        // 패스워드 변경이 필요한 경우
        // 이메일 패스워드 체크를 한다.
        let response = await login(email, passwd);
        if(response.err !== 200) {
            result.success = false;
            result.msg = "패스워드가 정확하지 않습니다.";
        }
    }
    if(!result.success) return result;
    // 내 정보 업데이트
    let response = await updateUser(token, userId, name, newPasswd);
    if(response.err !== 200) {
        result.success = false;
        result.msg = response.data;
    } else {
        result.changed = response.data;
    }
    return result;
}