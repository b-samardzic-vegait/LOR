package com.adobe.aem.guides.wknd.core.models;

import java.util.List;
import java.util.Map;

public interface DownloadsCustom {

    String getDate();

    String getHeader();

    String getDescription();
    
    List<Map<String, String>> getDownloadsWithMap();
}