import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { selectData, unselectData } from "../../../reducers/storageResult";
import DirectoryIcon from "../../../asset/directory.svg";
import FileIcon from "../../../asset/file.svg";
import { searchData, setDataFavorite, unSetDataFavorite } from "../../../util/apis";
import { sizeToStr, splitDirectoryRoot } from "../../../util/tools";
import { CanceledOutlinedButton } from "../../../components/common/Buttons";

const StorageListItem = (props) => {
    /*
        props data
        idx: 리스트 인덱스
        data: 해당 데이터에 대한 정보
    */

    // Props 데이터들
    const idx = props.idx;
    const data = props.data;
    const dataIcon = props.data.isDir ? DirectoryIcon : FileIcon;
    const FavoriteIcon = props.data.isFavorite ? AiFillStar : AiOutlineStar;
    const isShowRootDirectory = props.showRoot ? props.showRoot : false;
    // use로 시작하는 핸들링용 변수들
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.storageResult);
    const user = useSelector(state => state.myAccount);
    const selectedIdxs = currentDir.selectedIdxs;
    const [cookie, ,] = useCookies(["token", "user_id"]);
    // Reducer로 연결되는 핸들러
    const selectIdx = () => dispatch(selectData(selectedIdxs, idx));
    const unselectIdx = () => dispatch(unselectData(selectedIdxs, idx));

    const moveEvent = () => {
        // 해당 데이터를 선택하면 그에 대한 이벤트 발생
        if(data.isDir)
            window.location.href = `/storage?id=${data.id}`;
        else {
            // TODO 파일의 형태에 따라 보여주는 창이 다를 예정
        }
    }
    const favoriteEvent = () => {
        // 즐겨찾기 설정
        let isFavorite = props.data.isFavorite;
        const requestFunc = isFavorite ? unSetDataFavorite : setDataFavorite;
        requestFunc(cookie.token, cookie.user_id, data.id)
        .then(() => {
            window.location.reload();
        });

    }
    const moveToRootDirEvent = () => {
        // 검색된 데이터가 위치해 있는 디렉토리로 이동
        const token = cookie.token;
        const searchRoot = data.root;

        if(searchRoot === '/') {
            // 메인 루트
            window.location.href = `/storage?id=0`;
        } else {
            const _res = splitDirectoryRoot(searchRoot);
            const name = _res[1];
            const root = _res[0];
            const param = {
                user: user.name,
                word: name,
                sort_name: 1,
            }
            if (root === '/') param.root_id = 0;
            else param.root = root;
            // 검색
            searchData(token, param)
            .then((res) => {
                if (res.err !== 200) alert(res.data);
                else {
                    let targetIdx = -1;
                    for(let i = 0; i < res.data.length; i++) {
                        // 리스트 중, 해당 이름과 디렉토리가 맞는 것 찾기.
                        if(res.data[i].name === name && res.data[i].is_dir) {
                            targetIdx = i;
                            break;
                        }
                    }
                    if (targetIdx === -1) {
                        // 상위 디렉토리가 존재하지 않음 -> 없어짐
                        alert("해당 디렉토리가 존재하지 않습니다.");
                    } else {
                        // 찾으면 그 디렉토리로 이동
                        let targetId = res.data[targetIdx].id;
                        window.location.href = `/storage?id=${targetId}`;
                    }
                }
            })
            .catch((e) => {
                alert('알 수 없는 에러가 빌생했습니다.');
            })
        }
    }
    // 데이터 크기를 String으로 표현
    const strSize = sizeToStr(data.size, data.isDir);
    return (
        <ItemLayer>
            <td style={{ display: "flex" }}>
                {
                    selectedIdxs.has(idx)
                    &&
                    <Form.Check
                        type="checkbox" style={{ marginRight: "10px" }}
                        id={data.id} onChange={unselectIdx} checked
                    />
                }
                {
                    !selectedIdxs.has(idx)
                    &&
                    <Form.Check
                        type="checkbox" style={{ marginRight: "10px" }}
                        id={data.id} onChange={selectIdx}
                    />
                }
                <img height="20px" style={{ marginRight: "5px", cursor: "pointer" }}
                    alt="data icon" src={dataIcon} onClick={moveEvent} />
                <span style={{cursor: "pointer"}} onClick={moveEvent}>{data.name}</span>
            </td>
            <td style={{ fontSize: "0.8em" }}>{data.created}</td>
            <td>{strSize}</td>
            <td><FavoriteIcon style={{ cursor: "pointer" }} onClick={favoriteEvent} /></td>
            {
                isShowRootDirectory
                &&
                <td>
                    <OverlayTrigger
                        placement="left"
                        delay={{ show: 300, hide: 0 }}
                        overlay={<Tooltip style={{ position: "absolute" }}>{data.root}</Tooltip>}
                    >
                        {
                            ({ref, ...trigerHandler}) => (
                                <CanceledOutlinedButton
                                    style={{ fontSize: "0.7em", padding: "1px 2px 1px 2px" }}
                                    {...trigerHandler}
                                    ref={ref}
                                    onClick={moveToRootDirEvent}
                                >
                                    상위 디렉토리
                                </CanceledOutlinedButton>
                            )
                        }
                    </OverlayTrigger>
                </td>
            }
        </ItemLayer>
    );
}
const ItemLayer = styled.tr`
    background-color: white;
    height: auto;
`;
export default StorageListItem;