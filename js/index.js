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
  // const token = getToken();
  // return await getApi("https://api.marktube.tv/v1/book", token);
};

const render = async (books) => {
  const container = document.querySelector(".books-container");
  console.log(1, books);
  books.map((item) => {
    container.insertAdjacentHTML(
      "beforeend",
      ` <li class="book-box">
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
              <li class="btn-container main-paper">
                <button class="btn view-btn">보기</button>
                <button class="btn btn-delete">삭제</button>
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
  const bookItem = document.querySelector(".book-event");
  bookItem.style.opacity = 1;
  bookItem.style.visibility = "visible";

  const x = getOffset(child).left;
  const y = getOffset(child).top;

  const cloneBook = child.closest(".book").cloneNode(true);
  cloneBook.classList.add("active");
  cloneBook.style.top = `${y + 21}px`;
  cloneBook.style.left = `${x + 66}px`;

  child.closest(".book").style.display = "none";

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
  const view_btn = cloneBook.querySelector(".view-btn");
  const delete_btn = cloneBook.querySelector(".btn-delete");

  setTimeout(() => {
    btn.style.transform = "rotateY(0deg)";
    delete_btn.style.opacity = 0;
    delete_btn.style.visibility = "hidden";
    view_btn.style.opacity = 0;
    view_btn.style.visibility = "hidden";

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
    "0.2s",
    `2, 1, 0, 0.001,      0, 1.5, 0, 0,      0, 0, 1, 0,      -134, -190, 0, 1`
  );

  delayfunction(
    paper,
    600,
    "0.3s",
    `3.60909, 1.27273, 4, 0.008182,
    0, 3.60909, 0, 0,
    0, 0, 1, 0,
    -254.545, -255.545, 0, 1`
  );

  delayfunction(
    paper,
    750,
    "0.2s",
    `6, -0.5, 1, 0.00482, 0, 4.5, 0, 0, 0, 0, 1, 0, -254.545, -255.545, 0, 1`
  );

  delayfunction(
    paper,
    900,
    "0.3s",
    `3.7, 0, 0, 0,
    0, 3.7, 0, 0,
    0, 0, 2, 0,
    -249.545, -260.545, 0, 1`
  );
};

const viewButton = () => {
  const view = document.querySelectorAll(".view-btn");
  view.forEach((element) => {
    console.log(1);
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
