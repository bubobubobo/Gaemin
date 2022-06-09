const bannerCarousel = ($bannerCarousel, items) => {
  let currentItem = 0;
  let isMoving = false;
  const DURATION = 500;

  let timerId = null;
  let $carouselList = null;
  let $carouselItem = null;
  let $bannerCurrentItem = null;

  // currentItem를 기준으로 carouselList를 이동시킨다.
  const move = (currentItem, duration = 0) => {
    if (duration) isMoving = true;

    $carouselList.style.setProperty("--duration", duration);
    $carouselList.style.setProperty("--currentItem", currentItem);
    $carouselList.setAttribute("aria-live", "off");

    let itemCount =
      currentItem <= 0
        ? 1
        : currentItem > items.length
        ? items.length
        : currentItem;
    $carouselList.setAttribute("aria-live", "polite");
    $bannerCurrentItem.innerHTML = `${itemCount} / ${items.length} `;
  };

  document.addEventListener("DOMContentLoaded", () => {
    $bannerCarousel.innerHTML = `
    <h2 class="main__heading banner__event__title sr-only">
          지금 진행 중인 이벤트
    </h2>
        
    <div class="banner__controls carousel__button__controls">
      <button type="button" class="banner__event__button carousel__list__button prev aria-controls="banner__carousel__list">
        <img class="banner__carousel__list-button carousel__list__button prev" src="/images/components/banner/white-arrow56.png" alt="이전 배너 보기" />
      </button>
      <button type="button" class="banner__event__button carousel__list__button next aria-controls="banner__carousel__list">
      <img class="banner__carousel__list-button carousel__list__button" src="/images/components/banner/white-arrow56.png" alt="다음 배너 보기" />  
      </button>
    </div>
    <div class="banner__event__list banner__carousel__list" id="banner__carousel__list">
      ${[items[items.length - 1], ...items, items[0], items[1]]
        .map(
          (item) => `
          <article class="banner__event__tabpanel banner__carousel__item ${item.styleClass}" aria-label="${item.index}번째 배너" role="group" aria-roledescription="slide">
            <a href="#" class="banner__event__link">
            <img src="${item.img}" alt="" />
            <p class="banner__event__text">${item.text}</p>
            <p class="banner__event__text-bold">${item.textBold1}</p>
            <p class="banner__event__text-bold">${item.textBold2}</p>
            </a>
            </article>
            `
        )
        .join("")}
    </div>
    <a href="#" type="button" class="banner__event__link__button carousel__currnet__badge aria-hidden="true" tabindex="-1"
    ><span class="banner__event__link__button__current carousel__currnet__badge__text"> </span
    >모두보기</a> 
`;

    $carouselList = document.querySelector(".banner__carousel__list");
    $carouselItem = document.querySelectorAll(".banner__carousel__item");
    $bannerCurrentItem = document.querySelector(
      ".banner__event__link__button__current"
    );

    $bannerCarousel.style.opacity = 1;
    move(++currentItem);

    // Autoplay
    timerId = setInterval(() => move(++currentItem, DURATION), 5000);
  });

  // window.onload = () => {
  // };

  $bannerCarousel.onclick = ({ target }) => {
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

  $bannerCarousel.ontransitionend = () => {
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

bannerCarousel(document.querySelector(".banner__carousel"), [
  {
    index: 1,
    text: "친구초대시 5천원 쿠폰",
    textBold1: "이제는",
    textBold2: "웹에서도 만나요!",
    img: "/images/components/banner/EzU.png",
    styleClass: "card__green",
  },
  {
    index: 2,
    text: "뭐 먹을지 고민될땐",
    textBold1: "인생은",
    textBold2: "치킨의 연속",
    img: "/images/components/banner/eventChicken.png",
    styleClass: "card__pink",
  },
  {
    index: 3,
    text: "무더운 여름철",
    textBold1: "든든한 보양식~",
    textBold2: "먹고싶을 때",
    img: "/images/components/banner/eelbob.png",
    styleClass: "card__orange",
  },
  {
    index: 4,
    text: "쿠폰함을 확인해 보세요",
    textBold1: "할인과 결제사이",
    textBold2: "단 10초!",
    img: "/images/components/banner/banner4.png",
    styleClass: "card__darkgreen",
  },
]);
