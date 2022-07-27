import { useSelector } from "react-redux/es/exports";
import styled from "styled-components";

import FileOnlyImage from "../../../asset/file.svg";
import DirectoryOnlyImage from "../../../asset/directory.svg";
import FilesImage from "../../../asset/selectedFilesImg.svg";
import DirectoriesImage from "../../../asset/selectedDirectoriesImg.svg";
import FilesAndDirectoriesImage from "../../../asset/selectedFilesAndDirectoriesImg.svg";
import { AccessedOutlinedButton } from "../../../components/common/Buttons";
import ChangeDataNameModal from "./ChangeDataNameModal";
import { useState } from "react";


const FileStatusNoSelected = () => {
    // 아무것도 선택되지 않은 경우
    return (
        <Layer>
        </Layer>
    );
}

const FileStatusOneSelected = () => {
    // 하나 선택한 경우
    const currentDir = useSelector(state => state.storageResult);
    const selectedIdxs = currentDir.selectedIdxs;
    const targetIdx = Array.from(selectedIdxs)[0];
    const targetFile = currentDir.dataList[targetIdx];

    const ImageComponent = targetFile.isDir ? DirectoryOnlyImage : FileOnlyImage;
    const altMsg = targetFile.isDir ? "directory" : "file";

    const [changeDataNameModalShow, setChangeDataNameModalShow] = useState(false);

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

const FileStatusMultipleSelected = () => {
    // 여러개 선택한 경우
    const currentDir = useSelector(state => state.storageResult);
    const selectedIdxs = currentDir.selectedIdxs;
    // 파일/디렉토리 갯수 구하기
    let fileNum = 0, directoryNum = 0;

    selectedIdxs.forEach((idx) => {
        if(currentDir.dataList[idx].isDir) directoryNum++;
        else fileNum++;
    });

    if(directoryNum === 0) {
        // 파일 여러개 선택
        return (
            <Layer>
                <center>
                    <img alt="file only" src={FilesImage} height="100px" />
                    <p style={{ marginTop: "20px" }}>파일 {fileNum}개 선택됨</p>
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
                </center>
            </Layer>
        );
    }
}

const FileStatusComponent = () => {

    const currentDir = useSelector(state => state.storageResult);
    const selectedIdxs = currentDir.selectedIdxs;

    switch (selectedIdxs.size) {
        case 0: return <FileStatusNoSelected />
        case 1: return <FileStatusOneSelected />
        default: return <FileStatusMultipleSelected />
    }
}
export default FileStatusComponent;

const Layer = styled.div`
    padding-top: 200px;
    padding-left: 20px;
    padding-right: 20px;
`