import { useSelector } from "react-redux/es/exports";
import { Form } from 'react-bootstrap';
import styled from "styled-components";
import fileDownload from "js-file-download";

import FileOnlyImage from "../../../asset/file.svg";
import DirectoryOnlyImage from "../../../asset/directory.svg";
import FilesImage from "../../../asset/selectedFilesImg.svg";
import DirectoriesImage from "../../../asset/selectedDirectoriesImg.svg";
import FilesAndDirectoriesImage from "../../../asset/selectedFilesAndDirectoriesImg.svg";
import { AccessedButton, AccessedOutlinedButton, CanceledOutlinedButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import ChangeDataNameModal from "./ChangeDataNameModal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { downloadDataFromStorage } from "../api";
import { setSharingToData, unsetSharingToData, getInfoSharedDataBySharedId } from "../../../util/apis";
import { Modal } from "react-bootstrap";
import { Desktop } from "../../../components/common/ScreenResponsive";
import { unsecuredCopyToClipboard } from "../../../util/tools";

const downloadFilesEvent = (token, userId, userName, rootName, targets) => {
    // 파일 다운로드 이벤트
    const targetIds = targets.map((target) => target.id);
    downloadDataFromStorage(token, userId, userName, rootName, targetIds)
    .then((res) => {
        if (res.err === 200) {
            // 다운로드 가능
            const response = res.data;
            if(targets.length > 1) fileDownload(response, 'datas.zip');
            else if (targets[0].isDir) fileDownload(response, `${targets[0].name}.zip`);
            else fileDownload(response, targets[0].name);
        } else {
            // 다운로드 불가능
            alert(res.data);
        }
    }).catch(() => {
        // 알 수 없는 에러
        alert('Unknown Error');
    });
}

const FileStatusNoSelected = () => {
    // 아무것도 선택되지 않은 경우
    return (
        <Layer>
        </Layer>
    );
}

const FileStatusOneSelected = () => {
    // 하나 선택한 경우
    const [cookie, ,] = useCookies(["token", "user_id"]);
    const currentDir = useSelector(state => state.storageResult);
    const myAccount = useSelector(state => state.myAccount);
    const selectedIdxs = currentDir.selectedIdxs;
    const targetIdx = Array.from(selectedIdxs)[0];
    const targetFile = currentDir.dataList[targetIdx];
    const sharedId = parseInt(targetFile.sharedId);

    // Image
    const ImageComponent = targetFile.isDir ? DirectoryOnlyImage : FileOnlyImage;
    const altMsg = targetFile.isDir ? "directory" : "file";
    // Modals
    const [changeDataNameModalShow, setChangeDataNameModalShow] = useState(false);

    const CheckSharedModal = (props) => {
        // 공유가 되어있을 경우에 대한 모달
        // 공유 링크를 확인하거나 해제할 수 있다.
        const splited = document.location.href.split('/');
        const urlHead = `${splited[0]}://`;
        const hostUrl = document.location.href.split('/')[2];
        const sharedUrl = `${urlHead}${hostUrl}/storage/share/${sharedId}`;

        const unsetSharedEvent = () => {
            unsetSharingToData(cookie.token, cookie.user_id, targetFile.id)
            .then((res) => {
                if(res.err === 204) alert('공유 해제 되었습니다.');
                else alert(res.data);
                window.location.reload();
            });
        }

        const copySharedUrlEvent = () => {
            // Url 복사 이벤트
            if (window.isSecureContext) {
                navigator.clipboard.writeText(sharedUrl)
                .then(() => {
                    // TODO 추가 기능 구현 예정
                })
            } else {
                if (unsecuredCopyToClipboard(sharedUrl)) {
                    // 추가 기능 구현 예정
                }
            }
        }

        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    파일 공유 링크
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        id="url"
                        defaultValue={sharedUrl}
                        disabled
                    />
                </Modal.Body>
                <Modal.Footer>
                    <CanceledOutlinedButton onClick={copySharedUrlEvent}>URL 복사</CanceledOutlinedButton>
                    <AccessedOutlinedButton onClick={props.onHide}>확인</AccessedOutlinedButton>
                    <DangerOutlinedButton onClick={unsetSharedEvent}>공유 해제</DangerOutlinedButton>
                </Modal.Footer>
            </Modal>
        );
    }

    // 공유 관련 컴포넌트
    const SharedComponent = () => {

        const [checkSharedModalShow, setCheckSharedModalShow] = useState(false);

        const accessSharedEvent = () => {
            // Shared Button Event
            getInfoSharedDataBySharedId(sharedId)
            .then((res) => {
                if(res.err === 200) {
                    // 이미 공유되어 있음
                    // 공유 창 열기
                    setCheckSharedModalShow(true);
                } else {
                    // 공유 시도
                    setSharingToData(cookie.token, cookie.user_id, targetFile.id)
                    .then((res) => {
                        if(res.err === 201)
                            alert('공유가 완료되었습니다.');
                        else
                            alert(res.data);
                        window.location.reload();
                    })
                }
            });
        }

        return (
            <div style={{ width: "100%", "marginTop": "10px" }}>
                <AccessedOutlinedButton style={{ width: "100%" }} onClick={accessSharedEvent}>
                    공유
                </AccessedOutlinedButton>

                <CheckSharedModal
                    show={checkSharedModalShow}
                    onHide={() => setCheckSharedModalShow(false)}
                />
            </div>
        );
    }

    return (
        <Layer>
            <center>
                <img alt={altMsg} src={ImageComponent} height="100px" />
                <p style={{ marginTop: "15px" }}>{targetFile.name}</p>
                <p style={{ marginTop: "15px" }}>{targetFile.created}</p>
                <AccessedOutlinedButton
                    style={{ width: "100%" }}
                    onClick={() => setChangeDataNameModalShow(true)}
                >
                    이름 변경
                </AccessedOutlinedButton>
                <SharedComponent />
                <AccessedButton
                    style={{ width: "100%", "marginTop": "10px" }}
                    onClick={() => {downloadFilesEvent(cookie.token, cookie.user_id, myAccount.name, targetFile.root, [targetFile]);}}
                >
                    다운로드
                </AccessedButton>
            </center>

            <ChangeDataNameModal
                dataid={targetFile.id}
                dataname={targetFile.name}
                show={changeDataNameModalShow}
                onHide={() => setChangeDataNameModalShow(false)}
            />
        </Layer>
    );
}

const FileStatusMultipleSelected = (props) => {
    // 여러개 선택한 경우
    const currentDir = useSelector(state => state.storageResult);
    const myAccount = useSelector(state => state.myAccount);
    const [cookie, ,] = useCookies(["token", "user_id"]);
    const selectedIdxs = currentDir.selectedIdxs;
    const allowDownload = props.allowDownload;  // 여러개 다운로드가 허용되는 경우는 StoragePage뿐이다
    // 파일/디렉토리 갯수 구하기
    let fileNum = 0, directoryNum = 0;

    selectedIdxs.forEach((idx) => {
        if(currentDir.dataList[idx].isDir) directoryNum++;
        else fileNum++;
    });

    const DownloadButton = () => {
        // 다중 선택 다운로드 버튼
        return (<AccessedButton
            style={{ width: "100%", "marginTop": "10px" }}
            onClick = {() => {
                const targets = Array.from(selectedIdxs).map((idx) => currentDir.dataList[idx]);
                downloadFilesEvent(cookie.token, cookie.user_id, myAccount.name, targets[0].root, targets);
            }}
        >
            다운로드
        </AccessedButton>);
    }

    if(directoryNum === 0) {
        // 파일 여러개 선택
        return (
            <Layer>
                <center>
                    <img alt="file only" src={FilesImage} height="100px" />
                    <p style={{ marginTop: "20px" }}>파일 {fileNum}개 선택됨</p>
                    { allowDownload && <DownloadButton />}
                </center>
            </Layer>
        );
    } else if(fileNum === 0) {
        // 디렉토리 여러개 선택
        return (
            <Layer>
                <center>
                    <img alt="directory only" src={DirectoriesImage} height="100px" />
                    <p style={{ marginTop: "20px" }}>폴더 {directoryNum}개 선택됨</p>
                    { allowDownload && <DownloadButton />}
                </center>
            </Layer>
        );
    } else {
        // 파일, 디렉토리 전부 선택됨
        return (
            <Layer>
                <center>
                    <img alt="all" src={FilesAndDirectoriesImage} height="100px" />
                    <p style={{ marginTop: "20px" }}>폴더 {directoryNum}개 선택됨</p>
                    <p>파일 {fileNum}개 선택됨</p>
                    { allowDownload && <DownloadButton />}
                </center>
            </Layer>
        );
    }
}

const FileStatusComponent = (props) => {

    const currentDir = useSelector(state => state.storageResult);
    const selectedIdxs = currentDir.selectedIdxs;
    const allowDownload = props.allowDownload !== undefined ? props.allowDownload : true; // default값은 true

    switch (selectedIdxs.size) {
        case 0: return <Desktop><FileStatusNoSelected /></Desktop>
        case 1: return <Desktop><FileStatusOneSelected /></Desktop>
        default: return <Desktop><FileStatusMultipleSelected allowDownload={allowDownload}/></Desktop>
    }
}
export default FileStatusComponent;

const Layer = styled.div`
    padding-top: 200px;
    padding-left: 20px;
    padding-right: 20px;
`