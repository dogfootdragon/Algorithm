// 두 개 뽑아서 더하기 [월간 코드 챌린지 시즌1]
function solution(numbers) {
  let answer = [];
  let set = new Set(); // 중복제거를 위해 set 사용
  
  numbers.forEach((el, idx, arr) => {
      if(idx != numbers.length - 1){
          for(let i=1; i<numbers.length; i++){
              // console.log(`idx: ${idx}, i: ${i}`);
              // console.log(`el: ${el} , arr[idx+i]: ${arr[idx+i]} = ${el+arr[idx+i]}`);
              idx + i < numbers.length ? set.add(el + arr[idx+i]) : '';
          }
      }
  })
  
  // set -> array 변환 후 오름차순 정렬
  answer = [...set].sort((a,b)=>{return a-b});
  return answer;
}


// 모의고사 [완전탐색]
function solution(answers) {
  var answer = [];
 // 1번 배열 = 1,2,3,4,5 반복 (5)
  // 2번 배열 = 2,1,2,3,2,4,2,5 반복 (8)
  // 3번 배열 = 3,3,1,1,2,2,4,4,5,5 반복 (10)
  
  // 1,2,3 배열을 만든다
  // answers와 1,2,3 배열을 반복해 정답 여부 확인
  // 각 배열(1,2,3)의 점수 숫자가 가장 큰 것을 반환. 크기가 같다면 모두 반환.
  
  let arr1 = [1,2,3,4,5];
  let arr2 = [2,1,2,3,2,4,2,5];
  let arr3 = [3,3,1,1,2,2,4,4,5,5];
  
  let arr1Score = 0, arr2Score = 0, arr3Score = 0;
  
  answers.forEach((el, idx) => {
      el == arr1[idx % arr1.length] ? arr1Score++ : '';
      el == arr2[idx % arr2.length] ? arr2Score++ : '';
      el == arr3[idx % arr3.length] ? arr3Score++ : '';
  })
  
  let maxScore = Math.max(arr1Score, arr2Score, arr3Score);
  
  let arrs = [arr1Score, arr2Score, arr3Score];
  arrs.forEach((el,idx) => {
      maxScore == el ? answer.push(idx+1) : '';
  })
  
  return answer;
}


// 행렬의 곱셈
function solution(arr1, arr2) {
  var answer = [];
  
  // |1, 4|  |3, 3|          |1x3 + 4x3,  1x3 + 4x3|           |15, 15|
  // |3, 2|  |3, 3|    ==>   |3x3 + 2x3,  3x3 + 2x3|    ==>    |15, 15|
  // |4, 1|                  |4x3 + 1x3,  4x3 + 1x3|           |15, 15|
  
  // (arr1 a11 x arr2 a11 + arr1 a12 x arr2 21), (arr a11 x arr2 12 + arr a12 x arr2 a22) ...
  
  // arr1 행 개수 만큼 반복
  for (let i=0; i<arr1.length; i++) {
      let sumArr = []; // 더해진 값을 넣을 배열 초기화
      
      // arr2 열 개수 만큼 반복
      for (let j=0; j<arr2[0].length; j++) {
          let sum = 0; // 더해진 값 초기화
          
          // arr1 열 개수 != arr2 행 개수 같지 않을 수 있다.
          for (let k=0; k<arr1[0].length; k++) {
              // console.log(`arr1[i][k]: ${arr1[i][k]}, arr2[j][k]: ${arr2[k][j]}`);
              sum += arr1[i][k] * arr2[k][j];
          }
          sumArr.push(sum);
          
      }
      
      answer.push(sumArr);
  }
  
  return answer;
}