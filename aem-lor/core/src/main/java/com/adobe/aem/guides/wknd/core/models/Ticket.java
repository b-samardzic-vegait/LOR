package com.adobe.aem.guides.wknd.core.models;


public interface Ticket {
    /***
    * @return a string to display as the name.
    */
    String getTicketHeader();

        /***
    * @return a string to display as the name.
    */
    String getTitle();

        /***
    * @return a string to display as the name.
    */
    String getDescription();

    /***
    * @return a boolean if the component has enough content to display.
    */
    boolean isEmpty();
}

