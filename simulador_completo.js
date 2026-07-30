
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  // Cliente que se encontró en la sección de Créditos (independiente del que se edita en Clientes)
  let clienteCredito = null;

  
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

  // ==========================================================
  // PARTE 2 y 3: Buscar cliente para Crédito y mostrar sus datos
  // ==========================================================
  function buscarClienteCredito(){
    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);

    if(cliente != null){
      clienteCredito = cliente;
      mostrarDatosClienteCredito(cliente);
    } else {
      clienteCredito = null;
      let datosClienteCredito = document.getElementById("datosClienteCredito");
      datosClienteCredito.innerHTML = "<p>Cliente no encontrado</p>";
    }
  }

  function mostrarDatosClienteCredito(cliente){
    let datosClienteCredito = document.getElementById("datosClienteCredito");

    datosClienteCredito.innerHTML = `
      <h3>Datos del Cliente</h3>
      <p><strong>Cédula:</strong> ${cliente.cedula}</p>
      <p><strong>Nombre:</strong> ${cliente.nombre}</p>
      <p><strong>Apellido:</strong> ${cliente.apellido}</p>
      <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
      <p><strong>Egresos:</strong> ${cliente.egresos}</p>
    `;
  }

  // ==========================================================
  // PARTE 4: Funciones del simulador de crédito (reutilizables)
  // ==========================================================
  function calcularCapacidadPago(cliente){
    return cliente.ingresos - cliente.egresos;
  }

  function calcularInteres(monto, tasa, plazo){
    return monto * (tasa / 100) * (plazo / 12);
  }

  function calcularTotalAPagar(monto, interes){
    return monto + interes;
  }

  function calcularCuotaMensual(total, plazo){
    return total / plazo;
  }

  // ==========================================================
  // PARTE 5 y 6: Calcular crédito, mostrar resultado y aplicar estilo
  // ==========================================================
  function calcularCredito(){
    if(clienteCredito == null){
      mostrarTexto("resultadoCredito", "Debe buscar un cliente primero");
      return;
    }

    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarInt("plazoCredito");

    let capacidadPago = calcularCapacidadPago(clienteCredito);
    let interes = calcularInteres(monto, tasaInteres, plazo);
    let totalPagar = calcularTotalAPagar(monto, interes);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);

    creditoAprobado = cuotaMensual <= capacidadPago;

    montoCalculado = monto;
    plazoCalculado = plazo;
    cuotaCalculada = cuotaMensual;

    let resultadoCredito = document.getElementById("resultadoCredito");

    resultadoCredito.innerHTML = `
      Capacidad de pago: ${capacidadPago}<br>
      Total a pagar: ${totalPagar.toFixed(2)}<br>
      Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
      RESULTADO: ${creditoAprobado ? "APROBADO" : "RECHAZADO"}
    `;

    if(creditoAprobado){
      resultadoCredito.className = "aprobado";
    } else {
      resultadoCredito.className = "rechazado";
    }
  }
