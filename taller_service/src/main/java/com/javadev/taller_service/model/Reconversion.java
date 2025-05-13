package com.javadev.taller_service.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Reconversion {
    @Id
    @GeneratedValue
    private Long id;
    
    private String vin;
    private String numeroMatricula;
    
    @ElementCollection
    private List<String> nuevosCombustibles;
}
