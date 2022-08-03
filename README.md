# CloudModular Web Client

CloudModular 웹버전
<p align="center">
    <img width="70%" src="https://raw.githubusercontent.com/SweetCase-Cobalto/cloudmodular/main/readme-asset/title.png?token=GHSAT0AAAAAABUZRX43MQBPTOW7QM2WY5DWYVHIGLA">
</p>

<div align="center">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
    <img src="https://img.shields.io/badge/Node 16.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/React 18.x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">
</div>

<div align="center">
    <img src="https://img.shields.io/badge/app--version-0.1.0--alpha1-blue?style=for-the-badge">
    <img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/v/tag/Sweetcase-Cobalto/cloudmodular-web?color=green&label=web-version&style=for-the-badge">
</div>

The Constructive Cloud Service for your NAS Server

직접 설치하는 클라우드 서비스 (Web Client)

Web Client관련 Repository입니다. 따라서 해당 Document는 설치 방법만 설명합니다. 어플리케이션 에 대한 자세한 설명은 [Server Repo](https://github.com/SweetCase-Cobalto/cloudmodular) 와 [Wiki](https://github.com/SweetCase-Cobalto/cloudmodular/wiki) 에서 확인할 수 있습니다.

## 설치 및 실행 방법
0. node.js(16v 이상) 이 설치되어 있어야 합니다. 그리고 해당 Repository는 클라이언트만 있으므로 Server가 설치 및 실행 되어 있어야 합니다. 서버 설치 및 실행 방법은 [여기](https://github.com/SweetCase-Cobalto/cloudmodular#%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95%EA%B0%9C%EB%B0%9C%EC%9E%90-%EA%B8%B0%EC%A4%80)를 참고하세요.
1. repository를 다운받고 해당 repository로 이동합니다.
2. package를 설치합니다.
```bash
npm i
```
3. .env파일을 아래와 같이 작성합니다.
```
REACT_APP_SERVER_URL=[서버 호스트]
REACT_APP_TOKEN_EXPIRED=[토큰 만료일]
```
* ```REACT_APP_SERVER_URL```: 연결할 서버 호스트를 입력합니다.
* ```REACT_APP_TOKEN_EXPIRED```: 쿠키에 들어 있는 token의 만료일 입니다. 단위는 "일"이며 해당 시간이 지나면 쿠키에서 제거됩니다.
4. app을 실행합니다.
```
npm start
```
