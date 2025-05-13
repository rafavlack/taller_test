package com.javadev.taller_service.controller;

import com.javadev.taller_service.dto.ReconversionDTO;
import com.javadev.taller_service.dto.VehiculoDTO;
import com.javadev.taller_service.model.TipoCombustible;
import com.javadev.taller_service.service.VehiculoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class VehiculoController {

    private final VehiculoService service;

    @PostMapping
    public ResponseEntity<VehiculoDTO> registrar(@Valid @RequestBody VehiculoDTO vehiculoDTO) {
        return ResponseEntity.ok(service.registrarVehiculo(vehiculoDTO));
    }

    @GetMapping
    public ResponseEntity<List<VehiculoDTO>> listar(@RequestParam(required = false) TipoCombustible tipo) {
        return ResponseEntity.ok(service.listarVehiculos(tipo));
    }

    @PatchMapping("/salida/{vin}")
    public ResponseEntity<Void> darSalida(@PathVariable String vin) {
        service.darSalida(vin);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{vin}/registro")
    public ResponseEntity<String> registro(@PathVariable String vin) {
        return ResponseEntity.ok(service.obtenerRegistro(vin));
    }

    @PostMapping("/{vin}/reconversion")
    public ResponseEntity<ReconversionDTO> reconvertir(
            @PathVariable String vin,
            @RequestBody List<String> nuevosCombustibles) {
        return ResponseEntity.ok(service.reconvertir(vin, nuevosCombustibles));
    }
}
