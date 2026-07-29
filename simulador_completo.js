
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

  //Crear y Listar Clientes
function guardarCliente(){
    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let ingresos = recuperarFloat("txtIngresos");
    let egresos = recuperarFloat("txtEgresos");

    let clienteExistente = buscarCliente(cedula);

    if(clienteExistente == null){
      let cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos: egresos
      };

      clientes.push(cliente);
    } else {
      clienteExistente.nombre = nombre;
      clienteExistente.apellido = apellido;
      clienteExistente.ingresos = ingresos;
      clienteExistente.egresos = egresos;
    }

    pintarClientes();
    limpiar();
  }

  function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    for(let i = 0; i < clientes.length; i++){
      let cliente = clientes[i];

      let fila = "<tr>";
      fila += "<td>"+cliente.cedula+"</td>";
      fila += "<td>"+cliente.nombre+"</td>";
      fila += "<td>"+cliente.apellido+"</td>";
      fila += "<td>"+cliente.ingresos+"</td>";
      fila += "<td>"+cliente.egresos+"</td>";
      fila += `<td><button onclick="seleccionarCliente('`+cliente.cedula+`')">Actualizar</button></td>`;
      fila += "</tr>";

      tabla.innerHTML += fila;
    }
  }

 //Buscar y Actualizar
  function buscarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
      if(clientes[i].cedula == cedula){
        return clientes[i];
      }
    }
    return null;
  }

  function seleccionarCliente(cedula){
    let cliente = buscarCliente(cedula);

    clienteSeleccionado = cliente;

    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
    mostrarTextoEnCaja("txtEgresos", cliente.egresos);
  }

  function limpiar(){
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos", "");

    clienteSeleccionado = null;
  }