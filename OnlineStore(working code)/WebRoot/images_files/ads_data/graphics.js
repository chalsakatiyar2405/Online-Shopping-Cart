(function(){
AdSenseGraphics.POS_TOP_LEFT_=0;AdSenseGraphics.POS_TOP_RIGHT_=1;AdSenseGraphics.POS_BOTTOM_LEFT_=2;AdSenseGraphics.POS_BOTTOM_RIGHT_=3;AdSenseGraphics.X_INTERCEPT_TOP_=0;AdSenseGraphics.X_INTERCEPT_BOTTOM_=1;AdSenseGraphics.Y_INTERCEPT_LEFT_=2;AdSenseGraphics.Y_INTERCEPT_RIGHT_=3;AdSenseGraphics.USER_AGENT_=navigator.userAgent;AdSenseGraphics.IS_OPERA_=typeof opera!="undefined";AdSenseGraphics.IS_IE_=!AdSenseGraphics.IS_OPERA_&&AdSenseGraphics.USER_AGENT_.indexOf("MSIE")!=-1;
AdSenseGraphics.IS_SAFARI_=!AdSenseGraphics.IS_OPERA_&&AdSenseGraphics.USER_AGENT_.indexOf("Safari")!=-1;AdSenseGraphics.S_CURVE_CLASS_NAME_="curve";AdSenseGraphics.ROUNDED_CORNER_BG_CLASS_NAME_="rc_bg";AdSenseGraphics.ROUNDED_CORNER_BORDER_CLASS_NAME_="rc_border";AdSenseGraphics.SIGMOID_FUNCTION_WIDTH=12;AdSenseGraphics.SIGMOID_FUNCTION_OFFSET=6;function AdSenseGraphics(){}AdSenseGraphics.prototype.getPixelLeftX_=function(a){return a};
AdSenseGraphics.prototype.getPixelRightX_=function(a){return a+1};AdSenseGraphics.prototype.getPixelBottomY_=function(a){return a};AdSenseGraphics.prototype.getPixelTopY_=function(a){return a+1};AdSenseGraphics.prototype.computeSigmoid_=function(a,d,b){a=12*a/d-6;return b/(1+Math.exp(a))};AdSenseGraphics.prototype.computeSigmoidInverse_=function(a,d,b){if(a<=0)return d;if(a>=b)return 0;a=a/b;var c=Math.log((1-a)/a);return d*(c+6)/12};
AdSenseGraphics.prototype.computeCircle_=function(a,d){var b=Math.sqrt(Math.pow(d,2)-Math.pow(a,2));return isNaN(b)?0:b};AdSenseGraphics.prototype.addStyleRule_=function(a,d){if(AdSenseGraphics.IS_IE_)document.styleSheets[0].addRule(a,d);else{var b=document.createElement("style");b.type="text/css";var c=AdSenseGraphics.IS_SAFARI_?"innerText":"innerHTML";b[c]=a+"{"+d+"}";var e=document.getElementsByTagName("head")[0];e.appendChild(b)}};
AdSenseGraphics.prototype.createDiv_=function(a,d,b,c,e){var f=document.createElement("div"),g="position:absolute;overflow:hidden;left:";g+=a;g+="px;top:";g+=d;g+="px;width:";g+=b;g+="px;height:";g+=c;g+="px;";if(e!=null){g+="opacity:";g+=e;if(AdSenseGraphics.IS_IE_){g+=";filter: alpha(opacity=";g+=Math.round(e*100);g+=");"}}f.style.cssText=g;return f};
AdSenseGraphics.prototype.getCirclePixelIntercepts_=function(a,d,b){var c=new Array(4);c[AdSenseGraphics.Y_INTERCEPT_LEFT_]=this.computeCircle_(this.getPixelLeftX_(a),b);c[AdSenseGraphics.Y_INTERCEPT_RIGHT_]=this.computeCircle_(this.getPixelRightX_(a),b);c[AdSenseGraphics.X_INTERCEPT_BOTTOM_]=this.computeCircle_(this.getPixelBottomY_(d),b);c[AdSenseGraphics.X_INTERCEPT_TOP_]=this.computeCircle_(this.getPixelTopY_(d),b);return c};
AdSenseGraphics.prototype.getSigmoidPixelIntercepts_=function(a,d,b,c){var e=new Array(4);e[AdSenseGraphics.Y_INTERCEPT_LEFT_]=this.computeSigmoid_(this.getPixelLeftX_(a),b,c);e[AdSenseGraphics.Y_INTERCEPT_RIGHT_]=this.computeSigmoid_(this.getPixelRightX_(a),b,c);e[AdSenseGraphics.X_INTERCEPT_BOTTOM_]=this.computeSigmoidInverse_(this.getPixelBottomY_(d),b,c);e[AdSenseGraphics.X_INTERCEPT_TOP_]=this.computeSigmoidInverse_(this.getPixelTopY_(d),b,c);return e};
AdSenseGraphics.prototype.getSigmoidAntiAliasOpacity_=function(a,d,b,c){var e=this.getSigmoidPixelIntercepts_(a,d,b,c),f=this.getAntiAliasOpacity_(a,d,e);return f==-1?0:f};AdSenseGraphics.prototype.getCircleAntiAliasOpacity_=function(a,d,b,c){var e=this.getCirclePixelIntercepts_(a,d,b),f=this.getAntiAliasOpacity_(a,d,e);if(f==-1)return 0;return c?1-f:f};
AdSenseGraphics.prototype.getAntiAliasOpacity_=function(a,d,b){var c=0,e=new Array(2),f=new Array(2),g=false,o=false,k=false,j=false,h=this.getPixelBottomY_(d),p=this.getPixelTopY_(d),n=this.getPixelLeftX_(a),s=this.getPixelRightX_(a);if(b[AdSenseGraphics.Y_INTERCEPT_LEFT_]>=h&&b[AdSenseGraphics.Y_INTERCEPT_LEFT_]<p){g=true;e[0]=0;f[0]=b[AdSenseGraphics.Y_INTERCEPT_LEFT_]-h}else if(b[AdSenseGraphics.X_INTERCEPT_TOP_]>=n&&b[AdSenseGraphics.X_INTERCEPT_TOP_]<s){o=true;e[0]=b[AdSenseGraphics.X_INTERCEPT_TOP_]-
n;f[0]=1}if(!o&&!g)return-1;if(b[AdSenseGraphics.Y_INTERCEPT_RIGHT_]>=h&&b[AdSenseGraphics.Y_INTERCEPT_RIGHT_]<p){k=true;e[1]=1;f[1]=b[AdSenseGraphics.Y_INTERCEPT_RIGHT_]-h}else if(b[AdSenseGraphics.X_INTERCEPT_BOTTOM_]>=n&&b[AdSenseGraphics.X_INTERCEPT_BOTTOM_]<s){j=true;e[1]=b[AdSenseGraphics.X_INTERCEPT_BOTTOM_]-n;f[1]=0}if(g&&k){var m=f[0]<=f[1]?f[0]:f[1],l=f[0]>f[1]?f[0]:f[1];c=m+(l-m)/2}else if(g&&j)c=f[0]*e[1]/2;else if(o&&k)c=1-(1-e[0])*(1-f[1])/2;else if(o&&j){var q=e[0]<=e[1]?e[0]:e[1],
t=e[0]>e[1]?e[0]:e[1];c=q+(t-q)/2}return c};
AdSenseGraphics.prototype.createSigmoidCurve=function(a,d,b,c,e,f){this.addStyleRule_("#"+a.id+" ."+AdSenseGraphics.S_CURVE_CLASS_NAME_+" div","background-color: "+c);a.style.display="none";var g=this.createDiv_(0,0,d,b);g.className=AdSenseGraphics.S_CURVE_CLASS_NAME_;var o,k=b-1,j,h,p,n,s=b-1;for(var m=0;m<d;++m){o=k;k=Math.floor(this.computeSigmoid_(m+1,d,b));h=e?m:d-m;p=f?0:b-k;j=this.createDiv_(h,p,1,k);g.appendChild(j);for(var l=k;l<=o;++l){n=this.getSigmoidAntiAliasOpacity_(m,l,d,b);p=f?l:s-
l;j=this.createDiv_(h,p,1,1,n);g.appendChild(j)}}a.appendChild(g);a.style.display=""};
AdSenseGraphics.prototype.applyRoundedCorner=function(a,d,b,c,e,f,g,o){this.addStyleRule_("#"+a.id+" ."+AdSenseGraphics.ROUNDED_CORNER_BG_CLASS_NAME_+" div","background-color: "+c);this.addStyleRule_("#"+a.id+" ."+AdSenseGraphics.ROUNDED_CORNER_BORDER_CLASS_NAME_+" div","background-color: "+e);d+=f;b+=f;var k=a.style;k.display="none";a.innerHTML="";k.position="absolute";k.borderWidth="0px";k.backgroundColor="transparent";var j=f+"px solid "+e,h=o==AdSenseGraphics.POS_TOP_LEFT_||o==AdSenseGraphics.POS_BOTTOM_LEFT_,
p=o==AdSenseGraphics.POS_TOP_LEFT_||o==AdSenseGraphics.POS_TOP_RIGHT_,n=d-g;if(n>0){var s=h?d-n:0,m=this.createDiv_(s,0,n,b-f),l=m.style;l.backgroundColor=c;p?(l.borderTop=j):(l.borderBottom=j);a.appendChild(m)}var q=b-g;if(q>0){var t=p?b-q:0,m=this.createDiv_(0,t,d-f,q),l=m.style;l.backgroundColor=c;h?(l.borderLeft=j):(l.borderRight=j);a.appendChild(m)}this.createRoundedCorner_(a,d,b,g,f,h,p);k.display=""};
AdSenseGraphics.prototype.createRoundedCorner_=function(a,d,b,c,e,f,g){var o=e>0,k=c-e,j=f?0:d-c,h=g?0:b-c,p=this.createDiv_(j,h,c,c);p.className=AdSenseGraphics.ROUNDED_CORNER_BG_CLASS_NAME_;var n=this.createDiv_(j,h,c,c);n.className=o?AdSenseGraphics.ROUNDED_CORNER_BORDER_CLASS_NAME_:AdSenseGraphics.ROUNDED_CORNER_BG_CLASS_NAME_;var s=k,m=c,l=k,q=c,t,w,x,u,y=c-1;for(var v=0;v<c;++v){j=f?y-v:v;s=l;m=q;l=Math.ceil(this.computeCircle_(v+1,k));q=Math.floor(this.computeCircle_(v+1,c));t=o?s:q;h=g?c-
t:0;u=this.createDiv_(j,h,1,t);p.appendChild(u);for(var r=q;r<=m;++r){x=this.getCircleAntiAliasOpacity_(v,r,c,false);h=g?y-r:r;u=this.createDiv_(j,h,1,1,x);n.appendChild(u)}if(o){w=q-t;if(w>0){h=g?c-t-w:t;u=this.createDiv_(j,h,1,w);n.appendChild(u)}for(var r=l-1;r<s;++r){x=this.getCircleAntiAliasOpacity_(v,r,k,true);h=g?y-r:r;u=this.createDiv_(j,h,1,1,x);n.appendChild(u)}}}a.appendChild(p);a.appendChild(n)};var asg=new AdSenseGraphics;if(typeof window.rcl!="undefined"){var rc;for(var i=0;i<rcl.length;i++){rc=rcl[i];asg.applyRoundedCorner(document.getElementById(rc[0]),rc[1],rc[2],rc[3],rc[4],rc[5],rc[6],rc[7])}}typeof window.sc!="undefined"&&asg.createSigmoidCurve(document.getElementById(sc[0]),sc[1],sc[2],sc[3],sc[4],sc[5]);
})()