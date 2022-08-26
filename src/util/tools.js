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