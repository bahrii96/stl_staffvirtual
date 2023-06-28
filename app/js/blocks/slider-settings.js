if (document.querySelector(".swiper")) {
  swiper = new Swiper(".meet__slider", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  swiper = new Swiper(".blog-slider__slider", {
    // loop: true,
    slidesPerView: 1.1,
    spaceBetween: 14,

    breakpoints: {
      640: {
        slidesPerView: 2.1,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3.1,
        spaceBetween: 24,
      },
      1220: {
        slidesPerView: 4.1,
        spaceBetween: 24,
      },
    },
  });
}
