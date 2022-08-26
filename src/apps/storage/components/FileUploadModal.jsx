import { useState } from "react";
import { Modal, ProgressBar } from "react-bootstrap"
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import { AccessedButton, AccessedOutlinedButton, CanceledButton } from "../../../components/common/Buttons";
import { uploadFile } from "../../../util/apis";

const FileUploadModal = (props) => {

    const [cookie, ,] = useCookies(['token', 'user_id']);
    const [searchParams, ] = useSearchParams();
    const [filesForUpload, setFilesForUpload] = useState({
        ready: [],
        end: [],
        start: false,
    });    
    const token = cookie.token;
    const userId = cookie.user_id;
    const directoryId = searchParams.get("id");

    const startUploadEvent = () => {
        // 업로드 시작 이벤트
        // 한개 이상의 파일이 로드되어야 한다.
        if(filesForUpload.ready.length === 0)
            alert("업로드할 파일을 선택해 주세요");
        else setFilesForUpload({
            ...filesForUpload,
            start: true,
        });
        
    }
    const clickSelectFilesEvent = () => {
        // 업로드할 파일 고르기
        document.getElementById('fileLoader').click();
    }
    const updateTargetFilesEvent = (e) => {
        // 골라진 파일들 useState에 집어넣기
        const filesArray = Object.entries(e.target.files).map(e => e[1]);
        setFilesForUpload({
            ...filesForUpload,
            ready: filesArray,
        });
    }

    if(!filesForUpload.start) {
        // 예상되는 파일 업로드 리스트 컴포넌트 생성
        const TargetFileListComponent = [];
        for(let i = 0; i < filesForUpload.ready.length; i++) {
            const file = filesForUpload.ready[i];
            TargetFileListComponent.push(
                <p key={i}>{file.name}</p>
            );
        }
        // 선택
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>업로드할 파일을 선택하세요</p>
                    <div>
                        {TargetFileListComponent}
                    </div>
                    <AccessedOutlinedButton onClick={clickSelectFilesEvent}>파일 선택</AccessedOutlinedButton>
                    <input type="file" id="fileLoader"
                        style={{ visibility: "hidden", display: "block" }}
                        onChange={updateTargetFilesEvent}
                        hidden multiple="multiple"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <AccessedButton onClick={startUploadEvent}>업로드</AccessedButton>
                    <CanceledButton onClick={props.onHide}>취소</CanceledButton>
                </Modal.Footer>
            </Modal>
        );
    } else if (filesForUpload.start && filesForUpload.ready.length > 0) {
        // 업로드 중
        const requestSize = filesForUpload.ready.length + filesForUpload.end.length;
        const percentage = (filesForUpload.end.length / requestSize) * 100;
        const targetFile = filesForUpload.ready.shift();

        uploadFile(token, userId, directoryId, targetFile).finally(() => {
            // 갯수 갱신
            filesForUpload.end.unshift(targetFile);
            setFilesForUpload({
                ...filesForUpload,
                ready: filesForUpload.ready,
                end: filesForUpload.end,
            });
        });

        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>업로드 중</p>
                    <ProgressBar variant="success" now={percentage} />
                </Modal.Body>
            </Modal>
        );
    } else {
        const onHideEvent = () => {
            window.location.replace(`/storage?id=${directoryId}`);
        }
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                onHide={onHideEvent}
                centered
            >
                <Modal.Header>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>업로드를 완료했습니다.</p>
                </Modal.Body>
                <Modal.Footer>
                    <AccessedButton onClick={onHideEvent}>확인</AccessedButton>
                </Modal.Footer>
            </Modal>
        );

    }
}

export default FileUploadModal;