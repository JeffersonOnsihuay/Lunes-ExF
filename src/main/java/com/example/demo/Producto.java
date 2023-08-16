package com.example.demo;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Producto {
    private @Id @GeneratedValue Long id;
	private String nombre;
    private float precio;

    public Producto() {}

    public Producto(String nombre, float precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    @Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Producto producto = (Producto) o;
		return Objects.equals(id, producto.id) &&
			Objects.equals(nombre, producto.nombre) &&
            Objects.equals(precio, producto.precio);
	}	

	@Override
	public int hashCode() {

		return Objects.hash(id, nombre, precio);
	}

	@Override
	public String toString() {
		return "Instrumento{" +
			"id=" + id +
			", nombre='" + nombre + '\'' +
            ", precio='" + precio + '\'' +
			'}';
	}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public float getPrecio() {
        return precio;
    }
    public void setPrecio(float precio) {
        this.precio = precio;
    }

    
}
