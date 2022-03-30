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

import com.adobe.aem.guides.wknd.core.models.DownloadsCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {DownloadsCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class DownloadsCustomImpl implements DownloadsCustom {

    private static final Logger LOG = LoggerFactory.getLogger(TimelineCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @ValueMapValue
    private String header;

    @ValueMapValue
    private String date;

    @ValueMapValue
    private String description;

    @Override
    public List<Map<String, String>> getDownloadsWithMap() {
        List<Map<String, String>> downloadDetails = new ArrayList<>();

        try {
            Resource downloadDetail = componentResource.getChild("downloadscustomdetailswithmap");

            if (downloadDetail != null) {
                for (Resource timeline : downloadDetail.getChildren()) {
                    Map<String, String> downloadMap = new HashMap<>();
                    downloadMap.put("assettodownload", timeline.getValueMap().get("assettodownload", String.class));
                    downloadDetails.add(downloadMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Timeline List Details {} ", e.getMessage());
        }

        LOG.info("\n SIZE {} ", downloadDetails.size());
        
        return downloadDetails;
    }

    @Override
    public String getDate() {
        return date;
    }

    @Override
    public String getHeader() {
        return header;
    }

    @Override
    public String getDescription() {
        return description;
    }
}