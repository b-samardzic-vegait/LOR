package com.adobe.aem.guides.wknd.core.models;

import java.util.List;
import java.util.Map;

public interface OfficesContentCustom {

    String getPhone();

    String getEmail();

    String getAddress();

    List<Map<String, String>> getOfficesContentDetailsWithMap();
}