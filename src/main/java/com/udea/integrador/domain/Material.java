package com.udea.integrador.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Material.
 */
@Entity
@Table(name = "material")
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Lob
    @Column(name = "material_file", nullable = false)
    private byte[] materialFile;

    @Column(name = "material_file_content_type", nullable = false)
    private String materialFileContentType;

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

    public Material name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getMaterialFile() {
        return materialFile;
    }

    public Material materialFile(byte[] materialFile) {
        this.materialFile = materialFile;
        return this;
    }

    public void setMaterialFile(byte[] materialFile) {
        this.materialFile = materialFile;
    }

    public String getMaterialFileContentType() {
        return materialFileContentType;
    }

    public Material materialFileContentType(String materialFileContentType) {
        this.materialFileContentType = materialFileContentType;
        return this;
    }

    public void setMaterialFileContentType(String materialFileContentType) {
        this.materialFileContentType = materialFileContentType;
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
        Material material = (Material) o;
        if (material.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), material.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", materialFile='" + getMaterialFile() + "'" +
            ", materialFileContentType='" + materialFileContentType + "'" +
            "}";
    }
}
