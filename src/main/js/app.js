const React = require('react');
const ReactDOM = require('react-dom');
const {createBrowserRouter, RouterProvider} = require('react-router-dom');

const PageHome = require('./pages/home');
const PageVerVenta = require('./pages/ver-venta')
const PageNuevoDetalle = require('./pages/nuevo-detalle-de-venta');

const router = createBrowserRouter([
	{path: '/', element: <PageHome />},
	{path: '/ver-venta/:id', element: <PageVerVenta />},
	{path: '/ver-venta/:id/nuevo-detalle-de-venta', element: <PageNuevoDetalle />}
])


ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById('react')
)
