package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class VentaDetalle {
    private @Id @GeneratedValue Long id;

    @ManyToOne
    @JoinColumn(name = "id_venta")
    private Venta venta;
    
    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;
    
    private int cantidad;

    public VentaDetalle() {
    }

    public VentaDetalle(Venta venta, Producto producto, int cantidad) {
        this.venta = venta;
        this.producto = producto;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    
}
