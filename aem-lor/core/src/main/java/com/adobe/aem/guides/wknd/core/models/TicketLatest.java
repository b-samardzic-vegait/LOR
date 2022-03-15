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

    /***
    * @return a string to display as the title.
    */
    String getTitle();

    /***
    * @return a string to display as the subtitle.
    */
    String getSubtitle();

    /***
    * @return a string to display as the description.
    */
    String getDescription();

    /***
    * @return a boolean if the component has enough content to display.
    */
    boolean isEmpty();
}
