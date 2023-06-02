const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post('/', async (req, res, next) => {
    const { nombre, apellido_pat, apellido_mat, telefono, correo, direccion} = req.body;
    if(nombre && apellido_pat && apellido_mat && telefono && correo && direccion){
        let query = "INSERT INTO empleado(nombre, apellido_pat, apellido_mat, telefono, correo, direccion)";
        query += ` VALUES('${nombre}', '${apellido_pat}', '${apellido_mat}', '${telefono}', '${correo}', '${direccion}');`;
    
        const rows = await db.query(query);
    
        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleado WHERE empleado_id=${req.params.id}`;
    const rows = await db.query(query);
    
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empleado.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { nombre, apellido_pat, apellido_mat, telefono, correo, direccion} = req.body;

    if(nombre && apellido_pat && apellido_mat && telefono && correo && direccion){
        let query = `UPDATE empleado SET nombre='${nombre}', apellido_pat='${apellido_pat}', apellido_mat='${apellido_mat}',`;
        query += ` telefono='${telefono}', correo='${correo}', direccion='${direccion}' WHERE empleado_id=${req.params.id};`;
    
        const rows = await db.query(query);
    
        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.get('/', async (req, res, next) => {
    const empl = await db.query("SELECT * FROM empleado;");
    return res.status(200).json({code: 200, message: empl});
});

empleado.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;

    const empl = await db.query(`SELECT * FROM empleado WHERE nombre LIKE '%${name}%' OR apellido_pat LIKE '%${name}%' OR apellido_mat LIKE '%${name}%';`);

    if (empl.length > 0) {
        return res.status(200).json({code: 200, message: empl});
    }
    return res.status(404).send({code:404, message: "Empleado no encontrado"});
});

empleado.get('/:id([0-9])', async (req, res, next) => {
    const id = req.params.id;

    const empl = await db.query(`SELECT * FROM empleado WHERE empleado_id=${id};`);
    if (empl.length > 0) {
        return res.status(200).json({code: 200, message: empl});
    }
    return res.status(404).send({code:404, message: "Empleado no encontrado"});
});

module.exports = empleado;


