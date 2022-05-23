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

const logout = async () => {
  const token = getToken();
  if (!token) {
    location.assign("/login");
  }

  try {
    deleteApi("https://api.marktube.tv/v1/me", token);
  } catch (error) {
    console.log("logout error", error);
  } finally {
    localStorage.clear();
    location.assign("/login");
  }
};

const logoutBtn = async () => {
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", logout);
};

const toggle = async () => {
  let menu = document.querySelector(".header-container");
  menu.classList.toggle("active");
};

const toggleBtn = async (flag) => {
  const toggleBtn = document.querySelector(".header-btn");
  toggleBtn.addEventListener("click", toggle);
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
        <a href="/book?=${item.bookId}">
          <button class="btn view-btn">보기</button>
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
        location.reload();
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

const main = async () => {
  logoutBtn();

  login();

  // header 메뉴
  toggleBtn();

  addBooks();

  arrowBtn();

  const books = await getBooks();
  render(books);
};

document.addEventListener("DOMContentLoaded", main);