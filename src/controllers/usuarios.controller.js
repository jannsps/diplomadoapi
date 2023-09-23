import { pool } from "../db.js"

export const getUsuarios=async(req,res)=>{
    try {
        const [rows]=await pool.query('select * from usuarios')
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error.'}) 
    }
}
export const getUsuario=async(req,res)=>{
    //console.log(req.params)
    const {id}=req.params
    try {
        const [rows]=await pool.query('select * from usuarios where id=?',[id])
        if (rows.length<=0)return res.status(400).json({
            message:"Usuario no registrado."
        })
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error.'}) 
    }
}

export const createUsuarios=async(req,res)=>{
    const {nombre,apellido,direccion}=req.body
    try {
        const [rows]=await pool.query('insert into usuarios (nombre,apellido,direccion) values(?,?,?)',[nombre, apellido,direccion])
        //console.log(rows)
        res.send({
            id:rows.insertId,nombre,apellido,direccion
        })
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error.'})
    }
}
export const updateUsuarios=async(req,res)=>{
    const {id}=req.params
    const {nombre,apellido,direccion}=req.body
    try {
        const [result]=await pool.query('update usuarios set nombre= ifnull(?,nombre),apellido=ifnull(?,apellido),direccion=ifnull(?,direccion) where id=?',[nombre,apellido,direccion,id])
        if (result.affectedRows<=0) return res.status(404).json({message:"Usuario no encontrado."})
        const [rows]=await pool.query('select * from usuarios where id=?',[id])
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error.'})
    }
}
export const deleteUsuarios=async(req,res)=>{
    //console.log(req.params)
    const {id}=req.params
    try {
        const [result]=await pool.query('delete from usuarios where id=?',[id])
        console.log(result)
        if (result.affectedRows<=0) return res.status(404).json({message:"Usuario no encontrado."})
        res.send(204)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error.'}) 
    }
}