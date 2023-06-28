if (document.querySelectorAll(".testimonials-star__rating-value").length > 0) {
  const ratingValues = document.querySelectorAll(".testimonials-star__rating-value");

  ratingValues.forEach((ratingValue, index) => {
    const ratingPercentage = parseFloat(ratingValue.textContent) * 20;
    const ratingStyleContent = `
    .testimonials-star__item:nth-child(${index + 1}) .testimonials-star__rating-img::before {
      width: ${ratingPercentage}%;
    }
  `;

    const ratingStyle = document.createElement("style");
    ratingStyle.innerHTML = ratingStyleContent;
    document.head.appendChild(ratingStyle);
  });
}
