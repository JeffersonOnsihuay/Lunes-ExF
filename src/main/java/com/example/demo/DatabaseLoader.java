package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {
	 
	private final VentaRepository repositoryV;
	private final ProductoRepository repositoryP;
	private final VentaDetalleRepository repositoryD;

	@Autowired
	public DatabaseLoader(
		 VentaRepository repositoryV,
		 VentaDetalleRepository repositoryD,
		 ProductoRepository repositoryP) {

		this.repositoryV = repositoryV;
		this.repositoryD = repositoryD;
		this.repositoryP = repositoryP;

	}

	@Override
	public void run(String... strings) throws Exception {

		Producto p1 = new Producto("Arroz", 5);
		Producto p2 = new Producto("Papa", 3);
		Producto p3 = new Producto("Camote", 4);
		this.repositoryP.save(p1);
		this.repositoryP.save(p2);
		this.repositoryP.save(p3);

		Venta v1 = new Venta(100);
		Venta v2 = new Venta(199);
		this.repositoryV.save(v1);
		this.repositoryV.save(v2);

		VentaDetalle vd1 = new VentaDetalle(v2, p2, 33);
		VentaDetalle vd2 = new VentaDetalle(v2, p1, 20);
		VentaDetalle vd3 = new VentaDetalle(v1, p3, 25);
		this.repositoryD.save(vd1);
		this.repositoryD.save(vd2);
		this.repositoryD.save(vd3);
	
	}

	
}