package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.aem.guides.wknd.core.models.PriorityLandingSliderCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {PriorityLandingSliderCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class PriorityLandingSliderCustomImpl implements PriorityLandingSliderCustom {

    private static final Logger LOG = LoggerFactory.getLogger(ImageSliderCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public List<Map<String, String>> getPriorityLandingSliderWithMap() {
        List<Map<String, String>> sliders = new ArrayList<>();

        try {
            Resource sliderDetail = componentResource.getChild("mediasliderdetailswithmap");

            if (sliderDetail != null) {
                for (Resource slider : sliderDetail.getChildren()) {
                    Map<String, String> projectMap = new HashMap<>();
                    projectMap.put("name", slider.getValueMap().get("name", String.class));
                    projectMap.put("location", slider.getValueMap().get("location", String.class));
                    projectMap.put("caption", slider.getValueMap().get("caption", String.class));
                    projectMap.put("country", slider.getValueMap().get("country", String.class));
                    projectMap.put("description", slider.getValueMap().get("description", String.class));
                    projectMap.put("navigationRoot", slider.getValueMap().get("navigationRoot", String.class));
                    //projectMap.put("backgroundImage", ( "background-image:url(" +slider.getValueMap().get("backgroundImage", String.class) + ")"));
                    sliders.add(projectMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Project Landing Slider Details {} ", e.getMessage());
        }
       
        LOG.info("\n SIZE {} ", sliders.size());
        
        return sliders;
    }
}