const React = require('react');
const { useState, useEffect } = require('react');
const { Link, useParams } = require('react-router-dom');
const client = require('../client');

const NuevoDetalleDeVenta = () => {

    let { id } = useParams();
    const [productos, setProductos] = useState([]); // Agregado: Define el estado de productos
    const [idproducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        client({
            method: 'POST',
            path: '/api/VentaDetalles',
            entity: {
                idVenta: 'http://localhost:8080/api/ventas/' + id,
                idProducto: 'http://localhost:8080/api/productos/' + idproducto,
                cantidad: cantidad
            },
            headers: { 'Content-Type': 'application/json' }
        }).done(() => {
            window.location = '/';
        });
    };

    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/productos'
        }).done(response => {
            let productos2 = [];
            response.entity._embedded.productos.map(producto => {
                productos2.push({ value: producto._links.self.href.split('/').slice(-1), label: producto.nombre });
            });
            setProductos(productos2);
        });
    }, []);

    const handleCantidadChange = (event) => {
        setCantidad(event.target.value);
    };

    return (
        <>
            <h1>Agregar Detalle de Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Producto</label>
                <select name="producto" id="producto" onChange={(e) => { setIdProducto(e.target.value) }}>
                    {productos.map(producto => {
                        return (
                            <option key={producto.value} value={producto.value}>{producto.label}</option>
                        );
                    })}
                </select>

                <br />

                <label>
                    Cantidad:
                    <input type="text" value={cantidad} onChange={handleCantidadChange} />
                </label>
                <br />
                <button type="submit">Agregar Detalle de Venta</button>
            </form>
            <br />
            <Link to={`/ver-venta/${id}`}>Volver a Detalles de Venta</Link>
        </>
    );
};

module.exports = NuevoDetalleDeVenta;