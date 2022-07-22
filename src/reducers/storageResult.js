const UPDATE_LIST = "STORAGERESULT/UPDATE_LIST";
const UPDATE_IDXS = "STORAGERESULT/UPDATE_IDXS";

const initialState = {
    isFetched: false,
    rootName: null,
    selectedIdxs: [],
    dataList: [],
}

export const updateCurrentStorageList = (newList, rootName) => {
    let arr = newList.map((e) => {
        return {
            id: e["id"],
            root: e["root"],
            isDir: e["is_dir"],
            isFavorite: e["is_favorite"],
            sharedId: e["shared_id"],
        }
    })
    return {
        type: UPDATE_LIST,
        rootName: rootName,
        dataList: arr,
    }
}

export const updateSelectedData = (newIdxList) => {
    return {
        type: UPDATE_IDXS,
        selectedIdxs: newIdxList
    }
}

export const storageResult = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                isFetched: true,
                rootName: action.rootName,
                dataList: action.dataList,
                selectedIdxs: [],
            }
        case UPDATE_IDXS:
            return {
                ...state,
                selectedIdxs: action.selectedIdxs,
            }
        default:
            return state;
    }
}