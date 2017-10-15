package com.udea.integrador.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "subject", nullable = false)
    private String subject;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private Set<Session> sessions = new HashSet<>();

    @ManyToOne
    private Professor professor;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Course name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public Course subject(String subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public Course description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Session> getSessions() {
        return sessions;
    }

    public Course sessions(Set<Session> sessions) {
        this.sessions = sessions;
        return this;
    }

    public Course addSession(Session session) {
        this.sessions.add(session);
        session.setCourse(this);
        return this;
    }

    public Course removeSession(Session session) {
        this.sessions.remove(session);
        session.setCourse(null);
        return this;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }

    public Professor getProfessor() {
        return professor;
    }

    public Course professor(Professor professor) {
        this.professor = professor;
        return this;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
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
        Course course = (Course) o;
        if (course.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), course.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", subject='" + getSubject() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
