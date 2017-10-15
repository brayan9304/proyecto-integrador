package com.udea.integrador.service.mapper;

import com.udea.integrador.domain.*;
import com.udea.integrador.service.dto.ProfessorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Professor and its DTO ProfessorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProfessorMapper extends EntityMapper <ProfessorDTO, Professor> {
    
    @Mapping(target = "courses", ignore = true)
    Professor toEntity(ProfessorDTO professorDTO); 
    default Professor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Professor professor = new Professor();
        professor.setId(id);
        return professor;
    }
}
