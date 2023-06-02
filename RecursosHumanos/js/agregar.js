
window.onload = init;
var headers = {};
var url = "http://localhost:3000"

function init() {
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', agregar);
    }
    else {
        window.location.href = "index.html";
    }
}

function agregar() {
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
        method: 'post',
        url: url + '/empleado',
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
        alert("Empleado agregado correctamente");
        window.location.href = "sistemaRH.html";
    }).catch(function(err) {
        console.log(err);
    })
}


