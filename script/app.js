///////////////////// Nav menu of header //////////////
const $ = document;
let menuBtn = $.querySelector(".nav-toggle__icon");
let menuElem = $.querySelector(".menu");
let coverElem = $.querySelector(".cover");
const resumeListItems = $.querySelectorAll(".resume-list__item");
const resumeContentElems = $.querySelectorAll(".resume-content");
const portFolioListItems = $.querySelectorAll(".portfolio-list__item");
const menuItems = $.querySelectorAll(".menu__item");
const sections = $.querySelectorAll("main > section");
const changeThemeBtn = $.querySelector(".change-theme");

//////////////// Page loading /////////////////

if (localStorage.getItem("theme") == "dark-them") {
  $.documentElement.classList.add("dark-theme");
  changeThemeBtn.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
<svg class="change-theme__icon" width="800px" height="800px" viewBox="0 0 24 24" >
<path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

//////////////////////////// functions ///////////////////////

function navigationPages(
  listItemsArray,
  listItemActiveClass,
  contentShowClass
) {
  listItemsArray.forEach((listItem) => {
    listItem.addEventListener("click", function () {
      let preActiveElem = $.querySelector(`.${listItemActiveClass}`);
      preActiveElem.classList.remove(listItemActiveClass);
      this.classList.add(listItemActiveClass);

      let showMenuId = this.getAttribute("data-content-id");
      $.querySelector(`.${contentShowClass}`).classList.remove(
        contentShowClass
      );
      let showMenuElem = $.querySelector(showMenuId);
      showMenuElem.classList.add(contentShowClass);
    });
  });
}
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("nav-toggle__icon--open");
  menuElem.classList.toggle("menu--open");
  coverElem.classList.toggle("cover--show");
});

navigationPages(
  resumeListItems,
  "resume-list__item--active",
  "resume-content--show"
);
navigationPages(
  portFolioListItems,
  "portfolio-list__item--active",
  "portfolio__content--show"
);

//  Navigation to another section

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    document
      .querySelector(".menu__item--active")
      .classList.remove("menu__item--active");
    item.classList.add("menu__item--active");

    let sectionShowName = item.getAttribute("data-section");
    let sectionOffsetTop = $.querySelector(
      `.${item.getAttribute("data-section")}`
    ).offsetTop;

    window.scrollTo({
      top: sectionOffsetTop,
      behavior: "smooth",
    });
  });
});

//  Observer instraction for show menu witch section is show

const observer = new IntersectionObserver(observerHandler, {
  threshold: 0.5,
});

function observerHandler(allSections) {
  allSections.forEach((section) => {
    if (section.isIntersecting) {
      const sectionName = section.target.className;
      menuItems.forEach((item) => {
        if (sectionName === item.getAttribute("data-section")) {
          document
            .querySelector(".menu__item--active")
            .classList.remove("menu__item--active");
          item.classList.add("menu__item--active");
        }
      });
    }
  });
}

sections.forEach((section) => {
  observer.observe(section);
});

////////////////////////// Change Theme ///////////

changeThemeBtn.addEventListener("click", function () {
  let rootElement = $.documentElement;
  rootElement.classList.toggle("dark-theme");

  if (rootElement.classList.contains("dark-theme")) {
    this.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
<svg class="change-theme__icon" width="800px" height="800px" viewBox="0 0 24 24" >
<path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    window.localStorage.setItem("theme", "dark-them");
  } else {
    this.innerHTML = `  <?xml version="1.0" encoding="utf-8"?>
            <svg
              class="change-theme__icon"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
            >
              <path
                d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>`;
    window.localStorage.setItem("theme", "light-them");
  }
});
// Moein Kazemi
