const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');

class PageHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {ventas: []};
	}
	componentDidMount() {
		client({ method: 'GET', path: '/api/ventas' }).done(response => {
			this.setState({ ventas: response.entity._embedded.ventas });
		});
	}
	render() {
		return (
			<>
				<center>
					<div style={{"width": "calc(100% / 4)"}}>
						<Titulo entidad="Ventas" emoji="💲" />
						<VentaList ventas={this.state.ventas} />
					</div>
				</center>
			</>
		)
	}
}

const Titulo = (props) => {
	return (
		<>
			<hr />
			<h2>{props.emoji} - {props.entidad}</h2>
			<span>Listado completo de {props.entidad.toLowerCase()}:</span>
			<hr />
		</>
	);
}

class VentaList extends React.Component {
	render() {
		const ventas = this.props.ventas.map(venta =>
			<Venta key={venta._links.self.href} venta={venta} />
		);
		return (
			<table >
				<tbody className="table-group-divider">
					<tr>
						<th>Total de la Venta</th>
						<th>Acciones</th>
					</tr>
					{ventas}
				</tbody>
			</table>
		)
	}
}

class Venta extends React.Component {
	render() {
		const id = this.props.venta._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>S/ {this.props.venta.total}</td>
				<td>
					<Link to={`/ver-venta/${id}`}>Ver Venta</Link>
				</td>
			</tr>
		)
	}
}


module.exports = PageHome;