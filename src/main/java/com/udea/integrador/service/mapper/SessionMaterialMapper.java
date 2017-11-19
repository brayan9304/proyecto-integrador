package com.udea.integrador.service.mapper;

import com.udea.integrador.domain.*;
import com.udea.integrador.service.dto.SessionMaterialDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SessionMaterial and its DTO SessionMaterialDTO.
 */
@Mapper(componentModel = "spring", uses = {SessionMapper.class, MaterialMapper.class, })
public interface SessionMaterialMapper extends EntityMapper <SessionMaterialDTO, SessionMaterial> {

    @Mapping(source = "session.id", target = "sessionId")

    @Mapping(source = "material.id", target = "materialId")
    SessionMaterialDTO toDto(SessionMaterial sessionMaterial); 

    @Mapping(source = "sessionId", target = "session")

    @Mapping(source = "materialId", target = "material")
    SessionMaterial toEntity(SessionMaterialDTO sessionMaterialDTO); 
    default SessionMaterial fromId(Long id) {
        if (id == null) {
            return null;
        }
        SessionMaterial sessionMaterial = new SessionMaterial();
        sessionMaterial.setId(id);
        return sessionMaterial;
    }
}
