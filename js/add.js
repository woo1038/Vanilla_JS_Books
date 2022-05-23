import { getApi, deleteApi } from "./api.js";
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

const toggleBtn = async () => {
  const toggleBtn = document.querySelector(".header-btn");
  toggleBtn.addEventListener("click", toggle);
};

const inputFullCheck = async () => {
  const addBtn = document.querySelector(".add-btn");
  const hello = document.querySelectorAll("input.focus");

  let flag = true;
  for (let i = 0; i < hello.length; i++) {
    if (!hello[i].parentElement.classList.contains("active")) {
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

const main = async () => {
  logoutBtn();

  login();

  inputCheck();

  // header 메뉴
  toggleBtn();

  focus();

  clear();
};

document.addEventListener("DOMContentLoaded", main);
