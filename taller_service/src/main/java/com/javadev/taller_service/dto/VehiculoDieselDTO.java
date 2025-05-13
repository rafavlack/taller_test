package com.javadev.taller_service.dto;

import com.javadev.taller_service.model.TipoBombaInyeccion;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(callSuper = true)
public class VehiculoDieselDTO extends VehiculoDTO {

    @NotNull(message = "El tipo de bomba de inyección es obligatorio")
    private TipoBombaInyeccion tipoBombaInyeccion;
}
