const searchBar = document.getElementById("searchbar");
const searchButton = document.getElementById("SearchButton");
const getAllUsers = document.getElementById("getAllUsers");
const cardContainer = document.getElementById("cardContainer");

function getUser(searchValue) {
  let apiUrl;
  if (searchValue === undefined) {
    apiUrl = `https://api.github.com/users`;
  } else {
    apiUrl = `https://api.github.com/users/${searchValue}`;
  }
  const users = fetch(apiUrl);
  users
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let result = data;
      if (searchValue === undefined) {
        result.map((ele) => {
          const card = document.createElement("div");
          const heading = document.createElement("h2");
          const img = document.createElement("img");
          const link = document.createElement("a");
          link.innerHTML = "Github Link";
          heading.innerText = ele.login;
          img.src = ele.avatar_url;
          link.href = ele.html_url;
          card.appendChild(img);
          card.appendChild(heading);
          card.appendChild(link);
          cardContainer.appendChild(card);
        });
      } else {
        cardContainer.innerHTML = "";
        console.log(result);
        if (result.message === "Not Found") {
          const heading = document.createElement("h1");
          heading.innerText = "Dhang ka search kr le naa !!!!";
          cardContainer.appendChild(heading);
        } else {
          const card = document.createElement("div");
          const heading = document.createElement("h2");
          const img = document.createElement("img");
          const link = document.createElement("a");
          link.innerHTML = "Github Link";
          heading.innerText = result.login;
          img.src = result.avatar_url;
          link.href = result.html_url;
          card.appendChild(img);
          card.appendChild(heading);
          card.appendChild(link);
          cardContainer.appendChild(card);
        }
      }
    });
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchBar.value;
  getUser(searchValue);
});

getAllUsers.addEventListener("click", (e) => {
  e.preventDefault();
  cardContainer.innerHTML = "";
  getUser();
});

getUser();