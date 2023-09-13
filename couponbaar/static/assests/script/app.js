// const openCoupon = document.getElementById("openCoupon");
// const close = document.getElementById("close");
// const couponModal=document.getElementById("couponModal");

// //open Coupon Modal
// function openCouponModal(){
//     couponModal.style.display = "flex";
// }
function openLinkInNewTabWithDelay(linkElement, delayInMilliseconds) {
    setTimeout(function() {
      const linkUrl = linkElement.getAttribute('href');
      window.open(linkUrl, '_blank');
    }, 8000);
  }

  // Add event listeners to all links with the 'delayLink' class
  const delayLinks = document.querySelectorAll('.delayLink');
  delayLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const delayTime = 8000; 
      openLinkInNewTabWithDelay(link, delayTime);
    });
  });
// function closeCouponModal(){
//     couponModal.style.display = "none";
// }


// couponModal.addEventListener('click', function (e) {
//     if (e.target !== this) {
//         return;
//     }
//     closeCouponModal();
// });
// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//         closeCouponModal();
//     }
// });
// copy to clipboard
document.addEventListener('DOMContentLoaded', function() {
    var copyButtons = document.querySelectorAll('#copy');

    for (var i = 0; i < copyButtons.length; i++) {
        var clipboard = new ClipboardJS(copyButtons[i], {

            target: function(trigger) {
                var targetSelector = trigger.getAttribute('data-clipboard-target');
                return document.querySelector(targetSelector);
            }
        });

        clipboard.on('success', function(event) {
            event.clearSelection();
            var copiedButton = event.trigger;
            copiedButton.innerText = 'Copied';
            setTimeout(function() {
                copiedButton.innerText = 'Copy Code';
            }, 2000);
        });
        clipboard.on('error', function(event) {
            alert('Unable to copy text to clipboard. Please try manually.');
        });
    }
});


//mobile menu
  const menu=document.querySelector(".mobileMenu");
  function openMenu(){
    menu.style.display="flex";
  } 
  function closeMenu(){
    menu.style.display="none";
    
  } 

  document.addEventListener('DOMContentLoaded', function () {
    const modalButtons = document.querySelectorAll('.modal-button');
    const closeButtons = document.querySelectorAll('.close');

    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'none';
        });
    });
});

const slider = document.querySelector("[data-slider]");

        const track = slider.querySelector("[data-slider-track]");
        const prev = slider.querySelector("[data-slider-prev]");
        const next = slider.querySelector("[data-slider-next]");

        if (track) {
            prev.addEventListener("click", () => {
                next.removeAttribute("disabled");

                track.scrollTo({
                    left: track.scrollLeft - track.firstElementChild.offsetWidth- 100,
                    behavior: "smooth"
                });
            });

            next.addEventListener("click", () => {
                prev.removeAttribute("disabled");

                track.scrollTo({
                    left: track.scrollLeft +track.firstElementChild.offsetWidth + 100 ,
                    behavior: "smooth"
                });
            });

            track.addEventListener("scroll", () => {
                const trackScrollWidth = track.scrollWidth;
                const trackOuterWidth = track.clientWidth;

                prev.removeAttribute("disabled");
                next.removeAttribute("disabled");

                if (track.scrollLeft <= 0) {
                    prev.setAttribute("disabled", "");
                }

                if (track.scrollLeft === trackScrollWidth - trackOuterWidth) {
                    next.setAttribute("disabled", "");
                }
            });
        }


        let filterLink=document.querySelectorAll('.filter-link');
        let filterCoupon=document.querySelectorAll('.coupon-container');

        for(let i=0;i<filterLink.length;i++){
            filterLink[i].addEventListener('click',function(){
                for(let j=0;j<filterLink.length;j++){
                    filterLink[j].classList.remove('active-filter');  
                }
                this.classList.add('active-filter');

                let dataFilter=this.getAttribute('data-filtered');

                for(let k=0; k<filterCoupon.length; k++){
                    filterCoupon[k].classList.remove('active-filter');
                    filterCoupon[k].classList.add('hide');

                    if(filterCoupon[k].getAttribute('data-item')==dataFilter 
                    || dataFilter=="featured"){
                        filterCoupon[k].classList.remove('hide');
                        filterCoupon[k].classList.add('active-filter');
                    }
                }
            })
        }


        
        $(document).ready(function(){
            $(".coupon-container").slice(0,5).show();   
            $("#loadMore").on("click", function(e){
              e.preventDefault();
              $(".coupon-container:hidden").slice(0, 4).slideDown();
              if($(".coupon-container:hidden").length == 0) {
                $("#loadMore").text("No More Coupons");
              }
            });
          })

          let backToTop = $('#top');

          $(window).scroll(function() {
            if ($(window).scrollTop() > 300) {
                backToTop.addClass('backtop');
            } else {
                backToTop.removeClass('backtop');
            }
          });
          
          backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop:0}, '300');
          });

//           const sliders = document.querySelector('.best-deal-wrapper');
// const slides = document.querySelectorAll('.deal-coupon');
// const slideWidth = slides[0].clientWidth;
// let currentIndex = 0;

// document.querySelector('.left-shift').addEventListener('click', () => {
//   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//   updateSliderPosition();
// });

// document.querySelector('.right-shift').addEventListener('click', () => {
//   currentIndex = (currentIndex + 1) % slides.length;
//   updateSliderPosition();
// });

// function updateSliderPosition() {
//   const offset = -currentIndex * slideWidth;
//   sliders.style.transform = `translateX(${offset}px)`;
// }

// // // Start the automatic slideshow
// // setInterval(() => {
// //   currentIndex = (currentIndex + 1) % slides.length;
// //   updateSliderPosition();
// // }, 1000); // Change slide every 3 seconds


function initializeCarousel(wrapperSelector, carouselSelector, cardSelector, arrowBtnSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const carousel = document.querySelector(carouselSelector);
    const firstCardWidth = carousel.querySelector(cardSelector).offsetWidth;

    const arrowBtns = document.querySelectorAll(arrowBtnSelector);
    const carouselChildrens = [...carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 400 || !isAutoPlay) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth,4000);
    }
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
}

// Usage example:
initializeCarousel(".deal-container1", ".best-deal-wrapper1", ".deal-coupon1", ".deal-container1 .arrowBtn i");
initializeCarousel(".deal-container2", ".best-deal-wrapper2", ".deal-coupon2", ".deal-container2 .arrowBtn i");



    function reveal() {
        var reveals = document.querySelectorAll(".reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);