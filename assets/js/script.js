const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      llenarDatos(json.results), paginacion(json.next, json.previous);
    })
    .catch((error) => {
      console.log("Error ", error);
    });
};


const llenarDatos = (data) => {
  let html = "";
  
  data.forEach((pk) => {
        html += '<div class="col mt-5">';
        html += '<div class="card" style="width: 15rem;">';
        html += '<div class="card-body">';
        html +=  `<h5 class="card-title">${pk.name}</h5>`;
   
        html += '</div>';
        html += '</div>';
        html += '</div>';
  
  });

  document.getElementById("datosPokemon").innerHTML = html;
};

const paginacion = (next, prev) => {
  let prevDisable = "";
  let nextDisable = "";

  let html = `<li class="page-item ${ prev == null ? prevDisable = "disable" : prevDisable = ""}"><a class ="page-link" onclick = "getData('${prev}')">Previous</a></li> <li class="page-item ${next == null ?  nextDisable = "disable": nextDisable = ""}"><a class ="page-link" onclick = "getData('${next}')">Next</a></li>`;
 

  document.getElementById("paginacion").innerHTML=html;

};

getData(API);
