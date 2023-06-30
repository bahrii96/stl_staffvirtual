document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(function (header) {
      const toggleButton = header.querySelector(".accordion-toggle");
      const accordionContent = header.nextElementSibling;

      header.addEventListener("click", function () {
        const accordionItem = this.parentNode;
        const isOpen = accordionItem.classList.contains("open");

        accordionHeaders.forEach(function (otherHeader) {
          otherHeader.parentNode.classList.remove("open");
        });

        if (!isOpen) {
          accordionItem.classList.add("open");
        }
      });
    });
  }
});
// ================
const elements = document.querySelectorAll('path[fill="#1888FF"], path[fill="#D1E7FF"]');

// Додати обробник події для кожного елементу
elements.forEach(element => {
  // Встановити CSS-властивість transition для плавного переходу
  element.style.transition = "fill 0.3s ease";

  element.addEventListener("mouseover", () => {
    // Змінити колір fill залежно від поточного значення
    if (element.getAttribute("fill") === "#1888FF") {
      element.setAttribute("fill", "#D1E7FF");
    } else if (element.getAttribute("fill") === "#D1E7FF") {
      element.setAttribute("fill", "#1888FF");
    }
  });

  element.addEventListener("mouseout", () => {
    // Змінити колір fill на початкове значення відповідно до атрибута
    if (element.getAttribute("fill") === "#1888FF") {
      element.setAttribute("fill", "#1888FF");
    } else if (element.getAttribute("fill") === "#D1E7FF") {
      element.setAttribute("fill", "#D1E7FF");
    }
  });
});

// =====================
