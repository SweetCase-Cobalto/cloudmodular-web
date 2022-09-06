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

export const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        // will be deprecated
        document.execCommand('copy');
    } catch (err) {
        alert('복붙에 실패했습니다.');
        return false;
    }
    document.body.removeChild(textArea);
    return true;
}

export const splitDirectoryRoot = (rootName) => {
    /*
        String으로 주어진 디렉토리 주소에 대한 정보를 검색할 때 
        문자열을 쪼갤 때 사용된다.
        /a/b/c/ 또는 
        /a/b/, c로 루트와 파일 형태로 나누기
    */

    // 최상위 루트는 할 의미가 없음
    if (rootName === '/') return [undefined, '/'];
    // 맨 끝에서 두번째부터 시작
    let i = rootName.length - 2;
    while (i >= 0) if (rootName.charAt(i--) === '/') break;
    // split
    const root = rootName.slice(0, i+1);
    const name = rootName.slice(i+1, -1);
    return [root, name];
}