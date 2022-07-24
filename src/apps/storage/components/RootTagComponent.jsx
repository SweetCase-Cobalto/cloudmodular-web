import { useSelector } from "react-redux"
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
    let tmpRoot = "";
    const RootTags = rootToSplitedRoot(currentDir.rootName)
        .map((name, index) => {
            if(index === 0) {
                tmpRoot = "/";
                return <RootTag key={index} name={name} />
            } else {
                let root = tmpRoot;
                tmpRoot += (name + "/")
                return <RootTag key={index} name={name} root={root} />
            }
        })
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