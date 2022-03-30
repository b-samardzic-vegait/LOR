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

import com.adobe.aem.guides.wknd.core.models.ExtraLinksPanelCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {ExtraLinksPanelCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ExtraLinksPanelCustomImpl implements ExtraLinksPanelCustom {

    private static final Logger LOG = LoggerFactory.getLogger(ExtraLinksPanelCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @ValueMapValue
    private String title;

    @Override
    public List<Map<String, String>> getExtraLinksPanelCustomWithMap() {
        List<Map<String, String>> extralinkspanels = new ArrayList<>();

        try {
            Resource extralinkspanelsDetail = componentResource.getChild("extralinkspaneldetailswithmap");

            if (extralinkspanelsDetail != null) {
                for (Resource extralinkspanel : extralinkspanelsDetail.getChildren()) {
                    Map<String, String> projectMap = new HashMap<>();
                    projectMap.put("link", extralinkspanel.getValueMap().get("link", String.class));
                    projectMap.put("layout", extralinkspanel.getValueMap().get("layout", String.class));
                    extralinkspanels.add(projectMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Extra Links Panels Details {} ", e.getMessage());
        }
       
        LOG.info("\n SIZE {} ", extralinkspanels.size());
        
        return extralinkspanels;
    }

    @Override
    public String getTitle() {
        return title;
    }
}