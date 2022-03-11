package com.adobe.aem.guides.wknd.core.models;


public interface TicketLatest {
    /***
    * @return a string to display as the name.
    */
    String getTicketHeader();

        /***
    * @return a string to display as the name.
    */
    String getTag();

    String getTitle();

        /***
    * @return a string to display as the name.
    */

    String getSubtitle();

    String getDescription();

    /***
    * @return a boolean if the component has enough content to display.
    */
    boolean isEmpty();
}
