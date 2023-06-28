if (document.getElementById("myGlossaryTable")) {
  jQuery(document).ready(function () {
    jQuery("#myGlossaryInput").on("keyup", function () {
      let value = jQuery(this).val().toLowerCase();
      jQuery("#myGlossaryTable .glossary__row, #myGlossaryTable .glossary__item").filter(function () {
        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    let glossaryNav = document.getElementById("glossaryNav");
    let glossaryRows = document.querySelectorAll(".glossary__row");

    let letters = [];
    glossaryRows.forEach(function (row) {
      let letter = row.querySelector(".glossary__row-title").textContent.trim();
      if (!letters.includes(letter)) {
        letters.push(letter);
      }
    });
    letters.sort();
    letters.forEach(function (letter, index) {
      if (letter !== "") {
        let liGlossaryRows = document.createElement("li");
        liGlossaryRows.textContent = letter;
        glossaryNav.appendChild(liGlossaryRows);

        liGlossaryRows.addEventListener("click", function () {
          let targetRow;
          glossaryRows.forEach(function (row) {
            if (row.querySelector(".glossary__row-title").textContent.trim() === letter) {
              targetRow = row;
              const headerHeight = document.querySelector("header").offsetHeight;
              const targetOffsetTop = targetRow.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              window.scrollTo({ top: targetOffsetTop, behavior: "smooth" });
            }
          });
          if (targetRow) {
            let activeElements = document.querySelectorAll("#glossaryNav li.active");
            activeElements.forEach(function (element) {
              element.classList.remove("active");
            });
            liGlossaryRows.classList.add("active");
          }
        });

        if (index === 0) {
          liGlossaryRows.classList.add("active");
        }
      }
    });
  });
}
