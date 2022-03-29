package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import com.adobe.aem.guides.wknd.core.models.ProjectSliderCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {ProjectSliderCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ProjectSliderCustomImpl implements ProjectSliderCustom {

    private static final Logger LOG = LoggerFactory.getLogger(ImageSliderCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getProjectSliderWithMap() {
        List<Map<String, String>> projectsliders = new ArrayList<>();

        try {
            Resource projectsliderDetail = componentResource.getChild("projectsliderdetailswithmap");

            if (projectsliderDetail != null) {
                for (Resource projectslider : projectsliderDetail.getChildren()) {
                    Map<String, String> projectMap = new HashMap<>();
                    projectMap.put("hash", projectslider.getValueMap().get("hash", String.class));
                    projectMap.put("date", projectslider.getValueMap().get("date", String.class));
                    projectMap.put("title", projectslider.getValueMap().get("title", String.class));
                    projectMap.put("text", projectslider.getValueMap().get("text", String.class));
                    projectMap.put("layout", projectslider.getValueMap().get("layout", String.class));
                    projectMap.put("navigationRoot", projectslider.getValueMap().get("navigationRoot", String.class));
                    projectsliders.add(projectMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Project Slider Details {} ", e.getMessage());
        }
       
        LOG.info("\n SIZE {} ", projectsliders.size());
        
        return projectsliders;
    }
}