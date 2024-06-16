/* 베스트앨범 - 해시 */
function solution(genres, plays) {
  var answer = [];
  let playSumCount = {};
  let playCount = [];
  
  // 장르별 총 재생횟수, 고유번호+장르+재생횟수 정리
  genres.map((el, i) => {
      playSumCount[el] === undefined ? playSumCount[el] = 0 : '';
      playSumCount[el] = playSumCount[el] + plays[i];     
      
      playCount[i] = {no: i, genres: el, play: plays[i]};
  });
  // console.log(playSumCount);
  // console.log(playCount);
  
  // 재생횟수 높은 장르 순으로 sort
  let sortPlaySumCount = Object.keys(playSumCount).sort((a, b) => playSumCount[b] - playSumCount[a]);
  // 재생횟수 높은 노래 순으로 sort
  let sortPlayCount = playCount.sort((a, b) => b.play - a.play);
  
  sortPlaySumCount.forEach((genres, i) => {
      let count = 0;
      sortPlayCount.forEach((el) => {
          if(count < 2 && genres === el.genres) {
              answer.push(el.no);                
              count++;
          }
      })
  })
  
  return answer;
}



/* 신고 결과 받기 - 해시 */
function solution(id_list, report, k) {
  var answer = [];
  // 유저당 신고받은 수 초기값(0)
  let userCount = {};
  id_list.forEach((id) => {
      userCount[id] = 0;
  })
  // 유저당 메일받을 수 초기값(0)
  let userMail = {};
  id_list.forEach((id) => {
      userMail[id] = 0;
  })
  let reported = []; // 정지된 유저
  

  // 유저가 다른 유저를 신고한 배열(중복제거)   
  let reportSet = [...new Set(report)].map((el) => el.split(' '));
  // console.log(reportSet);
  
  // 신고받은 유저의 신고받은 수
  reportSet.forEach((id) => {
      let user = id[1];
      userCount[user] = userCount[user] + 1;
  })
  // k회 이상 신고받아서 정지된 유저
  for(let key in userCount) {
      userCount[key] >= k ? reported.push(key) : '';
  }
  // console.log(reported);
  
  // 신고한 유저가 정지됐으면 메일 발송+1
  if(reported.length > 0) {
      reported.forEach((user) => {
          reportSet.forEach((id) => {
              let userA = id[0]; // 신고한 유저
              let userB = id[1]; // 신고받은 유저
              if(user === userB) {
                  userMail[userA] = userMail[userA] + 1;
              }
          })  
      })
      for(let key in userMail) {
          answer.push(userMail[key]);
      }
      
  } else {
      answer = Array(id_list.length).fill(0);
  }
  
  return answer;
}