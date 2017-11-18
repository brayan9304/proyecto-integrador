package com.udea.integrador.service.impl;

import com.udea.integrador.service.SessionMaterialService;
import com.udea.integrador.domain.SessionMaterial;
import com.udea.integrador.repository.SessionMaterialRepository;
import com.udea.integrador.service.dto.SessionMaterialDTO;
import com.udea.integrador.service.mapper.SessionMaterialMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SessionMaterial.
 */
@Service
@Transactional
public class SessionMaterialServiceImpl implements SessionMaterialService{

    private final Logger log = LoggerFactory.getLogger(SessionMaterialServiceImpl.class);

    private final SessionMaterialRepository sessionMaterialRepository;

    private final SessionMaterialMapper sessionMaterialMapper;

    public SessionMaterialServiceImpl(SessionMaterialRepository sessionMaterialRepository, SessionMaterialMapper sessionMaterialMapper) {
        this.sessionMaterialRepository = sessionMaterialRepository;
        this.sessionMaterialMapper = sessionMaterialMapper;
    }

    /**
     * Save a sessionMaterial.
     *
     * @param sessionMaterialDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SessionMaterialDTO save(SessionMaterialDTO sessionMaterialDTO) {
        log.debug("Request to save SessionMaterial : {}", sessionMaterialDTO);
        SessionMaterial sessionMaterial = sessionMaterialMapper.toEntity(sessionMaterialDTO);
        sessionMaterial = sessionMaterialRepository.save(sessionMaterial);
        return sessionMaterialMapper.toDto(sessionMaterial);
    }

    /**
     *  Get all the sessionMaterials.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SessionMaterialDTO> findAll() {
        log.debug("Request to get all SessionMaterials");
        return sessionMaterialRepository.findAll().stream()
            .map(sessionMaterialMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one sessionMaterial by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SessionMaterialDTO findOne(Long id) {
        log.debug("Request to get SessionMaterial : {}", id);
        SessionMaterial sessionMaterial = sessionMaterialRepository.findOne(id);
        return sessionMaterialMapper.toDto(sessionMaterial);
    }

    /**
     *  Delete the  sessionMaterial by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SessionMaterial : {}", id);
        sessionMaterialRepository.delete(id);
    }
}
