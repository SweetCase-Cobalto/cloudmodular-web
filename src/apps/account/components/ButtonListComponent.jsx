import { useState } from "react"
import styled from "styled-components";
import { Modal, Form } from "react-bootstrap";
import axios from 'axios';

import { AccessedButton } from "../../../components/common/Buttons";
import { useCookies } from "react-cookie";

const CreateUserModal = (props) => {
    // cookie data
    const [cookie, ,] = useCookies(['token', 'user_id']);
    const token = cookie.token;
    // input data
    let newEmail = '';
    let newNickname = '';
    let password = '';
    let rePassword = '';
    let storageSize = 0;

    const addUserEvent = () => {
        if(password !== rePassword) {
            alert('패스워드가 일치하지 않습니다.');
            return;
        }
        // 서버에 유저 생성 요청
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        axios({
            method: "post",
            url: `${serverUrl}/api/users`,
            headers: {'Content-Type': 'Application/json', token: token},
            data: JSON.stringify({
                email: newEmail,
                name: newNickname,
                passwd: password,
                storage_size: storageSize,
            }),
        })
        .then(() => {
            alert('사용자를 생성했습니다.')
        }).catch((err) => {
            alert(err.response.data.detail);
        }).finally(() => {
            window.location.reload();
        });
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>사용자 생성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="email" placeholder="이메일" onChange={(e) => { newEmail = e.target.value; }} />
                <Form.Control type="nickname" placeholder="닉네임" onChange={(e) => { newNickname = e.target.value; }} style={{ marginTop: "10px" }} />
                <Form.Control type="text" placeholder="패스워드" onChange={(e) => { password = e.target.value; }}  style={{ marginTop: "10px" }} />
                <Form.Control type="text" placeholder="패스워드 (재입력)" onChange={(e) => { rePassword = e.target.value; }}  style={{ marginTop: "10px" }} />
                <Form.Control type="number" placeholder="스토리지 용량" onChange={(e) => { storageSize = e.target.value; }} style={{ marginTop: "10px" }} />
            </Modal.Body>
            <Modal.Footer>
                <AccessedButton onClick={addUserEvent}>생성</AccessedButton>
            </Modal.Footer>
        </Modal>
    );
}

const ButtonListComponent = () => {

    // Modal states
    const [createUserModalShow, setCreateUserModalShow] = useState(false);

    return (
        <Layer>
            <AccessedButton onClick={() => {setCreateUserModalShow(true);}}>사용자 생성</AccessedButton>

            <CreateUserModal
                show={createUserModalShow}
                onHide={() => {setCreateUserModalShow(false);}}
            />
        </Layer>
    );

}
export default ButtonListComponent;

const Layer = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
`