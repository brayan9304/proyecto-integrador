package com.udea.integrador.web.rest;

import com.udea.integrador.ProyectoIntegradorApp;

import com.udea.integrador.domain.SessionMaterial;
import com.udea.integrador.repository.SessionMaterialRepository;
import com.udea.integrador.service.SessionMaterialService;
import com.udea.integrador.service.dto.SessionMaterialDTO;
import com.udea.integrador.service.mapper.SessionMaterialMapper;
import com.udea.integrador.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SessionMaterialResource REST controller.
 *
 * @see SessionMaterialResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProyectoIntegradorApp.class)
public class SessionMaterialResourceIntTest {

    private static final Long DEFAULT_ID_SESSION = 1L;
    private static final Long UPDATED_ID_SESSION = 2L;

    private static final Long DEFAULT_ID_MATERIAL = 1L;
    private static final Long UPDATED_ID_MATERIAL = 2L;

    @Autowired
    private SessionMaterialRepository sessionMaterialRepository;

    @Autowired
    private SessionMaterialMapper sessionMaterialMapper;

    @Autowired
    private SessionMaterialService sessionMaterialService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSessionMaterialMockMvc;

    private SessionMaterial sessionMaterial;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SessionMaterialResource sessionMaterialResource = new SessionMaterialResource(sessionMaterialService);
        this.restSessionMaterialMockMvc = MockMvcBuilders.standaloneSetup(sessionMaterialResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SessionMaterial createEntity(EntityManager em) {
        SessionMaterial sessionMaterial = new SessionMaterial()
            .idSession(DEFAULT_ID_SESSION)
            .idMaterial(DEFAULT_ID_MATERIAL);
        return sessionMaterial;
    }

    @Before
    public void initTest() {
        sessionMaterial = createEntity(em);
    }

    @Test
    @Transactional
    public void createSessionMaterial() throws Exception {
        int databaseSizeBeforeCreate = sessionMaterialRepository.findAll().size();

        // Create the SessionMaterial
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialMapper.toDto(sessionMaterial);
        restSessionMaterialMockMvc.perform(post("/api/session-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionMaterialDTO)))
            .andExpect(status().isCreated());

        // Validate the SessionMaterial in the database
        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeCreate + 1);
        SessionMaterial testSessionMaterial = sessionMaterialList.get(sessionMaterialList.size() - 1);
        assertThat(testSessionMaterial.getIdSession()).isEqualTo(DEFAULT_ID_SESSION);
        assertThat(testSessionMaterial.getIdMaterial()).isEqualTo(DEFAULT_ID_MATERIAL);
    }

    @Test
    @Transactional
    public void createSessionMaterialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sessionMaterialRepository.findAll().size();

        // Create the SessionMaterial with an existing ID
        sessionMaterial.setId(1L);
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialMapper.toDto(sessionMaterial);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSessionMaterialMockMvc.perform(post("/api/session-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionMaterialDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SessionMaterial in the database
        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdSessionIsRequired() throws Exception {
        int databaseSizeBeforeTest = sessionMaterialRepository.findAll().size();
        // set the field null
        sessionMaterial.setIdSession(null);

        // Create the SessionMaterial, which fails.
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialMapper.toDto(sessionMaterial);

        restSessionMaterialMockMvc.perform(post("/api/session-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionMaterialDTO)))
            .andExpect(status().isBadRequest());

        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdMaterialIsRequired() throws Exception {
        int databaseSizeBeforeTest = sessionMaterialRepository.findAll().size();
        // set the field null
        sessionMaterial.setIdMaterial(null);

        // Create the SessionMaterial, which fails.
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialMapper.toDto(sessionMaterial);

        restSessionMaterialMockMvc.perform(post("/api/session-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionMaterialDTO)))
            .andExpect(status().isBadRequest());

        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSessionMaterials() throws Exception {
        // Initialize the database
        sessionMaterialRepository.saveAndFlush(sessionMaterial);

        // Get all the sessionMaterialList
        restSessionMaterialMockMvc.perform(get("/api/session-materials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sessionMaterial.getId().intValue())))
            .andExpect(jsonPath("$.[*].idSession").value(hasItem(DEFAULT_ID_SESSION.intValue())))
            .andExpect(jsonPath("$.[*].idMaterial").value(hasItem(DEFAULT_ID_MATERIAL.intValue())));
    }

    @Test
    @Transactional
    public void getSessionMaterial() throws Exception {
        // Initialize the database
        sessionMaterialRepository.saveAndFlush(sessionMaterial);

        // Get the sessionMaterial
        restSessionMaterialMockMvc.perform(get("/api/session-materials/{id}", sessionMaterial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sessionMaterial.getId().intValue()))
            .andExpect(jsonPath("$.idSession").value(DEFAULT_ID_SESSION.intValue()))
            .andExpect(jsonPath("$.idMaterial").value(DEFAULT_ID_MATERIAL.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSessionMaterial() throws Exception {
        // Get the sessionMaterial
        restSessionMaterialMockMvc.perform(get("/api/session-materials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSessionMaterial() throws Exception {
        // Initialize the database
        sessionMaterialRepository.saveAndFlush(sessionMaterial);
        int databaseSizeBeforeUpdate = sessionMaterialRepository.findAll().size();

        // Update the sessionMaterial
        SessionMaterial updatedSessionMaterial = sessionMaterialRepository.findOne(sessionMaterial.getId());
        updatedSessionMaterial
            .idSession(UPDATED_ID_SESSION)
            .idMaterial(UPDATED_ID_MATERIAL);
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialMapper.toDto(updatedSessionMaterial);

        restSessionMaterialMockMvc.perform(put("/api/session-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionMaterialDTO)))
            .andExpect(status().isOk());

        // Validate the SessionMaterial in the database
        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeUpdate);
        SessionMaterial testSessionMaterial = sessionMaterialList.get(sessionMaterialList.size() - 1);
        assertThat(testSessionMaterial.getIdSession()).isEqualTo(UPDATED_ID_SESSION);
        assertThat(testSessionMaterial.getIdMaterial()).isEqualTo(UPDATED_ID_MATERIAL);
    }

    @Test
    @Transactional
    public void updateNonExistingSessionMaterial() throws Exception {
        int databaseSizeBeforeUpdate = sessionMaterialRepository.findAll().size();

        // Create the SessionMaterial
        SessionMaterialDTO sessionMaterialDTO = sessionMaterialMapper.toDto(sessionMaterial);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSessionMaterialMockMvc.perform(put("/api/session-materials")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionMaterialDTO)))
            .andExpect(status().isCreated());

        // Validate the SessionMaterial in the database
        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSessionMaterial() throws Exception {
        // Initialize the database
        sessionMaterialRepository.saveAndFlush(sessionMaterial);
        int databaseSizeBeforeDelete = sessionMaterialRepository.findAll().size();

        // Get the sessionMaterial
        restSessionMaterialMockMvc.perform(delete("/api/session-materials/{id}", sessionMaterial.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SessionMaterial> sessionMaterialList = sessionMaterialRepository.findAll();
        assertThat(sessionMaterialList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SessionMaterial.class);
        SessionMaterial sessionMaterial1 = new SessionMaterial();
        sessionMaterial1.setId(1L);
        SessionMaterial sessionMaterial2 = new SessionMaterial();
        sessionMaterial2.setId(sessionMaterial1.getId());
        assertThat(sessionMaterial1).isEqualTo(sessionMaterial2);
        sessionMaterial2.setId(2L);
        assertThat(sessionMaterial1).isNotEqualTo(sessionMaterial2);
        sessionMaterial1.setId(null);
        assertThat(sessionMaterial1).isNotEqualTo(sessionMaterial2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SessionMaterialDTO.class);
        SessionMaterialDTO sessionMaterialDTO1 = new SessionMaterialDTO();
        sessionMaterialDTO1.setId(1L);
        SessionMaterialDTO sessionMaterialDTO2 = new SessionMaterialDTO();
        assertThat(sessionMaterialDTO1).isNotEqualTo(sessionMaterialDTO2);
        sessionMaterialDTO2.setId(sessionMaterialDTO1.getId());
        assertThat(sessionMaterialDTO1).isEqualTo(sessionMaterialDTO2);
        sessionMaterialDTO2.setId(2L);
        assertThat(sessionMaterialDTO1).isNotEqualTo(sessionMaterialDTO2);
        sessionMaterialDTO1.setId(null);
        assertThat(sessionMaterialDTO1).isNotEqualTo(sessionMaterialDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sessionMaterialMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sessionMaterialMapper.fromId(null)).isNull();
    }
}
