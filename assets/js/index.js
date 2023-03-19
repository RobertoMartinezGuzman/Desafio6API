const apiURL = "https://mindicador.cl/api/"
const button = document.querySelector("#button")
const select = document.querySelector("#select")
const ctx = document.querySelector("#myChart")
const input = document.querySelector("#input")
const total = document.querySelector("#total")

let chart;


button.addEventListener("click", async () => {

    try {
        const datos = await fetch(apiURL + select.value);
        const valores = await datos.json();
        mostrarDatos(valores); 


    }
    
    catch(error) {
        console.log("Error al traer información ->" + error);
        alert("Error, intentelo nuevamente");
    }

    function mostrarDatos(data){

        let arrayDatos = [];

        for (i = 0; i < 10; i++ ) {

            arrayDatos.push(data.serie[i]);

        }

        const resultado = input.value;
        total.innerHTML = "Resultado : $" + resultado/arrayDatos[0].valor;
       
        console.log(arrayDatos);

        renderCanvas(arrayDatos)
    }

    function renderCanvas(data) {

        if(chart){
            chart.destroy();
        }

        const labels = data.map((element)=> {
            return element.fecha.slice(0,10);
        })
        
        labels.reverse();

        const datos = data.map((element)=> {
            return element.valor;
        })

        datos.reverse();

        chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: `${select.value}`,
                data: datos,
                borderWidth: 3
              }]
            },
          });

    }
    
})





