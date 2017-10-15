package com.udea.integrador.service.mapper;

import com.udea.integrador.domain.*;
import com.udea.integrador.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorMapper.class, })
public interface CourseMapper extends EntityMapper <CourseDTO, Course> {

    @Mapping(source = "professor.id", target = "professorId")
    CourseDTO toDto(Course course); 
    @Mapping(target = "sessions", ignore = true)

    @Mapping(source = "professorId", target = "professor")
    Course toEntity(CourseDTO courseDTO); 
    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
