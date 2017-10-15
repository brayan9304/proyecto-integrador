package com.udea.integrador.web.rest;

import com.udea.integrador.ProyectoIntegradorApp;

import com.udea.integrador.domain.Professor;
import com.udea.integrador.repository.ProfessorRepository;
import com.udea.integrador.service.ProfessorService;
import com.udea.integrador.service.dto.ProfessorDTO;
import com.udea.integrador.service.mapper.ProfessorMapper;
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
 * Test class for the ProfessorResource REST controller.
 *
 * @see ProfessorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProyectoIntegradorApp.class)
public class ProfessorResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private ProfessorMapper professorMapper;

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProfessorMockMvc;

    private Professor professor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfessorResource professorResource = new ProfessorResource(professorService);
        this.restProfessorMockMvc = MockMvcBuilders.standaloneSetup(professorResource)
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
    public static Professor createEntity(EntityManager em) {
        Professor professor = new Professor()
            .name(DEFAULT_NAME)
            .lastname(DEFAULT_LASTNAME);
        return professor;
    }

    @Before
    public void initTest() {
        professor = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessor() throws Exception {
        int databaseSizeBeforeCreate = professorRepository.findAll().size();

        // Create the Professor
        ProfessorDTO professorDTO = professorMapper.toDto(professor);
        restProfessorMockMvc.perform(post("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorDTO)))
            .andExpect(status().isCreated());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeCreate + 1);
        Professor testProfessor = professorList.get(professorList.size() - 1);
        assertThat(testProfessor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProfessor.getLastname()).isEqualTo(DEFAULT_LASTNAME);
    }

    @Test
    @Transactional
    public void createProfessorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professorRepository.findAll().size();

        // Create the Professor with an existing ID
        professor.setId(1L);
        ProfessorDTO professorDTO = professorMapper.toDto(professor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessorMockMvc.perform(post("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = professorRepository.findAll().size();
        // set the field null
        professor.setName(null);

        // Create the Professor, which fails.
        ProfessorDTO professorDTO = professorMapper.toDto(professor);

        restProfessorMockMvc.perform(post("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorDTO)))
            .andExpect(status().isBadRequest());

        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfessors() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);

        // Get all the professorList
        restProfessorMockMvc.perform(get("/api/professors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())));
    }

    @Test
    @Transactional
    public void getProfessor() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);

        // Get the professor
        restProfessorMockMvc.perform(get("/api/professors/{id}", professor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(professor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfessor() throws Exception {
        // Get the professor
        restProfessorMockMvc.perform(get("/api/professors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessor() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);
        int databaseSizeBeforeUpdate = professorRepository.findAll().size();

        // Update the professor
        Professor updatedProfessor = professorRepository.findOne(professor.getId());
        updatedProfessor
            .name(UPDATED_NAME)
            .lastname(UPDATED_LASTNAME);
        ProfessorDTO professorDTO = professorMapper.toDto(updatedProfessor);

        restProfessorMockMvc.perform(put("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorDTO)))
            .andExpect(status().isOk());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeUpdate);
        Professor testProfessor = professorList.get(professorList.size() - 1);
        assertThat(testProfessor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProfessor.getLastname()).isEqualTo(UPDATED_LASTNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessor() throws Exception {
        int databaseSizeBeforeUpdate = professorRepository.findAll().size();

        // Create the Professor
        ProfessorDTO professorDTO = professorMapper.toDto(professor);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProfessorMockMvc.perform(put("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professorDTO)))
            .andExpect(status().isCreated());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProfessor() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);
        int databaseSizeBeforeDelete = professorRepository.findAll().size();

        // Get the professor
        restProfessorMockMvc.perform(delete("/api/professors/{id}", professor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Professor.class);
        Professor professor1 = new Professor();
        professor1.setId(1L);
        Professor professor2 = new Professor();
        professor2.setId(professor1.getId());
        assertThat(professor1).isEqualTo(professor2);
        professor2.setId(2L);
        assertThat(professor1).isNotEqualTo(professor2);
        professor1.setId(null);
        assertThat(professor1).isNotEqualTo(professor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessorDTO.class);
        ProfessorDTO professorDTO1 = new ProfessorDTO();
        professorDTO1.setId(1L);
        ProfessorDTO professorDTO2 = new ProfessorDTO();
        assertThat(professorDTO1).isNotEqualTo(professorDTO2);
        professorDTO2.setId(professorDTO1.getId());
        assertThat(professorDTO1).isEqualTo(professorDTO2);
        professorDTO2.setId(2L);
        assertThat(professorDTO1).isNotEqualTo(professorDTO2);
        professorDTO1.setId(null);
        assertThat(professorDTO1).isNotEqualTo(professorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(professorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(professorMapper.fromId(null)).isNull();
    }
}
