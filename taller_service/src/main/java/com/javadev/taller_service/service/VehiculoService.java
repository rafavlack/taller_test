package com.javadev.taller_service.service;

import com.javadev.taller_service.dto.ReconversionDTO;
import com.javadev.taller_service.dto.VehiculoDTO;
import com.javadev.taller_service.model.TipoCombustible;

import java.util.List;


public interface VehiculoService {
    VehiculoDTO registrarVehiculo(VehiculoDTO vehiculo);

    List<VehiculoDTO> listarVehiculos(TipoCombustible tipo);

    String obtenerRegistro(String vin);

    void darSalida(String vin);

    ReconversionDTO reconvertir(String vin, List<String> nuevosCombustibles);
}
