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


//시저 암호
function solution(s, n) {
    var answer = '';
    //각 문자열마다 n씩 밀어줘야함
    //소문자는 소문자로, 대문자는 대문자로 출력
    //공백(sp)도 아스키코드가 있다 > 32
    for(let i=0; i<s.length; i++){
        let sAskii = s[i].charCodeAt();
        if(sAskii == 32){//공백처리
            answer += ' ';
            continue;
        }

        if(sAskii >= 65 && sAskii <= 90){ //대문자일때
            if(sAskii+n > 90){//Z를 넘어가면 -26
                answer += String.fromCharCode(sAskii+n-26);
            } else {
                answer += String.fromCharCode(sAskii + n);
            }
        } else if(sAskii >=97 && sAskii <= 122){ //소문자일때
            console.log(sAskii+n)
            if(sAskii+n > 122){//z를 넘어가면 -26
                answer += String.fromCharCode(sAskii+n-26);
            } else {
                answer += String.fromCharCode(sAskii + n);
            }
        }
    }
    return answer;
}


// 최대공약수와 최소공배수
function solution(n, m) {
    var answer = [];
    //최대공약수를 구하는법: 두 수중 큰 수를 작은수로 나누고 a%b = ? 나머지가 0이면 b가 최대공약수
    //나머지가 0이 아니라면 a=b, b=r(나머지) ... < 반복. b가 0이 되면 종료되고 a가 최대공약수가 된다.
    //최소공배수를 구하는법 최소공배수=a*b/최대공약수

    let a = Math.max(n,m);
    let b = Math.min(n,m);

    let recursive = (a,b) => {
        if(b==0){
            return answer[0] = a;
        }
        let r = a % b;
        return recursive(b,r);
    }
    recursive(a,b);
    answer[1] = a*b/answer[0];

    return answer;
}


// 콜라츠 추측
function solution(num) {
    let count = 0;

    let recursive = (n) => {
        if(count===500){
            return  count = -1;
        } else if(n===1){
            return count;
        }
        count++
        if(n%2==0){
            recursive(n/2);
        } else if(n%2==1){
            recursive(n*3+1);
        }
    }

    recursive(num);
    return count;
}