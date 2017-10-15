package com.udea.integrador.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.udea.integrador.service.ProfessorService;
import com.udea.integrador.web.rest.util.HeaderUtil;
import com.udea.integrador.service.dto.ProfessorDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Professor.
 */
@RestController
@RequestMapping("/api")
public class ProfessorResource {

    private final Logger log = LoggerFactory.getLogger(ProfessorResource.class);

    private static final String ENTITY_NAME = "professor";

    private final ProfessorService professorService;

    public ProfessorResource(ProfessorService professorService) {
        this.professorService = professorService;
    }

    /**
     * POST  /professors : Create a new professor.
     *
     * @param professorDTO the professorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new professorDTO, or with status 400 (Bad Request) if the professor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/professors")
    @Timed
    public ResponseEntity<ProfessorDTO> createProfessor(@Valid @RequestBody ProfessorDTO professorDTO) throws URISyntaxException {
        log.debug("REST request to save Professor : {}", professorDTO);
        if (professorDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new professor cannot already have an ID")).body(null);
        }
        ProfessorDTO result = professorService.save(professorDTO);
        return ResponseEntity.created(new URI("/api/professors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /professors : Updates an existing professor.
     *
     * @param professorDTO the professorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated professorDTO,
     * or with status 400 (Bad Request) if the professorDTO is not valid,
     * or with status 500 (Internal Server Error) if the professorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/professors")
    @Timed
    public ResponseEntity<ProfessorDTO> updateProfessor(@Valid @RequestBody ProfessorDTO professorDTO) throws URISyntaxException {
        log.debug("REST request to update Professor : {}", professorDTO);
        if (professorDTO.getId() == null) {
            return createProfessor(professorDTO);
        }
        ProfessorDTO result = professorService.save(professorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, professorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /professors : get all the professors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of professors in body
     */
    @GetMapping("/professors")
    @Timed
    public List<ProfessorDTO> getAllProfessors() {
        log.debug("REST request to get all Professors");
        return professorService.findAll();
        }

    /**
     * GET  /professors/:id : get the "id" professor.
     *
     * @param id the id of the professorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the professorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/professors/{id}")
    @Timed
    public ResponseEntity<ProfessorDTO> getProfessor(@PathVariable Long id) {
        log.debug("REST request to get Professor : {}", id);
        ProfessorDTO professorDTO = professorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(professorDTO));
    }

    /**
     * DELETE  /professors/:id : delete the "id" professor.
     *
     * @param id the id of the professorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/professors/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        log.debug("REST request to delete Professor : {}", id);
        professorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
