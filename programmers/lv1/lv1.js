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

//소수 찾기
function solution(n) {
    var answer = [];
    //~N까지 들어간 배열 만들기
    let arr = Array.from({length:n+1},(v,i)=>i); // [0,1,2,3,4,5...10]

    //2부터 n의 제곱근까지 반복문. 해당 숫자 i의 배수들을 0으로 만든다(추후 필터로 삭제하기 위해)
    for(let i=2; i<=parseInt(Math.sqrt(n)); i++){
        //i가 2일때. 2의 배수를 지워야 함 > 해당 반복문의 j초기값은(2*2=4), 반복문이 끝나면 4+i(2)=6... 6+2=8... 8+2=10... 2의 배수들만 반복하게 됨.
        for(let j=i*i; j<=n; j+=i){
            arr[j] = 0;
        }
    }

    //1과 0을 걸러내고 남은 배열의 길이를 리턴한다
    answer = arr.filter((el)=>el!==0); //0 삭제
    answer.shift(); //1 삭제
    return answer.length;
}