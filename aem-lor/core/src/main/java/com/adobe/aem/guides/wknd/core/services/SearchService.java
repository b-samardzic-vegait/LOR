package com.adobe.aem.guides.wknd.core.services;

import org.json.JSONObject;

public interface SearchService {
    public JSONObject searchResult(String searchText, int startResult, int resultPerPage);
    public JSONObject searchResultSQL2(String searchPath);
    public JSONObject searchResult(String searchText);
}