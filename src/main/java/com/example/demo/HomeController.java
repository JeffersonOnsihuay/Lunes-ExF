package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

	@GetMapping(path="/api/ventas/{id}/formacion")
	public @ResponseBody List<Map<String, Object>> formacion(@PathVariable Integer id){
		String sql = "SELECT venta_detalle.id AS ID, producto.nombre AS PRODUCTO, venta_detalle.cantidad AS CANTIDAD, FROM venta_detalle JOIN venta ON venta_detalle.id_venta = venta.id JOIN producto ON venta_detalle.id_producto = producto.id WHERE venta.id = ?";
		List<Map<String, Object>> queryResult = jdbcTemplate.queryForList(sql, id);
		return queryResult;
	}

}