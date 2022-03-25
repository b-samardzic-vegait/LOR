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
import com.adobe.aem.guides.wknd.core.models.TabCustom;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {TabCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class TabCustomImpl implements TabCustom {

    private static final Logger LOG = LoggerFactory.getLogger(TabCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getTabWithMap() {
        List<Map<String, String>> tabs = new ArrayList<>();

        try {
            Resource tabDetail = componentResource.getChild("tabdetailswithmap");

            if (tabDetail != null) {
                for (Resource tab : tabDetail.getChildren()) {
                    Map<String, String> tabMap = new HashMap<>();
                    tabMap.put("tabname", tab.getValueMap().get("tabname", String.class));
                    tabMap.put("text", tab.getValueMap().get("text", String.class));
                    tabs.add(tabMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Book Details {} ", e.getMessage());
        }
        LOG.info("\n SIZE {} ", tabs.size());
        return tabs;
    }
}