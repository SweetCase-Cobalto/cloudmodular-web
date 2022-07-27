import { Form, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { AccessedButton, CanceledButton } from "../../../components/common/Buttons";
import { changeDataName } from "../../../util/apis";

const ChangeDataNameModal = (props) => {

    const [cookie, ,] = useCookies(["token", "user_id"]);
    const targetId = props.dataid;
    const targetName = props.dataname;
    let newName = targetName;

    const changeNameEvent = () => {
        changeDataName(cookie.token, cookie.user_id, targetId, newName)
        .then((res) => {
            if(res.err === 200)
                alert("이름 변경에 성공했습니다.");
            else
                alert(res.data);
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
                <Modal.Title>이름 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>변경 할 이름을 입력해 주세요.</p>
                <Form.Control
                    placeholder="새로 변경할 이름 작성"
                    onChange={e => {newName = e.target.value;}}
                    defaultValue={newName}
                />
            </Modal.Body>
            <Modal.Footer>
                <AccessedButton onClick={changeNameEvent}>변경</AccessedButton>
                <CanceledButton onClick={props.onHide}>취소</CanceledButton>
            </Modal.Footer>
        </Modal>
    );
}

export default ChangeDataNameModal;