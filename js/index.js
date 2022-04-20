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

const main = async () => {
  login();
};

document.addEventListener("DOMContentLoaded", main);
