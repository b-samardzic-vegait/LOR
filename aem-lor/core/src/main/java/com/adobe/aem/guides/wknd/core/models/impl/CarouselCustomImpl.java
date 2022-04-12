package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import com.adobe.aem.guides.wknd.core.models.CarouselCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {CarouselCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class CarouselCustomImpl implements CarouselCustom {

    private static final Logger LOG = LoggerFactory.getLogger(CarouselCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getCarousel() {
        List<Map<String, String>> slides = new ArrayList<>();

        try {
            Resource carousel = componentResource.getChild("carousel");

            if (carousel != null) {
                for (Resource slide : carousel.getChildren()) {
                    Map<String, String> slideProperties = new HashMap<>();
                    slideProperties.put("richTextEditor", slide.getValueMap().get("richTextEditor", String.class));
                    slideProperties.put("assetType", slide.getValueMap().get("assetType", String.class));
                    slideProperties.put("asset", slide.getValueMap().get("aseet", String.class));
                    slides.add(slideProperties);
                }
            }
        } catch (Exception e) {
            LOG.info("\nERROR while getting carousel details {} ", e.getMessage());
        }
        
        return slides;
    }
}