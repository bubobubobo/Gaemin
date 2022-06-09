(function(){
  const ulGroup = document.querySelectorAll("ul[class*=order__detail__]");
  const miusBtn = document.querySelector(".mius__btn");
  const plusBtn = document.querySelector(".plus__btn");
  const billContainer = document.querySelector(".bill");
  const submitBtn = document.querySelector("button[type=submit]");
  let totalCount = document.querySelector(".order__detail__total__num");
  let totalCount2 = document.querySelector(".total__count");

  let num = 1;

  // radion, checkbox on & off
  const changeInput = (e) => {
    let parent = e.target.parentNode
    let tag = e.target.tagName
    let type = e.target.type
    let checked = e.target.checked
    
    if(tag === "INPUT"){
      if(type === "radio"){
        if(checked === true) {
          parent.parentNode.querySelectorAll("li").forEach(item => item.classList.remove("on"));
          parent.classList.add("on")

          if(billContainer.className.includes("off")){
            billContainer.classList.remove("off")
            submitBtn.disabled = false
          }
        }
      } else {
        if(checked === true) {
          parent.classList.add("on")

          if(billContainer.className.includes("off")){
            billContainer.classList.remove("off")
            submitBtn.disabled = false
          }
        }
        else parent.classList.remove("on")
      }
    }
  }

  // 수량 계산
  const calTotalNum = (e) => {
    console.log(e.target.className)
    let className = e.target.className
    num = Number(totalCount.innerText)

    if(className === 'mius__btn'){
      if(num > 1) {
        num -= 1
      }
    } else {
      num += 1  
    }

    totalCount.innerHTML = num;
    totalCount2.innerHTML = num;
    
  }

  const setCart = () => {
    console.log('hi');
    localStorage.setItem('cart', num);
  }

  document.addEventListener("DOMContentLoaded", () => {
    totalCount.innerHTML = 1;
    ulGroup.forEach(ul => {
      ul.addEventListener("click", changeInput)
    })

    miusBtn.addEventListener("click",calTotalNum)
    plusBtn.addEventListener("click",calTotalNum)
  });

  
  submitBtn.addEventListener('click', setCart);
})();