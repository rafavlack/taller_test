package com.javadev.taller_service.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.javadev.taller_service.model.TipoCombustible;
import lombok.Data;

@Data

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "tipoCombustible",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = VehiculoDieselDTO.class, name = "DIESEL"),
        @JsonSubTypes.Type(value = VehiculoElectricoDTO.class, name = "ELECTRICO"),
        @JsonSubTypes.Type(value = VehiculoGasolinaDTO.class, name = "GASOLINA")
})
public class VehiculoDTO {
    private String vin;
    private String matricula;
    private TipoCombustible tipoCombustible;
    private boolean enTaller;
    private boolean reconvertido;
}
