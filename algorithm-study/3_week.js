/* 짝지어 제거하기 */ //스택
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