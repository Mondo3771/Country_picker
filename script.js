const body = document.body;
const main = document.querySelector("main");
function getCountryInfo() {
  var ele = document.getElementById("container");
  while (!!ele) {
    ele.remove();
    ele = document.getElementById("container");
  }
  var country = document.getElementById("country").value;
  fetch("https://restcountries.com/v3.1/name/" + country)
    .then((r) => r.json()) // this line is inportant because we wait for the response to come back before we do anything
    .then((data) => {
      console.log(data);
      data.forEach((info) => {
        var name = info.name.official;
        var capital = info.capital;
        var region = info.region;
        var population = info.population;
        var flag = info.flags.png;
        var borders = info.borders;
        console.log(borders);
        var section = document.createElement("section");
        section.id = "container";
        main.appendChild(section);
        addToScreen(name, population, flag, region, capital, section);
        addBorders(borders, section);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addToScreen(name, population, flag, region, capital, section) {
  var article = document.createElement("article");
  article.className = "Country_tile";
  var h2 = document.createElement("h2");
  h2.innerText = name;
  article.appendChild(h2);
  var pc = document.createElement("p");
  pc.innerText = "Capital: " + capital;
  article.appendChild(pc);
  var pp = document.createElement("p");
  pp.innerText = "Population: " + population;
  article.appendChild(pp);
  var pr = document.createElement("p");
  pr.innerText = "Region: " + region;
  article.appendChild(pr);
  var img = document.createElement("img");
  img.src = flag;
  article.appendChild(img);
  section.appendChild(article);
}

function addBorders(borders, section) {
  var article = document.createElement("article");
  article.className = "Country_tile";
  var h2 = document.createElement("h2");
  h2.innerText = "Bordering Countries";
  article.appendChild(h2);
  var list = document.createElement("ul");
  if (!!borders) {
    for (var i = 0; i < borders.length; i++) {
      fetch("https://restcountries.com/v3.1/alpha/" + borders[i])
        .then((r) => r.json())
        .then((data) => {
          var le = document.createElement("li");
          var n = document.createElement("p");
          var f = document.createElement("img");
          f.className = "image";
          console.log(data[0]);
          n.innerText = data[0].name.official;
          f.src = data[0].flags.png;
          le.appendChild(n);
          le.appendChild(f);
          list.appendChild(le);
        })
        .catch((e) => console.log(e));
    }
  }
  article.appendChild(list);
  section.appendChild(article);
}
const btn = document.getElementById("btn");
btn.addEventListener("click", getCountryInfo);
