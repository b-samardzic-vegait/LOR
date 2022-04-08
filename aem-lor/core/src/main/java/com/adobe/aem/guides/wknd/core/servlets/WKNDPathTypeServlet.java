package com.adobe.aem.guides.wknd.core.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.servlets.annotations.SlingServletPaths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.commons.jcr.JcrConstants;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import java.util.List;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import com.adobe.aem.guides.wknd.core.utils.ResolverUtil;

import javax.jcr.Node;
import javax.jcr.PropertyIterator;
import javax.jcr.Session;

@Component(service = Servlet.class)
@SlingServletPaths(
    value = {"/wknd/pages"}
)
public class WKNDPathTypeServlet extends SlingAllMethodsServlet {

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private SlingRepository slingRepository;

    private static final Logger LOG = LoggerFactory.getLogger(WKNDPathTypeServlet.class);

    @Override
    protected void doPost(SlingHttpServletRequest req, SlingHttpServletResponse res) throws ServletException, IOException {
        try {
            LOG.info("----------STARTED POST----------");
            List<RequestParameter> requestParameterList = req.getRequestParameterList();
            for (RequestParameter requestParameter : requestParameterList) {
                LOG.info("\n ==PARAMETERS===> {} {} ", requestParameter.getName(), requestParameter.getString());
            }
            ResourceResolver resourceResolver = ResolverUtil.newResolver(resourceResolverFactory);
            Resource resource = resourceResolver.getResource("/content");
            Resource resourceForm = resourceResolver.getResource("/content/form");
            Node contentNode = resource.adaptTo(Node.class);
            if (resourceForm != null) {
                Node contentNodeForm = resourceForm.adaptTo(Node.class);
                contentNodeForm.setProperty("fname", requestParameterList.get(0).getString());
                contentNodeForm.setProperty("lname", requestParameterList.get(1).getString());
                contentNodeForm.save();
            } else {
                Node form = contentNode.addNode("form");
                form.setProperty("fname", requestParameterList.get(0).getString());
                form.setProperty("lname", requestParameterList.get(1).getString());
                //final Session session = resourceResolver.adaptTo(Session.class);
                //Node node = session.getRootNode();
                contentNode.save();
            }
            
            
        } catch (Exception e) {
            LOG.info("\n ERROR IN REQUEST {} ", e.getMessage());
        }
        res.getWriter().write("=FORM SUBMITTED=");
    }
}
