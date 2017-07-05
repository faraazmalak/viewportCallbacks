viewportInfo = function ($, window) {

    /* Global Vars 
     ----------------------------------------------------------------------------*/
    var currentViewport, viewportChangeCallbacks = $.Callbacks(),initialized = false;
    


    /* Cutomizable Options 
     ----------------------------------------------------------------------------*/
    var options = {
        viewports: undefined,
    };



    /*==========================================================================
     
     Plugin Initialization
     
     =========================================================================*/
    init = function (userSettings) {
        //Merge custom options
        $.extend(options, userSettings);

        if(!initialized){
            
            var viewportLabels = Object.keys(options.viewports);
            currentViewport = viewportLabels[viewportLabels.length - 1];
            
            updateViewport(false);
            addDeviceCssClasses();

            //On window resize, check if viewport has changed.
            //If viewport has changed, modify body classes and execute callbacks
            $(window).resize(updateViewport);
            
            initialized = true;
        }

        return this;

    };



    /*==========================================================================
     
     onViewportChange Callback (The callback is executed, when viewport changes)
     
     =========================================================================*/
    this.onChange = function (callback, fire) {
        !initialized && init();
        viewportChangeCallbacks.add(callback);
        arguments.length === 2 && callback(currentViewport, isTouch());
    };




    /*==========================================================================
     
     Viewport Detection
     
     =========================================================================*/



    updateViewport = function (fireOnChange) {

        for (viewport in options.viewports) {
           
            var viewportWidth = options.viewports[viewport];
           
            if (window.matchMedia('screen and (max-width: ' + viewportWidth + 'px)').matches) {
                if (currentViewport != viewport && fireOnChange != false) {
                    viewportChangeCallbacks.fire(viewport, isTouch());
                }
                $("body").removeClass(currentViewport).addClass(viewport);
                currentViewport = viewport;
               
                break;
            }
        }

    };




    /*==========================================================================
     
     Mobile Device Detection
     
     =========================================================================*/
    isAndroid = function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    };
    isBlackBerry = function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    };
    isiOS = function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    };
    isWindows = function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    };
    isTouch = function () {
        return (isAndroid() || isBlackBerry() || isiOS() || isWindows());
    };


    //Add CSS Classes specific to devices
    function addDeviceCssClasses() {

        //Detect Mobile OS, and add respective classes
        isAndroid() && $('body').addClass('android');
        isBlackBerry() && $('body').addClass('blackberry');
        isiOS() && $('body').addClass('iOS');
        isWindows() && $('body').addClass('windows');
        isTouch() ? $('body').addClass('touch-enabled') : $('body').addClass('no-touch');

        //Mac class
        navigator.appVersion.indexOf("Mac") != -1 && $('body').addClass('iOS');

    }


    return this;

}(jQuery, window);
