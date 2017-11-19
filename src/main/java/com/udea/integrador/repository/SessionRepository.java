package com.udea.integrador.repository;

import com.udea.integrador.domain.Session;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Session entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    @Query("select distinct session from Session session left join fetch session.materials")
    List<Session> findAllWithEagerRelationships();

    @Query("select session from Session session left join fetch session.materials where session.id =:id")
    Session findOneWithEagerRelationships(@Param("id") Long id);

}
