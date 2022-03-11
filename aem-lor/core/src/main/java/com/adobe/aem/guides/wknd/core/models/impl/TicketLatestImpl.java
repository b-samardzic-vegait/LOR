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
import com.adobe.cq.wcm.core.components.models.Image;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {TicketLatest.class},
        resourceType = {TicketLatestImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class TicketLatestImpl implements TicketLatest {
    protected static final String RESOURCE_TYPE = "lor/components/ticketlatest";

    @Self
    private SlingHttpServletRequest request;

    @OSGiService
    private ModelFactory modelFactory;

    @ValueMapValue
    private String ticketHeader;

    @ValueMapValue
    private String tag;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String subtitle;

    @ValueMapValue
    private String description;

    private Image image;

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
        image = modelFactory.getModelFromWrappedRequest(request, request.getResource(), Image.class);
    }

    @Override
    public String getTicketHeader() {
        return ticketHeader;
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
    public String getSubtitle() {
        return subtitle;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public boolean isEmpty() {
        final Image componentImage = getImage();

        if (StringUtils.isBlank(ticketHeader)) {
            // Ticket header is missing, but required
            return true;
        } else if (StringUtils.isBlank(tag)) {
            // Title is missing, but required
            return true;
        } else if (StringUtils.isBlank(title)) {
            // Title is missing, but required
            return true;
        } else if (StringUtils.isBlank(description)) {
            // Description is missing, but required
            return true;
        } else if (componentImage == null || StringUtils.isBlank(componentImage.getSrc())) {
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
    private Image getImage() {
        return image;
    }

    public String getImageSrc() { 
        if (image != null) { 
            return image.getSrc(); 
        } 
        return null; 
    } 
    public String getBackgroundImageSrc() { 
        return "background-image:url(" + this.getImageSrc() + ")"; 
    } 
}