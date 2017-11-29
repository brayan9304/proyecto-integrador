package com.udea.integrador.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.udea.integrador.service.CourseService;
import com.udea.integrador.service.MaterialService;
import com.udea.integrador.service.ProfessorService;
import com.udea.integrador.service.SessionService;
import com.udea.integrador.service.dto.*;
import com.udea.integrador.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.*;
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
     * GET  /materials : get all the materials that meets criteria.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courses in body
     */
    @GetMapping("/advanced-search/{data}")
    @Timed
    public Set<MaterialDTO> getSearchResults(@PathVariable String data) {
        log.debug("Trying to get params ");
        Gson gson = new Gson();
        log.debug("--------------------------- json:  " + data.toString());
        AdvancedSearchDTO advancedSearchDTO = gson.fromJson(data, AdvancedSearchDTO.class);
        log.debug(advancedSearchDTO.getSessionKeywords());
        Set<MaterialDTO> materials = new HashSet<>();

        if (!StringUtils.isEmpty(advancedSearchDTO.getSessionKeywords())) {
            materials.addAll(getMaterialsBySessionKeywords(advancedSearchDTO.getSessionKeywords()));
        }

        if (!StringUtils.isEmpty(advancedSearchDTO.getMaterialKeywords())) {
            materials.addAll(getMaterialsByMaterialKeywords(advancedSearchDTO.getMaterialKeywords()));
        }

        log.debug("start date DTO  ********************************** : " + advancedSearchDTO.getStartDate());
        log.debug("end date DTO  ********************************** : " + advancedSearchDTO.getStartDate());

        if (advancedSearchDTO.getStartDate() != null || advancedSearchDTO.getEndDate() != null) {
            materials.addAll(getMaterialsByDate(advancedSearchDTO.getStartDate(), advancedSearchDTO.getEndDate()));
        }

        return materials;
    }

    private List<MaterialDTO> getMaterialsBySessionKeywords(String sessionKeywords) {
        String[] keywords = sessionKeywords.split(",");
        log.debug("BEGIN SESSION KEYWORD SEARCH ********************************** : ");
        List<SessionDTO> sessions = this.sessionService.findAll();
        List<MaterialDTO> materials = new ArrayList<>();

        boolean sessionPass = false;
        for (SessionDTO sessionDTO : sessions) {
            sessionPass = false;
            for (int i = 0; i < keywords.length; i++) {
                if (sessionDTO.getDescription().toLowerCase().contains(keywords[i].toLowerCase())) {
                    sessionPass = true;
                }
            }
            if (sessionPass) {
                log.debug("CURRENT SESSION MEETS CRITERIA **********************************  : " + sessionDTO.getName() + " with id: " + sessionDTO.getId());
                materials.addAll(sessionDTO.getMaterials());
            }
        }

        log.debug("FINALLY RETURNS ********************************** : " + materials.size() + "MATERIALS ********************************** : ");

        return materials;
    }

    private List<MaterialDTO> getMaterialsByMaterialKeywords(String materialKeywords) {
        String[] keywords = materialKeywords.split(",");
        log.debug("BEGIN MATERIAL KEYWORD SEARCH ********************************** : ");
        List<MaterialDTO> materialList = this.materialService.findAll();
        List<MaterialDTO> materials = new ArrayList<>();

        boolean materialPass = false;
        for (MaterialDTO materialDTO : materialList) {
            materialPass = false;
            for (int i = 0; i < keywords.length; i++) {
                if (materialDTO.getName().toLowerCase().contains(keywords[i].toLowerCase())) {
                    materialPass = true;
                }
            }
            if (materialPass) {
                log.debug("CURRENT MATERIAL MEETS CRITERIA **********************************  : " + materialDTO.getName() + " with id: " + materialDTO.getId());
                materials.add(materialDTO);
            }
        }

        log.debug("FINALLY RETURNS ********************************** : " + materials.size() + "MATERIALS ********************************** : ");

        return materials;
    }

    private List<MaterialDTO> getMaterialsByDate(String startDate, String endDate) {
        log.debug("BEGIN DATE SEARCH ********************************** : ");
        List<SessionDTO> sessionList = this.sessionService.findAll();
        List<MaterialDTO> materials = new ArrayList<>();
        log.debug("START DATE ********************************** : " + startDate);
        log.debug("END DATE ********************************** : " + endDate);

        SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd yyyy");
        Date startParsedDate = null;
        Date endParsedDate = null;
        try {

            if (startDate != null) {
                startParsedDate = formatter.parse(startDate);
            }
            if (endDate != null) {
                endParsedDate = formatter.parse(endDate);
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }
        log.debug("START DATE PARSED ********************************** : " + startParsedDate);
        log.debug("END DATE  PARSED********************************** : " + endParsedDate);
        for (SessionDTO sessionDTO : sessionList) {
            if (startParsedDate != null && endParsedDate != null) {
                if ((sessionDTO.getDate().toInstant().isAfter(startParsedDate.toInstant())) && (sessionDTO.getDate().toInstant().isBefore(endParsedDate.toInstant()))) {
                    log.debug("CURRENT SESSION MEETS CRITERIA **********************************  : " + sessionDTO.getName() + " with id: " + sessionDTO.getId());
                    materials.addAll(sessionDTO.getMaterials());
                }
            } else if (startParsedDate != null) {
                if (sessionDTO.getDate().toInstant().isAfter(startParsedDate.toInstant())) {
                    log.debug("CURRENT SESSION MEETS CRITERIA **********************************  : " + sessionDTO.getName() + " with id: " + sessionDTO.getId());
                    materials.addAll(sessionDTO.getMaterials());
                }
            } else {
                if (sessionDTO.getDate().toInstant().isBefore(endParsedDate.toInstant())) {
                    log.debug("CURRENT SESSION MEETS CRITERIA **********************************  : " + sessionDTO.getName() + " with id: " + sessionDTO.getId());
                    materials.addAll(sessionDTO.getMaterials());
                }
            }
        }

        log.debug("FINALLY RETURNS ********************************** : " + materials.size() + "MATERIALS ********************************** : ");

        return materials;
    }

}
