package com.udea.integrador.service.mapper;

import com.udea.integrador.domain.*;
import com.udea.integrador.service.dto.MaterialDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Material and its DTO MaterialDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MaterialMapper extends EntityMapper <MaterialDTO, Material> {
    
    
    default Material fromId(Long id) {
        if (id == null) {
            return null;
        }
        Material material = new Material();
        material.setId(id);
        return material;
    }
}
