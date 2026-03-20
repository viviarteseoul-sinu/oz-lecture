// 도서 데이터를 저장할 배열
let books = [];
// 대여 상태를 관리할 배열 (클로저 객체 저장)
let rentals = [];

// 도서 추가 기능
function addBook() {
    const titleInput = document.getElementById('bookTitle');
    const priceInput = document.getElementById('bookPrice');
    const title = titleInput.value.trim();
    const price = Number(priceInput.value);

    // 유효성 검사
    if (title === '' || isNaN(price) || price <= 0) {
        alert('도서 제목과 유효한 가격(0 이상)을 입력하세요!');
        return;
    }

    const book = { title, price };
    books.push(book);

    // [도전과제] 대여 상태 클로저 객체 생성 및 저장
    const rental = createBookRental(title);
    rentals.push(rental);

    const bookList = document.getElementById('bookList');
    const li = document.createElement('li');
    li.className = 'book-item';
    // 대여/반납 버튼 및 초기 상태(대여 가능) 표시
    li.innerHTML = `
        <span>${title} - ${price}원 (대여 가능)</span>
        <div>
            <button onclick="removeBook(this)" style="margin-right:5px;">삭제</button>
            <button onclick="toggleRental(this)">대여/반납</button>
        </div>
    `;
    bookList.appendChild(li);

    // 입력창 초기화
    titleInput.value = '';
    priceInput.value = '';
}

// 삭제 기능
function removeBook(button) {
    // 버튼의 부모인 li 요소 접근 및 제목 추출
    const li = button.parentElement.parentElement; // div를 한 번 더 감쌌을 경우를 대비해 구조 확인
    const text = li.querySelector('span').textContent;
    const title = text.split(' - ')[0]; // "제목" 부분만 추출

    // 1. books 배열에서 도서 제거
    const bookIndex = books.findIndex(book => book.title === title);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
    }

    // 2. [도전과제] rentals 배열에서 해당 제목의 클로저 제거
    const rentalIndex = rentals.findIndex(r => r.getStatus().title === title);
    if (rentalIndex !== -1) {
        rentals.splice(rentalIndex, 1);
    }

    // 3. DOM에서 li 제거
    li.remove();
}

// 도서 데이터 처리 (map, filter, reduce 활용)
function processBooks() {
    // 1. map: 제목에 "Book: " 접두사 추가 (원본 보존을 위해 새로운 객체 배열 생성)
    const prefixedBooks = books.map(book => ({
        title: `Book: ${book.title}`,
        price: book.price
    }));

    // 2. filter: 가격이 10,000원 이상인 도서 필터링
    const highPriceBooks = books.filter(book => book.price >= 10000);

    // 3. reduce: 모든 도서 가격의 합계 계산
    const totalPrice = books.reduce((acc, cur) => acc + cur.price, 0);

    // 결과 표시
    const resultsDiv = document.getElementById('results');
    let html = '<h3>상위 가격 도서 (Prefix):</h3><ul>';
    
    if (prefixedBooks.length === 0) {
        html += '<li>도서가 없습니다.</li>';
    } else {
        prefixedBooks.forEach(book => {
            html += `<li>${book.title} - ${book.price}원</li>`;
        });
    }
    html += '</ul>';

    html += '<h3>고가 도서 (10,000원 이상):</h3><ul>';
    if (highPriceBooks.length === 0) {
        html += '<li>고가 도서가 없습니다.</li>';
    } else {
        highPriceBooks.forEach(book => {
            html += `<li>${book.title} - ${book.price}원</li>`;
        });
    }
    html += '</ul>';

    html += `<h3>총 가격:</h3><p><strong>${totalPrice.toLocaleString()}원</strong></p>`;
    resultsDiv.innerHTML = html;
}

// [도전과제] 클로저로 대여 상태 관리
const createBookRental = (bookTitle) => {
    let isBorrowed = false; // 대여 여부 (은닉변수)
    let borrowCount = 0;    // 대여 횟수 (은닉변수)

    return {
        borrow: () => {
            if (isBorrowed) {
                alert(`${bookTitle}은(는) 이미 대여 중입니다.`);
                return false;
            }
            isBorrowed = true;
            borrowCount++;
            return true;
        },
        returnBook: () => {
            isBorrowed = false;
        },
        getStatus: () => ({
            title: bookTitle,
            isBorrowed,
            borrowCount
        })
    };
};

// [도전과제] 대여/반납 토글 함수
function toggleRental(button) {
    const li = button.parentElement.parentElement;
    const text = li.querySelector('span').textContent;
    const title = text.split(' - ')[0];
    
    // rentals 배열에서 해당 제목을 가진 클로저 객체 찾기
    const rental = rentals.find(r => r.getStatus().title === title);
    if (!rental) return;

    const status = rental.getStatus();
    // 가격 정보를 가져오기 위해 books 배열 탐색
    const book = books.find(b => b.title === title);
    
    if (status.isBorrowed) {
        // 반납 처리
        rental.returnBook();
        li.querySelector('span').textContent = `${title} - ${book.price}원 (대여 가능)`;
        button.textContent = "대여/반납";
    } else {
        // 대여 처리
        if (rental.borrow()) {
            li.querySelector('span').textContent = `${title} - ${book.price}원 (대여 중)`;
        }
    }
}

// [도전과제] 모든 대여 상태 및 횟수 표시
function showAllRentalStatus() {
    const resultsDiv = document.getElementById('results');
    let html = '<h3>현재 모든 도서 대여 상태:</h3><ul>';
    
    if (rentals.length === 0) {
        html += '<li>등록된 도서가 없습니다.</li>';
    } else {
        rentals.forEach(rental => {
            const status = rental.getStatus();
            html += `
                <li>
                    <strong>${status.title}</strong>: 
                    ${status.isBorrowed ? '<span style="color:red;">대여 중</span>' : '<span style="color:blue;">대여 가능</span>'} 
                    (누적 대여 횟수: ${status.borrowCount}회)
                </li>`;
        });
    }
    html += '</ul>';
    resultsDiv.innerHTML = html;
}