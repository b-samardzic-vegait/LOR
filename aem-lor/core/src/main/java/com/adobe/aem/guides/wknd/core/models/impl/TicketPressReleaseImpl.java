package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.factory.ModelFactory;
import com.adobe.aem.guides.wknd.core.models.TicketLatest;
import com.adobe.aem.guides.wknd.core.models.TicketPressRelease;
import com.adobe.cq.wcm.core.components.models.Download;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {TicketPressRelease.class},
        resourceType = {TicketPressReleaseImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class TicketPressReleaseImpl implements TicketPressRelease {
    protected static final String RESOURCE_TYPE = "lor/components/ticketpressrelease";

    @Self
    private SlingHttpServletRequest request;

    @OSGiService
    private ModelFactory modelFactory;

    @ValueMapValue
    private String tag;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    private Download download;

    /**
    * @PostConstruct is immediately called after the class has been initialized
    * but BEFORE any of the other public methods.
    * It is a good method to initialize variables that will be used by methods in the rest of the model
    *
    */
    @PostConstruct
    private void init() {
        // set the image object
        /*ticketHeader = "Expertise";
        title = "Incorporating the latest innovations in high rise design and construction.";
        description = "Faucibus est litora mattis vehicula primis arcu eu vivamus";
        tag = "tag";
        subtitle = "subtitle";*/
        download = modelFactory.getModelFromWrappedRequest(request, request.getResource(), Download.class);
    }

    @Override
    public String getTag() {
        return tag;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public boolean isEmpty() {
        final Download componentDownload = getDownload();

        if (StringUtils.isBlank(tag)) {
            // Ticket header is missing, but required
            return true;
        } else if (StringUtils.isBlank(title)) {
            // Title is missing, but required
            return true;
        } else if (StringUtils.isBlank(description)) {
            // Description is missing, but required
            return true;
        } else if (componentDownload == null) {
            // A valid image is required
            return true;
        } else {
            // Everything is populated, so this component is not considered empty
            return false;
        }
    }

    /**
    * @return the Image Sling Model of this resource, or null if the resource cannot create a valid Image Sling Model.
    */
    private Download getDownload() {
        return download;
    }
}