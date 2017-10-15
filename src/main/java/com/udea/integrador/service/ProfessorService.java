package com.udea.integrador.service;

import com.udea.integrador.service.dto.ProfessorDTO;
import java.util.List;

/**
 * Service Interface for managing Professor.
 */
public interface ProfessorService {

    /**
     * Save a professor.
     *
     * @param professorDTO the entity to save
     * @return the persisted entity
     */
    ProfessorDTO save(ProfessorDTO professorDTO);

    /**
     *  Get all the professors.
     *
     *  @return the list of entities
     */
    List<ProfessorDTO> findAll();

    /**
     *  Get the "id" professor.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ProfessorDTO findOne(Long id);

    /**
     *  Delete the "id" professor.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
