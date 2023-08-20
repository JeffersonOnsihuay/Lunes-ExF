const React = require('react');
const client = require('../client');
const { Link, useParams, } = require('react-router-dom');
const {useState, useEffect} = require('react');



const PageVerVenta = () => {

    let { id } = useParams();
    const [venta, setVenta] = useState({});
    const [ventadetalle, setVentaDetalle] = useState([]);


    useEffect(() => {
        url_venta = '/api/ventas/' + id
        client({
            method: 'GET',
            path: url_venta
        }).done(response => {
            setVenta(response.entity);
        });

        client({
            method:'GET',
            path: url_venta + '/formacion'
        }).done(response => setVentaDetalle(response.entity))


    }, []);


    return (
        <>
        <hr />
            <center>
                <h1>Venta</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Total de la Venta</th>
                            <td>{venta.total}</td>
                        </tr>
                    </tbody>
                </table>
            </center>
                
            <hr></hr>
        <center>
            <h2>Detalles de Venta</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Total Venta</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {ventadetalle.map(ventadetalle => {
                        return (
                            <tr key={ventadetalle.ID}>
                                <td>{ventadetalle.ID}</td>
                                <td>{ventadetalle.PRODUCTO}</td>
                                <td>{ventadetalle.PRECIO_UNITARIO}</td>
                                <td>{ventadetalle.CANTIDAD}</td>
                                <td>{ventadetalle.TOTAL_VENTA}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to={`/ver-venta/${id}/nuevo-detalle-de-venta`}>Agregar Detalle de Venta</Link> |  
            <Link to="/">Volver</Link>
        </center>
        </>
    )
}

module.exports = PageVerVenta;