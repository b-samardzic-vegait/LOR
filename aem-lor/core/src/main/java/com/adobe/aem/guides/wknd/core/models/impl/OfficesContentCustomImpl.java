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
import com.adobe.aem.guides.wknd.core.models.OfficesContentCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {OfficesContentCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class OfficesContentCustomImpl implements OfficesContentCustom {

    private static final Logger LOG = LoggerFactory.getLogger(OfficesContentCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @ValueMapValue
    private String phone;

    @ValueMapValue
    private String email;

    @ValueMapValue
    private String address;

    @Override
    public List<Map<String, String>> getOfficesContentDetailsWithMap() {
        List<Map<String, String>> officesContentElements = new ArrayList<>();

        try {
            Resource officesContentDetail = componentResource.getChild("officescontentdetailswithmap");

            if (officesContentDetail != null) {
                for (Resource officesContentElement : officesContentDetail.getChildren()) {
                    Map<String, String> officesContentMap = new HashMap<>();
                    officesContentMap.put("day", officesContentElement.getValueMap().get("day", String.class));
                    officesContentMap.put("workingHours", officesContentElement.getValueMap().get("workingHours", String.class));
                    officesContentElements.add(officesContentMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Offices Content Details {} ", e.getMessage());
        }

        LOG.info("\n SIZE {} ", officesContentElements.size());
        
        return officesContentElements;
    }

    @Override
    public String getPhone() {
        return phone;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getAddress() {
        return address;
    }
}