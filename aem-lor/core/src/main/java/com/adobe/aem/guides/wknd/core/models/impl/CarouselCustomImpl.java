package com.adobe.aem.guides.wknd.core.models.impl;

import java.util.List;
import java.util.Map;

import javax.lang.model.util.ElementScanner6;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import com.adobe.aem.guides.wknd.core.models.CarouselCustom;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Via;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {CarouselCustom.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class CarouselCustomImpl implements CarouselCustom {

    private static final Logger LOG = LoggerFactory.getLogger(CarouselCustomImpl.class);

    @Self @Via("resource")
    Resource componentResource;

    @Override
    public List<Map<String, String>> getCarousel() {
        List<Map<String, String>> slides = new ArrayList<>();

        try {
            Resource carousel = componentResource.getChild("carousel");

            if (carousel != null) {
                for (Resource slide : carousel.getChildren()) {
                    Map<String, String> slideProperties = new HashMap<>();

                    String assetType = slide.getValueMap().get("assetType", String.class);
                    String iAssetLink = slide.getValueMap().get("asset", String.class);
                    String oAssetLink = "https://www.youtube.com/embed/";
                    int startIndex = 0, endIndex = 0;
                    boolean startIndexFlag = false, endIndexFlag = false;                               

                    if(assetType.equals("youtubevideo"))
                    {
                        if(iAssetLink.toLowerCase().contains("youtu.be")) /*  Short link  */
                        {                            
                            startIndex = iAssetLink.indexOf("youtu.be/") + 9;
                            endIndex = iAssetLink.length();

                            oAssetLink += iAssetLink.substring(startIndex, endIndex);

                            slideProperties.put("asset", oAssetLink);
                        } 
                        else /*  Full link/embed link  */
                        {
                            for(int i = 0; i < iAssetLink.length(); i++)
                            {
                                char c = iAssetLink.charAt(i);
                                if(c == '=' && startIndexFlag == false){
                                    startIndex = i + 1;
                                    startIndexFlag = true;
                                } else if (c == '&' && endIndexFlag == false){
                                    endIndex = i;
                                    endIndexFlag = true;
                                }                        
                            }
    
                            if(startIndex == 0)
                            {
                                oAssetLink = iAssetLink;
                            } else if (endIndex == 0)
                            {
                                endIndex = iAssetLink.length();
                                oAssetLink += iAssetLink.substring(startIndex, endIndex);
                            } else {
                                oAssetLink += iAssetLink.substring(startIndex, endIndex);
                            }
                            
                            slideProperties.put("asset", oAssetLink);
                        }                        
                    }
                    else // Video/Image
                    {                        
                        slideProperties.put("asset", slide.getValueMap().get("asset", String.class));
                    }

                    slideProperties.put("richTextEditor", slide.getValueMap().get("richTextEditor", String.class));
                    slideProperties.put("assetType", slide.getValueMap().get("assetType", String.class));

                    slides.add(slideProperties);
                }
            }
        } catch (Exception e) {
            LOG.info("\nERROR while getting carousel details {} ", e.getMessage());
        }
        
        return slides;
    }
}