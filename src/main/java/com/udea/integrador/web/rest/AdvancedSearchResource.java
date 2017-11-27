package com.udea.integrador.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.google.gson.Gson;
import com.udea.integrador.service.CourseService;
import com.udea.integrador.service.MaterialService;
import com.udea.integrador.service.ProfessorService;
import com.udea.integrador.service.dto.AdvancedSearchDTO;
import com.udea.integrador.service.dto.MaterialDTO;
import com.udea.integrador.web.rest.util.HeaderUtil;
import com.udea.integrador.service.dto.CourseDTO;
import com.udea.integrador.service.dto.ProfessorDTO;
import io.github.jhipster.web.util.ResponseUtil;
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

    public AdvancedSearchResource(CourseService courseService, ProfessorService professorService, MaterialService materialService) {
        this.courseService = courseService;
        this.professorService = professorService;
        this.materialService = materialService;
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
        log.debug(advancedSearchDTO.getCourse());
        return null;
    }
}
