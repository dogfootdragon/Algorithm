/* 크레인 인형뽑기 게임 - 스택 */
// 테스트만 통과, 채점시 오류
function solution(board, moves) {
  var answer = 0;
  let basket = [];
  /* array test1 - arr[0] 번째에 push를 하면 전체 배열요소에 push가 되는 이유? */
  // let arr = new Array(board.length);
  // arr.fill([]);
  // arr[0].push(1);
  // console.log(arr);
  
  /* array test2 - 이런 식으로 배열을 생성하면 arr[0] 번째에만 1이 push가 된다 */
  // let arr = [[0],[0],[0],[0],[0]];
  // arr[0].push(1);
  // console.log(arr);
  
  // -----------------------------------------------------------------------
  
  // 입력받은 board를 2차원배열로 정리, 0은 삭제
  let dolls = board.reverse().map((arr) => {
      return [];
  });
  
  for(let i in board) {
      for(let j=0; j<board.length; j++) {
          board[i][j] ? dolls[j].push(board[i][j]) : '';
      }
  }
  console.log(dolls)
  // 입력받은 moves에 맞춰 바구니에 인형 담기
  // 연속으로 같은 인형이 오면 터트리고, 사라진 인형의 개수를 카운트
  moves.forEach((move, i) => {
      let pop = dolls[move-1].pop();
      
      if(basket[basket.length-1] == pop && pop != undefined) {
          basket.pop(); // 겹치는 인형 꺼내기
          answer += 2; // 카운트 2 증가
      } else {
          basket.push(pop); // 인형 넣기
      }
  })
  return answer;
}



/* 기능 개발 - 큐 */
function solution(progresses, speeds) {
  var answer = [];
  
  let endDays = [];
  progresses.forEach((el, i) => {
      // 기능당 작업 완료까지 남은 일수 (=배포 가능 일수) 소수점 올림으로 계산
      endDays.push(Math.ceil((100 - el) / speeds[i]));
  })
  
  let prevDay = endDays[0]; // 앞선 기능 남은 배포일
  let count = 0; // 배포 가능한 기능 개수
  for(let i=0; i<endDays.length; i++) {
      if(prevDay >= endDays[i]) { // 앞선 기능 배포일이 다음 기능 배포일보다 크거나 같으면 함께 배포한다
          count++;
      } else { // 앞선 기능 배포일이 다음 기능 배포일보다 작으면 먼저 배포한다
          answer.push(count);
          prevDay = endDays[i]; // 앞선 기능 배포일을 다음 기능 배포일로 변경한다
          count = 1; // count를 초기화해준다
      }
  }
  answer.push(count);
  return answer;
}