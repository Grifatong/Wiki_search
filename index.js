import { wiki_url } from "./services.js";
// const page_url = "href=http://en.wikipedia.org/?curid=${pageid}";

const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const results = document.querySelector(".results");
const numberOfPages = document.querySelector("#numberOfPages");
const themeSwitch = document.querySelector(".switch");
const theme = document.querySelector("#theme");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value;
  if (!value) {
    results.innerHTML =
      '<div class="error"> please enter valid search term</div>';
    return;
  }
  getPages(value);
});

themeSwitch.addEventListener("click", (e) => {
  themeSwitch.classList.toggle("night");
  if (themeSwitch.classList.contains("night")) {
    document.documentElement.style.setProperty(
      "--color1",
      " hsl(261, 100%, 70%)"
    );
    document.documentElement.style.setProperty(
      "--color2",
      "hsl(34, 100%, 29%)"
    );
    document.documentElement.style.setProperty(
      "--backrgoundColor",
      " hsl(208, 100%, 7%)"
    );
    document.documentElement.style.setProperty(
      "--textColor",
      " rgb(255, 242, 242)"
    );
    document.documentElement.style.setProperty(
      "--textColor1",
      " rgb(185, 173, 173);"
    );
  } else {
    document.documentElement.style.setProperty(
      "--color1",
      " hsl(261, 100%, 50%)"
    );
    document.documentElement.style.setProperty("--color2", " antiquewhite");
    document.documentElement.style.setProperty(
      "--backrgoundColor",
      "  aliceblue"
    );
    document.documentElement.style.setProperty("--textColor", "  rgb(7, 7, 7)");
    document.documentElement.style.setProperty("--textColor1", " gray");
  }
});

const getPages = async (searchValue) => {
  results.innerHTML = '<div class="loading"></div>';
  const pagesNumber = numberOfPages.value;
  try {
    const response = await fetch(wiki_url(pagesNumber, searchValue));
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      results.innerHTML =
        '<div class="error">no matching results. Please try again</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    results.innerHTML = '<div class="error"> there was an error...</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join("");
  results.innerHTML = `<div class="articles">
          ${cardsList}
        </div>`;
};
