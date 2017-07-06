# viewportCallbacks
Fires callbacks when viewport changes


# How to Use

#Initialization
viewportCallbacks is a property defined on the window object

//Provide breakpoint configuration
viewportCallbacks.init({
                    viewports: {
                      mobile: 767, tablet: 959, desktop: 1159
                    }
})

#Registering a Callback

//If you want to execute the callback on document ready as well, pass true as a sectond parameter to onChange(), as shown below

viewportCallbacks.onChange(function(viewport,isTouch){

    //Your code goes here
    
    //Below parameters are passed to the callback function
    @viewport - active viewport
    @isTouch - if devices is touch enabled
  
},true);
