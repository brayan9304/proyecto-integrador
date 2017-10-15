package com.udea.integrador.service.impl;

import com.udea.integrador.service.CourseService;
import com.udea.integrador.domain.Course;
import com.udea.integrador.repository.CourseRepository;
import com.udea.integrador.service.dto.CourseDTO;
import com.udea.integrador.service.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Course.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService{

    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

    private final CourseRepository courseRepository;

    private final CourseMapper courseMapper;

    public CourseServiceImpl(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    /**
     * Save a course.
     *
     * @param courseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        log.debug("Request to save Course : {}", courseDTO);
        Course course = courseMapper.toEntity(courseDTO);
        course = courseRepository.save(course);
        return courseMapper.toDto(course);
    }

    /**
     *  Get all the courses.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CourseDTO> findAll() {
        log.debug("Request to get all Courses");
        return courseRepository.findAll().stream()
            .map(courseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one course by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CourseDTO findOne(Long id) {
        log.debug("Request to get Course : {}", id);
        Course course = courseRepository.findOne(id);
        return courseMapper.toDto(course);
    }

    /**
     *  Delete the  course by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Course : {}", id);
        courseRepository.delete(id);
    }
}
