/* 완주하지 못한 선수 - 해시 */
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
      if(parMap.get(el) === undefined){ // 참여한 선수 이름과 최초카운트 1 추가
          parMap.set(el, 1);
      } else if(parMap.get(el) >= 1) { // 참여한 선수와 동명이인이 참여했다면 카운트 1증가
          parMap.set(el, parMap.get(el)+1);
      }
  }
  
  for(el of completion){
      if(parMap.get(el) === 1){ // 완주한 선수와 이름이 같고 1명 뿐이라면 삭제
          parMap.delete(el);
      } else {
          parMap.set(el, parMap.get(el)-1); // 완주한 선수와 이름이 같고 2명 이상이라면 카운트 1감소
      }
  }
  
  //완주하지 못한 선수 한명만 남은 map객체를 answer에 담기
  for(let [name, count] of parMap){ // 이름, 명수 로 담겨져 있기 때문에 이름만 꺼낸다
      answer = name;
  }
  
  
  return answer;
}



/* 할인 행사 - 해시 */



/* 오픈 채팅방 - 해시 */
function solution(record) {
  var answer = [];
  let user = {};
  let data = [];
  
  for(let i=0; i<record.length; i++) {
      let [cmd, uid, nickname] = record[i].split(' '); // 구조분해할당
      // console.log(`${cmd} / ${uid} / ${nickname}`)
      
      switch(cmd) { // 나갈때 제외 유저 닉네임 저장or수정
          case 'Enter':
              user[uid] = nickname;
              data.push([cmd, uid]);
              break;
          case 'Leave':
              data.push([cmd, uid]);
              break;
          case 'Change':
              user[uid] = nickname;
              break;
      }
  }
  
  data.forEach((el) => {
      el[0] == 'Enter' 
          ? answer.push(`${user[el[1]]}님이 들어왔습니다.`)
          : answer.push(`${user[el[1]]}님이 나갔습니다.`)
  })
  
  return answer;
}