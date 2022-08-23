/*--------Global Variables--------*/
const navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const navbar = [];
// update the navbar html everytime the page loads
document.body.onload = updateNav;

/*--------Helper Functions--------*/
function updateNav() {
  sections.forEach(function (item) {
    // created new li
    const newli = document.createElement("li");
    // using data attribute of each section to get the nav attribute
    const content = document.createTextNode(item.dataset.nav);
    // add content to li then add li to the ul of navbar
    newli.appendChild(content);
    navbarList.appendChild(newli);
    // add the class to new list item
    newli.classList.add("menu__link");
    // create li array data structure to manipulate the list items later
    navbar.push(newli);
  });
}

function highlight(e) {
  // remove highlight from all sections in navbar except clicked one
  navbar.forEach((item) => {
    item.classList.remove("highlight");
  });
  e.target.classList.add("highlight");
}

function transferTo(e) {
  // remove active property from all sections then add it to only 1 item
  sections.forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.nav == e.target.textContent) {
      item.classList.add("active");
      // scroll smoothly to the active class when clicking
      document.getElementById(item.id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

function sectionScroll() {
  // declare variable for active sections
  const active = document.querySelector(".active");
  //declare variables for the sections and navbar sizes
  const navbarSize = navbar.length;
  const sectionsSize = sections.length;
  for (let i = 1; i < sectionsSize; i++) {
    // if the scroll at the screen center
    if (window.scrollY < sections[i].offsetTop - window.innerHeight / 2) {
      // add active and highlight the corresponding section in the navbar
      if (sections[i - 1] !== active) {
        sections[i - 1].classList.add("active");
        navbar[i - 1].classList.add("highlight");
        // remove the active from all other sections and their navbar titles
        if (active) {
          active.classList.remove("active");
          navbar.forEach((item) => {
            if (item.textContent === active.dataset.nav)
              item.classList.remove("highlight");
          });
        }
      }
      return;
    }
  }
  // to make last section active since each sectioned is triggered by the later one
  if (sections[sectionsSize - 1] !== active) {
    sections[sectionsSize - 1].classList.add("active");
    navbar[navbarSize - 1].classList.add("highlight");
    // remove the active from other sections
    if (active) {
      active.classList.remove("active");
      navbar.forEach((item) => {
        if (item.textContent === active.dataset.nav)
          item.classList.remove("highlight");
      });
    }
  }
}

/*--------Event Listeners--------*/
document.addEventListener("scroll", sectionScroll);

// event delegation for the items in navbar
navbarList.addEventListener("click", (e) => {
  // ensure the item clicked is one of the li not the navbar itself
  if (!e.target.classList.contains("menu__link")) return;
  highlight(e);
  transferTo(e);
});
