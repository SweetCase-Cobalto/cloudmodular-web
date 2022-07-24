import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styled from "styled-components";

import { selectData, unselectData } from "../../../reducers/storageResult";
import DirectoryIcon from "../../../asset/directory.svg";
import FileIcon from "../../../asset/file.svg";

const StorageListItem = (props) => {
    /*
        props data
        idx: 리스트 인덱스
        data: 해당 데이터에 대한 정보
    */
    const idx = props.idx;
    const data = props.data;
    const dataIcon = props.data.isDir ? DirectoryIcon : FileIcon;
    const FavoriteIcon = props.data.isFavorite ? AiFillStar : AiOutlineStar;

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.storageResult);
    const selectedIdxs = currentDir.selectedIdxs;

    const selectIdx = () => dispatch(selectData(selectedIdxs, idx));
    const unselectIdx = () => dispatch(unselectData(selectedIdxs, idx));

    const moveEvent = () => {
        window.location.href = `/storage?id=${data.id}`;
    }

    return (
        <tr>
            <td style={{ display: "flex"}}>
                {
                    selectedIdxs.has(idx)
                    &&
                    <Form.Check
                        type="checkbox" style={{ marginRight: "10px" }}
                        id={data.id} onChange={selectIdx} checked
                    />
                }
                {
                    !selectedIdxs.has(idx)
                    &&
                    <Form.Check
                        type="checkbox" style={{ marginRight: "10px" }}
                        id={data.id} onChange={unselectIdx}
                    />
                }
                <img height="20px" style={{ marginRight: "5px", cursor: "pointer" }}
                    alt="data icon" src={dataIcon} onClick={moveEvent} />
                <span style={{cursor: "pointer"}} onClick={moveEvent}>{data.name}</span>
            </td>
            <td style={{ fontSize: "0.8em" }}>{data.created}</td>
            <td><FavoriteIcon /></td>
        </tr>
    );
}

const ItemLayer = styled.tr`
    background-color: white;
    
`

export default StorageListItem;