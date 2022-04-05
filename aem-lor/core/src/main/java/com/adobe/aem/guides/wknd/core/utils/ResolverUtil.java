package com.adobe.aem.guides.wknd.core.utils;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;

public class ResolverUtil {

    private ResolverUtil() {

    }
    
    public static final String TEST_USER = "testuser";
    /**
     * @param resourceResolverFactory factory
     * @return new resource resolver for service user
     * @throws LoginException if problems
     * @throws org.apache.sling.api.resource.LoginException
     */
    public static ResourceResolver newResolver(ResourceResolverFactory resourceResolverFactory) throws LoginException {
        final Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put(ResourceResolverFactory.SUBSERVICE, TEST_USER);
        // fetches the admin service resolver using service user
        ResourceResolver resolver = resourceResolverFactory.getServiceResourceResolver(paramMap);
        return resolver;
    }
}
