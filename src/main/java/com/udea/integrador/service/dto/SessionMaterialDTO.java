package com.udea.integrador.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SessionMaterial entity.
 */
public class SessionMaterialDTO implements Serializable {

    private Long id;

    @NotNull
    private Long idSession;

    @NotNull
    private Long idMaterial;

    private Long sessionId;

    private Long materialId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdSession() {
        return idSession;
    }

    public void setIdSession(Long idSession) {
        this.idSession = idSession;
    }

    public Long getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Long idMaterial) {
        this.idMaterial = idMaterial;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SessionMaterialDTO sessionMaterialDTO = (SessionMaterialDTO) o;
        if(sessionMaterialDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sessionMaterialDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SessionMaterialDTO{" +
            "id=" + getId() +
            ", idSession='" + getIdSession() + "'" +
            ", idMaterial='" + getIdMaterial() + "'" +
            "}";
    }
}
