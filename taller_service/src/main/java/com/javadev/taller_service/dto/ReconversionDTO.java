package com.javadev.taller_service.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ReconversionDTO {
    private String vin;
    private List<String> nuevosCombustibles;
}
