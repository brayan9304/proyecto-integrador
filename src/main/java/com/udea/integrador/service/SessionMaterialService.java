package com.udea.integrador.service;

import com.udea.integrador.service.dto.SessionMaterialDTO;
import java.util.List;

/**
 * Service Interface for managing SessionMaterial.
 */
public interface SessionMaterialService {

    /**
     * Save a sessionMaterial.
     *
     * @param sessionMaterialDTO the entity to save
     * @return the persisted entity
     */
    SessionMaterialDTO save(SessionMaterialDTO sessionMaterialDTO);

    /**
     *  Get all the sessionMaterials.
     *
     *  @return the list of entities
     */
    List<SessionMaterialDTO> findAll();

    /**
     *  Get the "id" sessionMaterial.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SessionMaterialDTO findOne(Long id);

    /**
     *  Delete the "id" sessionMaterial.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
