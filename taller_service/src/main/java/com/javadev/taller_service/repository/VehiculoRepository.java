package com.javadev.taller_service.repository;

import com.javadev.taller_service.model.TipoCombustible;
import com.javadev.taller_service.model.Vehiculo;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {
    Optional<Vehiculo> findByMatricula(String matricula);
    List<Vehiculo> findByTipoCombustible(TipoCombustible tipo, Sort sort);
}
