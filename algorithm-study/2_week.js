/* 실패율 */
function solution(N, stages) {
  let answer = [];
  let rateArr = [];
  let player = stages.length; // 도전한 플레이어 수
  
  // 스테이지 수 만큼 반복
  for(let i=1; i<=N; i++){
      let count = 0; // i번째 스테이지에 도달했으나 클리어하지 못한 플레이어의 수 초기화
      stages.forEach((el) => {
          i == el ? count++ : ''; // 스테이지와 같으면 카운트
      })
      
      if(count == 0){
          rateArr.push({stage:i, failureRate:0});
      } else {
          rateArr.push({stage:i, failureRate:count/player}); // key: 스테이지 번호, value: 실패율
          player -= count; // 실패율 계산 후 남은 플레이어 수 계산
      }
  }
  
  // rateArr 실패율 기준으로 내림차순 정렬
  rateArr.sort((a,b) => (b.failureRate - a.failureRate));
  // 내림차순 정렬 된 스테이지 번호 배열에 담기
  rateArr.forEach((el) => {answer.push(el.stage)});
  
  return answer;
}


/* 방문 길이 */
// 맨 처음 풀었던 방식(오답)
function solution(dirs) {
  // 움직이기 전 좌표, 움직인 후 좌표 모두 일치해야 처음 걸어본 길
  let x = y = 0; // 좌표값 초기화
  let answer = new Set();
  
  // *이전 좌표값 초기화*
  let prevXY = '0,0';
  let currXY = '0,0';
  
  dirs.split('').forEach((el) => {
      let xy1 = `${x},${y}`;
      switch (el) {
          case 'U':
              y == 5 ? '' : y++;
              break;
          case 'D':
              y == -5 ? '' : y--;
              break;
          case 'R':
              x == 5 ? '' : x++;
              break;
          case 'L':
              x == -5 ? '' : x--;
              break;
      }
      let xy2 = `${x},${y}`;
      
      if(xy1 == xy2 || prevXY == xy2 && currXY == xy1){
          // 움직이지 않았거나, *같은 길을 되돌아갈 경우 추가하지 않는다*
      } else {
          answer.add({[count]:`${xy1}/${xy2}`});
      }
      
      prevXY = xy1;
      currXY = xy2;
  });
  
  // 채점 결과 7번까지 정답, 이후 오답처리됨
  // 0,0 => 0,1 과 0,1 => 0,0 의 경로는 같기 때문(고려하지 않음)
  // 같은 길을 되돌아간 경우 추가하지 않는다

  console.log(answer);
  return answer.size;
}
// 움직이기 전, 움직인 후 좌표를 저장하지 않고 움직인 경로(선) 자체를 set객체에 저장
function solution(dirs) {
  // 움직이기 전 좌표, 움직인 후 좌표 모두 일치해야 처음 걸어본 길
  // => 움직인 경로(선) 을 좌표로 저장
  let x = y = 0; // 좌표값 초기화
  let answer = new Set();
  
  dirs.split('').forEach((el) => {
      let xy;
      console.log("x: " + x + " / y: " + y)
      switch (el) {
          case 'U':
              if(y != 5){
                  xy = `${x},${y + 0.5}`;
                  y++;
              }
              break;
          case 'D':
              if(y != -5){
                  xy = `${x},${y - 0.5}`;
                  y--;
              }
              break;
          case 'R':
              if(x != 5){
                  xy = `${x + 0.5},${y}`;
                  x++;
              }
              break;
          case 'L':
              if(x != -5){
                  xy = `${x - 0.5},${y}`;
                  x--;
              }
              break;
      }
      answer.add(xy);
      answer.delete(undefined); // xy 초기화를 하지 않았기 때문에, 스위치문의 아무 조건도 충족하지 못하는 경우
                                // 제시된 좌표평면(-5~5)을 벗어나는 경우 undefined 값이 된다
                                // 따라서 마지막에 undefined값 삭제
  });
  
  // 채점 결과 7번까지 정답, 이후 오답처리됨
  // 0,0 => 0,1 과 0,1 => 0,0 의 경로는 같기 때문(고려하지 않음)

  console.log(answer);
  return answer.size;
}


/* 올바른 괄호 */
function solution(s){
  var answer = true;
  let arr = [];
  
  // 스택< 에 집중
  // ( 일때 배열에 푸쉬, ) 일때 pop 으로 ( 삭제
  // 배열이 비어있다면 true 아니면 false
  s.split('').forEach((el) => {
      if(el == '(') {
          arr.push(el);
      } else if(el == ')' && arr.length == 0) { /* 배열이 비워져있다면 pop하지 않고 false */
          answer = false;
      } else if(el == ')') {
          arr.pop();
      }
  })
  
  // 2번, 17번 케이스 오답
  // arr 배열이 비어있는데도 pop()으로 배열값을 지우면 arr.length == 0 으로 true가 된다
  // 배열이 비어있을때 ')' 가 오면 false가 되어야 한다
  arr.length == 0 && answer ? answer = true : answer = false;

  return answer;
}