const React = require('react');
const client = require('../client');
const { Link } = require('react-router-dom');

class PageHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { instrumentos: [], musicos: [], bandas: [], ventas: []};
	}
	componentDidMount() {
		client({ method: 'GET', path: '/api/instrumentos' }).done(response => {
			this.setState({ instrumentos: response.entity._embedded.instrumentos });
		});
		client({ method: 'GET', path: '/api/musicos' }).done(response => {
			this.setState({ musicos: response.entity._embedded.musicos });
		});
		client({ method: 'GET', path: '/api/bandas' }).done(response => {
			this.setState({ bandas: response.entity._embedded.bandas });
		});
		client({ method: 'GET', path: '/api/ventas' }).done(response => {
			this.setState({ ventas: response.entity._embedded.ventas });
		});
	}
	render() {
		return (
			<>
				<h1>Demo App!</h1>

				<div style={{"width": "100%", "display": "flex"}}>
					<div style={{"width": "calc(100% / 4)"}}>
						<Titulo entidad="Instrumentos" emoji="🎸" />
						<InstrumentoList instrumentos={this.state.instrumentos} />
						<Link to="/nuevo-instrumento">Nuevo Instrumento</Link>
					</div>
					<div style={{"width": "calc(100% / 4)"}}>
						<Titulo entidad="Musicos" emoji="🎵" />
						<MusicoList musicos={this.state.musicos} />
						<Link to="/nuevo-musico">Nuevo Musico</Link>
					</div>
					<div style={{"width": "calc(100% / 4)"}}>
						<Titulo entidad="Bandas" emoji="👩🏼‍🎤" />
						<BandaList bandas={this.state.bandas} />
						<Link to="/nueva-banda">Nueva Banda</Link>
					</div>
				</div>
				<center>
					<div style={{"width": "calc(100% / 4)"}}>
						<Titulo entidad="Ventas" emoji="💲" />
						<VentaList ventas={this.state.ventas} />
						<Link to="/nueva-venta">Nueva Venta</Link>
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


class InstrumentoList extends React.Component {
	render() {
		const instrumentos = this.props.instrumentos.map(instrumento =>
			<Instrumento key={instrumento._links.self.href} instrumento={instrumento} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
					{instrumentos}
				</tbody>
			</table>
		)
	}
}
class MusicoList extends React.Component {
	render() {
		const musicos = this.props.musicos.map(musico =>
			<Musico key={musico._links.self.href} musico={musico} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
					{musicos}
				</tbody>
			</table>
		)
	}
}
class BandaList extends React.Component {
	render() {
		const bandas = this.props.bandas.map(banda =>
			<Banda key={banda._links.self.href} banda={banda} />
		);
		return (
			<table border="1">
				<tbody>
					<tr>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
					{bandas}
				</tbody>
			</table>
		)
	}
}

class VentaList extends React.Component {
	render() {
		const ventas = this.props.ventas.map(venta =>
			<Venta key={venta._links.self.href} venta={venta} />
		);
		return (
			<table class="table table-bordered border-primary">
				<tbody>
					<tr>
						<th>Total</th>
						<th>Acciones</th>
					</tr>
					{ventas}
				</tbody>
			</table>
		)
	}
}


class Instrumento extends React.Component {
	render() {
		const id = this.props.instrumento._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.instrumento.nombre}</td>
				<td>
					<Link to={`/ver-instrumento/${id}`}>Ver</Link> | 
					<Link to={`/editar-instrumento/${id}`}>Editar</Link>
				</td>
			</tr>
		)
	}
}

class Musico extends React.Component {
	render() {
		const id = this.props.musico._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.musico.nombre}</td>
				<td>
					<Link to={`/editar-musico/${id}`}>Editar</Link>
				</td>
			</tr>
		)
	}
}

class Banda extends React.Component {
	render() {
		const id = this.props.banda._links.self.href.split("/").slice(-1);
		return (
			<tr>
				<td>{this.props.banda.nombre}</td>
				<td>
					<Link to={`/ver-banda/${id}`}>Ver Banda</Link>
				</td>
			</tr>
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