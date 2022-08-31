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
        endMsg: [], // 완료시 에러코드 및 메세지 저장
        start: false,
    });    
    const token = cookie.token;
    const userId = cookie.user_id;
    const directoryId = searchParams.get("id");

    const getUploadStatusItem = (res, i) => {
        /*
            업로드 또는 업로드가 완료된 상태일 때
            파일의 업로드 여부를 출력하기 위한 파일 업로드 상태 리스트
        */
        const filename = filesForUpload.end[i].name;
        let msg = res.err === 201 ? "OK" : res.data;
        let msgStyleConfig = res.err === 201 ? { color: "green" } : { color: "red" }

        return (
            <div style={{ display: "flex" }} key={i}>
                <p style={{ marginRight: "5px" }}>{filename}</p>
                <p style={msgStyleConfig}>{msg}</p>
            </div>
        );
        //return <p key={i}>{msg}</p>
    }

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

        uploadFile(token, userId, directoryId, targetFile)
        .then((res) => {
            filesForUpload.endMsg.unshift(res);
        }).catch(() => {
            filesForUpload.endMsg.unshift({err: 500, data: "server error"});
        }).finally(() => {
            // 갯수 갱신
            filesForUpload.end.unshift(targetFile);
            setFilesForUpload({
                ...filesForUpload,
                ready: filesForUpload.ready,
                end: filesForUpload.end,
                endMsg: filesForUpload.endMsg,
            });
        });

        // 현재 상태 리스트 컴포넌트로 생성
        const StatusListComponent = filesForUpload.endMsg.map(getUploadStatusItem);

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
                    <div>
                        {StatusListComponent}
                    </div>
                    <p>업로드 중</p>
                    <ProgressBar variant="success" now={percentage} />
                </Modal.Body>
            </Modal>
        );
    } else {
        // 현재 상태 리스트 컴포넌트로 생성
        const StatusListComponent = filesForUpload.endMsg.map(getUploadStatusItem);
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
                    <div>
                        {StatusListComponent}
                    </div>
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