// 과제: 할 일 관리 앱 (To-Do List)
// HTML 파일에 연결하여 브라우저에서 실행하세요

// DOM 요소 선택
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

// 입력값 검증 및 할 일 추가 함수
function addTask() {
    const taskText = taskInput.value.trim();

    // 1. 입력값이 비어있는지 확인
    if (taskText === "") {
        alert('할 일을 입력해주세요!');
        return;
    }

    // 2. 새로운 리스트 아이템(li) 생성
    const li = document.createElement('li');

    // 3. 할 일 텍스트를 담을 span 생성 및 추가
    const span = document.createElement('span');
    span.textContent = taskText;
    
    // 완료 상태 토글 이벤트 리스너: 텍스트 클릭 시 밑줄 토글
    span.addEventListener('click', function() {
        span.style.textDecoration = span.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    });

    // 4. 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.className = 'delete-button'; // CSS 클래스 적용

    // 5. 삭제 버튼 이벤트 리스너: 해당 li 항목 제거
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    // 6. 요소 조립 (li 안에 span과 버튼 넣기)
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // 7. 목록(ul)에 추가
    taskList.appendChild(li);

    // 8. 입력창 초기화 및 포커스
    taskInput.value = '';
    taskInput.focus();
}

// 모든 할 일 삭제 함수
function clearAllTasks() {
    // innerHTML을 비우거나 반복문으로 모든 자식 제거
    taskList.innerHTML = '';
}

// --- 이벤트 리스너 연결 ---

// 추가 버튼 클릭 이벤트 적용
addButton.addEventListener('click', addTask);