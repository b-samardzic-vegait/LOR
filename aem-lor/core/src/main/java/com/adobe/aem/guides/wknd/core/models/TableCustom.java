package com.adobe.aem.guides.wknd.core.models;

import java.util.List;
import java.util.Map;

public interface TableCustom {

    String getTitleone();

    String getTitletwo();

    String getTitlethree();

    String getTitlefour();

    List<Map<String, String>> getTableWithMap();
}