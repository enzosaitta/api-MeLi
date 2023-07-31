function removeResults() {
  const contEl = document.querySelector(".results");
  while (contEl.lastElementChild) {
    contEl.removeChild(contEl.lastElementChild);
  }
}
function mostarResultados(results) {
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#results-item-template");

  for (const r of results) {
    const titeleEl = template.content.querySelector(".results-item-title");
    titeleEl.textContent = r.title;

    const conditionEl = template.content.querySelector(
      ".results-item-condition"
    );
    conditionEl.textContent = r.condition;

    const soldEl = template.content.querySelector(".reuslts-item-sell-count");
    soldEl.textContent = r.sold_quantity;

    const precioEl = template.content.querySelector(".result-item-price");
    precioEl.textContent = "$" + r.price;

    const imgEl = template.content.querySelector("#result-imagen");
    imgEl.src = r.thumbnail;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}
function main() {
  const formEl = document.querySelector(".form");
  //con querySelector selecciono la parte del form (en este caso trabajamos con las clases)
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    //preventDefault lo que hace es frenar el formulario para que no se envie ni se actualice la pagina

    const palabraAbuscar = e.target.buscar.value;
    //target es lo mismo que decir que estoy adentro del formulario.

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraAbuscar)
      .then((response) => response.json())
      .then((data) => {
        removeResults(), mostarResultados(data.results);
      });
  });

  /* con fetch invoco la API de mercado libre y
  adjunto al final  de la url "palabraABuscar" que sera la que se busque en dicha api
   */
}

main();
