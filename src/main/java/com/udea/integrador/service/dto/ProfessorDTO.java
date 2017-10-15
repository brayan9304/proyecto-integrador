package com.udea.integrador.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Professor entity.
 */
public class ProfessorDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String lastname;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProfessorDTO professorDTO = (ProfessorDTO) o;
        if(professorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessorDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lastname='" + getLastname() + "'" +
            "}";
    }
}
