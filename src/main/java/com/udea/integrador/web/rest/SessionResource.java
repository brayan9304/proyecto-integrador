package com.udea.integrador.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.udea.integrador.service.SessionService;
import com.udea.integrador.web.rest.util.HeaderUtil;
import com.udea.integrador.service.dto.SessionDTO;
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
 * REST controller for managing Session.
 */
@RestController
@RequestMapping("/api")
public class SessionResource {

    private final Logger log = LoggerFactory.getLogger(SessionResource.class);

    private static final String ENTITY_NAME = "session";

    private final SessionService sessionService;

    public SessionResource(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    /**
     * POST  /sessions : Create a new session.
     *
     * @param sessionDTO the sessionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sessionDTO, or with status 400 (Bad Request) if the session has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sessions")
    @Timed
    public ResponseEntity<SessionDTO> createSession(@Valid @RequestBody SessionDTO sessionDTO) throws URISyntaxException {
        log.debug("REST request to save Session : {}", sessionDTO);
        if (sessionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new session cannot already have an ID")).body(null);
        }
        SessionDTO result = sessionService.save(sessionDTO);
        return ResponseEntity.created(new URI("/api/sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sessions : Updates an existing session.
     *
     * @param sessionDTO the sessionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sessionDTO,
     * or with status 400 (Bad Request) if the sessionDTO is not valid,
     * or with status 500 (Internal Server Error) if the sessionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sessions")
    @Timed
    public ResponseEntity<SessionDTO> updateSession(@Valid @RequestBody SessionDTO sessionDTO) throws URISyntaxException {
        log.debug("REST request to update Session : {}", sessionDTO);
        if (sessionDTO.getId() == null) {
            return createSession(sessionDTO);
        }
        SessionDTO result = sessionService.save(sessionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sessionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sessions : get all the sessions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sessions in body
     */
    @GetMapping("/sessions")
    @Timed
    public List<SessionDTO> getAllSessions() {
        log.debug("REST request to get all Sessions");
        return sessionService.findAll();
        }

    /**
     * GET  /sessions/:id : get the "id" session.
     *
     * @param id the id of the sessionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sessionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sessions/{id}")
    @Timed
    public ResponseEntity<SessionDTO> getSession(@PathVariable Long id) {
        log.debug("REST request to get Session : {}", id);
        SessionDTO sessionDTO = sessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sessionDTO));
    }

    /**
     * DELETE  /sessions/:id : delete the "id" session.
     *
     * @param id the id of the sessionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sessions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        log.debug("REST request to delete Session : {}", id);
        sessionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
