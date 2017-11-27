package com.udea.integrador.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.google.gson.Gson;
import com.udea.integrador.service.CourseService;
import com.udea.integrador.service.MaterialService;
import com.udea.integrador.service.ProfessorService;
import com.udea.integrador.service.SessionService;
import com.udea.integrador.service.dto.*;
import com.udea.integrador.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;

/**
 * REST controller for managing Course.
 */
@RestController
@RequestMapping("/api")
public class AdvancedSearchResource {

    private final Logger log = LoggerFactory.getLogger(CourseResource.class);

    private static final String ENTITY_NAME = "course";

    private final CourseService courseService;

    private final ProfessorService professorService;

    private final MaterialService materialService;

    private final SessionService sessionService;

    public AdvancedSearchResource(CourseService courseService, ProfessorService professorService, MaterialService materialService, SessionService sessionService) {
        this.courseService = courseService;
        this.professorService = professorService;
        this.materialService = materialService;
        this.sessionService = sessionService;
    }

    /**
     * GET  /courses : get all the courses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courses in body
     */
    @GetMapping("/advanced-search/{data}")
    @Timed
    public Set<MaterialDTO> getSearchResults(@PathVariable String data) {
        log.debug("Trying to get params ");
        Gson gson = new Gson();
        AdvancedSearchDTO advancedSearchDTO = gson.fromJson(data, AdvancedSearchDTO.class);
        log.debug(advancedSearchDTO.getSessionKeywords());
        List<MaterialDTO> materials = new ArrayList<>();
        if (!StringUtils.isEmpty(advancedSearchDTO.getSessionKeywords())) {
            materials.addAll(getMaterialsBySessionKeywords(advancedSearchDTO.getSessionKeywords()));
        }
        return null;
    }

    private List<MaterialDTO> getMaterialsBySessionKeywords(String sessionKeywords) {
        String[] keywords = sessionKeywords.split(",");
        log.debug("keyword 1: " + keywords[0]);
        List<SessionDTO> sessions = this.sessionService.findAll();
        List<MaterialDTO> materials = new ArrayList<>();

        boolean sessionPass = false;
        for (SessionDTO sessionDTO : sessions) {
            sessionPass = false;
            log.debug("TESTING SESSION ********************************** : " + sessionDTO.getDescription());
            for (int i = 0; i < keywords.length; i++) {
                if (sessionDTO.getDescription().toLowerCase().contains(keywords[i].toLowerCase())) {
                    sessionPass = true;
                }
            }
            if (sessionPass) {
                log.debug("Session passed : " + sessionDTO.getDescription());
                materials.addAll(sessionDTO.getMaterials());
            }
        }

        log.debug("MATERIALS SIZE ********************************** : " + materials.size());

        return materials;
    }

}
