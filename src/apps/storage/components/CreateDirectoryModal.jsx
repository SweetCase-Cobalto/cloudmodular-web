import { Form, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import { AccessedButton, CanceledButton } from "../../../components/common/Buttons";
import { createDirectory } from "../../../util/apis";

const CreateDirectoryModal = (props) => {
    const [searchParams, ] = useSearchParams();
    const [cookie, ,] = useCookies(["token", "user_id"]);
    let newDirectoryName = "";
    const directoryId = searchParams.get("id");

    const buttnOnClickHandler = () => {
        // 디렉토리 생성
        createDirectory(cookie.token, cookie.user_id, directoryId, newDirectoryName)
        .then((res) => {
            if(res.err === 201) {
                alert("폴더를 생성했습니다.");
            } else {
                alert(res.data);
            }
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
                <Modal.Title>폴더 만들기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>새로 생성 할 폴더 이름을 입력하세요.</p>
                <Form.Control
                    placehoder="폴더 이름"
                    onChange={e => {newDirectoryName = e.target.value;}}
                />
            </Modal.Body>
            <Modal.Footer>
                <AccessedButton onClick={buttnOnClickHandler}>만들기</AccessedButton>
                <CanceledButton onClick={props.onHide}>취소</CanceledButton>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateDirectoryModal;