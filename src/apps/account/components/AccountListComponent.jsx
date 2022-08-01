import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Card, ListGroup, Form } from "react-bootstrap";

import { SubTitle } from "../../../components/common/Titles";
import { AccessedOutlinedButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import { useState } from "react";
import { removeUser, updateUser } from "../../../util/apis";

const AccountItem = (props) => {
    const [cookie, ,] = useCookies(['token']);
    const token = cookie.token;
    const [modifyAvailable, setModifyAvailable] = useState(false)
    const user = props.user;
    // user data
    const email = user.email;
    const name = user.name;
    const storageSize = user.storageSize;
    // new input data
    let inputedName = name;
    let inputedPassword = '';
    let inputedPasswordRepeat = '';
    // modify event
    const modifyEvent = () => {
        let newPassword = inputedPassword !== '' ? inputedPassword : '';
        if(newPassword !== '' && inputedPassword !== inputedPasswordRepeat) {
            alert('패스워드가 일치하지 않습니다.');
            return;
        }
        updateUser(token, user.id, inputedName, newPassword)
        .then((res) => {
            if(res.err === 200) {
                alert('수정을 완료했습니다.');
                window.location.reload();
            }
            else alert(res.data);
        });
    }
    // removeEvent
    const removeEvent = () => {
        removeUser(token, user.id)
        .then((res) => {
            if(res.err === 204) {
                alert('삭제를 완료했습니다.');
                window.location.reload();
            } else {
                alert(res.data);
            }
        });
    }

    return (
        <ListGroup.Item style={{display: "flex"}}>
            <div style={{ width: "auto", display: "flex" }}>
                <Form.Control style={{ marginRight: "10px" }} type="text" defaultValue={email} disabled />
                <Form.Control style={{ marginRight: "10px" }} type="text" defaultValue={inputedName} placehoder="새로 변경 할 닉네임을 적으세요."
                    onChange={(e) => {
                        inputedName = e.target.value;
                        if(inputedName === name && inputedPassword === '' && modifyAvailable)
                            // 변경사항 없음
                            setModifyAvailable(false);
                        else if(inputedName !== name && !modifyAvailable)
                            // 변경사항 생김
                            setModifyAvailable(true);

                    }}/>
                <Form.Control style={{ marginRight: "10px" }} type="text" defaultValue={`${storageSize}GB`} disabled />
                <Form.Control style={{ marginRight: "10px" }} type="password" placeholder="패스워드"
                    onChange={(e) => {
                        inputedPassword = e.target.value;
                        if(inputedPassword === '' && inputedName === name && modifyAvailable)
                            // 변경사항 없음
                            setModifyAvailable(false);
                        else if(inputedPassword !== '' && !modifyAvailable)
                            // 변경사항 생김
                            setModifyAvailable(true);
                    }} />
                <Form.Control style={{ marginRight: "10px" }} type="password" placeholder="패스워드(재입력)"
                    onChange={(e) => { inputedPasswordRepeat = e.target.value; }} />
            </div>
            <div style={{ width: "200px", dispaly: "flex" }}>
                { modifyAvailable && <AccessedOutlinedButton style={{ marginRight: "10px", width: "40%",}} onClick={modifyEvent}>수정</AccessedOutlinedButton>}
                { !modifyAvailable && <AccessedOutlinedButton style={{ marginRight: "10px", width: "40%",}} disabled>수정</AccessedOutlinedButton>}
                <DangerOutlinedButton style={{ marginRight: "10px", width: "40%" }} onClick={removeEvent}>삭제</DangerOutlinedButton>
            </div>
        </ListGroup.Item>
    );
}


const AccountListComponent = () => {
    // account list (redux data)
    const accountListData = useSelector(state => state.accountList);
    const accountList = accountListData.accounts.map(
        (user, index) => <AccountItem key={index} user={user}/>);

    return (
        <div style={{marginTop: "40px"}}>
            <SubTitle>사용자 목록</SubTitle>
            <Card style={{ marginTop: "40px" }}>
                <ListGroup>
                    {accountList}
                </ListGroup>
            </Card>
        </div>
    );
}
export default AccountListComponent;
