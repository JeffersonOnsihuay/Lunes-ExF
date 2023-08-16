const React = require('react');
const {useState, useEffect} = require('react');
const {useParams, Link} = require('react-router-dom');
const client = require('../client');

const PageEditarInstrumento = ()=>{

    const {id} = useParams();
    const [instrumento, setInstrumento] = useState({});

    useEffect(()=>{
        client({
            method: 'GET',
            path: '/api/instrumentos/'+id,
            headers: {'Content-Type': 'application/json'}
        }).done((response)=>{
            setInstrumento(response.entity)
        })    
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        client({
            method: 'PATCH',
            path: '/api/instrumentos/'+id,
            headers: {'Content-Type': 'application/json'},
            entity: instrumento
        }).done(()=>window.location = "/")
    }

    return(
        <>
            <h1>Editar Instrumento: {id}</h1>

            <form onSubmit={handleSubmit}>

                <label>Nombre</label>
                <input 
                    type="text"
                    name="nombre"
                    value={instrumento.nombre}
                    onChange={(e)=>{setInstrumento({...instrumento, nombre: e.target.value})}} />
                <br/>

                <label>Categoría</label>
                <input 
                    type="text"
                    name="categoria"
                    value={instrumento.categoria}
                    onChange={(e)=>{setInstrumento({...instrumento, categoria: e.target.value})}} />
                <br/>
                
                <label>Descripción</label>
                <input 
                    type="text"
                    name="descripcion"
                    value={instrumento.descripcion}
                    onChange={(e)=>{setInstrumento({...instrumento, descripcion: e.target.value})}} />
                <br/>
                
                <input type='submit' value={`Editar Instrumento ${id}`} />
            </form>
            <Link to="/">Volver</Link>
        </>
    )

}

module.exports = PageEditarInstrumento