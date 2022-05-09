const getToken = () => {
  return localStorage.getItem("token");
};

const login = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const res = await fetch("https://api.marktube.tv/v1/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    return res.json();
  });

  const { error } = res;
  if (error) {
    if (error === "USER_NOT_EXIST") {
      alert("사용자가 존재하지 않습니다.");
    } else if (error === "PASSWORD_NOT_MATCH") {
      alert("비밀번호가 틀렸습니다.");
    }
  }

  const { token } = res;
  if (!token) {
    return;
  }
  localStorage.setItem("token", token);
  location = "/";
};

const loginButton = async () => {
  const form = document.querySelector("#login-form");
  form.addEventListener("submit", login);
};

const main = async () => {
  loginButton();
};

document.addEventListener("DOMContentLoaded", main);