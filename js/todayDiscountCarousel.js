const todayDiscountCarousel = ($todayDiscountCarousel, items) => {
  let currentItem = 0;
  let isMoving = false;
  const DURATION = 500;

  let timerId = null;
  let $carouselList = null;
  let $todayDiscountCurrentItem = null;

  // currentItem를 기준으로 carouselList를 이동시킨다.
  const move = (currentItem, duration = 0) => {
    if (duration) isMoving = true;

    $carouselList.style.setProperty("--duration", duration);
    $carouselList.style.setProperty("--currentItem", currentItem);

    let itemCount =
      currentItem <= 0
        ? 1
        : currentItem > items.length
        ? items.length
        : currentItem;

    $todayDiscountCurrentItem.innerHTML = `${itemCount} / ${items.length} `;
  };

  document.addEventListener("DOMContentLoaded", () => {
    $todayDiscountCarousel.innerHTML = `
    <h2 class="main__section__heading main__today__discount__title">
        오늘의 할인
      </h2>
      <a href="" class="main__section__link">전체보기</a>
<div class="main__today__discount__list today__discount__carousel__list">
  ${[items[items.length - 1], ...items, items[0], items[1], items[2]]
    .map(
      (item) => `
      <article class="main__today__discount__item today__discount__carousel__item" role="tabpanel" aria-label="${item.index}번째 배너">
        <a href="#" class="main__today__discount__link">
        <img
              src="${item.logo}"
              alt=""
              class="main__today__discount__logo"
            />
            <img src="${item.background}" alt="" class="main__today__discount__bg" />
            <p class="main__today__discount__desc-top">${item.descTop}</p>
            <p class="main__today__discount__desc-discount">${item.descDiscount}</p>
            <p class="main__today__discount__desc-bottom">${item.descBottem1}</p>
            <p class="main__today__discount__desc-bottom">
              ${item.descBottom2}
            </p>
        </a>
        </article>
        `
    )
    .join("")}
</div>
<button class="today_discount__button carousel__list__button prev ">
  <img class="carousel__list-button" src="/images/components/banner/white-arrow56.png" alt="이전 배너 보기 버튼" />
</button>
<button class="today_discount__button carousel__list__button next">
  <img class="carousel__list-button" src="/images/components/banner/white-arrow56.png" alt="다음 배너 보기 버튼" />
</button>
<a href="#" type="button" class="today_discount__link__button carousel__currnet__badge"
  ><span class="today_discount__link__button__current carousel__currnet__badge__text"> </span
  >모두보기</a> 
`;

    $carouselList = document.querySelector(".today__discount__carousel__list");
    $todayDiscountCurrentItem = document.querySelector(
      ".today_discount__link__button__current"
    );

    $todayDiscountCarousel.style.opacity = 1;

    move(++currentItem);

    // Autoplay
    timerId = setInterval(() => move(++currentItem, DURATION), 5000);
  });

  $todayDiscountCarousel.onclick = ({ target }) => {
    console.log(target);
    if (!target.classList.contains("carousel__list__button") || isMoving)
      return;

    // Autoplay reset
    clearInterval(timerId);

    const point = target.classList.contains("prev") ? -1 : 1;
    currentItem += 1 * point;
    move(currentItem, DURATION);

    console.log();

    // Autoplay restart
    timerId = setInterval(() => move(++currentItem, DURATION), 5000);
  };

  $todayDiscountCarousel.ontransitionend = () => {
    isMoving = false;

    const point =
      currentItem === 0 ? 1 : currentItem === items.length + 1 ? -1 : 0;

    if (!point) return;

    currentItem += items.length * point;
    move(currentItem);
  };
};

/**
 * DATA SET
 * */

todayDiscountCarousel(document.querySelector(".today__discount__carousel"), [
  {
    index: 1,
    logo: "/images/main/logo-vips.png",
    descTop: "빕스 모든 메뉴",
    descDiscount: "1만 2천원 할인",
    descBottem1: "홈파티의 정석!",
    descBottom2: "집에서 즐기는 빕스 다이닝",
    background: "/images/components/banner/vips-bg.png",
  },
  {
    index: 2,
    logo: "/images/main/logo-vips.png",
    descTop: "빕스 모든 메뉴",
    descDiscount: "1000만 2천원 할인",
    descBottem1: "홈파티의 정석!",
    descBottom2: "집에서 즐기는 빕스 다이닝",
    background: "/images/components/banner/vips-bg.png",
  },
  {
    index: 3,
    logo: "/images/main/logo-vips.png",
    descTop: "빕스 모든 메뉴",
    descDiscount: "10만 2천원 할인",
    descBottem1: "홈파티의 정석!",
    descBottom2: "집에서 즐기는 빕스 다이닝",
    background: "/images/components/banner/vips-bg.png",
  },
  {
    index: 4,
    logo: "/images/main/logo-vips.png",
    descTop: "빕스 모든 메뉴",
    descDiscount: "100만 2천원 할인",
    descBottem1: "홈파티의 정석!",
    descBottom2: "집에서 즐기는 빕스 다이닝",
    background: "/images/components/banner/vips-bg.png",
  },
]);
