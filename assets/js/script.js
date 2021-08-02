const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      pokeData(json.results), paginacion(json.next, json.previous);
    })
    .catch((error) => {
      console.log("Error ", error);
    });
};

const pokeData = (data) => {
  let html = "";
  document.getElementById("datosPokemon").innerHTML = "";
  data.forEach((pk) => {
    const URL = pk.url;
    return fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        llenarDatos(json, html);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  });
};

const llenarDatos = (data, html) => {
  html += '<div class="col mt-5">';
  html += '<div class="card" style="width: 15rem;">';
  html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}">`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${data.name}</h5>`;
  html += `<p class="card-text">Weight: ${data.weight}</p>`;
  html += `<p class="card-text">Height: ${data.height}</p>`;

  let tipos = data.types;

  tipos.forEach((type) =>{
     
    html += `<p class="card-text">Type: ${type.type.name}</p>`;
  });
  
  html += "</div>";
  html += "</div>";
  html += "</div>";
  document.getElementById("datosPokemon").innerHTML += html;
};

const paginacion = (next, prev) => {
  let prevDisable = "";
  let nextDisable = "";

  let html = `<li class="page-item ${
    prev == null ? (prevDisable = "disable") : (prevDisable = "")
  }"><a class ="page-link" onclick = "getData('${prev}')">Previous</a></li> <li class="page-item ${
    next == null ? (nextDisable = "disable") : (nextDisable = "")
  }"><a class ="page-link" onclick = "getData('${next}')">Next</a></li>`;

  document.getElementById("paginacion").innerHTML = html;
};

getData(API);
