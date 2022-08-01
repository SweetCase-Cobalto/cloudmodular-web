import styled from "styled-components";
import { Form } from "react-bootstrap";
import { AccessedButton } from "../../../components/common/Buttons";
import { Mobile, Desktop } from "../../../components/common/ScreenResponsive";

const switchCoverter = (e) => {
    return e.target.checked ? 1 : 0;
}

const SearchComponent = () => {

    let searchWord = '';
    let root = '';
    let favorite = 0;
    let shared = 0;
    let recursive = 0;
    let sortByCreate = 0;
    let sortByName = 0;

    const searchEvent = () => {
        // 검색 쿼리 만들기
        let url = '/storage/search?';
        url += 'favorite=' + favorite;
        url += '&shared=' + shared;
        url += '&recursive=' + recursive;
        url += '&sort_create=' + sortByCreate;
        url += '&sort_name=' + sortByName;
        if(root !== '') {
            root = '/' + root + '/';
            url += '&root=' + root;
        }
        if(searchWord !== '') 
            url += '&word=' + searchWord;
        window.location.replace(url);
    }
    const searchEventInMobile = () => {
        /*
            자동 설정되는 필터들
            recursive
            날짜, 이름순
        */
        let url = '/storage/search?recursive=1&sort_create=1&sort_name=1';
        if(searchWord !== '')
            url += '&word=' + searchWord;
        window.location.replace(url);
    }
    return (
        <div>
        <Desktop>
        <Layer>
            <WordSearcherLayer>
                <Form.Control
                    type="text" placeholder="검색어를 입력하세요."
                    onChange={(e) => {searchWord = e.target.value;}} />
                <AccessedButton 
                    style={{
                        marginLeft: "-72px",
                        paddingLeft: "20px",
                        paddingRight: "20px" 
                    }} 
                    onClick={searchEvent}>
                    검색
                </AccessedButton>
            </WordSearcherLayer>
            <Form.Control
                style={{ marginTop: "20px" }} type="text"
                placeholder="검색 폴더 위치를 입력하세요. (입력하지 않은 경우, 최상위 루트에서 검색을 시작합니다.)"
                onChange={(e) => {root = e.target.value}} />
            <OptionalLayer>
                <CheckboxLayer>
                    <Form.Check type="switch" onChange={(e) => {favorite = switchCoverter(e);}} />
                    <p>즐겨찾기만</p>
                </CheckboxLayer>
                <CheckboxLayer>
                    <Form.Check type="switch" onChange={(e) => {shared = switchCoverter(e);}}/>
                    <p>공유된 데이터만</p>
                </CheckboxLayer>
                <CheckboxLayer>
                    <Form.Check type="switch" onChange={(e) => {recursive = switchCoverter(e);}} />
                    <p>하위 폴더까지 검색</p>
                </CheckboxLayer>
                <CheckboxLayer>
                    <Form.Check type="switch" onChange={(e) => {sortByCreate = switchCoverter(e);}} />
                    <p>최근 생성된 순으로 정렬</p>
                </CheckboxLayer>
                <CheckboxLayer>
                    <Form.Check type="switch" onChange={(e) => {sortByName = switchCoverter(e);}}/>
                    <p>이름 순 정렬</p>
                </CheckboxLayer>
            </OptionalLayer>
        </Layer>
        </Desktop>
        <Mobile>
            <Form.Control type="text" placeholder="검색어를 입력하세요" onChange={(e) => {searchWord = e.target.value;}} />
            <AccessedButton style={{ marginTop: "10px", float: "right" }} onClick={searchEventInMobile}>검색</AccessedButton>
        </Mobile>
        </div>
    );
}
export default SearchComponent;

const Layer = styled.div`
    border: 1px black solid;
    border-radius: 10px;
    background-color: #F8F8F8;
    padding: 20px;
`;
const WordSearcherLayer = styled.div`
    display: flex;
`
const OptionalLayer = styled.div`
    margin-top: 30px;
    display: flex;
`
const CheckboxLayer = styled.div`
    display: flex;
    margin-right: 40px;
`