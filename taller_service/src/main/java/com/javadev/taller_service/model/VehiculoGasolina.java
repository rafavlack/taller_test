package com.javadev.taller_service.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class VehiculoGasolina extends Vehiculo {
    @ElementCollection
    private List<String> tiposCombustible;
}
