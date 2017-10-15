package com.udea.integrador.service.impl;

import com.udea.integrador.service.ProfessorService;
import com.udea.integrador.domain.Professor;
import com.udea.integrador.repository.ProfessorRepository;
import com.udea.integrador.service.dto.ProfessorDTO;
import com.udea.integrador.service.mapper.ProfessorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Professor.
 */
@Service
@Transactional
public class ProfessorServiceImpl implements ProfessorService{

    private final Logger log = LoggerFactory.getLogger(ProfessorServiceImpl.class);

    private final ProfessorRepository professorRepository;

    private final ProfessorMapper professorMapper;

    public ProfessorServiceImpl(ProfessorRepository professorRepository, ProfessorMapper professorMapper) {
        this.professorRepository = professorRepository;
        this.professorMapper = professorMapper;
    }

    /**
     * Save a professor.
     *
     * @param professorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProfessorDTO save(ProfessorDTO professorDTO) {
        log.debug("Request to save Professor : {}", professorDTO);
        Professor professor = professorMapper.toEntity(professorDTO);
        professor = professorRepository.save(professor);
        return professorMapper.toDto(professor);
    }

    /**
     *  Get all the professors.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProfessorDTO> findAll() {
        log.debug("Request to get all Professors");
        return professorRepository.findAll().stream()
            .map(professorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one professor by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProfessorDTO findOne(Long id) {
        log.debug("Request to get Professor : {}", id);
        Professor professor = professorRepository.findOne(id);
        return professorMapper.toDto(professor);
    }

    /**
     *  Delete the  professor by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Professor : {}", id);
        professorRepository.delete(id);
    }
}
