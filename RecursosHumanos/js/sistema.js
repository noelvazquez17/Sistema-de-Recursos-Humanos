window.onload = init;
var headers = {};
var url = "http://localhost:3000"

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        document.getElementById('searchButton').addEventListener('click', search);
        loadEmpleados();
        document.getElementById('logout').addEventListener('click', logout);
    }
    else {
        window.location.href = "index.html";
    }
}

function search() {
    var search = document.getElementById('search-input').value;
    axios.get(url + "/empleado/" + search, headers)
        .then(function(res) {
            displayEmpleadoTemp(res.data.message);
            //poner en verde el input y que diga empleado encontrado
            document.getElementById('search-input').value = "";
            document.getElementById('search-input').style.border = "1px solid green";
            document.getElementById('search-input').style.boxShadow = "0 0 5px green";
            document.getElementById('search-input').style.padding = "5px";
            document.getElementById('search-input').placeholder = "Empleado encontrado";
            setTimeout(function() {
                document.getElementById('search-input').style.border = "";
                document.getElementById('search-input').style.boxShadow = "";
                document.getElementById('search-input').style.padding = "";
                document.getElementById('search-input').placeholder = "Buscar";
            }
            , 3000);

        }).catch(function(err) {
            console.log(err);
            document.getElementById('search-input').value = "";
            document.getElementById('search-input').style.border = "1px solid red";
            document.getElementById('search-input').style.boxShadow = "0 0 5px red";
            document.getElementById('search-input').style.padding = "5px";
            document.getElementById('search-input').placeholder = "No se encontro el empleado. Intente nuevamente";
            setTimeout(function() {
                document.getElementById('search-input').style.border = "";
                document.getElementById('search-input').style.boxShadow = "";
                document.getElementById('search-input').style.padding = "";
                document.getElementById('search-input').placeholder = "Buscar";
            }
            , 3000);
        })
}

function displayEmpleadoTemp(empleados) {
    var title = document.getElementById("title");
    var table = document.getElementById("table");
    
    var div = document.createElement("div");

    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Nombre"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Apellido_pat"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Apellido_mat"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Telefono"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Correo"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Direccion"));
    tr.appendChild(th);

    thead.appendChild(tr);
    tabla.appendChild(thead);
    tabla.appendChild(tblBody);
    div.appendChild(tabla);
    empleados.forEach(function(empleado) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.nombre));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.apellido_pat));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.apellido_mat));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.telefono));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.correo));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.direccion));
        tr.appendChild(td);
        var td = document.createElement("td");
        var btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.setAttribute("id", empleado.empleado_id);
        btnEliminar.appendChild(document.createTextNode("Eliminar"));
        btnEliminar.addEventListener("click", eliminar);
        td.appendChild(btnEliminar);
        tr.appendChild(td);
        var td = document.createElement("td");
        var btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-primary");
        btnEditar.setAttribute("id", empleado.empleado_id);
        btnEditar.appendChild(document.createTextNode("Editar"));
        btnEditar.addEventListener("click", editar);
        td.appendChild(btnEditar);        tr.appendChild(td);
        tblBody.appendChild(tr);
    })
    tabla.setAttribute("border", "2");
    tabla.classList.add("table", "table-secondary");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-hover");
    tabla.classList.add("table-bordered");
    tabla.classList.add("table-sm");
    
    div.classList.add("col-12", "mb-3");
    div.classList.add("table-responsive");

    title.parentNode.insertBefore(div, table);
}



function loadEmpleados() {
    axios.get(url + "/empleado", headers)
        .then(function(res) {
            displayEmpleados(res.data.message);
        }).catch(function(err) {
            console.log(err);
        })
}

function displayEmpleados(empleados) {
    var body = document.querySelector("body");
    var div = document.createElement("div");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Nombre"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Apellido_pat"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Apellido_mat"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Telefono"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Correo"));
    tr.appendChild(th);
    var th = document.createElement("th");
    th.appendChild(document.createTextNode("Direccion"));
    tr.appendChild(th);

    thead.appendChild(tr);
    tabla.appendChild(thead);
    tabla.appendChild(tblBody);
    div.appendChild(tabla);
    body.appendChild(div);
    empleados.forEach(function(empleado) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.nombre));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.apellido_pat));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.apellido_mat));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.telefono));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.correo));
        tr.appendChild(td);
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(empleado.direccion));
        tr.appendChild(td);
        var td = document.createElement("td");
        var btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.setAttribute("id", empleado.empleado_id);
        btnEliminar.appendChild(document.createTextNode("Eliminar"));
        btnEliminar.addEventListener("click", eliminar);
        td.appendChild(btnEliminar);
        tr.appendChild(td);
        var td = document.createElement("td");
        var btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-primary");
        btnEditar.setAttribute("id", empleado.empleado_id);
        btnEditar.appendChild(document.createTextNode("Editar"));
        btnEditar.addEventListener("click", editar);
        td.appendChild(btnEditar);
        tr.appendChild(td);
        tblBody.appendChild(tr);
    })
    tabla.setAttribute("border", "2");
    tabla.classList.add("table", "table-secondary");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-hover");
    tabla.classList.add("table-bordered");
    tabla.classList.add("table-sm");
    div.classList.add("container");
    div.classList.add("col-12");
    div.classList.add("table-responsive");
}

function eliminar() {
    var confirmacion = confirm("¿Esta seguro de eliminar el registro?");
    if(!confirmacion) {
        return;
    }
    var id = this.getAttribute("id");
    axios.delete(url + "/empleado/" + id, headers)
        .then(function(res) {
            console.log(res);
            window.location.href = "sistemaRH.html";
        }).catch(function(err) {
            console.log(err);
        })
}

function editar() {
    var id = this.getAttribute("id");
    window.location.href = "editar.html?id=" + id;
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

function addEmpleado() {
    window.location.href = "agregar.html";
}
