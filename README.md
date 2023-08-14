# MMNT<img src="https://github.com/kimdoha/mmnt-server/assets/62235737/be545879-b340-4a7b-98b9-12b5c83c15e9" align=left width=100>

> 사용자 위치 기반 SNS 플랫폼, MMNT • <b>백엔드</b> 레포지토리

<br/><br/>

 <div align=center>
공간에 대한 기억을 그 순간 사진과 음악으로 지도에 기록하는<br>
<strong>사용자 위치 기반 SNS 플랫폼 </strong>입니다.<br>
오늘 있었던 장소에 핀을 꽂은 뒤,<br>
현재 듣고 있는 음악과 사진을 다른 사람들과 공유할 수 있어요.
</div>

<br></br>

<center>
  <img
    src="https://github.com/kimdoha/mmnt-server/assets/62235737/b708d7db-55b6-44e6-90a1-d72680e7e59d"
    width="100%"
    height="100%"
  />
</center>

<br></br>

- 지금 있는 장소에서 모먼트를 추가하고 다른 사람에게 공유할 수 있어요.  
- 모먼트는 사진과 글, 그리고 음악으로 기록할 수 있어요.  
- 과거에 작성한 모먼트를 손쉽게 확인할 수 있어요.

<br></br>

### Teck Stack
---
![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=NestJs&logoColor=whitek&style=flat)
![Express](https://img.shields.io/badge/-Express-000000?logo=NestJs&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white&style=flat)<br>
![Redis](https://img.shields.io/badge/-Redis-DC382D?logo=redis&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Swagger](https://img.shields.io/badge/-Swagger-a4ff82?logo=Swagger&logoColor=black&style=flat)
![AWS](https://img.shields.io/badge/-AWS-orange?logo=Amazon%20AWS&logoColor=white&style=flat)

<br></br>

### Syetem Architecture
 <img
    src="https://github.com/kimdoha/mmnt-server/assets/62235737/ba4e0fc4-ed72-4251-b77f-ef5c90727e02"
    width="80%"
    height="80%"
  />

### Feature
- 서버리스 함수를 통한 랜덤 인증 번호 이메일 발송
- Redis Cache TTL을 활용한 이메일 인증 번호 확인
- 자체 회원가입 및 로그인을 통한 JWT 토큰 발급
- 사용자 마이페이지 CRUD 제공 및 비밀번호 찾기, 회원 탈퇴
- 사용자 위치 기반 근처의 핀 모먼트 조회
- 현재 위치에서 사진과 노래를 기록하는 모먼트 생성
- 지도의 각 핀과 모먼트에 대한 CRUD 제공
- 모먼트 히스토리 관리

