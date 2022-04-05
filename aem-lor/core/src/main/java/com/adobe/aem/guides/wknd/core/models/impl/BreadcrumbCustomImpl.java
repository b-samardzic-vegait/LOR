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

import com.adobe.aem.guides.wknd.core.models.BreadcrumbCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {BreadcrumbCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class BreadcrumbCustomImpl implements BreadcrumbCustom {

    private static final Logger LOG = LoggerFactory.getLogger(BreadcrumbCustomImpl.class);
    
    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getBreadcrumbDetailsWithMap() {
        List<Map<String, String>> extralinkspanels = new ArrayList<>();

        try {
            Resource extralinkspanelsDetail = componentResource.getChild("breadcrumbdetailswithmap");

            if (extralinkspanelsDetail != null) {
                for (Resource extralinkspanel : extralinkspanelsDetail.getChildren()) {
                    Map<String, String> projectMap = new HashMap<>();
                    projectMap.put("title", extralinkspanel.getValueMap().get("title", String.class));
                    projectMap.put("navigationRoot", extralinkspanel.getValueMap().get("navigationRoot", String.class));
                    extralinkspanels.add(projectMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Extra Links Panels Details {} ", e.getMessage());
        }
       
        LOG.info("\n SIZE {} ", extralinkspanels.size());
        
        return extralinkspanels;
    }
}