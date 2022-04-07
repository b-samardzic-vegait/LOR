package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.adobe.aem.guides.wknd.core.models.QuoteCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {QuoteCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class QuoteCustomImpl implements QuoteCustom {

    private static final Logger LOG = LoggerFactory.getLogger(QuoteCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;
    
    @Override
    public List<Map<String, String>> getQuoteWithMap() {
        List<Map<String, String>> quoteDetails = new ArrayList<>();

        try {
            Resource quoteDetail = componentResource.getChild("quotedetailswithmap");

            if (quoteDetail != null) {
                for (Resource quote : quoteDetail.getChildren()) {
                    Map<String, String> quoteMap = new HashMap<>();
                    quoteMap.put("text", quote.getValueMap().get("text", String.class));
                    quoteMap.put("navigationRoot", quote.getValueMap().get("navigationRoot", String.class));
                    quoteMap.put("name", quote.getValueMap().get("name", String.class));
                    quoteMap.put("position", quote.getValueMap().get("position", String.class));
                    quoteDetails.add(quoteMap);
                }
            }
        } catch (Exception e) {
            LOG.info("\n ERROR while getting Quote Details {} ", e.getMessage());
        }

        LOG.info("\n SIZE {} ", quoteDetails.size());
        
        return quoteDetails;
    }
}