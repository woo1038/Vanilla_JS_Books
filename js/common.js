export async function goTop(container, arrow) {
  container.addEventListener("scroll", () => {
    container.scrollTop > 0
      ? arrow.classList.add("active")
      : arrow.classList.remove("active");
  });

  arrow.addEventListener("click", () => {
    container.scrollTop = 0;
  });
}
