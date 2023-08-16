const React = require('react');
const {useState, useEffect} = require('react');
const { Link,useParams } = require('react-router-dom');
const client = require('../client');

const NuevoIntegrantePage = () => {

    let { id } = useParams();
    const [musicos, setMusicos] = useState([])
    const [instrumentos, setInstrumentos] = useState([])
    const [idMusico, setIdMusico] = useState('')
    const [idInstrumento, setIdInstrumento] = useState('')

    const handleSubmit = (evento)=>{
        evento.preventDefault();
        client({
            method: 'POST',
            path: '/api/integrantes',
            entity: {
                banda: 'http://localhost:8080/api/bandas/'+id,
                musico: 'http://localhost:8080/api/musicos/'+idMusico,
                instrumento: 'http://localhost:8080/api/instrumentos/'+idInstrumento
            },
            headers: {'Content-Type': 'application/json'}
        }).done(()=>{
           window.location = '/';
        })
    }

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/musicos'
        }).done(response=>{
            let musicos2 = [];
            response.entity._embedded.musicos.map(musico => {
                musicos2.push({value: musico._links.self.href.split('/').slice(-1), label: musico.nombre})
            })
            setMusicos(musicos2)
        })
        client({
            method: 'GET',
            path: '/api/instrumentos'
        }).done(response=>{
            let instrumentos2 = [];
            response.entity._embedded.instrumentos.map(instrumento => {
                instrumentos2.push({value: instrumento._links.self.href.split('/').slice(-1), label: instrumento.nombre})
            })
            setInstrumentos(instrumentos2)
        })

    },[])

    return (
        <>
            <h1>Nuevo Integrante</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor='musico'>Musico</label>
                <select name="musico" id="musico" onChange={(e)=>{setIdMusico(e.target.value)}}>
                    {musicos.map(musico => {	
                        return (
                            <option key={musico.value} value={musico.value}>{musico.label}</option>
                        )
                    })}
                </select>
                
                <label>Instrumento</label>
                <select name="instrumento" id="instrumento" onChange={(e)=>{setIdInstrumento(e.target.value)}}>
                    {instrumentos.map(instrumento => {	
                        return (
                            <option key={instrumento.value} value={instrumento.value}>{instrumento.label}</option>
                        )
                    })}
                </select>

                <input type="submit" value="Nuevo Integrante" />

            </form>
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = NuevoIntegrantePage;