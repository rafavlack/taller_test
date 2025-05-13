package com.javadev.taller_service.repository;

import com.javadev.taller_service.model.VehiculoGasolina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculoGasolinaRepository extends JpaRepository<VehiculoGasolina, String> {
}
