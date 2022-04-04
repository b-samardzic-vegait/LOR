package com.adobe.aem.guides.wknd.core.servlets;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.JSONObject;

//localhost:4502/wknd/search?searchText=women&pageNumber=5&resultPerPage=10
//localhost:4502/wknd/search?searchPath="/content/wknd-new/"

@Component(service = Servlet.class)
@SlingServletPaths(
    value = {"/wknd/search"}
)
public class SearchServlet extends SlingAllMethodsServlet {

    private static final Logger LOG = LoggerFactory.getLogger(SearchServlet.class);

    /*@Reference
    SearchService searchService;*/

    @Override
    protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse res) throws ServletException, IOException {
        JSONObject searchResult = null;
        try {
            // query builder
            /*String searchText = req.getRequestParameter("searchText").getString();
            int pageNumber = Integer.parseInt(req.getRequestParameter("pageNumber").getString()) - 1;
            int resultPerPage = Integer.parseInt(req.getRequestParameter("resultPerPage").getString());
            int startResult = pageNumber * resultPerPage;
            searchResult = searchService.searchResult(searchText, startResult, resultPerPage);*/
            // sql2
            String searchPath = req.getRequestParameter("searchPath").getString();
            //searchResult = searchService.searchResultSQL2(searchPath);
        } catch (Exception e) {
            LOG.info("\n ERROR SERVLET QUERY {}", e.getMessage());
        }
        res.setContentType("application/json");
        res.getWriter().write(/*searchResult.toString()*/"RESULT");
    }
    
}
