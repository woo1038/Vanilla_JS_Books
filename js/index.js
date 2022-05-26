import { getApi, deleteApi } from "./api.js";

const getToken = () => {
  return localStorage.getItem("token");
};

const login = async () => {
  const token = getToken();
  if (!token) {
    location.assign("/login");
    return;
  }
};

const addBooks = async () => {
  const addBtn = document.querySelector(".add-btn");
  addBtn.addEventListener("click", () => {
    location.assign("/add");
  });
};

const deleteBook = async (bookId) => {
  const token = getToken();
  if (!token) {
    return location.assign("/login");
  }

  deleteApi(`https://api.marktube.tv/v1/book/${bookId}`, token);
};

const getBooks = async () => {
  const token = getToken();
  return await getApi("https://api.marktube.tv/v1/book", token);
};

const render = async (books) => {
  const container = document.querySelector(".books-container");
  books.map((item) => {
    const time = item.createdAt.slice(11, 13);
    const timeLength = String(time % 12).length;

    container.insertAdjacentHTML(
      "beforeend",
      `<li class="book">
    <div class="book-title">${item.title}</div>
    <div class="book-items">
      <span class="book-btn">
        <a href="/book?=${item.bookId}" class="btn">
          보기
        </a>
        <button class="btn delete-btn" data-book-id="${
          item.bookId
        }">삭제</button>
      </span>
      <span class="book-date">${item.createdAt
        .slice(0, 10)
        .replaceAll("-", ".")} ${time > 12 ? "오후" : "오전"} ${
        timeLength == 1 ? 0 : ""
      }${time % 12}${item.createdAt.slice(13, 19)}</span>
    </div>
  </li>`
    );
  });

  document.querySelectorAll(".delete-btn").forEach((element) => {
    element.addEventListener("click", async (e) => {
      const bookId = e.target.dataset.bookId;

      try {
        await deleteBook(bookId);
        await location.reload();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const goTop = (container, arrow) => {
  container.addEventListener("scroll", () => {
    container.scrollTop > 0
      ? arrow.classList.add("active")
      : arrow.classList.remove("active");
  });

  arrow.addEventListener("click", () => {
    container.scrollTop = 0;
  });
};

const arrowBtn = async () => {
  const arrow = document.querySelector(".top-scroll");
  const container = document.querySelector(".books-container");

  goTop(container, arrow);
};

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

// ################
const delayfunction = (el, time, duration, matrix3d) => {
  setTimeout(() => {
    el.style.transitionDuration = `${duration}`;
    el.style.transform = `rotateY(0deg)
    matrix3d(${matrix3d})`;
  }, time);
};

const viewAnimation = (child) => {
  const x = getOffset(child).left;
  const y = getOffset(child).top;

  const cloneBook = child.closest(".book").cloneNode(true);
  cloneBook.classList.add("active");
  cloneBook.style.top = `${y + 21}px`;
  cloneBook.style.left = `${x + 66}px`;

  child.closest(".book").style.display = "none";

  const bookItem = document.querySelector(".book-event");
  bookItem.append(cloneBook);

  setTimeout(() => {
    cloneBook.style.top = `45%`;
    cloneBook.style.left = `55%`;
  }, 10);

  const paperback_front = cloneBook.querySelector(".paperback_front");
  const paperback_back = cloneBook.querySelector(".paperback_back");
  const one = cloneBook.querySelector(".one-paper");
  const two = cloneBook.querySelector(".two-paper");
  const three = cloneBook.querySelector(".three-paper");
  const back = cloneBook.querySelector(".back-paper");
  const paper = cloneBook.querySelector(".main-paper");
  const btn = cloneBook.querySelector(".btn");

  setTimeout(() => {
    btn.style.transform = "rotateY(0deg)";

    /* front */
    paperback_front.style.transitionDuration = "0.3s";
    paperback_front.style.transform = "rotateY(-180deg)";
    one.style.transitionDuration = "0.3s";
    one.style.transform = "rotateY(-180deg)";
    two.style.transitionDuration = "0.3s";
    two.style.transform = "rotateY(-180deg)";
    three.style.transitionDuration = "0.3s";
    three.style.transform = "rotateY(-180deg) translateZ(0px)";

    /* back */
    paperback_back.style.transitionDuration = "0.3s";
    paperback_back.style.transform = "rotateY(0deg)";
    paperback_back.style.width = "102%";
    paperback_back.style.height = "102%";
    paperback_back.style.top = "-1%";
    paperback_back.style.left = "-1%";
    back.style.transitionDuration = "0.3s";
    back.style.transform = "rotateY(0deg)";
    paper.style.zIndex = "5";
    paper.style.transform = `rotateY(0deg)  translateZ(10px)
    matrix3d(1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1)`;
    paper.style.transformOrigin = "0px 0px 0px";
    paper.style.transition = "0.3s";
    paper.style.borderRadius = "0";
  }, 100);

  delayfunction(
    paper,
    500,
    "0.4s",
    `3.5, 1, 0, 0.005, 
    1, 3.5, 0, 0.005, 
    0, 0, 1, 0, 
    -300, -300, 0, 1`
  );

  delayfunction(
    paper,
    900,
    "0.2s",
    `3.60909, 1.27273, 4, 0.008182, 
    0, 3.60909, 0, 0,
    0, 0, 1, 0,
    -254.545, -255.545, 0, 1`
  );

  delayfunction(
    paper,
    1100,
    "0.5s",
    `3.7, 0, 0, 0, 
    0, 3.7, 0, 0, 
    0, 0, 2, 0, 
    -249.545, -260.545, 0, 1`
  );
};

const viewButton = () => {
  const view = document.querySelectorAll(".view-btn");
  view.forEach((element) => {
    element.addEventListener("click", () => viewAnimation(element));
  });
};

const main = async () => {
  login();

  addBooks();

  arrowBtn();

  viewButton();

  const books = await getBooks();
  render(books);
};

document.addEventListener("DOMContentLoaded", main);
