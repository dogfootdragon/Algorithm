//이상한 문자 만들기
function solution(s) {
    //공백을 기준으로 단어 분리 > 배열
    //배열 인덱스 값을 스트링으로 바꾸고 짝수/홀수 대문자/소문자 변환
    //다음 배열(단어)로 넘어갈때 공백 삽입 (마지막 제외)
    let wordArr = [];
    let result = '';
    wordArr = s.split(' ');

    wordArr.forEach((v) => {
        let syllableArr = v.split('');

        for(let i=0; j<syllableArr.length; i++){
            i%2 ? result += syllableArr[i].toLowerCase() : result += syllableArr[i].toUpperCase()
        }
        result += ' ';
    });
    return result.slice(0,-1);
}

//완주하지 못한 선수
function solution(participant, completion) {
    //마라톤에 참여한 선수 배열과 완주한 선수 배열의 길이는 1 차이난다
    //동명이인이 있을 수 있다
    //마라톤에 참여한 선수를 해시테이블1로 저장한다
    //완주한 선수를 해시테이블2로 저장한다
    //마라톤에 참여한 선수목록 처음부터 끝까지 돌면서 완주선수와 이름(키)이 같으면 명수(값)를 깎는다
    //명수(값)이 0이 되면 해시테이블에서 삭제한다

    let answer = '';
    let parMap = new Map();

    for(el of participant){
        if(parMap.get(el)===undefined){
            parMap.set(el,1);
        } else if(parMap.get(el) >= 1) {
            parMap.set(el,parMap.get(el)+1);
        }
    }

    for(el of completion){
        if(parMap.get(el)===1){
            parMap.delete(el);
        } else {
            parMap.set(el,parMap.get(el)-1);
        }
    }

    //완주하지 못한 선수 한명만 남은 map객체를 answer에 담기
    for(let [k,v] of parMap){
        answer = k;
    }

    return answer;
}