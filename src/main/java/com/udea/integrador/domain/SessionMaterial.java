package com.udea.integrador.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SessionMaterial.
 */
@Entity
@Table(name = "session_material")
public class SessionMaterial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_session", nullable = false)
    private Long idSession;

    @NotNull
    @Column(name = "id_material", nullable = false)
    private Long idMaterial;

    @ManyToOne
    private Session session;

    @ManyToOne
    private Material material;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdSession() {
        return idSession;
    }

    public SessionMaterial idSession(Long idSession) {
        this.idSession = idSession;
        return this;
    }

    public void setIdSession(Long idSession) {
        this.idSession = idSession;
    }

    public Long getIdMaterial() {
        return idMaterial;
    }

    public SessionMaterial idMaterial(Long idMaterial) {
        this.idMaterial = idMaterial;
        return this;
    }

    public void setIdMaterial(Long idMaterial) {
        this.idMaterial = idMaterial;
    }

    public Session getSession() {
        return session;
    }

    public SessionMaterial session(Session session) {
        this.session = session;
        return this;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Material getMaterial() {
        return material;
    }

    public SessionMaterial material(Material material) {
        this.material = material;
        return this;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SessionMaterial sessionMaterial = (SessionMaterial) o;
        if (sessionMaterial.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sessionMaterial.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SessionMaterial{" +
            "id=" + getId() +
            ", idSession='" + getIdSession() + "'" +
            ", idMaterial='" + getIdMaterial() + "'" +
            "}";
    }
}
