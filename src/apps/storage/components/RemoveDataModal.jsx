import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AccessedButton, CanceledButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import { useSearchParams } from "react-router-dom";

const RemoveDataModal = (props) => {
    const currentDir = useSelector(state => state.storageResult);
    const idxs = currentDir.selectedIdxs;
    const dataList = currentDir.dataList;

    const removeEvent = () => {
        // 데이터 삭제
        idxs.forEach((dataIdx) => {
            // 순회하면서 삭제
            const removedId = dataList[dataIdx].id;
        });
        // Reload
        window.location.reload();
    }


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
    }
    // 삭제 데이터 명단 작성
    const RemovedList = [];
    idxs.forEach((dataIdx, i, ) => {
        RemovedList.push(<p key={i}>{dataList[dataIdx].name}</p>);
    })
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
                    {RemovedList}
                </RemovedListForm>
                <p>정말 삭제하시겠습니까?</p>
            </Modal.Body>
            <Modal.Footer>
                <DangerOutlinedButton onClick={removeEvent}>삭제</DangerOutlinedButton>
                <CanceledButton onClick={props.onHide}>취소</CanceledButton>
            </Modal.Footer>
        </Modal>
    )
}
export default RemoveDataModal;

const RemovedListForm = styled.div`
    width: 100%;
    height: 300px;
    overflow: scroll;
    padding: 5px;
`;