const UPDATE_LIST = "STORAGERESULT/UPDATE_LIST";
const UPDATE_SELECTED = "STORAGERESULT/UPDATE_SELECTED";
const INIT_SELECTED = "STORAGERESULT/INIT_SELECTED";

const initialState = {
    isFetched: false,
    rootName: null,
    selectedIdxs: new Set(),
    dataList: [],
}

export const updateCurrentStorageList = (newList, rootName) => {
    let arr = newList.map((e) => {

        let splitedCreated = e["created"].split("T");
        let created = `${splitedCreated[0]} ${splitedCreated[1]}`;

        return {
            id: e["id"],
            root: e["root"],
            isDir: e["is_dir"],
            isFavorite: e["is_favorite"],
            sharedId: e["shared_id"],
            created: created,
            name: e["name"],
        }
    })
    return {
        type: UPDATE_LIST,
        rootName: rootName,
        dataList: arr,
    }
}

export const selectData = (idxs, i) => {
    idxs.add(i);
    return {
        type: UPDATE_SELECTED,
        selectedIdxs: idxs
    }
}
export const unselectData = (idxs, i) => {
    if(idxs.has(i)) idxs.delete(i);
    return {
        type: UPDATE_SELECTED,
        selectedIdxs: idxs
    }
}
export const initSelected = () => {
    return { type: INIT_SELECTED};
}

export const storageResult = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                isFetched: true,
                rootName: action.rootName,
                dataList: action.dataList,
                selectedIdxs: new Set(),
            }
        case UPDATE_SELECTED:
            return {
                ...state,
                selectedIdxs: action.selectedIdxs,
            }
        case INIT_SELECTED:
            return {
                ...state,
                selectedIdxs: new Set(),
            }
        default:
            return state;
    }
}