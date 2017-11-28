package com.udea.integrador.service.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Search params.
 */
public class AdvancedSearchDTO implements Serializable {

    @JsonProperty("sessionKeywords")
    private String sessionKeywords;

    @JsonProperty("materialKeywords")
    private String materialKeywords;

    @JsonProperty("startDate")
    private ZonedDateTime startDate;

    @JsonProperty("endDate")
    private ZonedDateTime endDate;


    @Override
    public String toString() {
        return "AdvancedSearchDTO{" +
            ", sessionKeywords='" + getSessionKeywords() + "'" +
            ", materialKeywords='" + getMaterialKeywords() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }


    public String getSessionKeywords() {
        return sessionKeywords;
    }

    public void setSessionKeywords(String sessionKeywords) {
        this.sessionKeywords = sessionKeywords;
    }

    public String getMaterialKeywords() {
        return materialKeywords;
    }

    public void setMaterialKeywords(String materialKeywords) {
        this.materialKeywords = materialKeywords;
    }

    public ZonedDateTime getStartDate() { return startDate; }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }
}
