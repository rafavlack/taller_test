package com.javadev.taller_service.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class VehiculoElectrico extends Vehiculo {
    private TipoBateria tipoBateria;
    private double voltaje;
    private double corriente;
}
