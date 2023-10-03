// loader js
$(window).on("load", function () {
  $(".loader-container").delay(300).fadeOut(1000);
});

// Header Fixed
let header = document.querySelector(".page-header-con");
header.classList.toggle("scroll", window.scrollY > 48);

window.addEventListener("scroll", function () {
  header.classList.toggle("scroll", window.scrollY > 48);
});

// Active Link
// $(".page-navbar .links .link").each(function () {
//   $(this).removeClass("active");
//   if (window.location.href.includes($(this).attr("href"))) {
//     $(this).addClass("active");
//   }
// });

// Show And Hide Search Navbar
$(".nav-search-ic").on("click", function () {
  $(".nav-search").toggleClass("open");
});

// SideBar
$(".side-open").on("click", function () {
  $(".links").addClass("active");
  $(".overlay-m").fadeIn(600);
});

$(".open-sidebar").on("click", function () {
  $(".side-links-con").addClass("active");
  $(".overlay-m").fadeIn(600);
});

$(".close").on("click", function () {
  $(".links").removeClass("active");
  $(".overlay-m").fadeOut(500);
});

$(".overlay-m").on("click", function () {
  $(".links").removeClass("active");
  $(".side-links-con").removeClass("active");
  $(this).fadeOut(500);
});

// dropDown stopPropagation
$(".dropdown-menu").click(function (e) {
  e.stopPropagation();
});

// PassWord Show In Setting Page
const iconsPassSet = document.querySelectorAll(".pass-icon");

if (iconsPassSet) {
  iconsPassSet.forEach((ic) => {
    ic.addEventListener("click", function () {
      let input = ic.parentElement.querySelector("input");
      showPassword(input, ic);
    });
  });
}

// Function To Show And Hide Password
function showPassword(input, icon) {
  if (input.type == "password") {
    input.setAttribute("type", "text");
    // icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    input.setAttribute("type", "password");
    // icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }

  icon.classList.toggle("show");
}

let isRtl = $('html[lang="ar"]').length > 0;

// Normal Select To
$(".select").select2({
  dir: isRtl ? "rtl" : "ltr",
  minimumResultsForSearch: Infinity,
});

// Heart
$(document).on("click", ".heart", function () {
  if ($(this).find("i").hasClass("fa-regular")) {
    $(this).find("i").addClass("fa-solid c-yellow");
    $(this).find("i").removeClass("fa-regular");
  } else {
    $(this).find("i").removeClass("fa-solid c-yellow");
    $(this).find("i").addClass("fa-regular");
  }
});

// $('[data-pass]').on('click', function(){
// let item = $(this).attr('data-pass')
// sessionStorage.setItem("activeTab", JSON.stringify(item));
// })

let allCopy = document.querySelectorAll(".circle");

if (allCopy) {
  allCopy.forEach((el) => {
    el.addEventListener("click", function () {
      let code = el.closest(".copy-item").querySelector(".copy-num");
      CopyToClipboard(code);
    });
  });
}

function CopyToClipboard(id) {
  var r = document.createRange();
  r.selectNode(id);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

// Input Number
$(document).ready(function () {
  $(".minus").click(function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $(".plus").click(function () {
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

$(".cards-slider").each(function () {
  $(this).owlCarousel({
    items: 1,
    rtl: isRtl,
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    smartSpeed: 2000,
    autoplayHoverPause: false,
    margin: 35,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    navText: [
      "<i class='fa-regular fa-hand-point-right'></i>",
      "<i class='fa-regular fa-hand-point-left'></i>",
    ],
    responsive: {
      1200: {
        items: 4,
      },
      991: {
        items: 3,
      },
      560: {
        items: 2,
        margin: 20,
      },
    },
  });

  setTimeout(() => {
    $(this).find(`.owl-stage-outer`).addClass("p-1");
    $(this).find(`.owl-prev`).addClass("up");
    $(this).find(`.owl-next`).addClass("up");
  }, 5);
});

$(".product-btn").each(function () {
  $(this).on("click", function () {
    var button = $(this);
    var cart = $("#cart");
    var cartTotal = cart.attr("data-totalitems");
    var newCartTotal = parseInt(cartTotal) + 1;

    button.addClass("sendtocart");
    setTimeout(function () {
      button.removeClass("sendtocart");
      cart.addClass("shake").attr("data-totalitems", newCartTotal);
      setTimeout(function () {
        cart.removeClass("shake");
      }, 500);
    }, 1000);
  });
});

let background = $(".text-sec").attr("data-background");
$(".text-sec").css("background-image", `url(${background})`);

// Tabs Profile
$(".tabs-show").css("display", "none");
getProFromLocal();

$(".tabs-m").on("click", function (e) {
  e.preventDefault();

  // FadeOut All Content
  $(".tabs-show").fadeOut(0);
  let item = $(this).attr("data-show");

  // Show Current Content
  $(`.${item}`).fadeIn();

  // Active Class In Tabs
  $(".tabs-m").removeClass("active");
  $(this).addClass("active");

  // Set Item
  addLocal(item);

  $(".overlay-m").click();
});

// Add activeTab To Local storage
function addLocal(tab) {
  sessionStorage.setItem("activeTab", JSON.stringify(tab));
}

// Get activeTab From Local Storage
function getProFromLocal() {
  let data = sessionStorage.getItem("activeTab");

  // Check if Theres activeTab In Local Storage
  if (data) {
    activeTab = JSON.parse(data);
    $(`.${activeTab}`).fadeIn();
    $(".tabs-m").removeClass("active");
    $(`[data-show=${activeTab}]`).addClass("active");
  } else {
    $(".user-account").fadeIn(0);
  }
}
