package com.udea.integrador.service.mapper;

import com.udea.integrador.domain.*;
import com.udea.integrador.service.dto.PostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Post and its DTO PostDTO.
 */
@Mapper(componentModel = "spring", uses = {ProfessorMapper.class, })
public interface PostMapper extends EntityMapper <PostDTO, Post> {

    @Mapping(source = "professor.id", target = "professorId")
    PostDTO toDto(Post post); 

    @Mapping(source = "professorId", target = "professor")
    @Mapping(target = "comments", ignore = true)
    Post toEntity(PostDTO postDTO); 
    default Post fromId(Long id) {
        if (id == null) {
            return null;
        }
        Post post = new Post();
        post.setId(id);
        return post;
    }
}
