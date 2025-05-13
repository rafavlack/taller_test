package com.javadev.taller_service.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class VehiculoGasolinaDTO extends VehiculoDTO {

    @NotEmpty(message = "Debe especificar al menos un tipo de combustible")
    private List<String> tiposCombustible;
}
