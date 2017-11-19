package com.udea.integrador.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.udea.integrador.service.SessionMaterialService;
import com.udea.integrador.web.rest.util.HeaderUtil;
import com.udea.integrador.service.dto.SessionMaterialDTO;
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
 * REST controller for managing SessionMaterial.
 */
@RestController
@RequestMapping("/api")
public class SessionMaterialResource {

    private final Logger log = LoggerFactory.getLogger(SessionMaterialResource.class);

    private static final String ENTITY_NAME = "sessionMaterial";

    private final SessionMaterialService sessionMaterialService;

    public SessionMaterialResource(SessionMaterialService sessionMaterialService) {
        this.sessionMaterialService = sessionMaterialService;
    }

    /**
     * POST  /session-materials : Create a new sessionMaterial.
     *
     * @param sessionMaterialDTO the sessionMaterialDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sessionMaterialDTO, or with status 400 (Bad Request) if the sessionMaterial has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/session-materials")
    @Timed
    public ResponseEntity<SessionMaterialDTO> createSessionMaterial(@Valid @RequestBody SessionMaterialDTO sessionMaterialDTO) throws URISyntaxException {
        log.debug("REST request to save SessionMaterial : {}", sessionMaterialDTO);
        if (sessionMaterialDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new sessionMaterial cannot already have an ID")).body(null);
        }
        SessionMaterialDTO result = sessionMaterialService.save(sessionMaterialDTO);
        return ResponseEntity.created(new URI("/api/session-materials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /session-materials : Updates an existing sessionMaterial.
     *
     * @param sessionMaterialDTO the sessionMaterialDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sessionMaterialDTO,
     * or with status 400 (Bad Request) if the sessionMaterialDTO is not valid,
     * or with status 500 (Internal Server Error) if the sessionMaterialDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/session-materials")
    @Timed
    public ResponseEntity<SessionMaterialDTO> updateSessionMaterial(@Valid @RequestBody SessionMaterialDTO sessionMaterialDTO) throws URISyntaxException {
        log.debug("REST request to update SessionMaterial : {}", sessionMaterialDTO);
        if (sessionMaterialDTO.getId() == null) {
            return createSessionMaterial(sessionMaterialDTO);
        }
        SessionMaterialDTO result = sessionMaterialService.save(sessionMaterialDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sessionMaterialDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /session-materials : get all the sessionMaterials.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sessionMaterials in body
     */
    @GetMapping("/session-materials")
    @Timed
    public List<SessionMaterialDTO> getAllSessionMaterials() {
        log.debug("REST request to get all SessionMaterials");
        return sessionMaterialService.findAll();
        }

    /**
     * GET  /session-materials/:id : get the "id" sessionMaterial.
     *
     * @param id the id of the sessionMaterialDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sessionMaterialDTO, or with status 404 (Not Found)
     */
    @GetMapping("/session-materials/{id}")
    @Timed
    public ResponseEntity<SessionMaterialDTO> getSessionMaterial(@PathVariable Long id) {
        log.debug("REST request to get SessionMaterial : {}", id);
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sessionMaterialDTO));
    }

    /**
     * DELETE  /session-materials/:id : delete the "id" sessionMaterial.
     *
     * @param id the id of the sessionMaterialDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/session-materials/{id}")
    @Timed
    public ResponseEntity<Void> deleteSessionMaterial(@PathVariable Long id) {
        log.debug("REST request to delete SessionMaterial : {}", id);
        sessionMaterialService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
