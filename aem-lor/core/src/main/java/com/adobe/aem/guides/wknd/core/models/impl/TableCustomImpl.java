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
import com.adobe.aem.guides.wknd.core.models.TableCustom;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {TableCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class TableCustomImpl implements TableCustom {

    private static final Logger LOG = LoggerFactory.getLogger(TableCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @ValueMapValue
    private String titleone;

    @ValueMapValue
    private String titletwo;

    @ValueMapValue
    private String titlethree;

    @ValueMapValue
    private String titlefour;

    @Override
    public List<Map<String, String>> getTableWithMap() {
        List<Map<String, String>> tableElements = new ArrayList<>();

        try {
            Resource tableDetail = componentResource.getChild("tabledetailswithmap");

            if (tableDetail != null) {
                for (Resource tableElement : tableDetail.getChildren()) {
                    Map<String, String> tableMap = new HashMap<>();
                    tableMap.put("cellone", tableElement.getValueMap().get("cellone", String.class));
                    tableMap.put("celltwo", tableElement.getValueMap().get("celltwo", String.class));
                    tableMap.put("cellthree", tableElement.getValueMap().get("cellthree", String.class));
                    tableMap.put("cellfour", tableElement.getValueMap().get("cellfour", String.class));
                    tableElements.add(tableMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Table Details {} ", e.getMessage());
        }

        LOG.info("\n SIZE {} ", tableElements.size());
        
        return tableElements;
    }

    @Override
    public String getTitleone() {
        return titleone;
    }

    @Override
    public String getTitletwo() {
        return titletwo;
    }

    @Override
    public String getTitlethree() {
        return titlethree;
    }

    @Override
    public String getTitlefour() {
        return titlefour;
    }
}