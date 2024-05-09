/* 괄호 회전하기 - 스택 */
function solution(s) {
  var answer = 0;
  // 13번 케이스에서 오답
  // 주어지는 괄호 문자열이 홀수라면 애초에 오답 - 예외처리 해야함
  
  // s 문자열 길이만큼 괄호 회전
  if(s.length%2 == 0) {
      for(let i=0; i<s.length; i++) {
          let stack = [];
          let bool = true;
          let newS = s.slice(i) + s.slice(0,i); // 문자열의 첫번째를 잘라 문자열 맨 뒤에 붙임
          i == 0 ? newS = s : ''; // 인덱스가 0일때는 회전하지 않음

          newS.split('').forEach((el) => {
              if(el == '(' || el == '[' || el == '{') { // 여는 괄호일때 스택에 넣음
                  stack.push(el);
              } else { // 닫는 괄호일때 스택에 들어간 괄호와 비교, 직전 괄호와 짝이 맞다면 여는 괄호 제거
                  if(stack.slice(-1) == '(' && el == ')' ||
                     stack.slice(-1) == '[' && el == ']' ||
                     stack.slice(-1) == '{' && el == '}'
                    ) {
                      stack.pop(); // 스택에서 짝이 맞는 여는 괄호 제거
                  } else {
                      bool = false; // 하나라도 올바른 괄호가 아니라면 false
                  }
              }
          })
          // 모두 올바른 괄호였다면 answer+1
          bool ? answer++ : '';
      }
  } 
  
  return answer;
}


/* 짝지어 제거하기 - 스택 */
function solution(s){
  let sArr = [...s];
  let stack = [];
  
  sArr.forEach((el,idx)=>{
      if(el == stack[stack.length-1]){
          stack.pop();
      } else {
          stack.push(el);
      }
  })

  // 스택 배열에 값이 남아있다면 0, 값이 없다면(모두 짝지어 제거됐다면) 1
  return stack.length ? 0 : 1;
}