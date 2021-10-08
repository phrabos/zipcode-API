A remotely callable web-based API which can can be used to manage a list of 5 digit zip codes. The API supports the following operations:

Insert - Add a new zip code to the list by using the /insert/:zipcode route
Delete - Remove a zip code from the list by using the /delete/:zipcode route
Has - Determines if a zip code exists in the list by using the /has/:zipcode route
Display - Shows the full list of zip codes with contiguous ranges grouped in a shortened form by using the /display route

examples: 
```
wget -qO - https://ss-zipcodes.herokuapp.com/insert/99999
wget -qO - https://ss-zipcodes.herokuapp.com/delete/99999
wget -qO - https://ss-zipcodes.herokuapp.com/has/99999
wget -qO - https://ss-zipcodes.herokuapp.com/display
```
