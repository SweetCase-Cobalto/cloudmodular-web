import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Modal, ModalBody, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AccessedButton, CanceledButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import { removeData } from "../../../util/apis";

const RemoveDataModal = (props) => {
    const currentDir = useSelector(state => state.storageResult);
    const [cookie, ,] = useCookies(['token', 'user_id']);   // 쿠키
    const idxs = currentDir.selectedIdxs;   // 삭제 대상의 리스트 인덱스들
    const dataList = currentDir.dataList;   // 데이터 정보 리스트: 여기에서 ID값을 빼내옴
    const [removeList, setRemoveList] = useState(undefined);

    if(idxs.size < 1) {
        // 삭제 대상의 어떤 데이터도 선택되지 않음
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>데이터 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>삭제할 데이터를 선택해 주세요</p>
                </Modal.Body>
                <Modal.Footer>
                    <AccessedButton onClick={props.onHide}>확인</AccessedButton>
                </Modal.Footer>
            </Modal>
        );
    } else if(removeList !== undefined && removeList.length > 0) {
        // 삭제 진행 중
        const percentage    = ((idxs.size - removeList.length) / idxs.size) * 100;
        const removedIdx    = removeList[0];
        const removeId      = dataList[removedIdx].id;
        // 서버에서 데이터 삭제
        // removeList에서 데이터 하나 제거
        removeData(cookie.token, cookie.user_id, removeId).finally(() => {
            // 성공 여부 상관없이 removeList에서 데이터 제거
            setRemoveList(removeList.filter(e => e !== removedIdx));
        });

        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>데이터 삭제</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <p>삭제 중</p>
                    <ProgressBar variant="success" now={percentage} />
                </ModalBody>
            </Modal>
        );
    } else if(removeList !== undefined && removeList.length === 0) {
        // 삭제 왼료 창
        // idxs 초기화
        const onHideEvent = () => {
            // Reload Browser
            window.location.reload();
        }
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                onHide={onHideEvent}
                centered
            >
                <Modal.Header>
                    <Modal.Title>데이터 삭제</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <p>삭제가 완료 되었습니다.</p>
                </ModalBody>
                <Modal.Footer>
                    <AccessedButton onClick={onHideEvent}>확인</AccessedButton>
                </Modal.Footer>
            </Modal>
        )
    } else {
        // 삭제 여부 묻는 데이터
        // 삭제 데이터 명단 작성
        const RemovedListElements = [];
        idxs.forEach((dataIdx, i, ) => {
            RemovedListElements.push(
                <p key={i}>{dataList[dataIdx].name}</p>
            );
        });
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>데이터 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RemovedListForm>
                        {RemovedListElements}
                    </RemovedListForm>
                    <p>정말 삭제하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <DangerOutlinedButton onClick={() => setRemoveList(Array.from(idxs))}>삭제</DangerOutlinedButton>
                    <CanceledButton onClick={props.onHide}>취소</CanceledButton>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default RemoveDataModal;

const RemovedListForm = styled.div`
    width: 100%;
    height: 300px;
    overflow: scroll;
    padding: 5px;
`;