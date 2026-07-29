
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

//Funcion ocultarSecciones
function ocultarSecciones(){
    let secciones = document.querySelectorAll("section");
    for(let i = 0; i < secciones.length; i++){
      let componente = secciones[i];
      let listaClass = componente.classList;
      listaClass.remove("activa");
    }
  }

  function mostrarSeccion(id){
    ocultarSecciones();

    let componente = document.getElementById(id);
    let listaClass = componente.classList;
    listaClass.add("activa");
  }

  //Configurar Tasa
  function guardarTasa(){
    let valorIngresado = recuperarInt("tasaInteres");

    if(valorIngresado >= 10 && valorIngresado <= 20){
      tasaInteres = valorIngresado;
      mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + valorIngresado + "%");
    } else {
      mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
  }