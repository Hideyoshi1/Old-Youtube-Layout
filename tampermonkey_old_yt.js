// ==UserScript==
// @name         Get me Old Youtube
// @namespace    http://greasyfork.org/en/scripts/32906
// @version      1.2.3
// @description  Sets a Cookie which loads the old Youtube layout (as long as available)
// @author       Artain
// @match        *://www.youtube.com/*
// @exclude      *://www.youtube.com/tv*
// @exclude      *://www.youtube.com/embed/*
// @exclude      *://www.youtube.com/live_chat*
// @exclude      *://www.youtube.com/feed/subscriptions?flow=2*
// @run-at       document-start
// @homepageURL  http://greasyfork.org/en/scripts/32906
// @license      https://creativecommons.org/licenses/by-sa/4.0/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function start() {
        var cookie = getPref(),
            pref = "f6=8";
        if(cookie === "fIsAlreadySet") {
            return;
        } else if(cookie !== "noPref"){
            for(var i = 0; i < cookie.length; ++i) {
                pref = pref + "&" + cookie[i].key + "=" + cookie[i].value;
            }
        }
        changePref(pref);
    }

    function changePref(values) {
        var d = new Date();
        d.setTime(d.getTime() + (100*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "PREF=" + values + ";" + expires + ";domain=.youtube.com;hostonly=false;path=/";
        location.reload();
    }

    function getPref() {
        var cookie = document.cookie,
            splitC = cookie.split(";");
        for(var i = 0; i < splitC.length; ++i) {
            if(splitC[i].trim().indexOf("PREF") === 0) {
                if(splitC[i].trim().indexOf("f6=8") > -1) {
                    return "fIsAlreadySet";
                }
                var c = [],
                    splitValues = splitC[i].substring(5).split("&");
                for(var k = 0; k < splitValues.length; ++k) {
                    var splitV = splitValues[k].split("=");
                    if(splitV[0] !== "f6") {
                        var kv = {};
                        kv.key = splitV[0];
                        kv.value = splitV[1];
                        c.push(kv);
                    }
                }
                return c;
            }
        }
        return "noPref";
    }
    start();
})();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// addGlobalStyle('#player { position: absolute !important; }');
// addGlobalStyle('#player { top: 59px !important; }');
