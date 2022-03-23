package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.aem.guides.wknd.core.models.TimelineCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {TimelineCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class TimelineCustomImpl implements TimelineCustom {

    private static final Logger LOG = LoggerFactory.getLogger(TimelineCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @Override
    public List<Map<String, String>> getTimelineWithMap() {
        List<Map<String, String>> timelineDetails = new ArrayList<>();

        try {
            Resource timelineDetail = componentResource.getChild("timelinedetailswithmap");

            if (timelineDetail != null) {
                for (Resource timeline : timelineDetail.getChildren()) {
                    Map<String, String> timelineMap = new HashMap<>();
                    timelineMap.put("sometitle", timeline.getValueMap().get("sometitle", String.class));
                    timelineMap.put("sometext", timeline.getValueMap().get("sometext", String.class));
                    timelineMap.put("somebutton", timeline.getValueMap().get("somebutton", String.class));
                    timelineDetails.add(timelineMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Timeline List Details {} ", e.getMessage());
        }

        LOG.info("\n SIZE {} ", timelineDetails.size());
        
        return timelineDetails;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getDescription() {
        return description;
    }
}