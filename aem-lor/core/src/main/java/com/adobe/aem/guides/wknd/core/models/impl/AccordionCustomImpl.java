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
import com.adobe.aem.guides.wknd.core.models.AccordionCustom;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {AccordionCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class AccordionCustomImpl implements AccordionCustom {

    private static final Logger LOG = LoggerFactory.getLogger(AccordionCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getAccordionWithMap() {
        List<Map<String, String>> accordions = new ArrayList<>();

        try {
            Resource accordionDetail = componentResource.getChild("accordiondetailswithmap");

            if (accordionDetail != null) {
                for (Resource accordion : accordionDetail.getChildren()) {
                    Map<String, String> accordionMap = new HashMap<>();
                    accordionMap.put("section", accordion.getValueMap().get("section", String.class));
                    accordionMap.put("text", accordion.getValueMap().get("text", String.class));
                    accordions.add(accordionMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Book Details {} ", e.getMessage());
        }
        LOG.info("\n SIZE {} ", accordions.size());
        return accordions;
    }
}