import { getApi, deleteApi, postApi } from "./api.js";
import { validURL } from "./common.js";

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

const inputFullCheck = async () => {
  const addBtn = document.querySelector(".add-btn");
  const input = document.querySelectorAll("input.focus");

  let flag = true;
  for (let i = 0; i < input.length; i++) {
    if (!input[i].parentElement.classList.contains("active")) {
      flag = false;
      break;
    }
  }

  if (flag) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

const inputEvent = async (input, check) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
      check.classList.add("active");
    } else {
      check.classList.remove("active");
    }

    inputFullCheck();
  });
};

const inputURLEvent = async (input, check) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    if (value.length > 0) {
      check.classList.add("no-active");
    } else {
      check.classList.remove("no-active");
    }

    const URL = validURL(value);
    if (URL) {
      check.classList.add("active");
    } else {
      check.classList.remove("active");
    }

    inputFullCheck();
  });
};

const inputCheck = () => {
  const title = document.querySelector("#title");
  const titleCheck = document.querySelector(".title-check");
  const message = document.querySelector("#message");
  const messageCheck = document.querySelector(".message-check");
  const author = document.querySelector("#author");
  const authorCheck = document.querySelector(".author-check");
  const url = document.querySelector("#url");
  const urlCheck = document.querySelector(".url-check");

  inputEvent(title, titleCheck);
  inputEvent(message, messageCheck);
  inputEvent(author, authorCheck);
  inputURLEvent(url, urlCheck);
};

const clearInput = (name) => {
  const addBtn = document.querySelector(".add-btn");

  name.addEventListener("click", (e) => {
    const form = e.target.parentElement;
    form.children[0].value = "";
    form.classList.remove("active");
    form.classList.remove("no-active");
    addBtn.classList.remove("active");
  });
};

const clear = () => {
  const title = document.querySelector(".title-check .check");
  const message = document.querySelector(".message-check .check");
  const author = document.querySelector(".author-check .check");
  const url = document.querySelector(".url-check .check");

  clearInput(title);
  clearInput(message);
  clearInput(author);
  clearInput(url);
};

const focus = async () => {
  const foc = document.querySelectorAll(".focus");
  foc.forEach((item) => {
    item.addEventListener("focusin", (e) => {
      e.target.parentElement.classList.add("focus");
    });

    item.addEventListener("focusout", (e) => {
      e.target.parentElement.classList.remove("focus");
    });
  });
};

const addBook = async (e) => {
  const token = getToken();
  const title = document.querySelector("#title").value;
  const message = document.querySelector("#message").value;
  const author = document.querySelector("#author").value;
  const url = document.querySelector("#url").value;
  console.log(title, message, author, url);

  try {
    const res = await postApi("https://api.marktube.tv/v1/book", token, {
      title,
      message,
      author,
      url,
    });

    location.assign("/");
  } catch (error) {
    console.log("save error", error);
    alert("책 추가 실패");
  }
};

const addButton = async () => {
  const form = document.querySelector(".add-form");
  const addButton = document.querySelector(".add-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!addButton.classList.contains("active")) {
      return;
    }

    addBook(e);
  });
};

const backHistory = () => {
  window.history.back();
};

const backButton = () => {
  const back = document.querySelector(".btn-back");
  back.addEventListener("click", backHistory);
};

const main = async () => {
  login();

  inputCheck();

  focus();

  clear();

  backButton();

  addButton();
};

document.addEventListener("DOMContentLoaded", main);
