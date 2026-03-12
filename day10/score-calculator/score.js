// 1. 변수 선언 (const, let, var 각각 활용)
const bonus = 5;          // 변하지 않는 보너스 점수
let inputScore = prompt("ViViarte Seoul 리뉴얼 중"); 
var grade;                // 등급을 저장할 변수

// 숫자로 변환
let score = Number(inputScore);

// 2. 연산자 활용
// 이항 산술 및 복합 대입 연산자: 5점 보너스 추가
score += bonus; 

// 삼항 연산자를 이용한 합격/불합격 판단 (60점 기준)
const status = (score >= 60) ? "Pass" : "Fail";

// 3. 조건문 (if, else if, else) - 등급 부여
if (score >= 100) {
    grade = "S";
} else if (score >= 90 && score < 100) { // 논리 연산자 활용
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

// 4. 조건문 (switch) - 등급별 메시지 설정
let message;
switch (grade) {
    case "S":
        message = "Super!!";
        break;
    case "A":
        message = "Excellent work!";
        break;
    case "B":
        message = "Good job!";
        break;
    case "C":
        message = "Satisfactory performance.";
        break;
    case "D":
        message = "Needs improvement.";
        break;
    case "F":
        message = "Please try harder!";
        break;
    default:
        message = "Invalid grade.";
}

// 5. 콘솔 출력 형식 준수
console.log("Final Score: " + score);
console.log("Grade: " + grade);
console.log("Status: " + status);
console.log("Message: " + message);