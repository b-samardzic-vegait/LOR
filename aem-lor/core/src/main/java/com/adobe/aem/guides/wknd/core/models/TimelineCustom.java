package com.adobe.aem.guides.wknd.core.models;

import java.util.List;
import java.util.Map;

public interface TimelineCustom {

    String getTitle();

    String getDescription();
    
    List<Map<String, String>> getTimelineWithMap();
}