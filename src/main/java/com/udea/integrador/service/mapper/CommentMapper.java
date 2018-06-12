package com.udea.integrador.service.mapper;

import com.udea.integrador.domain.*;
import com.udea.integrador.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorMapper.class, PostMapper.class, })
public interface CommentMapper extends EntityMapper <CommentDTO, Comment> {

    @Mapping(source = "professor.id", target = "professorId")

    @Mapping(source = "post.id", target = "postId")
    CommentDTO toDto(Comment comment); 

    @Mapping(source = "professorId", target = "professor")

    @Mapping(source = "postId", target = "post")
    Comment toEntity(CommentDTO commentDTO); 
    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
