// @codekit-prepend "marked.js"
/*
 * angular-marked 0.0.12
 * (c) 2014 J. Harshbarger
 * Licensed MIT
 */
!function(){"use strict";angular.module("hc.marked",[]).provider("marked",function(){var a=this;a.setOptions=function(a){this.defaults=a},a.$get=["$window",function(b){var c=b.marked;return a.setOptions=c.setOptions,c.setOptions(a.defaults),c}]}).directive("marked",["marked",function(a){return{restrict:"AE",replace:!0,scope:{opts:"=",marked:"="},link:function(b,c,d){function e(d){c.html(a(d||"",b.opts||null))}e(b.marked||c.text()||""),d.marked&&b.$watch("marked",e)}}}])}();