export const sizeToStr = (size, isDir) => {
    // 파일 크기를 텍스트 단위로
    if (isDir) return '-';
    else {
        if (size < (10**3)) return `${size} B`;
        else if(size <= (10**6)) return `${(size/(10**3)).toFixed(3)} KB`;
        else if(size <= (10**9)) return `${(size/(10**6)).toFixed(3)} MB`;
        else return `${(size/(10**9)).toFixed(3)} GB`;
    }
}