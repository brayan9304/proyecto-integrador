package com.udea.integrador.repository;

import com.udea.integrador.domain.SessionMaterial;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SessionMaterial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SessionMaterialRepository extends JpaRepository<SessionMaterial, Long> {

}
