package com.udea.integrador.service.impl;

import com.udea.integrador.service.MaterialService;
import com.udea.integrador.domain.Material;
import com.udea.integrador.repository.MaterialRepository;
import com.udea.integrador.service.dto.MaterialDTO;
import com.udea.integrador.service.mapper.MaterialMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Material.
 */
@Service
@Transactional
public class MaterialServiceImpl implements MaterialService{

    private final Logger log = LoggerFactory.getLogger(MaterialServiceImpl.class);

    private final MaterialRepository materialRepository;

    private final MaterialMapper materialMapper;

    public MaterialServiceImpl(MaterialRepository materialRepository, MaterialMapper materialMapper) {
        this.materialRepository = materialRepository;
        this.materialMapper = materialMapper;
    }

    /**
     * Save a material.
     *
     * @param materialDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MaterialDTO save(MaterialDTO materialDTO) {
        log.debug("Request to save Material : {}", materialDTO);
        Material material = materialMapper.toEntity(materialDTO);
        material = materialRepository.save(material);
        return materialMapper.toDto(material);
    }

    /**
     *  Get all the materials.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MaterialDTO> findAll() {
        log.debug("Request to get all Materials");
        return materialRepository.findAll().stream()
            .map(materialMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one material by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MaterialDTO findOne(Long id) {
        log.debug("Request to get Material : {}", id);
        Material material = materialRepository.findOne(id);
        return materialMapper.toDto(material);
    }

    /**
     *  Delete the  material by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Material : {}", id);
        materialRepository.delete(id);
    }
}
