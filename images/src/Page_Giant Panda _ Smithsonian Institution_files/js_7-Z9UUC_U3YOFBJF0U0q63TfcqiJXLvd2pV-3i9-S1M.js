Drupal.behaviors.googleAnalyticsET = {
  attach : function (context) {
    // make sure that the google analytics event tracking object or the universal analytics tracking function exists
    // if not then exit and don't track
    if(typeof _gaq == "undefined" && typeof ga == "undefined"){
      return;
    }

    var settings = Drupal.settings.googleAnalyticsETSettings;

    delete settings.selectors.debug;
    var defaultOptions = {
      label: '',
      value: 0,
      noninteraction: false,
      options: []
    };
    var s = new Array();
    for(var i = 0; i < settings.selectors.length; i++) {
      s[i] = settings.selectors[i].selector;
    }

    jQuery.each(s,
      function(i, val) {
        jQuery(settings.selectors[i].selector).once('GoogleAnalyticsET').bind(settings.selectors[i].event,
          function(event) {
            settings.selectors[i] = jQuery.extend(defaultOptions, settings.selectors[i]);
            trackEvent(jQuery(this), i, settings.selectors[i].options, settings.selectors[i].category, settings.selectors[i].action, settings.selectors[i].label, settings.selectors[i].value, settings.selectors[i].noninteraction)
          }
        );
      }

    );
  }

}

/**
 * trackEvent does the actual call to _gaq.push with the _trackEvent type.
 *
 * trackEvent calls the push method from the _gaq object. It also preforms
 * any token replacements on the category, action, and opt_label parameters.
 *
 * @param $obj
 *   The jQuery object that the click event was called on.
 * @param category
 *   The name you supply for the group of objects you want to track.
 * @param action
 *   A string that is uniquely paired with each category, and commonly used
 *   to define the type of user interaction for the web object.
 * @param opt_label
 *   An optional string to provide additional dimensions to the event data.
 * @param opt_value
 *   An integer that you can use to provide numerical data about the user
 *   event.
 * @param opt_oninteraction
 *   A boolean that when set to true, indicates that the event hit will not
 *   be used in bounce-rate calculation.
 */
function trackEvent($obj, id, options, category, action, opt_label, opt_value, opt_noninteraction) {
  var href = $obj.attr('href') == undefined ? false : String($obj.attr('href'));
  if (typeof this.options == 'undefined') {
    this.options = {};
  }
  this.options[id] = options;

  category = category == '!text' ? String($obj.text()) : (category == '!href' ? href : (category == '!currentPage' ? String(window.location.href) : String(category)));
  action = action == '!text' ? String($obj.text()) : (action == '!href' ? href : (action == '!currentPage' ? String(window.location.href) : String(action)));
  opt_label = opt_label == '!text' ? String($obj.text()) : (opt_label == '!href' ? href : (opt_label == '!currentPage' ? String(window.location.href) : String(opt_label)));

  // Google complains if category or action are not set so we fail gracefully.
  if (!category || !action) {
    console.log("Google Analytics Event Tracking: category and action must be set.")
    return;
  }

  // Only track once if the trackOnce option is set.
  if (this.options[id].trackOnce == true) {
    if (typeof this.options[id].times == 'undefined') {
      this.options[id].times = 1;
    }
    else {
      return;
    }
  }

  console.log(id);
  if (opt_label == '!test' || Drupal.settings.googleAnalyticsETSettings.settings.debug) {
    debugEvent($obj, category, action, opt_label, opt_value, opt_noninteraction);
  }
  else if( typeof _gaq != 'undefined' ){
    _gaq.push(['_trackEvent', String(category), String(action), String(opt_label), Number(opt_value), Boolean(opt_noninteraction)]);
  }
  else {
    ga('send', {
      'hitType': 'event',
      'eventCategory': String(category),
      'eventAction': String(action),
      'eventLabel': String(opt_label),
      'eventValue': Number(opt_value),
      'nonInteraction': Boolean(opt_noninteraction)
    });
  }
}

/**
 * A simple debug function that matches the trackEvent function.
 */
function debugEvent($obj, category, action, opt_label, opt_value, opt_noninteraction) {
  // Saftey First, safe use of console in IE.
  // http://blog.patspam.com/2009/the-curse-of-consolelog
  if (!("console" in window)) {
    alert(category + ' ' + action  + ' ' + opt_label + ' ' + opt_value);
  }
  else {
    var trackerObject = {
        category : category,
        action : action,
        opt_label : opt_label,
        opt_value : opt_value,
        opt_noninteraction : opt_noninteraction,
        $object : $obj
    }
    console.log(trackerObject);
  }
}
;
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
(function ($) {
  //generate random 5 character key
  let currentListIndex = '';

  function setCookie(name, value, options = {}) {
    options = {
      //    domain: '.si.edu',
      path: '/',
      expires: 14,
      SameSite: 'strict',
      Secure: true,
      ...options
    };

    // Set using js.cookie
    Cookies.set(name, JSON.stringify(value), options);
  }

  function editItemList($itemId, $listId, $action) {
    const storageLocal = localStorage.getItem("drupal-oauth-token"),
      token = storageLocal !== null ? JSON.parse(storageLocal) : false;
    if (token) {
      const submittedData = {
        url: $listId,
        action: $action,
        items: [$itemId]
      };
      $.ajax({
        url: `/rest/api/edanlist/${$listId}?_format=json`,
        type: "PATCH",
        contentType: "application/json",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
        },
        data: JSON.stringify(submittedData),
        error: function(err) {
          switch (err.status) {
            case "400":
              // bad request
              break;
            case "401":
              // unauthorized
              break;
            case "403":
              // forbidden
              break;
            default:
              console.log(err, "error");
              break;
          }
        },
        success: function(data) {
          console.log("Success!");
        }
      });
    }
  }

  function getCookie() {
    const cookieId = "siVisitPlanner";
    currentListIndex = Math.random().toString(36).slice(-5);

    console.log(currentListIndex, "first");
    let defaultCookie = {
      "lists": {
        [currentListIndex] : {
          "id": "",
          "url": "",
          "title": "",
          "items": []
        }
      },
      "loggedIn": false,
      "account": {},
      "hasList": false
    };

    let cookie;
    try {
      cookie = JSON.parse(Cookies.get(cookieId));
      const keys = Object.keys(cookie.lists);
      console.log(keys, "keys");
      currentListIndex = keys[0];
    } catch (err) {
      // Original cookie can't be parsed; update to default
      setCookie(cookieId, defaultCookie);
      cookie = defaultCookie;
    }
    if (cookie) {
      return cookie;
    } else {
      return defaultCookie;
    }
  };
  Drupal.behaviors.siVisitPlanner = {
    attach: function (context, settings) {
      const cookieId = "siVisitPlanner",
        textSave = Drupal.t("save to MyVisit"),
        textRemove = Drupal.t("remove from MyVisit"),
        siCookieValue = getCookie(cookieId);

      siVisitPlanner = {
        pageInit: function () {
          console.log(siCookieValue, "cook");

          // Visit Flags
          $(".visit-flag", context).each(function (index, element) {
            var $this = $(this);
            const itemId = $this.data("id");

            if (siCookieValue.lists[currentListIndex].items.length > 0 && siCookieValue.lists[currentListIndex].items.includes(itemId)) {
              $this.addClass("saved");
              $this.data("parent", currentListIndex);
              $this.prop("title", textRemove);
            }
            $this.on("click", function () {

              // Not on list
              if (!siCookieValue.lists[currentListIndex].items.includes(itemId)) {
                siVisitPlanner.saveItem($this, itemId, siCookieValue.lists[currentListIndex].items);
              } else {
                siVisitPlanner.removeItem($this, itemId, siCookieValue.lists[currentListIndex].items);
              }
              // Set class for focus after click. Remove ater focus removed.
              $this.addClass("clicked-focus");
                $this.on("blur", function () {
                $this.removeClass("clicked-focus");
              });

              console.log(siCookieValue, "-siCookieValue");
              siVisitPlanner.saveList(siCookieValue);
            });
          });
        },
        saveItem: function ($element, id, list) {
          list.push(id);
          $element.addClass("saved");
          $element.prop("title", textRemove);
          if (siCookieValue.lists[currentListIndex].url.length > 0) {
            editItemList(id, currentListIndex, "add");
          }
        },
        removeItem: function ($element, id, list) {
          const index = list.indexOf(id);
          if (index !== -1) {
            list.splice(index, 1);
            if (siCookieValue.lists[currentListIndex].url.length > 0) {
              editItemList(id, currentListIndex, "remove");
            }
          }
          $element.removeClass("saved");
          $element.prop("title", textSave);
        },
        saveList: function (list) {
          // window.localStorage.setItem(cookieId, JSON.stringify(list));
          // if eu_cookie_compliance is enabled and hasAgreed.
          // if ((Drupal.eu_cookie_compliance && Drupal.eu_cookie_compliance.hasAgreed())
          //   || !Drupal.eu_cookie_compliance) {
          setCookie(cookieId, list);
          // }

        }

      };
      siVisitPlanner.pageInit();
    }
  };


})(jQuery);
;
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);;
/*
 * sf-Touchscreen v1.3b - Provides touchscreen compatibility for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish)
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

(function($){
  $.fn.sftouchscreen = function(options){
    options = $.extend({
      mode: 'inactive',
      breakpoint: 768,
      breakpointUnit: 'px',
      useragent: '',
      behaviour: 2,
      disableHover: false
    }, options);

    function activate(menu){
      var eventHandler = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) ? ['click touchstart','mouseup touchend'] : ['click','mouseup'];
      // Select hyperlinks from parent menu items.
      menu.find('li:has(ul)').children('a,span.nolink').each(function(){
        var item = $(this),
        parent = item.closest('li');
        if (options.disableHover){
          parent.unbind('mouseenter mouseleave');
        }
        if (options.behaviour == 2){
          if (parent.children('a.menuparent,span.nolink.menuparent').length > 0 && parent.children('ul').children('.sf-clone-parent').length == 0){
            var
            // Cloning the hyperlink of the parent menu item.
            cloneLink = parent.children('a.menuparent,span.nolink.menuparent').clone(),
            // Wrapping the hyerplinks in <li>.
            cloneLink = $('<li class="sf-clone-parent" />').html(cloneLink);
            // Removing unnecessary stuff.
            cloneLink.find('.sf-sub-indicator').remove(),
            // Adding a helper class and attaching them to the sub-menus.
            parent.children('ul').addClass('sf-has-clone-parent').prepend(cloneLink);
          }
        }
        // No .toggle() here as it's not possible to reset it.
        item.bind(eventHandler[0], function(event){
          // Already clicked?
          if (item.hasClass('sf-clicked')){
            // Depending on the preferred behaviour, either proceed to the URL.
            if (options.behaviour == 0){
              window.location = item.attr('href');
            }
            // or collapse the sub-menu.
            else if (options.behaviour == 1 || options.behaviour == 2){
              event.preventDefault();
              item.removeClass('sf-clicked');
              parent.hideSuperfishUl().find('a,span.nolink').removeClass('sf-clicked');
            }
          }
          // Prevent the default action otherwise.
          else {
            event.preventDefault();
            item.addClass('sf-clicked');
            parent.showSuperfishUl().siblings('li:has(ul)').hideSuperfishUl().find('.sf-clicked').removeClass('sf-clicked');
          }
        });
      });

      $(document).bind(eventHandler[1], function(event){
        if (menu.not(event.target) && menu.has(event.target).length === 0){
          menu.find('.sf-clicked').removeClass('sf-clicked');
          menu.find('li:has(ul)').hideSuperfishUl();
        }
      });
    }
    // Return original object to support chaining.
    // This is not necessary actually because of the way the module uses these plugins.
    for (var b = 0; b < this.length; b++) {
      var menu = $(this).eq(b),
      mode = options.mode;
      // The rest is crystal clear, isn't it? :)
      if (mode == 'always_active'){
        activate(menu);
      }
      else if (mode == 'window_width'){
        var breakpoint = (options.breakpointUnit == 'em') ? (options.breakpoint * parseFloat($('body').css('font-size'))) : options.breakpoint,
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        timer;
        if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint){
          activate(menu);
        }
        else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
          activate(menu);
        }
        $(window).resize(function(){
          clearTimeout(timer);
          timer = setTimeout(function(){
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint){
              activate(menu);
            }
            else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
              activate(menu);
            }
          }, 50);
        });
      }
      else if (mode == 'useragent_custom'){
        if (options.useragent != ''){
          var ua = RegExp(options.useragent, 'i');
          if (navigator.userAgent.match(ua)){
            activate(menu);
          }
        }
      }
      else if (mode == 'useragent_predefined' && navigator.userAgent.match(/(android|bb\d+|meego)|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i)){
        activate(menu);
      }
    }
    return this;
  }
})(jQuery);
;
/*
 * sf-Smallscreen v1.2b - Provides small-screen compatibility for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish)
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
  */

(function($){
  $.fn.sfsmallscreen = function(options){
    options = $.extend({
      mode: 'inactive',
      type: 'accordion',
      breakpoint: 768,
      breakpointUnit: 'px',
      useragent: '',
      title: '',
      addSelected: false,
      menuClasses: false,
      hyperlinkClasses: false,
      excludeClass_menu: '',
      excludeClass_hyperlink: '',
      includeClass_menu: '',
      includeClass_hyperlink: '',
      accordionButton: 1,
      expandText: 'Expand',
      collapseText: 'Collapse'
    }, options);

    // We need to clean up the menu from anything unnecessary.
    function refine(menu){
      var
      refined = menu.clone(),
      // Things that should not be in the small-screen menus.
      rm = refined.find('span.sf-sub-indicator, span.sf-description'),
      // This is a helper class for those who need to add extra markup that shouldn't exist
      // in the small-screen versions.
      rh = refined.find('.sf-smallscreen-remove'),
      // Mega-menus has to be removed too.
      mm = refined.find('ul.sf-megamenu');
      for (var a = 0; a < rh.length; a++){
        rh.eq(a).replaceWith(rh.eq(a).html());
      }
      for (var b = 0; b < rm.length; b++){
        rm.eq(b).remove();
      }
      if (mm.length > 0){
        mm.removeClass('sf-megamenu');
        var ol = refined.find('div.sf-megamenu-column > ol');
        for (var o = 0; o < ol.length; o++){
          ol.eq(o).replaceWith('<ul>' + ol.eq(o).html() + '</ul>');
        }
        var elements = ['div.sf-megamenu-column','.sf-megamenu-wrapper > ol','li.sf-megamenu-wrapper'];
        for (var i = 0; i < elements.length; i++){
          obj = refined.find(elements[i]);
          for (var t = 0; t < obj.length; t++){
            obj.eq(t).replaceWith(obj.eq(t).html());
          }
        }
        refined.find('.sf-megamenu-column').removeClass('sf-megamenu-column');
      }
      refined.add(refined.find('*')).css({width:''});
      return refined;
    }

    // Creating <option> elements out of the menu.
    function toSelect(menu, level){
      var
      items = '',
      childLI = $(menu).children('li');
      for (var a = 0; a < childLI.length; a++){
        var list = childLI.eq(a), parent = list.children('a, span');
        for (var b = 0; b < parent.length; b++){
          var
          item = parent.eq(b),
          path = item.is('a') ? item.attr('href') : '',
          // Class names modification.
          itemClone = item.clone(),
          classes = (options.hyperlinkClasses) ? ((options.excludeClass_hyperlink && itemClone.hasClass(options.excludeClass_hyperlink)) ? itemClone.removeClass(options.excludeClass_hyperlink).attr('class') : itemClone.attr('class')) : '',
          classes = (options.includeClass_hyperlink && !itemClone.hasClass(options.includeClass_hyperlink)) ? ((options.hyperlinkClasses) ? itemClone.addClass(options.includeClass_hyperlink).attr('class') : options.includeClass_hyperlink) : classes;
          // Retaining the active class if requested.
          if (options.addSelected && item.hasClass('active')){
            classes += ' active';
          }
          // <option> has to be disabled if the item is not a link.
          disable = item.is('span') || item.attr('href')=='#' ? ' disabled="disabled"' : '',
          // Crystal clear.
          subIndicator = 1 < level ? Array(level).join('-') + ' ' : '';
          // Preparing the <option> element.
          items += '<option value="' + path + '" class="' + classes + '"' + disable + '>' + subIndicator + $.trim(item.text()) +'</option>',
          childUL = list.find('> ul');
          // Using the function for the sub-menu of this item.
          for (var u = 0; u < childUL.length; u++){
            items += toSelect(childUL.eq(u), level + 1);
          }
        }
      }
      return items;
    }

    // Create the new version, hide the original.
    function convert(menu){
      var menuID = menu.attr('id'),
      // Creating a refined version of the menu.
      refinedMenu = refine(menu);
      // Currently the plugin provides two reactions to small screens.
      // Converting the menu to a <select> element, and converting to an accordion version of the menu.
      if (options.type == 'accordion'){
        var
        toggleID = menuID + '-toggle',
        accordionID = menuID + '-accordion';
        // Making sure the accordion does not exist.
        if ($('#' + accordionID).length == 0){
          var
          // Getting the style class.
          styleClass = menu.attr('class').split(' ').filter(function(item){
            return item.indexOf('sf-style-') > -1 ? item : '';
          }),
          // Creating the accordion.
          accordion = $(refinedMenu).attr('id', accordionID);
          // Removing unnecessary classes.
          accordion.removeClass('sf-horizontal sf-vertical sf-navbar sf-shadow sf-js-enabled');
          // Adding necessary classes.
          accordion.addClass('sf-accordion sf-hidden');
          // Removing style attributes and any unnecessary class.
          accordion.children('li').removeAttr('style').removeClass('sfHover');
          // Doing the same and making sure all the sub-menus are off-screen (hidden).
          accordion.find('ul').removeAttr('style').not('.sf-hidden').addClass('sf-hidden');
          // Creating the accordion toggle switch.
          var toggle = '<div class="sf-accordion-toggle ' + styleClass + '"><button id="' + toggleID + '" class="lines-button" aria-label="Toggle Navigation Menu"><span class="lines"></span><span class="text">' + options.title + '</span></button></div>';

          // Adding Expand\Collapse buttons if requested.
          if (options.accordionButton == 2){
            var parent = accordion.find('li.menuparent');
            for (var i = 0; i < parent.length; i++){
              parent.eq(i).prepend('<a href="#" class="sf-accordion-button">' + options.expandText + '</a>');
            }
          }
          // Inserting the according and hiding the original menu.
          menu.before(toggle).before(accordion).hide();

          var
          accordionElement = $('#' + accordionID),
          // Deciding what should be used as accordion buttons.
          buttonElement = (options.accordionButton < 2) ? 'a.menuparent,span.nolink.menuparent' : 'a.sf-accordion-button',
          button = accordionElement.find(buttonElement);

          // Attaching a click event to the toggle switch.
          $('#' + toggleID).bind('click', function(e){
            // Preventing the click.
            e.preventDefault();
            // Adding the sf-expanded class.
            $(this).toggleClass('sf-expanded');

            if (accordionElement.hasClass('sf-expanded')){
              // If the accordion is already expanded:
              // Hiding its expanded sub-menus and then the accordion itself as well.
              accordionElement.add(accordionElement.find('li.sf-expanded')).removeClass('sf-expanded')
              .end().find('ul').hide()
              // This is a bit tricky, it's the same trick that has been in use in the main plugin for sometime.
              // Basically we'll add a class that keeps the sub-menu off-screen and still visible,
              // and make it invisible and removing the class one moment before showing or hiding it.
              // This helps screen reader software access all the menu items.
              .end().hide().addClass('sf-hidden').show();
              // Changing the caption of any existing accordion buttons to 'Expand'.
              if (options.accordionButton == 2){
                accordionElement.find('a.sf-accordion-button').text(options.expandText);
              }
            }
            else {
              // But if it's collapsed,
              accordionElement.addClass('sf-expanded').hide().removeClass('sf-hidden').show();
            }
          });

          // Attaching a click event to the buttons.
          button.bind('click', function(e){
            // Making sure the buttons does not exist already.
            if ($(this).closest('li').children('ul').length > 0){
              e.preventDefault();
              // Selecting the parent menu items.
              var parent = $(this).closest('li');
              // Creating and inserting Expand\Collapse buttons to the parent menu items,
              // of course only if not already happened.
              if (options.accordionButton == 1 && parent.children('a.menuparent,span.nolink.menuparent').length > 0 && parent.children('ul').children('li.sf-clone-parent').length == 0){
                var
                // Cloning the hyperlink of the parent menu item.
                cloneLink = parent.children('a.menuparent,span.nolink.menuparent').clone(),
                // Wrapping the hyerplinks in <li>.
                cloneLink = $('<li class="sf-clone-parent" />').html(cloneLink);
                // Adding a helper class and attaching them to the sub-menus.
                parent.children('ul').addClass('sf-has-clone-parent').prepend(cloneLink);
              }
              // Once the button is clicked, collapse the sub-menu if it's expanded.
              if (parent.hasClass('sf-expanded')){
                parent.children('ul').slideUp('fast', function(){
                  // Doing the accessibility trick after hiding the sub-menu.
                  $(this).closest('li').removeClass('sf-expanded').end().addClass('sf-hidden').show();
                });
                // Changing the caption of the inserted Collapse link to 'Expand', if any is inserted.
                if (options.accordionButton == 2 && parent.children('.sf-accordion-button').length > 0){
                  parent.children('.sf-accordion-button').text(options.expandText);
                }
              }
              // Otherwise, expand the sub-menu.
              else {
                // Doing the accessibility trick and then showing the sub-menu.
                parent.children('ul').hide().removeClass('sf-hidden').slideDown('fast')
                // Changing the caption of the inserted Expand link to 'Collape', if any is inserted.
                .end().addClass('sf-expanded').children('a.sf-accordion-button').text(options.collapseText)
                // Hiding any expanded sub-menu of the same level.
                .end().siblings('li.sf-expanded').children('ul')
                .slideUp('fast', function(){
                  // Doing the accessibility trick after hiding it.
                  $(this).closest('li').removeClass('sf-expanded').end().addClass('sf-hidden').show();
                })
                // Assuming Expand\Collapse buttons do exist, resetting captions, in those hidden sub-menus.
                .parent().children('a.sf-accordion-button').text(options.expandText);
              }
            }
          });
        }
      }
      else {
        var
        // Class names modification.
        menuClone = menu.clone(), classes = (options.menuClasses) ? ((options.excludeClass_menu && menuClone.hasClass(options.excludeClass_menu)) ? menuClone.removeClass(options.excludeClass_menu).attr('class') : menuClone.attr('class')) : '',
        classes = (options.includeClass_menu && !menuClone.hasClass(options.includeClass_menu)) ? ((options.menuClasses) ? menuClone.addClass(options.includeClass_menu).attr('class') : options.includeClass_menu) : classes,
        classes = (classes) ? ' class="' + classes + '"' : '';

        // Making sure the <select> element does not exist already.
        if ($('#' + menuID + '-select').length == 0){
          // Creating the <option> elements.
          var newMenu = toSelect(refinedMenu, 1),
          // Creating the <select> element and assigning an ID and class name.
          selectList = $('<select' + classes + ' id="' + menuID + '-select"/>')
          // Attaching the title and the items to the <select> element.
          .html('<option>' + options.title + '</option>' + newMenu)
          // Attaching an event then.
          .change(function(){
            // Except for the first option that is the menu title and not a real menu item.
            if ($('option:selected', this).index()){
              window.location = selectList.val();
            }
          });
          // Applying the addSelected option to it.
          if (options.addSelected){
            selectList.find('.active').attr('selected', !0);
          }
          // Finally inserting the <select> element into the document then hiding the original menu.
          menu.before(selectList).hide();
        }
      }
    }

    // Turn everything back to normal.
    function turnBack(menu){
      var
      id = '#' + menu.attr('id');
      // Removing the small screen version.
      $(id + '-' + options.type).remove();
      // Removing the accordion toggle switch as well.
      if (options.type == 'accordion'){
        $(id + '-toggle').parent('div').remove();
      }
      // Crystal clear!
      $(id).show();
    }

    // Return original object to support chaining.
    // Although this is unnecessary because of the way the module uses these plugins.
    for (var s = 0; s < this.length; s++){
      var
      menu = $(this).eq(s),
      mode = options.mode;
      // The rest is crystal clear, isn't it? :)
      if (mode == 'always_active'){
        convert(menu);
      }
      else if (mode == 'window_width'){
        var breakpoint = (options.breakpointUnit == 'em') ? (options.breakpoint * parseFloat($('body').css('font-size'))) : options.breakpoint,
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        timer;
        if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint){
          convert(menu);
        }
        else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
          convert(menu);
        }
        $(window).resize(function(){
          clearTimeout(timer);
          timer = setTimeout(function(){
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint){
              convert(menu);
            }
            else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
              convert(menu);
            }
            else {
              turnBack(menu);
            }
          }, 50);
        });
      }
      else if (mode == 'useragent_custom'){
        if (options.useragent != ''){
          var ua = RegExp(options.useragent, 'i');
          if (navigator.userAgent.match(ua)){
            convert(menu);
          }
        }
      }
      else if (mode == 'useragent_predefined' && navigator.userAgent.match(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i)){
        convert(menu);
      }
    }
    return this;
  }
})(jQuery);
;
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supposition plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.supposition = function(){
    var $w = $(window), /*do this once instead of every onBeforeShow call*/
    _offset = function(dir) {
      return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset']
      || document.documentElement && document.documentElement[dir=='y' ? 'scrollTop' : 'scrollLeft']
      || document.body[dir=='y' ? 'scrollTop' : 'scrollLeft'];
    },
    onHide = function(){
      this.css({bottom:''});
    },
    onBeforeShow = function(){
      this.each(function(){
        var $u = $(this);
        $u.css('display','block');
        var $mul = $u.closest('.sf-menu'),
        level = $u.parents('ul').length,
        menuWidth = $u.width(),
        menuParentWidth = $u.closest('li').outerWidth(true),
        menuParentLeft = $u.closest('li').offset().left,
        totalRight = $w.width() + _offset('x'),
        menuRight = $u.offset().left + menuWidth,
        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;
        if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
          if (menuParentLeft < exactMenuWidth) {
            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)){
              $u.css({left:0,right:'auto'});
            }
            else {
              $u.css({left:menuParentWidth + 'px',right:'auto'});
            }
          }
        }
        else {
          if (menuRight > totalRight && menuParentLeft > menuWidth) {
            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)){
              $u.css({right:0,left:'auto'});
            }
            else {
              $u.css({right:menuParentWidth + 'px',left:'auto'});
            }
          }
        }
        var windowHeight = $w.height(),
        offsetTop = $u.offset().top,
        menuParentShadow = ($mul.hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0,-2)) : 0,
        menuParentHeight = ($mul.hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
        menuHeight = $u.height(),
        baseline = windowHeight + _offset('y');
        var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
        if (expandUp) {
          $u.css({bottom:menuParentHeight + 'px',top:'auto'});
        }
        $u.css('display','none');
      });
    };

    return this.each(function() {
      var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

      /* if callbacks already set, store them */
      var _onBeforeShow = o.onBeforeShow,
      _onHide = o.onHide;

      $.extend($.fn.superfish.o[this.serial],{
        onBeforeShow: function() {
          onBeforeShow.call(this); /* fire our Supposition callback */
          _onBeforeShow.call(this); /* fire stored callbacks */
        },
        onHide: function() {
          onHide.call(this); /* fire our Supposition callback */
          _onHide.call(this); /* fire stored callbacks */
        }
      });
    });
  };
})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Superfish plugin.
 * Please refer to the README for more information.
 */

(function($){
  $.fn.superfish = function(op){
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
      over = function(){
        var $$ = $(this), menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function(){
        var $$ = $(this), menu = getMenu($$), o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer=setTimeout(function(){
          if ($$.children('.sf-clicked').length == 0){
            o.retainPath=($.inArray($$[0],o.$path)>-1);
            $$.hideSuperfishUl();
            if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
          }
        },o.delay);
      },
      getMenu = function($menu){
        var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels),
      p = o.$path;
      for (var l = 0; l < p.length; l++){
        p.eq(l).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass);
      }
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) addArrow( $(this).children('a:first-child, span.nolink:first-child') );
        $(this).addClass('hasChildren')
      })
      .not('.'+c.bcClass)
        .hideSuperfishUl();

      var $a = $('a, span.nolink',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass],
      addShadow = true;
      if ($.browser !== undefined){
        if ($.browser.msie && $.browser.version < 7){
          addShadow = false;
        }
      }
      if (sf.op.dropShadows && addShadow){
        menuClasses.push(c.shadowClass);
      }
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser !== undefined){
      if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined) {
        this.toggleClass(sf.c.shadowClass+'-off');
      }
    }
  };
  sf.c = {
    bcClass: 'sf-breadcrumb',
    menuClass: 'sf-js-enabled',
    anchorClass: 'sf-with-ul',
    arrowClass: 'sf-sub-indicator',
    shadowClass: 'sf-shadow'
  };
  sf.defaults = {
    hoverClass: 'sfHover',
    pathClass: 'overideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {opacity:'show'},
    speed: 'fast',
    autoArrows: true,
    dropShadows: true,
    disableHI: false, // true disables hoverIntent detection
    onInit: function(){}, // callback functions
    onBeforeShow: function(){},
    onShow: function(){},
    onHide: function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function(){
      var o = sf.op,
        not = (o.retainPath===true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
          .children('ul').addClass('sf-hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
        sh = sf.c.shadowClass+'-off',
        $ul = this.addClass(o.hoverClass)
          .children('ul.sf-hidden').removeClass('sf-hidden');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
      return this;
    }
  });
})(jQuery);;
/**
 * @file
 * The Superfish Drupal Behavior to apply the Superfish jQuery plugin to lists.
 */

(function ($) {
  Drupal.behaviors.superfish = {
    attach: function (context, settings) {
      // Take a look at each list to apply Superfish to.
      $.each(settings.superfish || {}, function(index, options) {
        // Process all Superfish lists.
        $('#superfish-' + options.id, context).once('superfish', function() {
          var list = $(this);

          // Check if we are to apply the Supersubs plug-in to it.
          if (options.plugins || false) {
            if (options.plugins.supersubs || false) {
              list.supersubs(options.plugins.supersubs);
            }
          }

          // Apply Superfish to the list.
          list.superfish(options.sf);

          // Check if we are to apply any other plug-in to it.
          if (options.plugins || false) {
            if (options.plugins.touchscreen || false) {
              list.sftouchscreen(options.plugins.touchscreen);
            }
            if (options.plugins.smallscreen || false) {
              list.sfsmallscreen(options.plugins.smallscreen);
            }
            if (options.plugins.automaticwidth || false) {
              list.sfautomaticwidth();
            }
            if (options.plugins.supposition || false) {
              list.supposition();
            }
            if (options.plugins.bgiframe || false) {
              list.find('ul').bgIframe({opacity:false});
            }
          }
        });
      });
    }
  };
})(jQuery);;
