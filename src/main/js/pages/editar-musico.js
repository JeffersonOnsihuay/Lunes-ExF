const React = require('react');
const {useState, useEffect} = require('react');
const {useParams, Link} = require('react-router-dom');
const client = require('../client');

const PageEditarMusico = ()=>{

    const {id} = useParams();
    const [musico, setMusico] = useState({});

    useEffect(()=>{
        client({
            method: 'GET',
            path: '/api/musicos/'+id,
            headers: {'Content-Type': 'application/json'}
        }).done((response)=>{
            setMusico(response.entity)
        })    
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        client({
            method: 'PATCH',
            path: '/api/musicos/'+id,
            headers: {'Content-Type': 'application/json'},
            entity: musico
        }).done(()=>window.location = "/")
    }

    return(
        <>
            <h1>Editar Musico: {id}</h1>

            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input 
                    type="text"
                    name="nombre"
                    value={musico.nombre}
                    onChange={(e)=>{setMusico({...musico, nombre: e.target.value})}} />
                <br/>
                <input type='submit' value={`Editar Musico ${id}`} />
            </form>
            <Link to="/">Volver</Link>
        </>
    )

}

module.exports = PageEditarMusico