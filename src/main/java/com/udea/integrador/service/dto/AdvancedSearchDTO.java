package com.udea.integrador.service.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Date;
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
    private String startDate;

    @JsonProperty("endDate")
    private String endDate;


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

    public String getStartDate() { return startDate; }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
