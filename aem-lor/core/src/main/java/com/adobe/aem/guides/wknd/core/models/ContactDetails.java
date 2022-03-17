package com.adobe.aem.guides.wknd.core.models;


public interface ContactDetails {
    /***
    * @return a string to display as the name.
    */
    String getName();

    /***
    * @return a string to display as the Position.
    */
    String getPosition();

    /***
    * @return a string to display as the Email.
    */
    String getEmail();

    /***
    * @return a string to display as the Phone.
    */
    String getPhone();

    /***
    * @return a boolean if the component has enough content to display.
    */
    boolean isEmpty();
}

