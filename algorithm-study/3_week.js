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


/* 주식 가격 - 스택 */
/* 미래대신 과거의 주식가격을 활용
     가격이 떨어지는 지점에서 영향을 받는 과거의 가격을 살펴봄
     
     가격이 떨어졌다면, 떨어진 가격의 바로 전 인덱스에서는 가격이 떨어지지 않는 기간이 1초가 된다
     더 앞의 인덱스 가격이 떨어진 가격보다 크다면, 해당 인덱스에서는 가격이 2초...3초... 가 된다
     가격이 떨어졌을때 과거로 거슬러 올라가면서 떨어진 가격보다 더 비싼 가격의 인덱스에서 가격이 떨어진 기간을 구한다
                    ---         
     prices = [100, 300, 500, 400, 200]
     stack = [0]
     price = 300 일때? 가격이 오르고 있으므로 stack에 해당 가격의 인덱스 1을 넣는다.
                         ---
     prices = [100, 300, 500, 400, 200]
     stack = [0,1]
     price = 500 일때? 가격이 오르고 있으므로 stack에 해당 가격의 인덱스 2을 넣는다.
                              ---
     prices = [100, 300, 500, 400, 200]
     stack = [0,1,2]
     price = 400 일때? 가격이 떨어졌으므로 stack에 있는 과거 인덱스로부터 가격이 떨어지지 않는 기간을 구할 수 있게 됨
     top = 2 우선 stack의 마지막 값인 2를 pop하고 top 변수에 넣는다.
     stack = [0, 1]
     
     과거 인덱스에 대한(=top) 가격이 떨어지지 않는 기간 = 현재 인덱스 - 과거 인덱스
     result[2] = current_index - prev_index
     result[2] = 3 - 2  ==> 1
     
     그리고 남은 stack의 마지막 값(인덱스값) 1의 가격 300원과 현재 인덱스 값인 400원을 비교한다.
     과거 300원보다 현재 400원의 가격이 더 높기 때문에, 300원(인덱스 1)의 위치에서는 가격이 떨어지는 기간을 구할 수 없다.
     그래서 현재 인덱스를 stack에 넣고, 다음 price로 넘어간다.
                                   ---
     prices = [100, 300, 500, 400, 200]
     stack = [0,1,3]
     top = 3 stack의 마지막 값인 3를 pop하고 top 변수에 넣는다.
     stack = [0,1]
     result[3] = 4 - 3  ==> 1
     
     그리고 남은 stack의 마지막 값 1의 가격 300원과 현재 인덱스 값인 200원을 비교한다.
     과거 300원보다 현재 200원의 가격이 더 낮기 때문에, 가격이 떨어지는 기간을 구할 수 있다.
     top = 1 stack의 마지막 값인 1를 pop하고 top 변수에 넣는다.
     stack = [0]
     result[1] = 4 - 1  ==> 3
     
     그리고 남은 stack의 마지막 값 0의 가격 100원과 현재 인덱스 값인 200원을 비교한다.
     과거 100원보다 현재 200원의 가격이 더 높기 때문에, 100원(인덱스 0)의 위치에서는 가격이 떨어지는 기간을 구할 수 없다.
     그래서 현재 인덱스를 stack에 넣고, 다음 price로 넘어간다. (하지만 200이 마지막 요소였으므로 루프가 끝나게 된다)
     
     stack = [0,4]
     이제 stack에 남은 0과 4는 비교할 현재 인덱스가 없기 때문에 결과값을 구할 수 없다.
     스택에 남아있는 결과만 새로 루프를 돌면서 
     result[i] = prices.length - i - 1
                 입력배열의 길이에서 인덱스를 빼고 -1을 한다.
                 이렇게 하면 가격이 떨어지지 않는 기간이 prices 배열 앞으로 올 수록 result[i]가 커진다
     result[4] = 5 - 4 - 1 = 0  ==> 200원은 이후 가격이 없어 가격이 떨어진 기간은 0이 된다
     result[0] = 5 - 0 - 1 = 4  ==> 100원은 이후 가격이 떨어진 적이 없기 때문에 4가 된다
    */
function solution(prices) {
    let result = Array(prices.length).fill(-1);
    let stack = [];

    for (let cur = 0; cur < prices.length; cur++) {
      // 스택이 비어있지 않고, 주식 가격이 떨어졌다면
      while (stack.length && prices[stack[stack.length - 1]] > prices[cur]) {
        let pas = stack.pop();
        result[pas] = cur - pas;
      }
      stack.push(cur);
        
      for (let i = 0; i < stack.length; i++) {
        result[stack[i]] = prices.length - stack[i] - 1;
      }
    }
    return result;
}