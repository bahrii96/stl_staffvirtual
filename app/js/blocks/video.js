if (document.querySelector(".popup-video")) {
  $(document).ready(function () {
    $(".popup-video").fancybox({
      maxWidth: 800,
      maxHeight: 600,
      fitToView: false,
      width: "70%",
      height: "70%",
      autoSize: false,
      closeClick: false,
      openEffect: "none",
      closeEffect: "none",
    });
  });
}
