package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import com.adobe.aem.guides.wknd.core.models.MediaSliderCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {MediaSliderCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class MediaSliderCustomImpl implements MediaSliderCustom {

    private static final Logger LOG = LoggerFactory.getLogger(ImageSliderCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getMediaSliderWithMap() {
        List<Map<String, String>> mediasliders = new ArrayList<>();

        try {
            Resource mediasliderDetail = componentResource.getChild("mediasliderdetailswithmap");

            if (mediasliderDetail != null) {
                for (Resource mediaslider : mediasliderDetail.getChildren()) {
                    Map<String, String> projectMap = new HashMap<>();
                    projectMap.put("location", mediaslider.getValueMap().get("location", String.class));
                    projectMap.put("caption", mediaslider.getValueMap().get("caption", String.class));
                    projectMap.put("layout", mediaslider.getValueMap().get("layout", String.class));
                    projectMap.put("navigationRoot", mediaslider.getValueMap().get("navigationRoot", String.class));
                    mediasliders.add(projectMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Media Slider Details {} ", e.getMessage());
        }
       
        LOG.info("\n SIZE {} ", mediasliders.size());
        
        return mediasliders;
    }
}