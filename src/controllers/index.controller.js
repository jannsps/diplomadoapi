import { pool } from "../db.js"
export const prueba=async(req,res)=>{
    const [result]=await pool.query("select 'Prueba exitosa' as result")
    res.json(result[0])
}