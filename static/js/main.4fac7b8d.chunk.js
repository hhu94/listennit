(this.webpackJsonplistennit=this.webpackJsonplistennit||[]).push([[0],{103:function(e,t){},109:function(e,t){},111:function(e,t){},119:function(e,t){},124:function(e,t,n){},126:function(e,t,n){"use strict";n.r(t);var r,a,o,c=n(131),u=n(1),i=n.n(u),s=n(60),l=n.n(s),f=n(11),p=(n(72),n(61)),d=n.n(p),m=n(62),y=n.n(m),b=(n(79),n(80),function(e){var t=e.songs,n=e.currentSong,r=e.setCurrentSong,a=e.setPlaying,o=[],c=!0,u=!1,s=void 0;try{for(var l,p=function(){var e=l.value,t=(m=Object(f.a)(e,2))[0],c=m[1],u="playlist-entry";t===n&&(u+=" playlist-entry__playing"),o.push(i.a.createElement("li",{className:u,key:t},i.a.createElement("button",{className:"playlist-entry__button",onClick:function(){r(t),a(!0)}},c.title),c.platform))},d=t.entries()[Symbol.iterator]();!(c=(l=d.next()).done);c=!0){var m;p()}}catch(y){u=!0,s=y}finally{try{c||null==d.return||d.return()}finally{if(u)throw s}}return i.a.createElement("div",{className:"playlist"},o)}),v=function(e){var t=e.playing,n=e.setPlaying,r=e.currentSong,a=e.setCurrentSong,o=e.songs,c=e.setPlaylistEvent,s=Object(u.useState)(1),l=Object(f.a)(s,2),p=l[0],m=l[1],v=Object(u.useState)(!1),g=Object(f.a)(v,2),E=g[0],_=g[1],k=void 0===o[r]?void 0:o[r].platform,O=function(){void 0===o[r+1]&&c({type:"fetchMore"}),a(r+1)},w=i.a.createRef(),S=function(e){return k===e?{ref:w,url:o[r].url,volume:p,muted:E,playing:t,onPlay:function(){return n(!0)},onPause:function(){return n(!1)},onReady:function(){return setTimeout((function(){return n(!0)}),100)},onEnded:O,onError:O,controls:!0}:{url:h[e],volume:p,muted:!0,playing:t,loop:!0,controls:!0}};return i.a.createElement(u.Fragment,null,i.a.createElement("div",{className:"react-players__hidden"},i.a.createElement(y.a,S("youtube.com")),i.a.createElement(d.a,S("soundcloud.com"))),i.a.createElement("button",{onClick:function(){return a(r>0?r-1:r)}},"Previous"),i.a.createElement("button",{onClick:function(){return n(!t)}},t?"Pause":"Play"),i.a.createElement("button",{onClick:O},"Next"),i.a.createElement("button",{onClick:function(){w.current&&w.current.seekTo(w.current.getDuration()-5)}},"Skip to end"),i.a.createElement("button",{onClick:function(){return _(!E)}},E?"Unmute":"Mute"),i.a.createElement("input",{type:"range",min:"0",max:"1",step:"0.01",defaultValue:p,onChange:function(e){return m(parseFloat(e.currentTarget.value))}}),i.a.createElement(b,{songs:o,currentSong:r,setCurrentSong:a,setPlaying:n}))},h={"youtube.com":"https://www.youtube.com/watch?v=GlCmAC4MHek","soundcloud.com":"https://soundcloud.com/seucheu/john-cage-433-8-bit-version"},g=n(16),E=n.n(g),_=n(26),k=n(63),O=n.n(k),w=n(64),S="webapp:listennit:v".concat(w.a," (by /u/twistitup)");var j,C=function(){return void 0!==a&&void 0!==r&&r.expiresOn.getTime()-1e4>Date.now()},P=function(){var e=Object(_.a)(E.a.mark((function e(){var t,n,o;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new FormData).set("grant_type","https://oauth.reddit.com/grants/installed_client"),t.set("device_id","DO_NOT_TRACK_THIS_DEVICE"),e.next=5,fetch("https://www.reddit.com/api/v1/access_token",{method:"post",headers:{authorization:"Basic ".concat(btoa("jihSDVLVs-dA0Q:"))},body:t});case 5:if((n=e.sent).ok){e.next=8;break}throw new Error("Failed to retrieve OAuth token.");case 8:return e.next=10,n.json();case 10:if(o=e.sent,"string"===typeof(c=o).access_token&&"number"===typeof c.expires_in){e.next=13;break}throw new Error("Received wrongly formatted OAuth token.");case 13:(r=o).expiresOn=new Date(Date.now()+1e3*o.expires_in),void 0!==a?a.accessToken=r.access_token:a=new O.a({userAgent:S,accessToken:r.access_token});case 16:case"end":return e.stop()}var c}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(e){return void 0===e?[]:e.reduce((function(e,t){var n=T(t);return void 0===n?e:e.concat(n)}),[])},T=function(e){var t;if(null!==e.secure_media&&("youtube.com"===(t=e.secure_media.type)||"soundcloud.com"===t))return{title:e.title,commentsUrl:e.permalink,url:e.url,platform:e.secure_media.type,votes:e.score}},A=function(e){var t=e.playlistEvent,n=e.setPlaylistEvent,r=e.subreddit,c=e.listing,u=e.setListing,i=e.songs,s=e.setSongs,l=e.fetchMoreOptions;if("ready"===t.type)return null;j&&j.cancel();var f=function(){if(o)throw o;if(C())return a;throw P().catch((function(e){o=e}))}();if("refresh"===t.type||void 0===c&&"fetchMore"===t.type)throw function(){var e=Object(_.a)(E.a.mark((function e(){var t;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j=f.getSubreddit(r).getHot().finally((function(){return n({type:"ready"})})),e.next=3,j;case 3:t=e.sent,u(t),s(x(t));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();if("fetchMore"===t.type&&void 0!==c)throw function(){var e=Object(_.a)(E.a.mark((function e(){var t,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=c,r=[];case 2:if(!(r.length<=i.length)){e.next=10;break}return j=t.fetchMore(l).finally((function(){return n({type:"ready"})})),e.next=6,j;case 6:t=e.sent,r=x(t),e.next=2;break;case 10:u(t),s(r);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();return null},N=function(){var e=Object(u.useState)({type:"refresh"}),t=Object(f.a)(e,2),n=t[0],r=t[1],a=Object(u.useState)("lofi"),o=Object(f.a)(a,2),c=o[0],s=o[1],l=Object(u.useState)(),p=Object(f.a)(l,2),d=p[0],m=p[1],y=Object(u.useState)([]),b=Object(f.a)(y,2),h=b[0],g=b[1],E=Object(u.useState)(-1),_=Object(f.a)(E,2),k=_[0],O=_[1],w=Object(u.useState)(!1),S=Object(f.a)(w,2),j=S[0],C=S[1],P=Object(u.useState)(3),x=Object(f.a)(P,2),T=x[0],N=x[1],D=i.a.createElement("button",{onClick:function(){N(T-1),C(!j)}},"Press ",T>1?"".concat(T," times"):"once"," to unlock");return i.a.createElement(u.Fragment,null,T>0&&D,i.a.createElement("div",{className:T>0?"app__hidden":""},i.a.createElement("input",{onKeyPress:function(e){"Enter"===e.key&&(s(e.currentTarget.value),r({type:"refresh"}),O(0))}}),"Current subreddit: ",c,i.a.createElement(v,{playing:j,setPlaying:C,currentSong:k,setCurrentSong:O,songs:h,setPlaylistEvent:r}),i.a.createElement(u.Suspense,{fallback:i.a.createElement("div",null,"Loading...")},i.a.createElement(A,{playlistEvent:n,setPlaylistEvent:r,subreddit:c,listing:d,setListing:m,songs:h,setSongs:g,fetchMoreOptions:{amount:10,append:!0}})),i.a.createElement("button",{onClick:function(){r({type:"fetchMore"})}},"Fetch more")))};n(124);c.a({dsn:"https://2629efcaab0d4c5db98fbe261426b8b1@sentry.io/1779699",environment:"production",release:Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_SENTRY_RELEASE:"50ea712bd8fd5effbb79201488645e1a4ca6e550",REACT_APP_SENTRY_DSN:"https://2629efcaab0d4c5db98fbe261426b8b1@sentry.io/1779699"}).REACT_APP_COMMIT_ID}),l.a.render(i.a.createElement(N,null),document.getElementById("root"))},49:function(e,t){},53:function(e,t){},64:function(e){e.exports=JSON.parse('{"a":"0.1.0"}')},67:function(e,t,n){e.exports=n(126)},72:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},86:function(e,t){},95:function(e,t){}},[[67,1,2]]]);
//# sourceMappingURL=main.4fac7b8d.chunk.js.map