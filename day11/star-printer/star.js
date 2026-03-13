// 1. 함수 선언문: 별을 생성하고 출력하는 함수
// 매개변수 기본값 설정: 입력이 없거나 0 이하일 경우 1로 처리
function printStars(count = 1) {
    var starResult = ""; // var 사용 (함수 스코프 변수)

    // for 반복문을 사용하여 입력된 숫자만큼 별(*) 추가
    for (let i = 0; i < count; i++) {
        starResult += "*";
    }

    console.log(starResult);
}

// 2. 메인 실행 로직
const minStars = 1;  // const 사용 (상수)
const maxStars = 10;

// while 반복문을 사용하여 유효한 입력을 받을 때까지 반복
while (true) {
    let input = prompt("Enter the number of stars (1-10):"); // let 사용
    
    // prompt 취소를 누른 경우 프로그램 종료
    if (input === null) break;

    // 입력값을 숫자로 변환
    let num = Number(input);

    // 3. 조건문과 연산자: 유효성 검사 (!isNaN, 비교 연산자, 논리 연산자 사용)
    if (isNaN(num) || num < minStars || num > maxStars) {
        console.log("Invalid input! Enter a number between 1 and 10.");
        
        // 유효하지 않은 입력일 경우 continue로 다음 반복 진행 (재입력 요청)
        continue; 
    } else {
        // 유효한 입력일 경우 함수 호출 후 break로 루프 종료
        printStars(num);
        break;
    }
}