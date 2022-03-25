package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import javax.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.factory.ModelFactory;
import com.adobe.aem.guides.wknd.core.models.ImageSliderCustom;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {ImageSliderCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ImageSliderCustomImpl implements ImageSliderCustom {

    private static final Logger LOG = LoggerFactory.getLogger(ImageSliderCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getImageSliderWithMap() {
        List<Map<String, String>> imagesliders = new ArrayList<>();

        try {
            Resource imagesliderDetail = componentResource.getChild("imagesliderdetailswithmap");

            if (imagesliderDetail != null) {
                for (Resource imageslider : imagesliderDetail.getChildren()) {
                    Map<String, String> accordionMap = new HashMap<>();
                    accordionMap.put("text", imageslider.getValueMap().get("text", String.class));
                    accordionMap.put("navigationRoot", imageslider.getValueMap().get("navigationRoot", String.class)); //navigationRoot
                    imagesliders.add(accordionMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Image Slider Details {} ", e.getMessage());
        }
       
        LOG.info("\n SIZE {} ", imagesliders.size());
        
        return imagesliders;
    }
}