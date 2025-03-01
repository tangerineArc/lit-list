(() => {
  function listToggler(trigger, status, contentBox) {
    const chevron = trigger.querySelector(".chevron");

    trigger.addEventListener("click", () => {
      if (status) {
        contentBox.className = "closing-box";
        chevron.classList.add("rotate-box");
      } else {
        contentBox.className = "opening-box";
        chevron.classList.remove("rotate-box");
      }

      status = !status;
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
