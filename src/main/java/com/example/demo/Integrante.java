package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Integrante {

	private @Id @GeneratedValue Long id;

	@ManyToOne()
	@JoinColumn(name = "id_banda")
	private Banda banda;

	@ManyToOne()
	@JoinColumn(name = "id_musico")
	private Musico musico;

	@ManyToOne()
	@JoinColumn(name = "id_instrumento")
	private Instrumento instrumento;

	public Integrante() {}

	public Integrante (Banda banda, Musico musico, Instrumento instrumento) {
		this.banda = banda;
		this.musico = musico;
		this.instrumento = instrumento;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public Banda getBanda() {
        return banda;
    }

    public void setBanda(Banda banda) {
        this.banda = banda;
    }

    public Musico getMusico() {
        return musico;
    }

    public void setMusico(Musico musico) {
        this.musico = musico;
    }

    public Instrumento getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(Instrumento instrumento) {
        this.instrumento = instrumento;
    }

	

}