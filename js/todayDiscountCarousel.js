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
      <div class="banner__controls carousel__button__controls">
        <button class="today_discount__button carousel__list__button prev aria-controls="today__discount__carousel__list">
          <img class="carousel__list-button carousel__list__button prev" src="/images/components/banner/white-arrow56.png" alt="이전 배너 보기" />
        </button>
        <button class="today_discount__button carousel__list__button next aria-controls="today__discount__carousel__list">
          <img class="carousel__list-button carousel__list__button" src="/images/components/banner/white-arrow56.png" alt="다음 배너 보기" />
        </button>
      </div>
<div class="main__today__discount__list today__discount__carousel__list" id="today__discount__carousel__list">
  ${[items[items.length - 1], ...items, items[0], items[1], items[2]]
    .map(
      (item) => `
      <article class="main__today__discount__item today__discount__carousel__item ${item.styleClass}" role="group" aria-roledescription="slide" aria-label="${item.index}번째 배너">
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

<a href="#" type="button" class="today_discount__link__button carousel__currnet__badge" aria-hidden="true" tabindex="-1"
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
    logo: "/images/main/logo-dunkin.webp",
    descTop: "6월 생일 이벤트",
    descDiscount: "선착순 무료",
    descBottem1: "콩~그레이츄레이션",
    descBottom2: "당신의 생일을 축하합니다",
    background: "/images/main/birthday.png",
    styleClass: "card__orange",
  },
  {
    index: 2,
    logo: "/images/main/logo-udon.webp",
    descTop: "마루가메 우동 전메뉴",
    descDiscount: "4천원 할인",
    descBottem1: "오키나와 스타일 우동 전문 브렌드!",
    descBottom2: "올 여름 오키나와를 느껴보세요",
    background: "/images/main/udon.png",
    styleClass: "card__green",
  },
  {
    index: 3,
    logo: "/images/main/carolinas-logo.png",
    descTop: "보울 메뉴",
    descDiscount: "1만원 할인",
    descBottem1: "붐 치키 붐~ 든든하고 맛있게",
    descBottom2: "리얼 멕시코를 두배 사이즈로",
    background: "/images/main/mexican.png",

    styleClass: "card__pink",
  },
  {
    index: 4,
    logo: "/images/main/logo-vips.png",
    descTop: "둔내 막국수",
    descDiscount: "2천원 할인",
    descBottem1: "쫄깃한 면발",
    descBottom2: "여름에 입맛돋구는 막국수",
    background: "/images/main/bibimgucksu2.png",
    styleClass: "card__olive",
  },
]);
