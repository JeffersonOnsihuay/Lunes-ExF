const React = require('react');
const client = require('../client');
const { Link, useParams, } = require('react-router-dom');
const {useState, useEffect} = require('react');



const PageVerVenta = (props) => {

    let { id } = useParams();
    const [venta, setVenta] = useState({});
    // const [integrantes, setIntegrantes] = useState([]);


    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/ventas/' + id
        }).done(response => {
            setVenta(response.entity);
        });


    }, []);


    return (
        <>
            <h1>Venta</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Total</th>
                        <td>{venta.total}</td>
                    </tr>
                </tbody>
            </table>

            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = PageVerVenta;