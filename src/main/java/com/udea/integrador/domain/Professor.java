package com.udea.integrador.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Professor.
 */
@Entity
@Table(name = "professor")
public class Professor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_name", nullable = false)
    private String userName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "related_user_id", nullable = false)
    private Long relatedUserId;

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public Professor userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public Professor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getRelatedUserId() {
        return relatedUserId;
    }

    public Professor relatedUserId(Long relatedUserId) {
        this.relatedUserId = relatedUserId;
        return this;
    }

    public void setRelatedUserId(Long relatedUserId) {
        this.relatedUserId = relatedUserId;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Professor courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Professor addCourse(Course course) {
        this.courses.add(course);
        course.setProfessor(this);
        return this;
    }

    public Professor removeCourse(Course course) {
        this.courses.remove(course);
        course.setProfessor(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public Professor posts(Set<Post> posts) {
        this.posts = posts;
        return this;
    }

    public Professor addPost(Post post) {
        this.posts.add(post);
        post.setProfessor(this);
        return this;
    }

    public Professor removePost(Post post) {
        this.posts.remove(post);
        post.setProfessor(null);
        return this;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Professor comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Professor addComment(Comment comment) {
        this.comments.add(comment);
        comment.setProfessor(this);
        return this;
    }

    public Professor removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setProfessor(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
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
        Professor professor = (Professor) o;
        if (professor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Professor{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", email='" + getEmail() + "'" +
            ", relatedUserId='" + getRelatedUserId() + "'" +
            "}";
    }
}
