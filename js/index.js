import { getApi, deleteApi } from "./api.js";
import { profile } from "./dummy.js";

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
  return profile.notice;
};

const getBooksPick = async (id) => {
  return profile.notice.filter((item) => item.id === id)[0];
};

const render = async (books) => {
  const container = document.querySelector(".books-container");
  books.map((item) => {
    container.insertAdjacentHTML(
      "beforeend",
      ` <li class="book-box" id=${item.id}>
          <figure class="book">

            <ul class="paperback_front">
              <li>
                <span class="ribbon">new</span>
                <img src="${
                  item.image == null ? "img/bg.jpg" : item.image
                }" alt="" width="100%" height="100%" />
              </li>
              <li class="title">${item.image == null ? item.title : ""}</li>
            </ul>

            <ul class="ruled_paper">
              <li class="back-paper"></li>
              <li class="main-paper">
                <div class="btn-container">
                  <button class="btn view-btn">보기</button>
                  <button class="btn btn-delete">삭제</button>
                </div>
              </li>
              <li class="one-paper"></li>
              <li class="two-paper"></li>
              <li class="three-paper"></li>
            </ul>

            <ul class="paperback_back">
              <li>
                <img src="${
                  item.image == null ? "img/bg.jpg" : item.image
                }" alt="" width="100%" height="100%" />
              </li>
              <li></li>
            </ul>
          </figure>
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

const bookRender = async (element, item) => {
  element.insertAdjacentHTML(
    "afterbegin",
    `<div class="books-items">
    <div class="books-item">
      <div class="item-header">
        <h3 class="title">${item.title}</h3>
        <span class="date">${item.date}</span>
      </div>
      <div class="item-detail">
        <div>
          <h3 class="sub-title">책소개</h3>
          <p class="description">
            ${item.description}
          </p>
        </div>
        <div>
          <label class="sub-title">글쓴이 - </label>
          <span>${item.author}</span>
        </div>
        <div>
          <label class="sub-title">링크 - </label>
          <a class="link" href="${item.link}" target="_blank">바로가기</a>
        </div>
      </div>
      <div class="item-btn">
        <button class="btn btn-back">뒤로가기</button>
        <button class="btn btn-edit">수정하기</button>
        <button class="btn btn-delete">삭제하기</button>
      </div>
    </div>
  </div>`
  );
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

const orderAnimation = async (paper, width, height, zoomLevel) => {
  const id = paper.closest(".book-event").id;
  const books = await getBooksPick(id);
  const originZoom = 1;

  const obj = [
    `${originZoom}, 0, 0, 0,
  0, ${originZoom}, 0, 0,
  0, 0, ${originZoom}, 0,
  0, 0, 0, ${originZoom}`,

    `${originZoom * 2}, 1, 0, 0.001,
  0, ${originZoom * 1.5}, 0, 0,
  0, 0, 1, 0,
  -${(width * zoomLevel) / 4}, -${(height * zoomLevel) / 4 - height / 2}, 0, 1`,

    `${zoomLevel}, 1.27273, 4, 0.008182,
  0, ${zoomLevel}, 0, 0,
  0, 0, 1, 0,
  -${(width * zoomLevel) / 2}, -${(height * zoomLevel) / 2 - height / 2}, 0, 1`,

    `${zoomLevel * 1.5}, -0.5, 1, 0.00482,
  0, ${zoomLevel * 1.5}, 0, 0,
  0, 0, 1, 0,
  -${(width * zoomLevel) / 2}, -${(height * zoomLevel) / 2 - height / 2}, 0, 1`,

    `${zoomLevel}, 0, 0, 0,
  0, ${zoomLevel}, 0, 0,
  0, 0, 2, 0,
  -${(width * zoomLevel) / 2}, -${(height * zoomLevel) / 2 - height / 2}, 0, 1`,
  ];

  const orginWidth = paper.clientWidth * 3.7;
  const orginHeight = paper.clientHeight * 3.7;
  let level = 0;
  const start = setInterval(() => {
    level++;
    paper.style.transform = `rotateY(0deg)
        matrix3d(${obj[level]})`;

    if (level == 5) {
      paper.style.transition = "0s";
      paper.style.width = `${orginWidth}px`;
      paper.style.height = `${orginHeight}px`;
      paper.style.transform = `rotateY(0deg) translateZ(10px)
            matrix3d(${originZoom}, 0, 0, 0,
            0, ${originZoom}, 0, 0,
            0, 0, ${originZoom}, 0,
            -${(width * zoomLevel) / 2}, -${
        (height * zoomLevel) / 2 - height / 2
      }, 0, ${originZoom})`;
    }

    if (level === 6) {
      bookRender(paper, books);

      const back = paper.querySelector(".btn-back");
      back.addEventListener("click", () => {
        paper.closest(".book-event").style.opacity = 0;
        paper.closest(".book-event").style.visibility = "hidden";
        paper.closest(".book-event").innerHTML = "";
      });

      clearInterval(start);
    }
  }, 150);
};

const viewAnimation = (child) => {
  const id = child.closest(".book-box").id;
  const bookItem = document.querySelector(".book-event");
  bookItem.id = id;

  const { width, height } = child.closest(".book").getBoundingClientRect();

  const x = getOffset(child).left;
  const y = getOffset(child).top;
  const zoomLevel = 3.7;

  const cloneBook = child.closest(".book").cloneNode(true);
  const paperback_front = cloneBook.querySelector(".paperback_front");
  const paperback_back = cloneBook.querySelector(".paperback_back");
  const one = cloneBook.querySelector(".one-paper");
  const two = cloneBook.querySelector(".two-paper");
  const three = cloneBook.querySelector(".three-paper");
  const back = cloneBook.querySelector(".back-paper");
  const paper = cloneBook.querySelector(".main-paper");
  const btn = cloneBook.querySelector(".btn");
  const btn_container = cloneBook.querySelector(".btn-container");

  bookItem.style.opacity = 1;
  bookItem.style.visibility = "visible";

  cloneBook.classList.add("active");
  cloneBook.style.top = `${y + 21}px`;
  cloneBook.style.left = `${x + 66}px`;

  child.closest(".book").style.display = "none";

  bookItem.append(cloneBook);

  setTimeout(() => {
    cloneBook.style.top = `50%`;
    cloneBook.style.left = `calc(50% + 80px)`;
  }, 10);

  setTimeout(() => {
    btn.style.transform = "rotateY(0deg)";
    btn_container.style.opacity = 0;
    btn_container.style.visibility = "hidden";

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
    paper.style.transformOrigin = "0px 0px 0px";
    paper.style.transition = "0.3s";
    paper.style.borderRadius = "0";
  }, 100);

  orderAnimation(paper, width, height, zoomLevel);

  setTimeout(() => {
    child.closest(".book").style.display = "block";
  }, 1000);
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

  const books = await getBooks();
  render(books);

  viewButton();
};

document.addEventListener("DOMContentLoaded", main);
