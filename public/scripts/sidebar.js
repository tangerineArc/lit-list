(() => {
  function listToggler(trigger, openStatus, contentBox) {
    const chevron = trigger.querySelector(".chevron");

    trigger.addEventListener("click", () => {
      if (openStatus) {
        contentBox.className = "closing-box";
        chevron.classList.add("rotate-box");
      } else {
        contentBox.className = "opening-box";
        chevron.classList.remove("rotate-box");
      }

      openStatus = !openStatus;
    });
  }

  listToggler(
    document.querySelector("#category-toggler"),
    true,
    document.querySelector("#category-list")
  );

  listToggler(
    document.querySelector("#add-new-toggler"),
    true,
    document.querySelector("#add-new-list")
  );
})();

(() => {
  const sidebarCloseButton = document.querySelector("#sidebar-close-button");
  const sidebarOpenButton = document.querySelector("#sidebar-open-button");

  const sidebar = document.querySelector("aside");

  const overlay = document.querySelector(".overlay");

  sidebarOpenButton.style.display = "none";

  if (document.documentElement.clientWidth < 1200) {
    sidebar.style.display = "none";
    sidebarOpenButton.style.display = "inline";
  }

  sidebarCloseButton.addEventListener("click", () => {
    sidebar.style.display = "none";
    sidebarOpenButton.style.display = "inline";

    overlay.style.display = "none";
  });

  sidebarCloseButton.addEventListener("keyup", (event) => {
    if (event.key !== "Enter") return;

    sidebar.style.display = "none";
    sidebarOpenButton.style.display = "inline";

    overlay.style.display = "none";
  });

  sidebarOpenButton.addEventListener("click", () => {
    sidebar.style.display = "flex";
    sidebarOpenButton.style.display = "none";

    if (document.documentElement.clientWidth <= 800) {
      overlay.style.display = "block";
    }
  });

  sidebarOpenButton.addEventListener("keyup", (event) => {
    if (event.key !== "Enter") return;

    sidebar.style.display = "flex";
    sidebarOpenButton.style.display = "none";

    if (document.documentElement.clientWidth <= 800) {
      overlay.style.display = "block";
    }
  });
})();
