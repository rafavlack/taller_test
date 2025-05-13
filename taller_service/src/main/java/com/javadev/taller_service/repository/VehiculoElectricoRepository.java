package com.javadev.taller_service.repository;

import com.javadev.taller_service.model.VehiculoElectrico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculoElectricoRepository extends JpaRepository<VehiculoElectrico, String> {
}
