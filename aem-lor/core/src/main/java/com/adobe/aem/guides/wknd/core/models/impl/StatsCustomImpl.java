package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.adobe.aem.guides.wknd.core.models.StatsCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {StatsCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class StatsCustomImpl implements StatsCustom {

    private static final Logger LOG = LoggerFactory.getLogger(StatsCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;
    
    @Override
    public List<Map<String, String>> getStatsWithMap() {
        List<Map<String, String>> statsDetails = new ArrayList<>();

        try {
            Resource statsDetail = componentResource.getChild("statsdetailswithmap");

            if (statsDetail != null) {
                for (Resource stats : statsDetail.getChildren()) {
                    Map<String, String> statsMap = new HashMap<>();
                    statsMap.put("number", stats.getValueMap().get("number", String.class));
                    statsMap.put("text", stats.getValueMap().get("text", String.class));
                    statsMap.put("navigationRoot", stats.getValueMap().get("navigationRoot", String.class));
                    statsDetails.add(statsMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Stats Details {} ", e.getMessage());
        }

        LOG.info("\n SIZE {} ", statsDetails.size());
        
        return statsDetails;
    }
}