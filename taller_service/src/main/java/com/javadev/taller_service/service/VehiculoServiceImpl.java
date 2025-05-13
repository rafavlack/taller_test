package com.javadev.taller_service.service;

import com.javadev.taller_service.dto.*;
import com.javadev.taller_service.exception.DuplicateResourceException;
import com.javadev.taller_service.exception.ResourceNotFoundException;
import com.javadev.taller_service.model.*;
import com.javadev.taller_service.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehiculoServiceImpl implements VehiculoService {

    private final VehiculoRepository vehiculoRepository;
    private final VehiculoDieselRepository dieselRepository;
    private final VehiculoElectricoRepository electricoRepository;
    private final VehiculoGasolinaRepository gasolinaRepository;
    private final ReconversionRepository reconversionRepository;
    private final ModelMapper modelMapper;

    @Override
    public VehiculoDTO registrarVehiculo(VehiculoDTO vehiculoDTO) {
        if (vehiculoRepository.existsById(vehiculoDTO.getVin()) ||
                vehiculoRepository.findByMatricula(vehiculoDTO.getMatricula()).isPresent()) {
            throw new DuplicateResourceException("Vehículo con VIN o matrícula ya registrado");
        }

        validarDatosVehiculo(vehiculoDTO);

        Vehiculo vehiculo = convertToEntity(vehiculoDTO);

        return switch (vehiculo.getTipoCombustible()) {
            case DIESEL -> convertToDTO(dieselRepository.save((VehiculoDiesel) vehiculo));
            case ELECTRICO -> convertToDTO(electricoRepository.save((VehiculoElectrico) vehiculo));
            case GASOLINA -> convertToDTO(gasolinaRepository.save((VehiculoGasolina) vehiculo));
        };
    }


    @Override
    public List<VehiculoDTO> listarVehiculos(TipoCombustible tipo) {
        try {
            List<Vehiculo> vehiculos;
            if (tipo == null) {
                vehiculos = vehiculoRepository.findAll(Sort.by("matricula"));
            } else {
                vehiculos = vehiculoRepository.findByTipoCombustible(tipo, Sort.by("matricula"));
            }
            return vehiculos.stream()
                    .filter(Vehiculo::isEnTaller)
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new RuntimeException("Error al listar vehículos por tipo de combustible: " + ex.getMessage(), ex);
        }
    }


    @Override
    public void darSalida(String vin) {
        Vehiculo v = vehiculoRepository.findById(vin)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con VIN: " + vin));
        v.setEnTaller(false);
        vehiculoRepository.save(v);
    }

    @Override
    public String obtenerRegistro(String vin) {
        Vehiculo vehiculo = vehiculoRepository.findById(vin)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con VIN: " + vin));

        return switch (vehiculo.getTipoCombustible()) {
            case DIESEL -> {
                VehiculoDiesel d = dieselRepository.findById(vin)
                        .orElseThrow(() -> new ResourceNotFoundException("Vehículo diésel no encontrado"));
                yield d.getMatricula() + "-" + d.getTipoBombaInyeccion();
            }
            case ELECTRICO -> {
                VehiculoElectrico e = electricoRepository.findById(vin)
                        .orElseThrow(() -> new ResourceNotFoundException("Vehículo eléctrico no encontrado"));
                yield e.getVin() + "-" + e.getVoltaje() + "-" + e.getCorriente() + "-" + e.getTipoBateria();
            }
            case GASOLINA -> {
                VehiculoGasolina g = gasolinaRepository.findById(vin)
                        .orElseThrow(() -> new ResourceNotFoundException("Vehículo gasolina no encontrado"));
                yield g.getMatricula() + "-" + String.join(",", g.getTiposCombustible());
            }
        };
    }

    @Override
    public ReconversionDTO reconvertir(String vin, List<String> nuevosCombustibles) {
        VehiculoElectrico electrico = electricoRepository.findById(vin)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo eléctrico no encontrado con VIN: " + vin));

        VehiculoGasolina convertido = new VehiculoGasolina();
        convertido.setVin(electrico.getVin());
        convertido.setMatricula(electrico.getMatricula());
        convertido.setTipoCombustible(TipoCombustible.GASOLINA);
        convertido.setEnTaller(electrico.isEnTaller());
        convertido.setReconvertido(true);
        convertido.setTiposCombustible(nuevosCombustibles);

        electricoRepository.deleteById(vin);
        gasolinaRepository.save(convertido);

        Reconversion reconversion = new Reconversion();
        reconversion.setVin(vin);
        reconversion.setNuevosCombustibles(nuevosCombustibles);

        return modelMapper.map(reconversionRepository.save(reconversion), ReconversionDTO.class);
    }

    private VehiculoDTO convertToDTO(Vehiculo vehiculo) {
        if (vehiculo instanceof VehiculoDiesel) {
            return modelMapper.map(vehiculo, VehiculoDieselDTO.class);
        } else if (vehiculo instanceof VehiculoElectrico) {
            return modelMapper.map(vehiculo, VehiculoElectricoDTO.class);
        } else if (vehiculo instanceof VehiculoGasolina) {
            return modelMapper.map(vehiculo, VehiculoGasolinaDTO.class);
        }
        throw new RuntimeException("Tipo de vehículo no soportado para conversión a DTO");
    }

    private Vehiculo convertToEntity(VehiculoDTO vehiculoDTO) {
        return switch (vehiculoDTO.getTipoCombustible()) {
            case DIESEL -> modelMapper.map(vehiculoDTO, VehiculoDiesel.class);
            case ELECTRICO -> modelMapper.map(vehiculoDTO, VehiculoElectrico.class);
            case GASOLINA -> modelMapper.map(vehiculoDTO, VehiculoGasolina.class);
        };
    }


    private void validarDatosVehiculo(VehiculoDTO dto) {
        switch (dto.getTipoCombustible()) {
            case DIESEL -> {
                if (!(dto instanceof VehiculoDieselDTO dieselDTO)) {
                    throw new RuntimeException("Se requiere tipo VehiculoDieselDTO para vehículos diésel");
                }
                if (dieselDTO.getTipoBombaInyeccion() == null) {
                    throw new RuntimeException("El tipo de bomba de inyección es obligatorio para vehículos diésel");
                }
            }
            case ELECTRICO -> {
                if (!(dto instanceof VehiculoElectricoDTO electricoDTO)) {
                    throw new RuntimeException("Se requiere tipo VehiculoElectricoDTO para vehículos eléctricos");
                }
                if (electricoDTO.getVoltaje() == null || electricoDTO.getCorriente() == null || electricoDTO.getTipoBateria() == null) {
                    throw new RuntimeException("Voltaje, corriente y tipo de batería son obligatorios para vehículos eléctricos");
                }
            }
            case GASOLINA -> {
                if (!(dto instanceof VehiculoGasolinaDTO gasolinaDTO)) {
                    throw new RuntimeException("Se requiere tipo VehiculoGasolinaDTO para vehículos gasolina");
                }
                if (gasolinaDTO.getTiposCombustible() == null || gasolinaDTO.getTiposCombustible().isEmpty()) {
                    throw new RuntimeException("Debe especificar tipos de combustible para vehículos gasolina");
                }
            }
            default -> throw new RuntimeException("Tipo de combustible no reconocido");
        }
    }


}
