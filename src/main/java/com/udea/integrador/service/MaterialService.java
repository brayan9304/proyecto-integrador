package com.udea.integrador.service;

import com.udea.integrador.service.dto.MaterialDTO;
import java.util.List;

/**
 * Service Interface for managing Material.
 */
public interface MaterialService {

    /**
     * Save a material.
     *
     * @param materialDTO the entity to save
     * @return the persisted entity
     */
    MaterialDTO save(MaterialDTO materialDTO);

    /**
     *  Get all the materials.
     *
     *  @return the list of entities
     */
    List<MaterialDTO> findAll();

    /**
     *  Get the "id" material.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    MaterialDTO findOne(Long id);

    /**
     *  Delete the "id" material.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
