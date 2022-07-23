import { useSelector } from "react-redux"
import styled from "styled-components";
import { RootTag } from "../../../components/common/Tags";
import { SubTitle } from "../../../components/common/Titles";

const rootToSplitedRoot = (rootName) => {
    const splitedRootName = rootName.split("/");
    splitedRootName.pop();
    splitedRootName.shift();
    splitedRootName.unshift("/");
    return splitedRootName;
}

const RootTagComponent = () => {
    const currentDir = useSelector(state => state.storageResult);
    const RootTags = rootToSplitedRoot(currentDir.rootName)
        .map((name, index) => <RootTag key={index} name={name} />);
    return (
        <div style={{ marginTop: "30px" }}>
            <SubTitle>현재 위치</SubTitle>
            <div style={{ display: "flex", marginTop: "20px" }}>
                {RootTags}
            </div>
        </div>
    );
}
export default RootTagComponent;