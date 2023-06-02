window.onload = init;
var headers = {};
var url = "http://localhost:3000";
var pag = new URL(window.location.href);
var id = pag.searchParams.get("id");

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadInfoEmpleado();
        document.querySelector('.btn-primary').addEventListener('click', editar);
    }
    else {
        window.location.href = "index.html";
    }
}

function loadInfoEmpleado() {
    
    axios.get(url + "/empleado/" + id, headers)
        .then(function(res) {
            console.log(res);
            displayInfoEmpleado(res.data.message[0]);
        }).catch(function(err) {
            console.log(err);
        })
}

function displayInfoEmpleado(empleado) {
    document.getElementById('input-nombre').value = empleado.nombre;
    document.getElementById('input-apellido_pat').value = empleado.apellido_pat;
    document.getElementById('input-apellido_mat').value = empleado.apellido_mat;
    document.getElementById('input-telefono').value = empleado.telefono;
    document.getElementById('input-correo').value = empleado.correo;
    document.getElementById('input-direccion').value = empleado.direccion;
}

function editar() {
    console.log("entro a la funcion")
    var nombre = document.getElementById('input-nombre').value;
    var apellido_pat = document.getElementById('input-apellido_pat').value;
    var apellido_mat = document.getElementById('input-apellido_mat').value;
    var telefono = document.getElementById('input-telefono').value;
    var correo = document.getElementById('input-correo').value;
    var direccion = document.getElementById('input-direccion').value;

    if(nombre == "" || apellido_pat == "" || apellido_mat == "" || telefono == "" || correo == "" || direccion == "") {
        alert("Por favor, llene todos los campos");
        return;
    }

    axios({
        method: 'put',
        url: url + '/empleado/' + id,
        data: {
            nombre: nombre,
            apellido_pat: apellido_pat,
            apellido_mat: apellido_mat,
            telefono: telefono,
            correo: correo,
            direccion: direccion
        },
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    }).then(function (res) {
        console.log(res);
        alert("Empleado actualizado correctamente");
        window.location.href = "sistemaRH.html";
    }).catch(function(err) {
        console.log(err);
    })
}

