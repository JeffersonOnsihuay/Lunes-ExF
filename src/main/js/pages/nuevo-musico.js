const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');
const { useState } = require('react');

const PageNuevoMusico = () => {

    const [nombre, setNombre] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'POST',
            path: '/api/musicos',
            entity: { nombre: nombre },
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    }

    return (
        <>
            <h1>Nuevo Músico</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input type="text" id="nombre" name="nombre" onChange={(e)=>setNombre(e.target.value)} />
                <input type="submit" value="Nuevo Músico" />
            </form>
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = PageNuevoMusico;