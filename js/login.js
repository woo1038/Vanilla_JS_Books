import { postApi } from "./api.js";

const checkEmail = (str) => {
  const reg_email =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!reg_email.test(str)) {
    return false;
  } else {
    return true;
  }
};

const checkPassword = (num) => {
  const reg_password = 1;
  if (num.length >= reg_password) {
    return true;
  } else {
    return false;
  }
};

const loginCheck = () => {
  const email = document.querySelector("#email");
  const emailCheck = document.querySelector(".email-check");
  const password = document.querySelector("#password");
  const passwordCheck = document.querySelector(".password-check");
  const loginBtn = document.querySelector(".login-btn");

  email.addEventListener("input", (e) => {
    if (checkEmail(e.target.value) || e.target.value.length > 0) {
      emailCheck.classList.add("active");
    } else {
      emailCheck.classList.remove("active");
    }

    if (checkEmail(e.target.value) && checkPassword(password.value)) {
      loginBtn.classList.add("active");
    } else {
      loginBtn.classList.remove("active");
    }
  });

  password.addEventListener("input", (e) => {
    if (checkPassword(e.target.value)) {
      passwordCheck.classList.add("active");
    } else {
      passwordCheck.classList.remove("active");
    }

    if (checkEmail(email.value) && checkPassword(e.target.value)) {
      loginBtn.classList.add("active");
    } else {
      loginBtn.classList.remove("active");
    }
  });
};

const clearInput = (name) => {
  name.addEventListener("click", (e) => {
    const form = e.target.parentElement;
    form.children[0].value = "";
    form.classList.remove("active");
  });
};

const clear = () => {
  const email = document.querySelector(".email-check .check");
  const password = document.querySelector(".password-check .check");

  clearInput(email);
  clearInput(password);
};

const login = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await postApi("https://api.marktube.tv/v1/me", email, password);

    const { token } = res.data;
    if (!token) {
      return;
    }

    localStorage.setItem("token", token);
    location = "/";
  } catch (error) {
    const data = error.response.data;

    if (data) {
      const state = data.error;

      if (state === "USER_NOT_EXIST") {
        alert("사용자가 존재하지 않습니다.");
      } else if (state === "PASSWORD_NOT_MATCH") {
        alert("비밀번호가 틀렸습니다.");
      }
    }
  }
};

const loginButton = async () => {
  const form = document.querySelector(".login-form");
  form.addEventListener("submit", login);
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
  loginButton();

  loginCheck();

  focus();

  clear();
};

document.addEventListener("DOMContentLoaded", main);
