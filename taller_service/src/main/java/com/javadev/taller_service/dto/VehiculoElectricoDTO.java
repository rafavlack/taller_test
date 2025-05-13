package com.javadev.taller_service.dto;

import com.javadev.taller_service.model.TipoBateria;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class VehiculoElectricoDTO extends VehiculoDTO {
    @NotNull(message = "El voltaje es obligatorio")
    private Double voltaje;

    @NotNull(message = "La corriente es obligatoria")
    private Double corriente;

    @NotNull(message = "El tipo de batería es obligatorio")
    private TipoBateria tipoBateria;
}
