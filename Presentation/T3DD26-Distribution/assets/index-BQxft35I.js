(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t)=>{for(let n in t)e[n]=t[n];return e},t=(e,t)=>Array.from(e.querySelectorAll(t)),n=(e,t,n)=>{n?e.classList.add(t):e.classList.remove(t)},r=e=>{if(typeof e==`string`){if(e===`null`)return null;if(e===`true`)return!0;if(e===`false`)return!1;if(e.match(/^-?[\d\.]+$/))return parseFloat(e)}return e},i=(e,t)=>{e.style.transform=t},a=(e,t)=>{let n=e.matches||e.matchesSelector||e.msMatchesSelector;return!!(n&&n.call(e,t))},o=(e,t)=>{if(e&&typeof e.closest==`function`)return e.closest(t);for(;e;){if(a(e,t))return e;e=e.parentElement}return null},s=e=>{e||=document.documentElement;let t=e.requestFullscreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;t&&t.apply(e)},c=(e,t,n,r=``)=>{let i=e.querySelectorAll(`.`+n);for(let t=0;t<i.length;t++){let n=i[t];if(n.parentNode===e)return n}let a=document.createElement(t);return a.className=n,a.innerHTML=r,e.appendChild(a),a},l=e=>{let t=document.createElement(`style`);return e&&e.length>0&&t.appendChild(document.createTextNode(e)),document.head.appendChild(t),t},u=()=>{let e={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,t=>{let n=t.split(`=`).shift(),r=t.split(`=`).pop();return n&&r!==void 0&&(e[n]=r),t});for(let t in e){let n=e[t];e[t]=r(unescape(n))}return e.dependencies!==void 0&&delete e.dependencies,e},d=(e,t=0)=>{if(e){let n,r=e.style.height;return e.style.height=`0px`,e.parentElement&&(e.parentElement.style.height=`auto`),n=t-(e.parentElement?.offsetHeight||0),e.style.height=r+`px`,e.parentElement&&e.parentElement.style.removeProperty(`height`),n}return t},f={mp4:`video/mp4`,m4a:`video/mp4`,ogv:`video/ogg`,mpeg:`video/mpeg`,webm:`video/webm`},p=(e=``)=>{let t=e.split(`.`).pop();return t?f[t]:void 0},m=(e=``)=>encodeURI(e).replace(/%5B/g,`[`).replace(/%5D/g,`]`).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),h=navigator.userAgent,g=/(iphone|ipod|ipad|android)/gi.test(h)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1;/chrome/i.test(h)&&/edge/i.test(h);var _=/android/gi.test(h),v=function(e){if(e){var t=function(e){return[].slice.call(e)},n=0,r=1,i=2,a=3,o=[],s=null,c=`requestAnimationFrame`in e?function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{sync:!1};e.cancelAnimationFrame(s);var n=function(){return u(o.filter((function(e){return e.dirty&&e.active})))};if(t.sync)return n();s=e.requestAnimationFrame(n)}:function(){},l=function(e){return function(t){o.forEach((function(t){return t.dirty=e})),c(t)}},u=function(e){e.filter((function(e){return!e.styleComputed})).forEach((function(e){e.styleComputed=m(e)})),e.filter(h).forEach(g);var t=e.filter(p);t.forEach(f),t.forEach((function(e){g(e),d(e)})),t.forEach(_)},d=function(e){return e.dirty=n},f=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?`normal`:`nowrap`},p=function(e){return e.dirty!==i||e.dirty===i&&e.element.parentNode.clientWidth!==e.availableWidth},m=function(t){var n=e.getComputedStyle(t.element,null);return t.currentFontSize=parseFloat(n.getPropertyValue(`font-size`)),t.display=n.getPropertyValue(`display`),t.whiteSpace=n.getPropertyValue(`white-space`),!0},h=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display=`inline-block`),e.whiteSpace!==`nowrap`&&(t=!0,e.whiteSpace=`nowrap`),e.preStyleTestCompleted=!0,t)},g=function(e){e.element.style.whiteSpace=e.whiteSpace,e.element.style.display=e.display,e.element.style.fontSize=e.currentFontSize+`px`},_=function(e){e.element.dispatchEvent(new CustomEvent(`fit`,{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},v=function(e,t){return function(n){e.dirty=t,e.active&&c(n)}},y=function(e){return function(){o=o.filter((function(t){return t.element!==e.element})),e.observeMutations&&e.observer.disconnect(),e.element.style.whiteSpace=e.originalStyle.whiteSpace,e.element.style.display=e.originalStyle.display,e.element.style.fontSize=e.originalStyle.fontSize}},ee=function(e){return function(){e.active||(e.active=!0,c())}},b=function(e){return function(){return e.active=!1}},x=function(e){e.observeMutations&&(e.observer=new MutationObserver(v(e,r)),e.observer.observe(e.element,e.observeMutations))},te={minSize:16,maxSize:512,multiLine:!0,observeMutations:`MutationObserver`in e&&{subtree:!0,childList:!0,characterData:!0}},S=null,C=function(){e.clearTimeout(S),S=e.setTimeout(l(i),re.observeWindowDelay)},ne=[`resize`,`orientationchange`];return Object.defineProperty(re,"observeWindow",{set:function(t){var n=`${t?`add`:`remove`}EventListener`;ne.forEach((function(t){e[n](t,C)}))}}),re.observeWindow=!0,re.observeWindowDelay=100,re.fitAll=l(a),re}function w(e,t){var n=Object.assign({},te,t),r=e.map((function(e){var t=Object.assign({},n,{element:e,active:!0});return function(e){e.originalStyle={whiteSpace:e.element.style.whiteSpace,display:e.element.style.display,fontSize:e.element.style.fontSize},x(e),e.newbie=!0,e.dirty=!0,o.push(e)}(t),{element:e,fit:v(t,a),unfreeze:ee(t),freeze:b(t),unsubscribe:y(t)}}));return c(),r}function re(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return typeof e==`string`?w(t(document.querySelectorAll(e)),n):w([e],n)[0]}}(typeof window>`u`?null:window);function y(e){"@babel/helpers - typeof";return y=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},y(e)}function ee(e,t){if(y(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(y(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function b(e){var t=ee(e,`string`);return y(t)==`symbol`?t:t+``}function x(e,t,n){return(t=b(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var te=class{constructor(e){x(this,`allowedToPlayAudio`,null),this.Reveal=e,this.startEmbeddedMedia=this.startEmbeddedMedia.bind(this),this.startEmbeddedIframe=this.startEmbeddedIframe.bind(this),this.preventIframeAutoFocus=this.preventIframeAutoFocus.bind(this),this.ensureMobileMediaPlaying=this.ensureMobileMediaPlaying.bind(this),this.failedAudioPlaybackTargets=new Set,this.failedVideoPlaybackTargets=new Set,this.failedMutedVideoPlaybackTargets=new Set,this.renderMediaPlayButton()}renderMediaPlayButton(){this.mediaPlayButton=document.createElement(`button`),this.mediaPlayButton.className=`r-overlay-button r-media-play-button`,this.mediaPlayButton.addEventListener(`click`,()=>{this.resetTemporarilyMutedMedia(),new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{this.startEmbeddedMedia({target:e})}),this.clearMediaPlaybackErrors()})}shouldPreload(e){if(this.Reveal.isScrollView())return!0;let t=this.Reveal.getConfig().preloadIframes;return typeof t!=`boolean`&&(t=e.hasAttribute(`data-preload`)),t}load(e,n={}){let r=this.Reveal.getConfig().display;if(r.includes(`!important`)){let t=r.replace(/\s*!important\s*$/,``).trim();e.style.setProperty(`display`,t,`important`)}else e.style.display=r;t(e,`img[data-src], video[data-src], audio[data-src], iframe[data-src]`).forEach(e=>{let t=e.tagName===`IFRAME`;(!t||this.shouldPreload(e))&&(e.setAttribute(`src`,e.getAttribute(`data-src`)),e.setAttribute(`data-lazy-loaded`,``),e.removeAttribute(`data-src`),t&&e.addEventListener(`load`,this.preventIframeAutoFocus))}),t(e,`video, audio`).forEach(e=>{let n=0;t(e,`source[data-src]`).forEach(e=>{e.setAttribute(`src`,e.getAttribute(`data-src`)),e.removeAttribute(`data-src`),e.setAttribute(`data-lazy-loaded`,``),n+=1}),g&&e.tagName===`VIDEO`&&e.setAttribute(`playsinline`,``),n>0&&e.load()});let i=e.slideBackgroundElement;if(i){i.style.display=`block`;let t=e.slideBackgroundContentElement,r=e.getAttribute(`data-background-iframe`);if(i.hasAttribute(`data-loaded`)===!1){i.setAttribute(`data-loaded`,`true`);let a=e.getAttribute(`data-background-image`),o=e.getAttribute(`data-background-video`),s=e.hasAttribute(`data-background-video-loop`),c=e.hasAttribute(`data-background-video-muted`);if(a)/^data:/.test(a.trim())?t.style.backgroundImage=`url(${a.trim()})`:t.style.backgroundImage=a.split(`,`).map(e=>`url(${m(decodeURI(e.trim()))})`).join(`,`);else if(o){let e=document.createElement(`video`);s&&e.setAttribute(`loop`,``),(c||this.Reveal.isSpeakerNotes())&&(e.muted=!0),g&&e.setAttribute(`playsinline`,``),o.split(`,`).forEach(t=>{let n=document.createElement(`source`);n.setAttribute(`src`,t);let r=p(t);r&&n.setAttribute(`type`,r),e.appendChild(n)}),t.appendChild(e)}else if(r&&n.excludeIframes!==!0){let e=document.createElement(`iframe`);e.setAttribute(`allowfullscreen`,``),e.setAttribute(`mozallowfullscreen`,``),e.setAttribute(`webkitallowfullscreen`,``),e.setAttribute(`allow`,`autoplay`),e.setAttribute(`data-src`,r),e.style.width=`100%`,e.style.height=`100%`,e.style.maxHeight=`100%`,e.style.maxWidth=`100%`,t.appendChild(e)}}let a=t.querySelector(`iframe[data-src]`);a&&this.shouldPreload(i)&&!/autoplay=(1|true|yes)/gi.test(r)&&a.getAttribute(`src`)!==r&&a.setAttribute(`src`,r)}this.layout(e)}layout(e){Array.from(e.querySelectorAll(`.r-fit-text`)).forEach(e=>{v(e,{minSize:24,maxSize:this.Reveal.getConfig().height*.8,observeMutations:!1,observeWindow:!1})})}unload(e){e.style.display=`none`;let n=this.Reveal.getSlideBackground(e);n&&(n.style.display=`none`,t(n,`iframe[src]`).forEach(e=>{e.removeAttribute(`src`)})),t(e,`video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]`).forEach(e=>{e.setAttribute(`data-src`,e.getAttribute(`src`)),e.removeAttribute(`src`)}),t(e,`video[data-lazy-loaded] source[src], audio source[src]`).forEach(e=>{e.setAttribute(`data-src`,e.getAttribute(`src`)),e.removeAttribute(`src`)})}formatEmbeddedContent(){let e=(e,n,r)=>{t(this.Reveal.getSlidesElement(),`iframe[`+e+`*="`+n+`"]`).forEach(t=>{let n=t.getAttribute(e);n&&n.indexOf(r)===-1&&t.setAttribute(e,n+(/\?/.test(n)?`&`:`?`)+r)})};e(`src`,`youtube.com/embed/`,`enablejsapi=1`),e(`data-src`,`youtube.com/embed/`,`enablejsapi=1`),e(`src`,`player.vimeo.com/`,`api=1`),e(`data-src`,`player.vimeo.com/`,`api=1`)}startEmbeddedContent(e){if(e){let n=this.Reveal.isSpeakerNotes();t(e,`img[src$=".gif"]`).forEach(e=>{e.setAttribute(`src`,e.getAttribute(`src`))}),t(e,`video, audio`).forEach(e=>{if(o(e,`.fragment`)&&!o(e,`.fragment.visible`))return;let t=this.Reveal.getConfig().autoPlayMedia;if(typeof t!=`boolean`&&(t=e.hasAttribute(`data-autoplay`)||!!o(e,`.slide-background`)),t&&typeof e.play==`function`){if(n&&!e.muted)return;e.readyState>1?this.startEmbeddedMedia({target:e}):g?(e.addEventListener(`canplay`,this.ensureMobileMediaPlaying),this.playMediaElement(e)):(e.removeEventListener(`loadeddata`,this.startEmbeddedMedia),e.addEventListener(`loadeddata`,this.startEmbeddedMedia))}}),n||(t(e,`iframe[src]`).forEach(e=>{o(e,`.fragment`)&&!o(e,`.fragment.visible`)||this.startEmbeddedIframe({target:e})}),t(e,`iframe[data-src]`).forEach(e=>{o(e,`.fragment`)&&!o(e,`.fragment.visible`)||e.getAttribute(`src`)!==e.getAttribute(`data-src`)&&(e.removeEventListener(`load`,this.startEmbeddedIframe),e.addEventListener(`load`,this.startEmbeddedIframe),e.setAttribute(`src`,e.getAttribute(`data-src`)))}))}}ensureMobileMediaPlaying(e){let t=e.target;typeof t.getVideoPlaybackQuality==`function`&&setTimeout(()=>{let e=t.paused===!1,n=t.getVideoPlaybackQuality().totalVideoFrames;e&&n===0&&(t.load(),t.play())},1e3)}startEmbeddedMedia(e){let t=!!o(e.target,`html`),n=!!o(e.target,`.present`);t&&n&&(e.target.paused||e.target.ended)&&(e.target.currentTime=0,this.playMediaElement(e.target)),e.target.removeEventListener(`loadeddata`,this.startEmbeddedMedia)}playMediaElement(e){let t=e.play();t&&typeof t.catch==`function`&&t.then(()=>{e.muted||(this.allowedToPlayAudio=!0)}).catch(t=>{if(t.name===`NotAllowedError`){if(this.allowedToPlayAudio=!1,e.tagName===`VIDEO`){this.onVideoPlaybackNotAllowed(e);let t=!!o(e,`html`),n=!!o(e,`.present`),r=e.muted;t&&n&&!r&&(e.setAttribute(`data-muted-by-reveal`,`true`),e.muted=!0,e.play().catch(()=>{this.onMutedVideoPlaybackNotAllowed(e)}))}else e.tagName===`AUDIO`&&this.onAudioPlaybackNotAllowed(e)}})}startEmbeddedIframe(e){let t=e.target;if(this.preventIframeAutoFocus(e),t&&t.contentWindow){let n=!!o(e.target,`html`),r=!!o(e.target,`.present`);if(n&&r){let e=this.Reveal.getConfig().autoPlayMedia;typeof e!=`boolean`&&(e=t.hasAttribute(`data-autoplay`)||!!o(t,`.slide-background`)),/youtube\.com\/embed\//.test(t.getAttribute(`src`))&&e?t.contentWindow.postMessage(`{"event":"command","func":"playVideo","args":""}`,`*`):/player\.vimeo\.com\//.test(t.getAttribute(`src`))&&e?t.contentWindow.postMessage(`{"method":"play"}`,`*`):t.contentWindow.postMessage(`slide:start`,`*`)}}}stopEmbeddedContent(n,r={}){r=e({unloadIframes:!0},r),n&&n.parentNode&&(t(n,`video, audio`).forEach(e=>{!e.hasAttribute(`data-ignore`)&&typeof e.pause==`function`&&(e.setAttribute(`data-paused-by-reveal`,``),e.pause(),g&&e.removeEventListener(`canplay`,this.ensureMobileMediaPlaying))}),t(n,`iframe`).forEach(e=>{e.contentWindow&&e.contentWindow.postMessage(`slide:stop`,`*`),e.removeEventListener(`load`,this.preventIframeAutoFocus),e.removeEventListener(`load`,this.startEmbeddedIframe)}),t(n,`iframe[src*="youtube.com/embed/"]`).forEach(e=>{!e.hasAttribute(`data-ignore`)&&e.contentWindow&&typeof e.contentWindow.postMessage==`function`&&e.contentWindow.postMessage(`{"event":"command","func":"pauseVideo","args":""}`,`*`)}),t(n,`iframe[src*="player.vimeo.com/"]`).forEach(e=>{!e.hasAttribute(`data-ignore`)&&e.contentWindow&&typeof e.contentWindow.postMessage==`function`&&e.contentWindow.postMessage(`{"method":"pause"}`,`*`)}),r.unloadIframes===!0&&t(n,`iframe[data-src]`).forEach(e=>{e.setAttribute(`src`,`about:blank`),e.removeAttribute(`src`)}))}isAllowedToPlayAudio(){return this.allowedToPlayAudio}showPlayOrUnmuteButton(){let e=this.failedAudioPlaybackTargets.size,t=this.failedVideoPlaybackTargets.size,n=this.failedMutedVideoPlaybackTargets.size,r=`Play media`;n>0?r=`Play video`:t>0?r=`Unmute video`:e>0&&(r=`Play audio`),this.mediaPlayButton.textContent=r,this.Reveal.getRevealElement().appendChild(this.mediaPlayButton)}onAudioPlaybackNotAllowed(e){this.failedAudioPlaybackTargets.add(e),this.showPlayOrUnmuteButton(e)}onVideoPlaybackNotAllowed(e){this.failedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}onMutedVideoPlaybackNotAllowed(e){this.failedMutedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}resetTemporarilyMutedMedia(){new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{e.hasAttribute(`data-muted-by-reveal`)&&(e.muted=!1,e.removeAttribute(`data-muted-by-reveal`))})}clearMediaPlaybackErrors(){this.resetTemporarilyMutedMedia(),this.failedAudioPlaybackTargets.clear(),this.failedVideoPlaybackTargets.clear(),this.failedMutedVideoPlaybackTargets.clear(),this.mediaPlayButton&&this.mediaPlayButton.parentNode&&this.mediaPlayButton.remove()}preventIframeAutoFocus(e){let t=e.target;if(t&&this.Reveal.getConfig().preventIframeAutoFocus){let e=0,n=()=>{document.activeElement===t?document.activeElement.blur():e<1e3&&(e+=100,setTimeout(n,100))};setTimeout(n,100)}}afterSlideChanged(){this.clearMediaPlaybackErrors()}},S=`.slides section`,C=`.slides>section`,ne=`.slides>section.present>section`,w=`.backgrounds>.slide-background`,re=/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview|previewIframe/,ie=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement(`div`),this.element.className=`slide-number`,this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){let n=`none`;e.slideNumber&&!this.Reveal.isPrintView()&&(e.showSlideNumber===`all`||e.showSlideNumber===`speaker`&&this.Reveal.isSpeakerNotes())&&(n=`block`),this.element.style.display=n}update(){this.Reveal.getConfig().slideNumber&&this.element&&(this.element.innerHTML=this.getSlideNumber())}getSlideNumber(e=this.Reveal.getCurrentSlide()){let t=this.Reveal.getConfig(),n,r=`h.v`;if(typeof t.slideNumber==`function`)n=t.slideNumber(e);else{typeof t.slideNumber==`string`&&(r=t.slideNumber),!/c/.test(r)&&this.Reveal.getHorizontalSlides().length===1&&(r=`c`);let i=e&&e.dataset.visibility===`uncounted`?0:1;switch(n=[],r){case`c`:n.push(this.Reveal.getSlidePastCount(e)+i);break;case`c/t`:n.push(this.Reveal.getSlidePastCount(e)+i,`/`,this.Reveal.getTotalSlides());break;default:let t=this.Reveal.getIndices(e);n.push(t.h+i);let a=r===`h/v`?`/`:`.`;this.Reveal.isVerticalSlide(e)&&n.push(a,t.v+1)}}let i=`#`+this.Reveal.location.getHash(e);return this.formatNumber(n[0],n[1],n[2],i)}formatNumber(e,t,n,r=`#`+this.Reveal.location.getHash()){return typeof n==`number`&&!isNaN(n)?`<a href="${r}">
					<span class="slide-number-a">${e}</span>
					<span class="slide-number-delimiter">${t}</span>
					<span class="slide-number-b">${n}</span>
					</a>`:`<a href="${r}">
					<span class="slide-number-a">${e}</span>
					</a>`}destroy(){this.element.remove()}},ae=class{constructor(e){this.Reveal=e,this.onInput=this.onInput.bind(this),this.onBlur=this.onBlur.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}render(){this.element=document.createElement(`div`),this.element.className=`jump-to-slide`,this.jumpInput=document.createElement(`input`),this.jumpInput.type=`text`,this.jumpInput.className=`jump-to-slide-input`,this.jumpInput.placeholder=`Jump to slide`,this.jumpInput.addEventListener(`input`,this.onInput),this.jumpInput.addEventListener(`keydown`,this.onKeyDown),this.jumpInput.addEventListener(`blur`,this.onBlur),this.element.appendChild(this.jumpInput)}show(){this.indicesOnShow=this.Reveal.getIndices(),this.Reveal.getRevealElement().appendChild(this.element),this.jumpInput.focus()}hide(){this.isVisible()&&(this.element.remove(),this.jumpInput.value=``,clearTimeout(this.jumpTimeout),delete this.jumpTimeout)}isVisible(){return!!this.element.parentNode}jump(){clearTimeout(this.jumpTimeout),delete this.jumpTimeout;let e=this.jumpInput.value.trim(``),t;if(/^\d+$/.test(e)){let n=this.Reveal.getConfig().slideNumber;if(n===`c`||n===`c/t`){let n=this.Reveal.getSlides()[parseInt(e,10)-1];n&&(t=this.Reveal.getIndices(n))}}return t||=(/^\d+\.\d+$/.test(e)&&(e=e.replace(`.`,`/`)),this.Reveal.location.getIndicesFromHash(e,{oneBasedIndex:!0})),!t&&/\S+/i.test(e)&&e.length>1&&(t=this.search(e)),t&&e!==``?(this.Reveal.slide(t.h,t.v,t.f),!0):(this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),!1)}jumpAfter(e){clearTimeout(this.jumpTimeout),this.jumpTimeout=setTimeout(()=>this.jump(),e)}search(e){let t=RegExp(`\\b`+e.trim()+`\\b`,`i`),n=this.Reveal.getSlides().find(e=>t.test(e.innerText));return n?this.Reveal.getIndices(n):null}cancel(){this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),this.hide()}confirm(){this.jump(),this.hide()}destroy(){this.jumpInput.removeEventListener(`input`,this.onInput),this.jumpInput.removeEventListener(`keydown`,this.onKeyDown),this.jumpInput.removeEventListener(`blur`,this.onBlur),this.element.remove()}onKeyDown(e){e.keyCode===13?this.confirm():e.keyCode===27&&(this.cancel(),e.stopImmediatePropagation())}onInput(e){this.jumpAfter(200)}onBlur(){setTimeout(()=>this.hide(),1)}},T=e=>{let t=e.match(/^#([0-9a-f]{3})$/i);if(t&&t[1]){let e=t[1];return{r:parseInt(e.charAt(0),16)*17,g:parseInt(e.charAt(1),16)*17,b:parseInt(e.charAt(2),16)*17}}let n=e.match(/^#([0-9a-f]{6})$/i);if(n&&n[1]){let e=n[1];return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)}}let r=e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(r)return{r:parseInt(r[1],10),g:parseInt(r[2],10),b:parseInt(r[3],10)};let i=e.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);return i?{r:parseInt(i[1],10),g:parseInt(i[2],10),b:parseInt(i[3],10),a:parseFloat(i[4])}:null},oe=e=>(typeof e==`string`&&(e=T(e)),e?(e.r*299+e.g*587+e.b*114)/1e3:null),se=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement(`div`),this.element.className=`backgrounds`,this.Reveal.getRevealElement().appendChild(this.element)}create(){this.element.innerHTML=``,this.element.classList.add(`no-transition`),this.Reveal.getHorizontalSlides().forEach(e=>{let n=this.createBackground(e,this.element);t(e,`section`).forEach(e=>{this.createBackground(e,n),n.classList.add(`stack`)})}),this.Reveal.getConfig().parallaxBackgroundImage?(this.element.style.backgroundImage=`url("`+this.Reveal.getConfig().parallaxBackgroundImage+`")`,this.element.style.backgroundSize=this.Reveal.getConfig().parallaxBackgroundSize,this.element.style.backgroundRepeat=this.Reveal.getConfig().parallaxBackgroundRepeat,this.element.style.backgroundPosition=this.Reveal.getConfig().parallaxBackgroundPosition,setTimeout(()=>{this.Reveal.getRevealElement().classList.add(`has-parallax-background`)},1)):(this.element.style.backgroundImage=``,this.Reveal.getRevealElement().classList.remove(`has-parallax-background`))}createBackground(e,t){let n=document.createElement(`div`);n.className=`slide-background `+e.className.replace(/present|past|future/,``);let r=document.createElement(`div`);return r.className=`slide-background-content`,n.appendChild(r),t.appendChild(n),e.slideBackgroundElement=n,e.slideBackgroundContentElement=r,this.sync(e),n}sync(e){let t=e.slideBackgroundElement,n=e.slideBackgroundContentElement,r={background:e.getAttribute(`data-background`),backgroundSize:e.getAttribute(`data-background-size`),backgroundImage:e.getAttribute(`data-background-image`),backgroundVideo:e.getAttribute(`data-background-video`),backgroundIframe:e.getAttribute(`data-background-iframe`),backgroundColor:e.getAttribute(`data-background-color`),backgroundGradient:e.getAttribute(`data-background-gradient`),backgroundRepeat:e.getAttribute(`data-background-repeat`),backgroundPosition:e.getAttribute(`data-background-position`),backgroundTransition:e.getAttribute(`data-background-transition`),backgroundOpacity:e.getAttribute(`data-background-opacity`)},i=e.hasAttribute(`data-preload`);e.classList.remove(`has-dark-background`),e.classList.remove(`has-light-background`),t.removeAttribute(`data-loaded`),t.removeAttribute(`data-background-hash`),t.removeAttribute(`data-background-size`),t.removeAttribute(`data-background-transition`),t.style.backgroundColor=``,n.style.backgroundSize=``,n.style.backgroundRepeat=``,n.style.backgroundPosition=``,n.style.backgroundImage=``,n.style.opacity=``,n.innerHTML=``,r.background&&(/^(http|file|\/\/)/gi.test(r.background)||/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(r.background)?e.setAttribute(`data-background-image`,r.background):t.style.background=r.background),(r.background||r.backgroundColor||r.backgroundGradient||r.backgroundImage||r.backgroundVideo||r.backgroundIframe)&&t.setAttribute(`data-background-hash`,r.background+r.backgroundSize+r.backgroundImage+r.backgroundVideo+r.backgroundIframe+r.backgroundColor+r.backgroundGradient+r.backgroundRepeat+r.backgroundPosition+r.backgroundTransition+r.backgroundOpacity),r.backgroundSize&&t.setAttribute(`data-background-size`,r.backgroundSize),r.backgroundColor&&(t.style.backgroundColor=r.backgroundColor),r.backgroundGradient&&(t.style.backgroundImage=r.backgroundGradient),r.backgroundTransition&&t.setAttribute(`data-background-transition`,r.backgroundTransition),i&&t.setAttribute(`data-preload`,``),r.backgroundSize&&(n.style.backgroundSize=r.backgroundSize),r.backgroundRepeat&&(n.style.backgroundRepeat=r.backgroundRepeat),r.backgroundPosition&&(n.style.backgroundPosition=r.backgroundPosition),r.backgroundOpacity&&(n.style.opacity=r.backgroundOpacity);let a=this.getContrastClass(e);typeof a==`string`&&e.classList.add(a)}getContrastClass(e){let t=e.slideBackgroundElement,n=e.getAttribute(`data-background-color`);if(!n||!T(n)){let e=window.getComputedStyle(t);e&&e.backgroundColor&&(n=e.backgroundColor)}if(n){let e=T(n);if(e&&e.a!==0)return oe(n)<128?`has-dark-background`:`has-light-background`}return null}bubbleSlideContrastClassToElement(e,t){[`has-light-background`,`has-dark-background`].forEach(n=>{e.classList.contains(n)?t.classList.add(n):t.classList.remove(n)},this)}update(e=!1){let n=this.Reveal.getConfig(),r=this.Reveal.getCurrentSlide(),i=this.Reveal.getIndices(),a=null,o=n.rtl?`future`:`past`,s=n.rtl?`past`:`future`;if(Array.from(this.element.childNodes).forEach((n,r)=>{n.classList.remove(`past`,`present`,`future`),r<i.h?n.classList.add(o):r>i.h?n.classList.add(s):(n.classList.add(`present`),a=n),(e||r===i.h)&&t(n,`.slide-background`).forEach((e,t)=>{e.classList.remove(`past`,`present`,`future`);let n=typeof i.v==`number`?i.v:0;t<n?e.classList.add(`past`):t>n?e.classList.add(`future`):(e.classList.add(`present`),r===i.h&&(a=e))})}),this.previousBackground&&!this.previousBackground.closest(`body`)&&(this.previousBackground=null),a&&this.previousBackground){let e=this.previousBackground.getAttribute(`data-background-hash`),t=a.getAttribute(`data-background-hash`);if(t&&t===e&&a!==this.previousBackground){this.element.classList.add(`no-transition`);let e=a.querySelector(`video`),t=this.previousBackground.querySelector(`video`);if(e&&t){let n=e.parentNode;t.parentNode.appendChild(e),n.appendChild(t)}}}let c=a!==this.previousBackground;if(c&&this.previousBackground&&this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground,{unloadIframes:!this.Reveal.slideContent.shouldPreload(this.previousBackground)}),c&&a){this.Reveal.slideContent.startEmbeddedContent(a);let e=a.querySelector(`.slide-background-content`);if(e){let t=e.style.backgroundImage||``;/\.gif/i.test(t)&&(e.style.backgroundImage=``,window.getComputedStyle(e).opacity,e.style.backgroundImage=t)}this.previousBackground=a}r&&this.bubbleSlideContrastClassToElement(r,this.Reveal.getRevealElement()),setTimeout(()=>{this.element.classList.remove(`no-transition`)},10)}updateParallax(){let e=this.Reveal.getIndices();if(this.Reveal.getConfig().parallaxBackgroundImage){let t=this.Reveal.getHorizontalSlides(),n=this.Reveal.getVerticalSlides(),r=this.element.style.backgroundSize.split(` `),i,a;r.length===1?i=a=parseInt(r[0],10):(i=parseInt(r[0],10),a=parseInt(r[1],10));let o=this.element.offsetWidth,s=t.length,c,l;c=typeof this.Reveal.getConfig().parallaxBackgroundHorizontal==`number`?this.Reveal.getConfig().parallaxBackgroundHorizontal:s>1?(i-o)/(s-1):0,l=c*e.h*-1;let u=this.element.offsetHeight,d=n.length,f,p;f=typeof this.Reveal.getConfig().parallaxBackgroundVertical==`number`?this.Reveal.getConfig().parallaxBackgroundVertical:(a-u)/(d-1),p=d>0?f*e.v:0,this.element.style.backgroundPosition=l+`px `+-p+`px`}}destroy(){this.element.remove()}},E=0,ce=class{constructor(e){this.Reveal=e}run(e,t){this.reset();let n=this.Reveal.getSlides(),r=n.indexOf(t),i=n.indexOf(e);if(e&&t&&e.hasAttribute(`data-auto-animate`)&&t.hasAttribute(`data-auto-animate`)&&e.getAttribute(`data-auto-animate-id`)===t.getAttribute(`data-auto-animate-id`)&&!(r>i?t:e).hasAttribute(`data-auto-animate-restart`)){this.autoAnimateStyleSheet=this.autoAnimateStyleSheet||l();let n=this.getAutoAnimateOptions(t);e.dataset.autoAnimate=`pending`,t.dataset.autoAnimate=`pending`,n.slideDirection=r>i?`forward`:`backward`;let a=e.style.display===`none`;a&&(e.style.display=this.Reveal.getConfig().display);let o=this.getAutoAnimatableElements(e,t).map(e=>this.autoAnimateElements(e.from,e.to,e.options||{},n,E++));if(a&&(e.style.display=`none`),t.dataset.autoAnimateUnmatched!==`false`&&this.Reveal.getConfig().autoAnimateUnmatched===!0){let e=n.duration*.8,r=n.duration*.2;this.getUnmatchedAutoAnimateElements(t).forEach(e=>{let t=this.getAutoAnimateOptions(e,n),r=`unmatched`;(t.duration!==n.duration||t.delay!==n.delay)&&(r=`unmatched-`+E++,o.push(`[data-auto-animate="running"] [data-auto-animate-target="${r}"] { transition: opacity ${t.duration}s ease ${t.delay}s; }`)),e.dataset.autoAnimateTarget=r},this),o.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${e}s ease ${r}s; }`)}this.autoAnimateStyleSheet.innerHTML=o.join(``),requestAnimationFrame(()=>{this.autoAnimateStyleSheet&&(getComputedStyle(this.autoAnimateStyleSheet).fontWeight,t.dataset.autoAnimate=`running`)}),this.Reveal.dispatchEvent({type:`autoanimate`,data:{fromSlide:e,toSlide:t,sheet:this.autoAnimateStyleSheet}})}}reset(){t(this.Reveal.getRevealElement(),`[data-auto-animate]:not([data-auto-animate=""])`).forEach(e=>{e.dataset.autoAnimate=``}),t(this.Reveal.getRevealElement(),`[data-auto-animate-target]`).forEach(e=>{delete e.dataset.autoAnimateTarget}),this.autoAnimateStyleSheet&&this.autoAnimateStyleSheet.parentNode&&(this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet),this.autoAnimateStyleSheet=null)}autoAnimateElements(e,t,n,r,i){e.dataset.autoAnimateTarget=``,t.dataset.autoAnimateTarget=i;let a=this.getAutoAnimateOptions(t,r);n.delay!==void 0&&(a.delay=n.delay),n.duration!==void 0&&(a.duration=n.duration),n.easing!==void 0&&(a.easing=n.easing);let o=this.getAutoAnimatableProperties(`from`,e,n),s=this.getAutoAnimatableProperties(`to`,t,n);if(t.classList.contains(`fragment`)&&delete s.styles.opacity,n.translate!==!1||n.scale!==!1){let e=this.Reveal.getScale(),t={x:(o.x-s.x)/e,y:(o.y-s.y)/e,scaleX:o.width/s.width,scaleY:o.height/s.height};t.x=Math.round(t.x*1e3)/1e3,t.y=Math.round(t.y*1e3)/1e3,t.scaleX=Math.round(t.scaleX*1e3)/1e3,t.scaleX=Math.round(t.scaleX*1e3)/1e3;let r=n.translate!==!1&&(t.x!==0||t.y!==0),i=n.scale!==!1&&(t.scaleX!==0||t.scaleY!==0);if(r||i){let e=[];r&&e.push(`translate(${t.x}px, ${t.y}px)`),i&&e.push(`scale(${t.scaleX}, ${t.scaleY})`),o.styles.transform=e.join(` `),o.styles[`transform-origin`]=`top left`,s.styles.transform=`none`}}for(let e in s.styles){let t=s.styles[e],n=o.styles[e];t===n?delete s.styles[e]:(t.explicitValue===!0&&(s.styles[e]=t.value),n.explicitValue===!0&&(o.styles[e]=n.value))}let c=``,l=Object.keys(s.styles);if(l.length>0){o.styles.transition=`none`,s.styles.transition=`all ${a.duration}s ${a.easing} ${a.delay}s`,s.styles[`transition-property`]=l.join(`, `),s.styles[`will-change`]=l.join(`, `);let e=Object.keys(o.styles).map(e=>e+`: `+o.styles[e]+` !important;`).join(``),t=Object.keys(s.styles).map(e=>e+`: `+s.styles[e]+` !important;`).join(``);c=`[data-auto-animate-target="`+i+`"] {`+e+`}[data-auto-animate="running"] [data-auto-animate-target="`+i+`"] {`+t+`}`}return c}getAutoAnimateOptions(t,n){let r={easing:this.Reveal.getConfig().autoAnimateEasing,duration:this.Reveal.getConfig().autoAnimateDuration,delay:0};if(r=e(r,n),t.parentNode){let e=o(t.parentNode,`[data-auto-animate-target]`);e&&(r=this.getAutoAnimateOptions(e,r))}return t.dataset.autoAnimateEasing&&(r.easing=t.dataset.autoAnimateEasing),t.dataset.autoAnimateDuration&&(r.duration=parseFloat(t.dataset.autoAnimateDuration)),t.dataset.autoAnimateDelay&&(r.delay=parseFloat(t.dataset.autoAnimateDelay)),r}getAutoAnimatableProperties(e,t,n){let r=this.Reveal.getConfig(),i={styles:[]};if(n.translate!==!1||n.scale!==!1){let e;if(typeof n.measure==`function`)e=n.measure(t);else if(r.center)e=t.getBoundingClientRect();else{let n=this.Reveal.getScale();e={x:t.offsetLeft*n,y:t.offsetTop*n,width:t.offsetWidth*n,height:t.offsetHeight*n}}i.x=e.x,i.y=e.y,i.width=e.width,i.height=e.height}let a=getComputedStyle(t);return(n.styles||r.autoAnimateStyles).forEach(t=>{let n;typeof t==`string`&&(t={property:t}),t.from!==void 0&&e===`from`?n={value:t.from,explicitValue:!0}:t.to!==void 0&&e===`to`?n={value:t.to,explicitValue:!0}:(t.property===`line-height`&&(n=parseFloat(a[`line-height`])/parseFloat(a[`font-size`])),isNaN(n)&&(n=a[t.property])),n!==``&&(i.styles[t.property]=n)}),i}getAutoAnimatableElements(e,t){let n=(typeof this.Reveal.getConfig().autoAnimateMatcher==`function`?this.Reveal.getConfig().autoAnimateMatcher:this.getAutoAnimatePairs).call(this,e,t),r=[];return n.filter((e,t)=>{if(r.indexOf(e.to)===-1)return r.push(e.to),!0})}getAutoAnimatePairs(e,t){let n=[],r=`h1, h2, h3, h4, h5, h6, p, li`;return this.findAutoAnimateMatches(n,e,t,`[data-id]`,e=>e.nodeName+`:::`+e.getAttribute(`data-id`)),this.findAutoAnimateMatches(n,e,t,r,e=>e.nodeName+`:::`+e.textContent.trim()),this.findAutoAnimateMatches(n,e,t,`img, video, iframe`,e=>e.nodeName+`:::`+(e.getAttribute(`src`)||e.getAttribute(`data-src`))),this.findAutoAnimateMatches(n,e,t,`pre`,e=>e.nodeName+`:::`+e.textContent.trim()),n.forEach(e=>{a(e.from,r)?e.options={scale:!1}:a(e.from,`pre`)&&(e.options={scale:!1,styles:[`width`,`height`]},this.findAutoAnimateMatches(n,e.from,e.to,`.hljs .hljs-ln-code`,e=>e.textContent,{scale:!1,styles:[],measure:this.getLocalBoundingBox.bind(this)}),this.findAutoAnimateMatches(n,e.from,e.to,`.hljs .hljs-ln-numbers[data-line-number]`,e=>e.getAttribute(`data-line-number`),{scale:!1,styles:[`width`],measure:this.getLocalBoundingBox.bind(this)}))},this),n}getLocalBoundingBox(e){let t=this.Reveal.getScale();return{x:Math.round(e.offsetLeft*t*100)/100,y:Math.round(e.offsetTop*t*100)/100,width:Math.round(e.offsetWidth*t*100)/100,height:Math.round(e.offsetHeight*t*100)/100}}findAutoAnimateMatches(e,t,n,r,i,a){let o={},s={};[].slice.call(t.querySelectorAll(r)).forEach((e,t)=>{let n=i(e);typeof n==`string`&&n.length&&(o[n]=o[n]||[],o[n].push(e))}),[].slice.call(n.querySelectorAll(r)).forEach((t,n)=>{let r=i(t);s[r]=s[r]||[],s[r].push(t);let c;if(o[r]){let e=s[r].length-1,t=o[r].length-1;o[r][e]?(c=o[r][e],o[r][e]=null):o[r][t]&&(c=o[r][t],o[r][t]=null)}c&&e.push({from:c,to:t,options:a})})}getUnmatchedAutoAnimateElements(e){return[].slice.call(e.children).reduce((e,t)=>{let n=t.querySelector(`[data-auto-animate-target]`);return!t.hasAttribute(`data-auto-animate-target`)&&!n&&e.push(t),t.querySelector(`[data-auto-animate-target]`)&&(e=e.concat(this.getUnmatchedAutoAnimateElements(t))),e},[])}},le=500,ue=4,de=6,D=8,fe=class{constructor(e){this.Reveal=e,this.active=!1,this.activatedCallbacks=[],this.onScroll=this.onScroll.bind(this)}activate(){if(this.active)return;let e=this.Reveal.getState();this.active=!0,this.slideHTMLBeforeActivation=this.Reveal.getSlidesElement().innerHTML;let n=t(this.Reveal.getRevealElement(),C),r=t(this.Reveal.getRevealElement(),w);this.viewportElement.classList.add(`loading-scroll-mode`,`reveal-scroll`);let i,a=window.getComputedStyle(this.viewportElement);a&&a.background&&(i=a.background);let o=[],s=n[0].parentNode,c,l=(e,t,n,a)=>{let s;if(c&&this.Reveal.shouldAutoAnimateBetween(c,e))s=document.createElement(`div`),s.className=`scroll-page-content scroll-auto-animate-page`,s.style.display=`none`,c.closest(`.scroll-page-content`).parentNode.appendChild(s);else{let e=document.createElement(`div`);if(e.className=`scroll-page`,o.push(e),a&&r.length>t){let n=r[t],a=window.getComputedStyle(n);a&&a.background?e.style.background=a.background:i&&(e.style.background=i)}else i&&(e.style.background=i);let n=document.createElement(`div`);n.className=`scroll-page-sticky`,e.appendChild(n),s=document.createElement(`div`),s.className=`scroll-page-content`,n.appendChild(s)}s.appendChild(e),e.classList.remove(`past`,`future`),e.setAttribute(`data-index-h`,t),e.setAttribute(`data-index-v`,n),e.slideBackgroundElement&&(e.slideBackgroundElement.remove(`past`,`future`),s.insertBefore(e.slideBackgroundElement,e)),c=e};n.forEach((e,t)=>{this.Reveal.isVerticalStack(e)?e.querySelectorAll(`section`).forEach((e,n)=>{l(e,t,n,!0)}):l(e,t,0)},this),this.createProgressBar(),t(this.Reveal.getRevealElement(),`.stack`).forEach(e=>e.remove()),o.forEach(e=>s.appendChild(e)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.layout(),this.Reveal.setState(e),this.activatedCallbacks.forEach(e=>e()),this.activatedCallbacks=[],this.restoreScrollPosition(),this.viewportElement.classList.remove(`loading-scroll-mode`),this.viewportElement.addEventListener(`scroll`,this.onScroll,{passive:!0})}deactivate(){if(!this.active)return;let e=this.Reveal.getState();this.active=!1,this.viewportElement.removeEventListener(`scroll`,this.onScroll),this.viewportElement.classList.remove(`reveal-scroll`),this.removeProgressBar(),this.Reveal.getSlidesElement().innerHTML=this.slideHTMLBeforeActivation,this.Reveal.sync(),this.Reveal.setState(e),this.slideHTMLBeforeActivation=null}toggle(e){typeof e==`boolean`?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}createProgressBar(){this.progressBar=document.createElement(`div`),this.progressBar.className=`scrollbar`,this.progressBarInner=document.createElement(`div`),this.progressBarInner.className=`scrollbar-inner`,this.progressBar.appendChild(this.progressBarInner),this.progressBarPlayhead=document.createElement(`div`),this.progressBarPlayhead.className=`scrollbar-playhead`,this.progressBarInner.appendChild(this.progressBarPlayhead),this.viewportElement.insertBefore(this.progressBar,this.viewportElement.firstChild);let e=e=>{let t=(e.clientY-this.progressBarInner.getBoundingClientRect().top)/this.progressBarHeight;t=Math.max(Math.min(t,1),0),this.viewportElement.scrollTop=t*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight)},t=n=>{this.draggingProgressBar=!1,this.showProgressBar(),document.removeEventListener(`mousemove`,e),document.removeEventListener(`mouseup`,t)};this.progressBarInner.addEventListener(`mousedown`,n=>{n.preventDefault(),this.draggingProgressBar=!0,document.addEventListener(`mousemove`,e),document.addEventListener(`mouseup`,t),e(n)})}removeProgressBar(){this.progressBar&&=(this.progressBar.remove(),null)}layout(){this.isActive()&&(this.syncPages(),this.syncScrollPosition())}syncPages(){let e=this.Reveal.getConfig(),t=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),n=this.Reveal.getScale(),r=e.scrollLayout===`compact`,i=this.viewportElement.offsetHeight,a=t.height*n,o=r?a:i;this.scrollTriggerHeight=r?a:i,this.viewportElement.style.setProperty(`--page-height`,o+`px`),this.viewportElement.style.scrollSnapType=typeof e.scrollSnap==`string`?`y ${e.scrollSnap}`:``,this.slideTriggers=[],this.pages=Array.from(this.Reveal.getRevealElement().querySelectorAll(`.scroll-page`)).map(n=>{let a=this.createPage({pageElement:n,slideElement:n.querySelector(`section`),stickyElement:n.querySelector(`.scroll-page-sticky`),contentElement:n.querySelector(`.scroll-page-content`),backgroundElement:n.querySelector(`.slide-background`),autoAnimateElements:n.querySelectorAll(`.scroll-auto-animate-page`),autoAnimatePages:[]});a.pageElement.style.setProperty(`--slide-height`,e.center===!0?`auto`:t.height+`px`),this.slideTriggers.push({page:a,activate:()=>this.activatePage(a),deactivate:()=>this.deactivatePage(a)}),this.createFragmentTriggersForPage(a),a.autoAnimateElements.length>0&&this.createAutoAnimateTriggersForPage(a);let s=Math.max(a.scrollTriggers.length-1,0);s+=a.autoAnimatePages.reduce((e,t)=>e+Math.max(t.scrollTriggers.length-1,0),a.autoAnimatePages.length),a.pageElement.querySelectorAll(`.scroll-snap-point`).forEach(e=>e.remove());for(let e=0;e<s+1;e++){let t=document.createElement(`div`);t.className=`scroll-snap-point`,t.style.height=this.scrollTriggerHeight+`px`,t.style.scrollSnapAlign=r?`center`:`start`,a.pageElement.appendChild(t),e===0&&(t.style.marginTop=-this.scrollTriggerHeight+`px`)}return r&&a.scrollTriggers.length>0?(a.pageHeight=i,a.pageElement.style.setProperty(`--page-height`,i+`px`)):(a.pageHeight=o,a.pageElement.style.removeProperty(`--page-height`)),a.scrollPadding=this.scrollTriggerHeight*s,a.totalHeight=a.pageHeight+a.scrollPadding,a.pageElement.style.setProperty(`--page-scroll-padding`,a.scrollPadding+`px`),s>0?(a.stickyElement.style.position=`sticky`,a.stickyElement.style.top=Math.max((i-a.pageHeight)/2,0)+`px`):(a.stickyElement.style.position=`relative`,a.pageElement.style.scrollSnapAlign=a.pageHeight<i?`center`:`start`),a}),this.setTriggerRanges(),this.viewportElement.setAttribute(`data-scrollbar`,e.scrollProgress),e.scrollProgress&&this.totalScrollTriggerCount>1?(this.progressBar||this.createProgressBar(),this.syncProgressBar()):this.removeProgressBar()}setTriggerRanges(){this.totalScrollTriggerCount=this.slideTriggers.reduce((e,t)=>e+Math.max(t.page.scrollTriggers.length,1),0);let e=0;this.slideTriggers.forEach((t,n)=>{t.range=[e,e+Math.max(t.page.scrollTriggers.length,1)/this.totalScrollTriggerCount];let r=(t.range[1]-t.range[0])/t.page.scrollTriggers.length;t.page.scrollTriggers.forEach((t,n)=>{t.range=[e+n*r,e+(n+1)*r]}),e=t.range[1]}),this.slideTriggers[this.slideTriggers.length-1].range[1]=1}createFragmentTriggersForPage(e,t){t||=e.slideElement;let n=this.Reveal.fragments.sort(t.querySelectorAll(`.fragment`),!0);return n.length&&(e.fragments=this.Reveal.fragments.sort(t.querySelectorAll(`.fragment:not(.disabled)`)),e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(-1,e.fragments,t)}}),n.forEach((n,r)=>{e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(r,e.fragments,t)}})})),e.scrollTriggers.length}createAutoAnimateTriggersForPage(e){e.autoAnimateElements.length>0&&this.slideTriggers.push(...Array.from(e.autoAnimateElements).map((t,n)=>{let r=this.createPage({slideElement:t.querySelector(`section`),contentElement:t,backgroundElement:t.querySelector(`.slide-background`)});return this.createFragmentTriggersForPage(r,r.slideElement),e.autoAnimatePages.push(r),{page:r,activate:()=>this.activatePage(r),deactivate:()=>this.deactivatePage(r)}}))}createPage(e){return e.scrollTriggers=[],e.indexh=parseInt(e.slideElement.getAttribute(`data-index-h`),10),e.indexv=parseInt(e.slideElement.getAttribute(`data-index-v`),10),e}syncProgressBar(){this.progressBarInner.querySelectorAll(`.scrollbar-slide`).forEach(e=>e.remove());let e=this.viewportElement.scrollHeight,t=this.viewportElement.offsetHeight,n=t/e;this.progressBarHeight=this.progressBarInner.offsetHeight,this.playheadHeight=Math.max(n*this.progressBarHeight,D),this.progressBarScrollableHeight=this.progressBarHeight-this.playheadHeight;let r=t/e*this.progressBarHeight,i=Math.min(r/8,ue);this.progressBarPlayhead.style.height=this.playheadHeight-i+`px`,r>de?this.slideTriggers.forEach(e=>{let{page:t}=e;t.progressBarSlide=document.createElement(`div`),t.progressBarSlide.className=`scrollbar-slide`,t.progressBarSlide.style.top=e.range[0]*this.progressBarHeight+`px`,t.progressBarSlide.style.height=(e.range[1]-e.range[0])*this.progressBarHeight-i+`px`,t.progressBarSlide.classList.toggle(`has-triggers`,t.scrollTriggers.length>0),this.progressBarInner.appendChild(t.progressBarSlide),t.scrollTriggerElements=t.scrollTriggers.map((n,r)=>{let a=document.createElement(`div`);return a.className=`scrollbar-trigger`,a.style.top=(n.range[0]-e.range[0])*this.progressBarHeight+`px`,a.style.height=(n.range[1]-n.range[0])*this.progressBarHeight-i+`px`,t.progressBarSlide.appendChild(a),r===0&&(a.style.display=`none`),a})}):this.pages.forEach(e=>e.progressBarSlide=null)}syncScrollPosition(){let e=this.viewportElement.offsetHeight,t=e/this.viewportElement.scrollHeight,n=this.viewportElement.scrollTop,r=this.viewportElement.scrollHeight-e,i=Math.max(Math.min(n/r,1),0),a=Math.max(Math.min((n+e/2)/this.viewportElement.scrollHeight,1),0),o;this.slideTriggers.forEach(e=>{let{page:n}=e;i>=e.range[0]-t*2&&i<=e.range[1]+t*2&&!n.loaded?(n.loaded=!0,this.Reveal.slideContent.load(n.slideElement)):n.loaded&&(n.loaded=!1,this.Reveal.slideContent.unload(n.slideElement)),i>=e.range[0]&&i<=e.range[1]?(this.activateTrigger(e),o=e.page):e.active&&this.deactivateTrigger(e)}),o&&o.scrollTriggers.forEach(e=>{a>=e.range[0]&&a<=e.range[1]?this.activateTrigger(e):e.active&&this.deactivateTrigger(e)}),this.setProgressBarValue(n/(this.viewportElement.scrollHeight-e))}setProgressBarValue(e){this.progressBar&&(this.progressBarPlayhead.style.transform=`translateY(${e*this.progressBarScrollableHeight}px)`,this.getAllPages().filter(e=>e.progressBarSlide).forEach(e=>{e.progressBarSlide.classList.toggle(`active`,e.active===!0),e.scrollTriggers.forEach((t,n)=>{e.scrollTriggerElements[n].classList.toggle(`active`,e.active===!0&&t.active===!0)})}),this.showProgressBar())}showProgressBar(){this.progressBar.classList.add(`visible`),clearTimeout(this.hideProgressBarTimeout),this.Reveal.getConfig().scrollProgress===`auto`&&!this.draggingProgressBar&&(this.hideProgressBarTimeout=setTimeout(()=>{this.progressBar&&this.progressBar.classList.remove(`visible`)},le))}prev(){this.viewportElement.scrollTop-=this.scrollTriggerHeight}next(){this.viewportElement.scrollTop+=this.scrollTriggerHeight}scrollToSlide(e){if(!this.active)this.activatedCallbacks.push(()=>this.scrollToSlide(e));else{let t=this.getScrollTriggerBySlide(e);t&&(this.viewportElement.scrollTop=t.range[0]*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight))}}storeScrollPosition(){clearTimeout(this.storeScrollPositionTimeout),this.storeScrollPositionTimeout=setTimeout(()=>{sessionStorage.setItem(`reveal-scroll-top`,this.viewportElement.scrollTop),sessionStorage.setItem(`reveal-scroll-origin`,location.origin+location.pathname),this.storeScrollPositionTimeout=null},50)}restoreScrollPosition(){let e=sessionStorage.getItem(`reveal-scroll-top`),t=sessionStorage.getItem(`reveal-scroll-origin`);e&&t===location.origin+location.pathname&&(this.viewportElement.scrollTop=parseInt(e,10))}activatePage(e){if(!e.active){e.active=!0;let{slideElement:t,backgroundElement:n,contentElement:r,indexh:i,indexv:a}=e;r.style.display=`block`,t.classList.add(`present`),n&&n.classList.add(`present`),this.Reveal.setCurrentScrollPage(t,i,a),this.Reveal.backgrounds.bubbleSlideContrastClassToElement(t,this.viewportElement),Array.from(r.parentNode.querySelectorAll(`.scroll-page-content`)).forEach(e=>{e!==r&&(e.style.display=`none`)})}}deactivatePage(e){e.active&&(e.active=!1,e.slideElement&&e.slideElement.classList.remove(`present`),e.backgroundElement&&e.backgroundElement.classList.remove(`present`))}activateTrigger(e){e.active||(e.active=!0,e.activate())}deactivateTrigger(e){e.active&&(e.active=!1,e.deactivate&&e.deactivate())}getSlideByIndices(e,t){let n=this.getAllPages().find(n=>n.indexh===e&&n.indexv===t);return n?n.slideElement:null}getScrollTriggerBySlide(e){return this.slideTriggers.find(t=>t.page.slideElement===e)}getAllPages(){return this.pages.flatMap(e=>[e,...e.autoAnimatePages||[]])}onScroll(){this.syncScrollPosition(),this.storeScrollPosition()}get viewportElement(){return this.Reveal.getViewportElement()}};function O(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function pe(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function o(e){O(a,r,i,o,s,`next`,e)}function s(e){O(a,r,i,o,s,`throw`,e)}o(void 0)})}}var me=class{constructor(e){this.Reveal=e}activate(){var e=this;return pe(function*(){let n=e.Reveal.getConfig(),r=t(e.Reveal.getRevealElement(),S),i=n.slideNumber&&/all|print/i.test(n.showSlideNumber),a=e.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),o=Math.floor(a.width*(1+n.margin)),s=Math.floor(a.height*(1+n.margin)),c=a.width,u=a.height;yield new Promise(requestAnimationFrame),l(`@page{size:`+o+`px `+s+`px; margin: 0px;}`),l(`.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: `+c+`px; max-height:`+u+`px}`),document.documentElement.classList.add(`reveal-print`,`print-pdf`),document.body.style.width=o+`px`,document.body.style.height=s+`px`;let d=e.Reveal.getViewportElement(),f;if(d){let e=window.getComputedStyle(d);e&&e.background&&(f=e.background)}yield new Promise(requestAnimationFrame),e.Reveal.layoutSlideContents(c,u),yield new Promise(requestAnimationFrame);let p=r.map(e=>e.scrollHeight),m=[],h=r[0].parentNode,g=1;r.forEach(function(e,r){if(e.classList.contains(`stack`)===!1){let a=(o-c)/2,l=(s-u)/2,d=p[r],h=Math.max(Math.ceil(d/s),1);h=Math.min(h,n.pdfMaxPagesPerSlide),(h===1&&n.center||e.classList.contains(`center`))&&(l=Math.max((s-d)/2,0));let _=document.createElement(`div`);if(m.push(_),_.className=`pdf-page`,_.style.height=(s+n.pdfPageHeightOffset)*h+`px`,f&&(_.style.background=f),_.appendChild(e),e.style.left=a+`px`,e.style.top=l+`px`,e.style.width=c+`px`,this.Reveal.slideContent.layout(e),e.slideBackgroundElement&&_.insertBefore(e.slideBackgroundElement,e),n.showNotes){let t=this.Reveal.getSlideNotes(e);if(t){let e=typeof n.showNotes==`string`?n.showNotes:`inline`,r=document.createElement(`div`);r.classList.add(`speaker-notes`),r.classList.add(`speaker-notes-pdf`),r.setAttribute(`data-layout`,e),r.innerHTML=t,e===`separate-page`?m.push(r):(r.style.left=`8px`,r.style.bottom=`8px`,r.style.width=o-16+`px`,_.appendChild(r))}}if(i){let e=document.createElement(`div`);e.classList.add(`slide-number`),e.classList.add(`slide-number-pdf`),e.innerHTML=g++,_.appendChild(e)}if(n.pdfSeparateFragments){let e=this.Reveal.fragments.sort(_.querySelectorAll(`.fragment`),!0),t;e.forEach(function(e,n){t&&t.forEach(function(e){e.classList.remove(`current-fragment`)}),e.forEach(function(e){e.classList.add(`visible`,`current-fragment`)},this);let r=_.cloneNode(!0);if(i){let e=r.querySelector(`.slide-number-pdf`),t=n+1;e.innerHTML+=`.`+t}m.push(r),t=e},this),e.forEach(function(e){e.forEach(function(e){e.classList.remove(`visible`,`current-fragment`)})})}else t(_,`.fragment:not(.fade-out)`).forEach(function(e){e.classList.add(`visible`)})}},e),yield new Promise(requestAnimationFrame),m.forEach(e=>h.appendChild(e)),e.Reveal.slideContent.layout(e.Reveal.getSlidesElement()),e.Reveal.dispatchEvent({type:`pdf-ready`}),d.classList.remove(`loading-scroll-mode`)})()}isActive(){return this.Reveal.getConfig().view===`print`}},he=class{constructor(e){this.Reveal=e}configure(e,t){e.fragments===!1?this.disable():t.fragments===!1&&this.enable()}disable(){t(this.Reveal.getSlidesElement(),`.fragment`).forEach(e=>{e.classList.add(`visible`),e.classList.remove(`current-fragment`)})}enable(){t(this.Reveal.getSlidesElement(),`.fragment`).forEach(e=>{e.classList.remove(`visible`),e.classList.remove(`current-fragment`)})}availableRoutes(){let e=this.Reveal.getCurrentSlide();if(e&&this.Reveal.getConfig().fragments){let t=e.querySelectorAll(`.fragment:not(.disabled)`),n=e.querySelectorAll(`.fragment:not(.disabled):not(.visible)`);return{prev:t.length-n.length>0,next:!!n.length}}return{prev:!1,next:!1}}sort(e,t=!1){e=Array.from(e);let n=[],r=[],i=[];e.forEach(e=>{if(e.hasAttribute(`data-fragment-index`)){let t=parseInt(e.getAttribute(`data-fragment-index`),10);n[t]||(n[t]=[]),n[t].push(e)}else r.push([e])}),n=n.concat(r);let a=0;return n.forEach(e=>{e.forEach(e=>{i.push(e),e.setAttribute(`data-fragment-index`,a)}),a++}),t===!0?n:i}sortAll(){this.Reveal.getHorizontalSlides().forEach(e=>{let n=t(e,`section`);n.forEach((e,t)=>{this.sort(e.querySelectorAll(`.fragment`))},this),n.length===0&&this.sort(e.querySelectorAll(`.fragment`))})}update(e,t,n=this.Reveal.getCurrentSlide()){let r={shown:[],hidden:[]};if(n&&this.Reveal.getConfig().fragments&&(t||=this.sort(n.querySelectorAll(`.fragment`)),t.length)){let i=0;if(typeof e!=`number`){let t=this.sort(n.querySelectorAll(`.fragment.visible`)).pop();t&&(e=parseInt(t.getAttribute(`data-fragment-index`)||0,10))}Array.from(t).forEach((t,n)=>{if(t.hasAttribute(`data-fragment-index`)&&(n=parseInt(t.getAttribute(`data-fragment-index`),10)),i=Math.max(i,n),n<=e){let i=t.classList.contains(`visible`);t.classList.add(`visible`),t.classList.remove(`current-fragment`),n===e&&(this.Reveal.announceStatus(this.Reveal.getStatusText(t)),t.classList.add(`current-fragment`),this.Reveal.slideContent.startEmbeddedContent(t)),i||(r.shown.push(t),this.Reveal.dispatchEvent({target:t,type:`visible`,bubbles:!1}))}else{let e=t.classList.contains(`visible`);t.classList.remove(`visible`),t.classList.remove(`current-fragment`),e&&(this.Reveal.slideContent.stopEmbeddedContent(t),r.hidden.push(t),this.Reveal.dispatchEvent({target:t,type:`hidden`,bubbles:!1}))}}),e=typeof e==`number`?e:-1,e=Math.max(Math.min(e,i),-1),n.setAttribute(`data-fragment`,e)}return r.hidden.length&&this.Reveal.dispatchEvent({type:`fragmenthidden`,data:{fragment:r.hidden[0],fragments:r.hidden}}),r.shown.length&&this.Reveal.dispatchEvent({type:`fragmentshown`,data:{fragment:r.shown[0],fragments:r.shown}}),r}sync(e=this.Reveal.getCurrentSlide()){return this.sort(e.querySelectorAll(`.fragment`))}goto(e,t=0){let n=this.Reveal.getCurrentSlide();if(n&&this.Reveal.getConfig().fragments){let r=this.sort(n.querySelectorAll(`.fragment:not(.disabled)`));if(r.length){if(typeof e!=`number`){let t=this.sort(n.querySelectorAll(`.fragment:not(.disabled).visible`)).pop();e=t?parseInt(t.getAttribute(`data-fragment-index`)||0,10):-1}e+=t;let i=this.update(e,r);return this.Reveal.controls.update(),this.Reveal.progress.update(),this.Reveal.getConfig().fragmentInURL&&this.Reveal.location.writeURL(),!!(i.shown.length||i.hidden.length)}}return!1}next(){return this.goto(null,1)}prev(){return this.goto(null,-1)}},ge=class{constructor(e){this.Reveal=e,this.active=!1,this.onSlideClicked=this.onSlideClicked.bind(this)}activate(){if(this.Reveal.getConfig().overview&&!this.Reveal.isScrollView()&&!this.isActive()){this.active=!0,this.Reveal.getRevealElement().classList.add(`overview`),this.Reveal.cancelAutoSlide(),this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()),t(this.Reveal.getRevealElement(),S).forEach(e=>{e.classList.contains(`stack`)||e.addEventListener(`click`,this.onSlideClicked,!0)});let e=this.Reveal.getComputedSlideSize();this.overviewSlideWidth=e.width+70,this.overviewSlideHeight=e.height+70,this.Reveal.getConfig().rtl&&(this.overviewSlideWidth=-this.overviewSlideWidth),this.Reveal.updateSlidesVisibility(),this.layout(),this.update(),this.Reveal.layout();let n=this.Reveal.getIndices();this.Reveal.dispatchEvent({type:`overviewshown`,data:{indexh:n.h,indexv:n.v,currentSlide:this.Reveal.getCurrentSlide()}})}}layout(){this.Reveal.getHorizontalSlides().forEach((e,n)=>{e.setAttribute(`data-index-h`,n),i(e,`translate3d(`+n*this.overviewSlideWidth+`px, 0, 0)`),e.classList.contains(`stack`)&&t(e,`section`).forEach((e,t)=>{e.setAttribute(`data-index-h`,n),e.setAttribute(`data-index-v`,t),i(e,`translate3d(0, `+t*this.overviewSlideHeight+`px, 0)`)})}),Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e,n)=>{i(e,`translate3d(`+n*this.overviewSlideWidth+`px, 0, 0)`),t(e,`.slide-background`).forEach((e,t)=>{i(e,`translate3d(0, `+t*this.overviewSlideHeight+`px, 0)`)})})}update(){let e=Math.min(window.innerWidth,window.innerHeight),t=Math.max(e/5,150)/e,n=this.Reveal.getIndices();this.Reveal.transformSlides({overview:[`scale(`+t+`)`,`translateX(`+-n.h*this.overviewSlideWidth+`px)`,`translateY(`+-n.v*this.overviewSlideHeight+`px)`].join(` `)})}deactivate(){if(this.Reveal.getConfig().overview){this.active=!1,this.Reveal.getRevealElement().classList.remove(`overview`),this.Reveal.getRevealElement().classList.add(`overview-deactivating`),setTimeout(()=>{this.Reveal.getRevealElement().classList.remove(`overview-deactivating`)},1),this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()),t(this.Reveal.getRevealElement(),S).forEach(e=>{i(e,``),e.removeEventListener(`click`,this.onSlideClicked,!0)}),t(this.Reveal.getBackgroundsElement(),`.slide-background`).forEach(e=>{i(e,``)}),this.Reveal.transformSlides({overview:``});let e=this.Reveal.getIndices();this.Reveal.slide(e.h,e.v),this.Reveal.layout(),this.Reveal.cueAutoSlide(),this.Reveal.dispatchEvent({type:`overviewhidden`,data:{indexh:e.h,indexv:e.v,currentSlide:this.Reveal.getCurrentSlide()}})}}toggle(e){typeof e==`boolean`?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}onSlideClicked(e){if(this.isActive()){e.preventDefault();let t=e.target;for(;t&&!t.nodeName.match(/section/gi);)t=t.parentNode;if(t&&!t.classList.contains(`disabled`)&&(this.deactivate(),t.nodeName.match(/section/gi))){let e=parseInt(t.getAttribute(`data-index-h`),10),n=parseInt(t.getAttribute(`data-index-v`),10);this.Reveal.slide(e,n)}}}},_e=class{constructor(e){this.Reveal=e,this.shortcuts={},this.bindings={},this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this)}configure(e,t){e.navigationMode===`linear`?(this.shortcuts[`&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J`]=`Next slide`,this.shortcuts[`&#8592;  ,  &#8593;  ,  P  ,  H  ,  K`]=`Previous slide`):(this.shortcuts[`N  ,  SPACE`]=`Next slide`,this.shortcuts[`P  ,  Shift SPACE`]=`Previous slide`,this.shortcuts[`&#8592;  ,  H`]=`Navigate left`,this.shortcuts[`&#8594;  ,  L`]=`Navigate right`,this.shortcuts[`&#8593;  ,  K`]=`Navigate up`,this.shortcuts[`&#8595;  ,  J`]=`Navigate down`),this.shortcuts[`Alt + &#8592;/&#8593/&#8594;/&#8595;`]=`Navigate without fragments`,this.shortcuts[`Shift + &#8592;/&#8593/&#8594;/&#8595;`]=`Jump to first/last slide`,this.shortcuts[`B  ,  .`]=`Pause`,this.shortcuts.F=`Fullscreen`,this.shortcuts.G=`Jump to slide`,this.shortcuts[`ESC, O`]=`Slide overview`}bind(){document.addEventListener(`keydown`,this.onDocumentKeyDown,!1)}unbind(){document.removeEventListener(`keydown`,this.onDocumentKeyDown,!1)}addKeyBinding(e,t){typeof e==`object`&&e.keyCode?this.bindings[e.keyCode]={callback:t,key:e.key,description:e.description}:this.bindings[e]={callback:t,key:null,description:null}}removeKeyBinding(e){delete this.bindings[e]}triggerKey(e){this.onDocumentKeyDown({keyCode:e})}registerKeyboardShortcut(e,t){this.shortcuts[e]=t}getShortcuts(){return this.shortcuts}getBindings(){return this.bindings}onDocumentKeyDown(e){let t=this.Reveal.getConfig();if(typeof t.keyboardCondition==`function`&&t.keyboardCondition(e)===!1||t.keyboardCondition===`focused`&&!this.Reveal.isFocused())return!0;let n=e.keyCode,r=!this.Reveal.isAutoSliding();this.Reveal.onUserInput(e);let i=document.activeElement&&document.activeElement.isContentEditable===!0,a=document.activeElement&&document.activeElement.tagName&&/input|textarea/i.test(document.activeElement.tagName),o=document.activeElement&&document.activeElement.className&&/speaker-notes/i.test(document.activeElement.className),c=!([32,37,38,39,40,63,78,80,191].indexOf(e.keyCode)!==-1&&e.shiftKey||e.altKey)&&(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey);if(i||a||o||c)return;let l=[66,86,190,191,112],u;if(typeof t.keyboard==`object`)for(u in t.keyboard)t.keyboard[u]===`togglePause`&&l.push(parseInt(u,10));if(this.Reveal.isOverlayOpen()&&![`Escape`,`f`,`c`,`b`,`.`].includes(e.key)||this.Reveal.isPaused()&&l.indexOf(n)===-1)return!1;let d=t.navigationMode===`linear`||!this.Reveal.hasHorizontalSlides()||!this.Reveal.hasVerticalSlides(),f=!1;if(typeof t.keyboard==`object`){for(u in t.keyboard)if(parseInt(u,10)===n){let n=t.keyboard[u];typeof n==`function`?n.apply(null,[e]):typeof n==`string`&&typeof this.Reveal[n]==`function`&&this.Reveal[n].call(),f=!0}}if(f===!1){for(u in this.bindings)if(parseInt(u,10)===n){let t=this.bindings[u].callback;typeof t==`function`?t.apply(null,[e]):typeof t==`string`&&typeof this.Reveal[t]==`function`&&this.Reveal[t].call(),f=!0}}f===!1&&(f=!0,n===80||n===33?this.Reveal.prev({skipFragments:e.altKey}):n===78||n===34?this.Reveal.next({skipFragments:e.altKey}):n===72||n===37?e.shiftKey?this.Reveal.slide(0):!this.Reveal.overview.isActive()&&d?t.rtl?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.left({skipFragments:e.altKey}):n===76||n===39?e.shiftKey?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):!this.Reveal.overview.isActive()&&d?t.rtl?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey}):this.Reveal.right({skipFragments:e.altKey}):n===75||n===38?e.shiftKey?this.Reveal.slide(void 0,0):!this.Reveal.overview.isActive()&&d?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.up({skipFragments:e.altKey}):n===74||n===40?e.shiftKey?this.Reveal.slide(void 0,Number.MAX_VALUE):!this.Reveal.overview.isActive()&&d?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.down({skipFragments:e.altKey}):n===36?this.Reveal.slide(0):n===35?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):n===32?(this.Reveal.overview.isActive()&&this.Reveal.overview.deactivate(),e.shiftKey?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey})):[58,59,66,86,190].includes(n)||n===191&&!e.shiftKey?this.Reveal.togglePause():n===70?s(t.embedded?this.Reveal.getViewportElement():document.documentElement):n===65?t.autoSlideStoppable&&this.Reveal.toggleAutoSlide(r):n===71?t.jumpToSlide&&this.Reveal.toggleJumpToSlide():n===67&&this.Reveal.isOverlayOpen()?this.Reveal.closeOverlay():(n===63||n===191)&&e.shiftKey||n===112?this.Reveal.toggleHelp():f=!1),f?e.preventDefault&&e.preventDefault():n===27||n===79?(this.Reveal.closeOverlay()===!1&&this.Reveal.overview.toggle(),e.preventDefault&&e.preventDefault()):n===13&&this.Reveal.overview.isActive()&&(this.Reveal.overview.deactivate(),e.preventDefault&&e.preventDefault()),this.Reveal.cueAutoSlide()}};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?k(Object(n),!0).forEach(function(t){x(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var ve=class{constructor(e){x(this,`MAX_REPLACE_STATE_FREQUENCY`,1e3),this.Reveal=e,this.writeURLTimeout=0,this.replaceStateTimestamp=0,this.onWindowHashChange=this.onWindowHashChange.bind(this)}bind(){window.addEventListener(`hashchange`,this.onWindowHashChange,!1)}unbind(){window.removeEventListener(`hashchange`,this.onWindowHashChange,!1)}getIndicesFromHash(e=window.location.hash,t={}){let n=e.replace(/^#\/?/,``),r=n.split(`/`);if(!/^[0-9]*$/.test(r[0])&&n.length){let e,t;/\/[-\d]+$/g.test(n)&&(t=parseInt(n.split(`/`).pop(),10),t=isNaN(t)?void 0:t,n=n.split(`/`).shift());try{let t=decodeURIComponent(n);e=(document.getElementById(t)||document.querySelector(`[data-id="${t}"]`)).closest(`.slides section`)}catch{}if(e)return A(A({},this.Reveal.getIndices(e)),{},{f:t})}else{let e=this.Reveal.getConfig(),n=e.hashOneBasedIndex||t.oneBasedIndex?1:0,i=parseInt(r[0],10)-n||0,a=parseInt(r[1],10)-n||0,o;return e.fragmentInURL&&(o=parseInt(r[2],10),isNaN(o)&&(o=void 0)),{h:i,v:a,f:o}}return null}readURL(){let e=this.Reveal.getIndices(),t=this.getIndicesFromHash();t?(t.h!==e.h||t.v!==e.v||t.f!==void 0)&&this.Reveal.slide(t.h,t.v,t.f):this.Reveal.slide(e.h||0,e.v||0)}writeURL(e){let t=this.Reveal.getConfig(),n=this.Reveal.getCurrentSlide();if(clearTimeout(this.writeURLTimeout),typeof e==`number`)this.writeURLTimeout=setTimeout(this.writeURL,e);else if(n){let e=this.getHash();t.history?window.location.hash=e:t.hash&&(e===`/`?this.debouncedReplaceState(window.location.pathname+window.location.search):this.debouncedReplaceState(`#`+e))}}replaceState(e){window.history.replaceState(null,null,e),this.replaceStateTimestamp=Date.now()}debouncedReplaceState(e){clearTimeout(this.replaceStateTimeout),Date.now()-this.replaceStateTimestamp>this.MAX_REPLACE_STATE_FREQUENCY?this.replaceState(e):this.replaceStateTimeout=setTimeout(()=>this.replaceState(e),this.MAX_REPLACE_STATE_FREQUENCY)}getHash(e){let t=`/`,n=e||this.Reveal.getCurrentSlide(),r=n?n.getAttribute(`id`):null;r&&=encodeURIComponent(r);let i=this.Reveal.getIndices(e);if(this.Reveal.getConfig().fragmentInURL||(i.f=void 0),typeof r==`string`&&r.length)t=`/`+r,i.f>=0&&(t+=`/`+i.f);else{let e=+!!this.Reveal.getConfig().hashOneBasedIndex;(i.h>0||i.v>0||i.f>=0)&&(t+=i.h+e),(i.v>0||i.f>=0)&&(t+=`/`+(i.v+e)),i.f>=0&&(t+=`/`+i.f)}return t}onWindowHashChange(e){this.readURL()}},ye=class{constructor(e){this.Reveal=e,this.onNavigateLeftClicked=this.onNavigateLeftClicked.bind(this),this.onNavigateRightClicked=this.onNavigateRightClicked.bind(this),this.onNavigateUpClicked=this.onNavigateUpClicked.bind(this),this.onNavigateDownClicked=this.onNavigateDownClicked.bind(this),this.onNavigatePrevClicked=this.onNavigatePrevClicked.bind(this),this.onNavigateNextClicked=this.onNavigateNextClicked.bind(this),this.onEnterFullscreen=this.onEnterFullscreen.bind(this)}render(){let e=this.Reveal.getConfig().rtl,n=this.Reveal.getRevealElement();this.element=document.createElement(`aside`),this.element.className=`controls`,this.element.innerHTML=`<button class="navigate-left" aria-label="${e?`next slide`:`previous slide`}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${e?`previous slide`:`next slide`}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`,this.Reveal.getRevealElement().appendChild(this.element),this.controlsLeft=t(n,`.navigate-left`),this.controlsRight=t(n,`.navigate-right`),this.controlsUp=t(n,`.navigate-up`),this.controlsDown=t(n,`.navigate-down`),this.controlsPrev=t(n,`.navigate-prev`),this.controlsNext=t(n,`.navigate-next`),this.controlsFullscreen=t(n,`.enter-fullscreen`),this.controlsRightArrow=this.element.querySelector(`.navigate-right`),this.controlsLeftArrow=this.element.querySelector(`.navigate-left`),this.controlsDownArrow=this.element.querySelector(`.navigate-down`)}configure(e,t){let n=e.controls===`speaker`||e.controls===`speaker-only`;this.element.style.display=e.controls&&(!n||this.Reveal.isSpeakerNotes())?`block`:`none`,this.element.setAttribute(`data-controls-layout`,e.controlsLayout),this.element.setAttribute(`data-controls-back-arrows`,e.controlsBackArrows)}bind(){let e=[`touchstart`,`click`];_&&(e=[`touchend`]),e.forEach(e=>{this.controlsLeft.forEach(t=>t.addEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(t=>t.addEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(t=>t.addEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(t=>t.addEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(t=>t.addEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(t=>t.addEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(t=>t.addEventListener(e,this.onEnterFullscreen,!1))})}unbind(){[`touchstart`,`touchend`,`click`].forEach(e=>{this.controlsLeft.forEach(t=>t.removeEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(t=>t.removeEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(t=>t.removeEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(t=>t.removeEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(t=>t.removeEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(t=>t.removeEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(t=>t.removeEventListener(e,this.onEnterFullscreen,!1))})}update(){let e=this.Reveal.availableRoutes();[...this.controlsLeft,...this.controlsRight,...this.controlsUp,...this.controlsDown,...this.controlsPrev,...this.controlsNext].forEach(e=>{e.classList.remove(`enabled`,`fragmented`),e.setAttribute(`disabled`,`disabled`)}),e.left&&this.controlsLeft.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),e.right&&this.controlsRight.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),e.up&&this.controlsUp.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),e.down&&this.controlsDown.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),(e.left||e.up)&&this.controlsPrev.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)}),(e.right||e.down)&&this.controlsNext.forEach(e=>{e.classList.add(`enabled`),e.removeAttribute(`disabled`)});let t=this.Reveal.getCurrentSlide();if(t){let e=this.Reveal.fragments.availableRoutes();e.prev&&this.controlsPrev.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}),e.next&&this.controlsNext.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)});let n=this.Reveal.isVerticalSlide(t),r=n&&t.parentElement&&t.parentElement.querySelectorAll(`:scope > section`).length>1;n&&r?(e.prev&&this.controlsUp.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}),e.next&&this.controlsDown.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)})):(e.prev&&this.controlsLeft.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}),e.next&&this.controlsRight.forEach(e=>{e.classList.add(`fragmented`,`enabled`),e.removeAttribute(`disabled`)}))}if(this.Reveal.getConfig().controlsTutorial){let t=this.Reveal.getIndices();!this.Reveal.hasNavigatedVertically()&&e.down?this.controlsDownArrow.classList.add(`highlight`):(this.controlsDownArrow.classList.remove(`highlight`),this.Reveal.getConfig().rtl?!this.Reveal.hasNavigatedHorizontally()&&e.left&&t.v===0?this.controlsLeftArrow.classList.add(`highlight`):this.controlsLeftArrow.classList.remove(`highlight`):!this.Reveal.hasNavigatedHorizontally()&&e.right&&t.v===0?this.controlsRightArrow.classList.add(`highlight`):this.controlsRightArrow.classList.remove(`highlight`))}}destroy(){this.unbind(),this.element.remove()}onNavigateLeftClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode===`linear`?this.Reveal.prev():this.Reveal.left()}onNavigateRightClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode===`linear`?this.Reveal.next():this.Reveal.right()}onNavigateUpClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.up()}onNavigateDownClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.down()}onNavigatePrevClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.prev()}onNavigateNextClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.next()}onEnterFullscreen(e){let t=this.Reveal.getConfig(),n=this.Reveal.getViewportElement();s(t.embedded?n:n.parentElement)}},be=class{constructor(e){this.Reveal=e,this.onProgressClicked=this.onProgressClicked.bind(this)}render(){this.element=document.createElement(`div`),this.element.className=`progress`,this.Reveal.getRevealElement().appendChild(this.element),this.bar=document.createElement(`span`),this.element.appendChild(this.bar)}configure(e,t){this.element.style.display=e.progress?`block`:`none`}bind(){this.Reveal.getConfig().progress&&this.element&&this.element.addEventListener(`click`,this.onProgressClicked,!1)}unbind(){this.Reveal.getConfig().progress&&this.element&&this.element.removeEventListener(`click`,this.onProgressClicked,!1)}update(){if(this.Reveal.getConfig().progress&&this.bar){let e=this.Reveal.getProgress();this.Reveal.getTotalSlides()<2&&(e=0),this.bar.style.transform=`scaleX(`+e+`)`}}getMaxWidth(){return this.Reveal.getRevealElement().offsetWidth}onProgressClicked(e){this.Reveal.onUserInput(e),e.preventDefault();let t=this.Reveal.getSlides(),n=t.length,r=Math.floor(e.clientX/this.getMaxWidth()*n);this.Reveal.getConfig().rtl&&(r=n-r);let i=this.Reveal.getIndices(t[r]);this.Reveal.slide(i.h,i.v)}destroy(){this.element.remove()}},xe=class{constructor(e){this.Reveal=e,this.lastMouseWheelStep=0,this.cursorHidden=!1,this.cursorInactiveTimeout=0,this.onDocumentCursorActive=this.onDocumentCursorActive.bind(this),this.onDocumentMouseScroll=this.onDocumentMouseScroll.bind(this)}configure(e,t){e.mouseWheel?document.addEventListener(`wheel`,this.onDocumentMouseScroll,!1):document.removeEventListener(`wheel`,this.onDocumentMouseScroll,!1),e.hideInactiveCursor?(document.addEventListener(`mousemove`,this.onDocumentCursorActive,!1),document.addEventListener(`mousedown`,this.onDocumentCursorActive,!1)):(this.showCursor(),document.removeEventListener(`mousemove`,this.onDocumentCursorActive,!1),document.removeEventListener(`mousedown`,this.onDocumentCursorActive,!1))}showCursor(){this.cursorHidden&&(this.cursorHidden=!1,this.Reveal.getRevealElement().style.cursor=``)}hideCursor(){this.cursorHidden===!1&&(this.cursorHidden=!0,this.Reveal.getRevealElement().style.cursor=`none`)}destroy(){this.showCursor(),document.removeEventListener(`wheel`,this.onDocumentMouseScroll,!1),document.removeEventListener(`mousemove`,this.onDocumentCursorActive,!1),document.removeEventListener(`mousedown`,this.onDocumentCursorActive,!1)}onDocumentCursorActive(e){this.showCursor(),clearTimeout(this.cursorInactiveTimeout),this.cursorInactiveTimeout=setTimeout(this.hideCursor.bind(this),this.Reveal.getConfig().hideCursorTime)}onDocumentMouseScroll(e){if(Date.now()-this.lastMouseWheelStep>1e3){this.lastMouseWheelStep=Date.now();let t=e.detail||-e.wheelDelta;t>0?this.Reveal.next():t<0&&this.Reveal.prev()}}},Se=(e,t)=>{let n=document.createElement(`script`);n.type=`text/javascript`,n.async=!1,n.defer=!1,n.src=e,typeof t==`function`&&(n.onload=e=>{e.type===`load`&&(n.onload=n.onerror=null,t())},n.onerror=e=>{n.onload=n.onerror=null,t(Error(`Failed loading script: `+n.src+`
`+e))});let r=document.querySelector(`head`);r&&r.insertBefore(n,r.lastChild)},Ce=class{constructor(e){this.Reveal=e,this.state=`idle`,this.registeredPlugins={},this.asyncDependencies=[]}load(e,t){return this.state=`loading`,e.forEach(this.registerPlugin.bind(this)),new Promise(e=>{let n=[],r=0;if(t.forEach(e=>{(!e.condition||e.condition())&&(e.async?this.asyncDependencies.push(e):n.push(e))}),n.length){r=n.length;let t=t=>{t&&typeof t.callback==`function`&&t.callback(),--r===0&&this.initPlugins().then(e)};n.forEach(e=>{typeof e.id==`string`?(this.registerPlugin(e),t(e)):typeof e.src==`string`?Se(e.src,()=>t(e)):(console.warn(`Unrecognized plugin format`,e),t())})}else this.initPlugins().then(e)})}initPlugins(){return new Promise(e=>{let t=Object.values(this.registeredPlugins),n=t.length;if(n===0)this.loadAsync().then(e);else{let r,i=()=>{--n===0?this.loadAsync().then(e):r()},a=0;r=()=>{let e=t[a++];if(typeof e.init==`function`){let t=e.init(this.Reveal);t&&typeof t.then==`function`?t.then(i):i()}else i()},r()}})}loadAsync(){return this.state=`loaded`,this.asyncDependencies.length&&this.asyncDependencies.forEach(e=>{Se(e.src,e.callback)}),Promise.resolve()}registerPlugin(e){arguments.length===2&&typeof arguments[0]==`string`?(e=arguments[1],e.id=arguments[0]):typeof e==`function`&&(e=e());let t=e.id;typeof t==`string`?this.registeredPlugins[t]===void 0?(this.registeredPlugins[t]=e,this.state===`loaded`&&typeof e.init==`function`&&e.init(this.Reveal)):console.warn(`reveal.js: "`+t+`" plugin has already been registered`):console.warn(`Unrecognized plugin format; can't find plugin.id`,e)}hasPlugin(e){return!!this.registeredPlugins[e]}getPlugin(e){return this.registeredPlugins[e]}getRegisteredPlugins(){return this.registeredPlugins}destroy(){Object.values(this.registeredPlugins).forEach(e=>{typeof e.destroy==`function`&&e.destroy()}),this.registeredPlugins={},this.asyncDependencies=[]}},we=class{constructor(e){this.Reveal=e,this.onSlidesClicked=this.onSlidesClicked.bind(this),this.iframeTriggerSelector=null,this.mediaTriggerSelector=`[data-preview-image], [data-preview-video]`,this.stateProps=[`previewIframe`,`previewImage`,`previewVideo`,`previewFit`],this.state={}}update(){this.iframeTriggerSelector=this.Reveal.getConfig().previewLinks?`a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])`:`[data-preview-link]:not([data-preview-link=false])`;let e=this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length>0,t=this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length>0;e||t?this.Reveal.getSlidesElement().addEventListener(`click`,this.onSlidesClicked,!1):this.Reveal.getSlidesElement().removeEventListener(`click`,this.onSlidesClicked,!1)}createOverlay(e){this.dom=document.createElement(`div`),this.dom.classList.add(`r-overlay`),this.dom.classList.add(e),this.viewport=document.createElement(`div`),this.viewport.classList.add(`r-overlay-viewport`),this.dom.appendChild(this.viewport),this.Reveal.getRevealElement().appendChild(this.dom)}previewIframe(e){this.close(),this.state={previewIframe:e},this.createOverlay(`r-overlay-preview`),this.dom.dataset.state=`loading`,this.viewport.innerHTML=`<header class="r-overlay-header">
				<a class="r-overlay-header-button r-overlay-external" href="${e}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-header-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${e}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`,this.dom.querySelector(`iframe`).addEventListener(`load`,e=>{this.dom.dataset.state=`loaded`},!1),this.dom.querySelector(`.r-overlay-close`).addEventListener(`click`,e=>{this.close(),e.preventDefault()},!1),this.dom.querySelector(`.r-overlay-external`).addEventListener(`click`,e=>{this.close()},!1),this.Reveal.dispatchEvent({type:`previewiframe`,data:{url:e}})}previewMedia(e,t,n){if(t!==`image`&&t!==`video`){console.warn(`Please specify a valid media type to preview (image|video)`);return}this.close(),n||=`scale-down`,this.createOverlay(`r-overlay-preview`),this.dom.dataset.state=`loading`,this.dom.dataset.previewFit=n,this.viewport.innerHTML=`<header class="r-overlay-header">
				<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;let r=this.dom.querySelector(`.r-overlay-content`);if(t===`image`){this.state={previewImage:e,previewFit:n};let t=document.createElement(`img`,{});t.src=e,r.appendChild(t),t.addEventListener(`load`,()=>{this.dom.dataset.state=`loaded`},!1),t.addEventListener(`error`,()=>{this.dom.dataset.state=`error`,r.innerHTML=`<span class="r-overlay-error">Unable to load image.</span>`},!1),this.dom.style.cursor=`zoom-out`,this.dom.addEventListener(`click`,e=>{this.close()},!1),this.Reveal.dispatchEvent({type:`previewimage`,data:{url:e}})}else if(t===`video`){this.state={previewVideo:e,previewFit:n};let t=document.createElement(`video`);t.autoplay=this.dom.dataset.previewAutoplay!==`false`,t.controls=this.dom.dataset.previewControls!==`false`,t.loop=this.dom.dataset.previewLoop===`true`,t.muted=this.dom.dataset.previewMuted===`true`,t.playsInline=!0,t.src=e,r.appendChild(t),t.addEventListener(`loadeddata`,()=>{this.dom.dataset.state=`loaded`},!1),t.addEventListener(`error`,()=>{this.dom.dataset.state=`error`,r.innerHTML=`<span class="r-overlay-error">Unable to load video.</span>`},!1),this.Reveal.dispatchEvent({type:`previewvideo`,data:{url:e}})}else throw Error(`Please specify a valid media type to preview`);this.dom.querySelector(`.r-overlay-close`).addEventListener(`click`,e=>{this.close(),e.preventDefault()},!1)}previewImage(e,t){this.previewMedia(e,`image`,t)}previewVideo(e,t){this.previewMedia(e,`video`,t)}toggleHelp(e){typeof e==`boolean`?e?this.showHelp():this.close():this.dom?this.close():this.showHelp()}showHelp(){if(this.Reveal.getConfig().help){this.close(),this.createOverlay(`r-overlay-help`);let e=`<p class="title">Keyboard Shortcuts</p>`,t=this.Reveal.keyboard.getShortcuts(),n=this.Reveal.keyboard.getBindings();e+=`<table><th>KEY</th><th>ACTION</th>`;for(let n in t)e+=`<tr><td>${n}</td><td>${t[n]}</td></tr>`;for(let t in n)n[t].key&&n[t].description&&(e+=`<tr><td>${n[t].key}</td><td>${n[t].description}</td></tr>`);e+=`</table>`,this.viewport.innerHTML=`
				<header class="r-overlay-header">
					<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${e}</div>
				</div>
			`,this.dom.querySelector(`.r-overlay-close`).addEventListener(`click`,e=>{this.close(),e.preventDefault()},!1),this.Reveal.dispatchEvent({type:`showhelp`})}}isOpen(){return!!this.dom}close(){return this.dom?(this.dom.remove(),this.dom=null,this.state={},this.Reveal.dispatchEvent({type:`closeoverlay`}),!0):!1}getState(){return this.state}setState(e){this.stateProps.every(t=>this.state[t]===e[t])||(e.previewIframe?this.previewIframe(e.previewIframe):e.previewImage?this.previewImage(e.previewImage,e.previewFit):e.previewVideo?this.previewVideo(e.previewVideo,e.previewFit):this.close())}onSlidesClicked(e){let t=e.target,n=t.closest(this.iframeTriggerSelector),r=t.closest(this.mediaTriggerSelector);if(n){if(e.metaKey||e.shiftKey||e.altKey)return;let t=n.getAttribute(`data-preview-link`),r=typeof t==`string`&&t.startsWith(`http`)?t:n.getAttribute(`href`);r&&(this.previewIframe(r),e.preventDefault())}else if(r){if(r.hasAttribute(`data-preview-image`)){let t=r.dataset.previewImage||r.getAttribute(`src`);t&&(this.previewImage(t,r.dataset.previewFit),e.preventDefault())}else if(r.hasAttribute(`data-preview-video`)){let t=r.dataset.previewVideo||r.getAttribute(`src`);if(!t){let e=r.querySelector(`source`);e&&(t=e.getAttribute(`src`))}t&&(this.previewVideo(t,r.dataset.previewFit),e.preventDefault())}}}destroy(){this.close()}},j=40,Te=class{constructor(e){this.Reveal=e,this.touchStartX=0,this.touchStartY=0,this.touchStartCount=0,this.touchCaptured=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this)}bind(){let e=this.Reveal.getRevealElement();`onpointerdown`in window?(e.addEventListener(`pointerdown`,this.onPointerDown,!1),e.addEventListener(`pointermove`,this.onPointerMove,!1),e.addEventListener(`pointerup`,this.onPointerUp,!1)):window.navigator.msPointerEnabled?(e.addEventListener(`MSPointerDown`,this.onPointerDown,!1),e.addEventListener(`MSPointerMove`,this.onPointerMove,!1),e.addEventListener(`MSPointerUp`,this.onPointerUp,!1)):(e.addEventListener(`touchstart`,this.onTouchStart,!1),e.addEventListener(`touchmove`,this.onTouchMove,!1),e.addEventListener(`touchend`,this.onTouchEnd,!1))}unbind(){let e=this.Reveal.getRevealElement();e.removeEventListener(`pointerdown`,this.onPointerDown,!1),e.removeEventListener(`pointermove`,this.onPointerMove,!1),e.removeEventListener(`pointerup`,this.onPointerUp,!1),e.removeEventListener(`MSPointerDown`,this.onPointerDown,!1),e.removeEventListener(`MSPointerMove`,this.onPointerMove,!1),e.removeEventListener(`MSPointerUp`,this.onPointerUp,!1),e.removeEventListener(`touchstart`,this.onTouchStart,!1),e.removeEventListener(`touchmove`,this.onTouchMove,!1),e.removeEventListener(`touchend`,this.onTouchEnd,!1)}isSwipePrevented(e){if(a(e,`video[controls], audio[controls]`))return!0;for(;e&&typeof e.hasAttribute==`function`;){if(e.hasAttribute(`data-prevent-swipe`))return!0;e=e.parentNode}return!1}onTouchStart(e){if(this.touchCaptured=!1,this.isSwipePrevented(e.target))return!0;this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.touchStartCount=e.touches.length}onTouchMove(e){if(this.isSwipePrevented(e.target))return!0;let t=this.Reveal.getConfig();if(this.touchCaptured)_&&e.preventDefault();else{this.Reveal.onUserInput(e);let n=e.touches[0].clientX,r=e.touches[0].clientY;if(e.touches.length===1&&this.touchStartCount!==2){let i=this.Reveal.availableRoutes({includeFragments:!0}),a=n-this.touchStartX,o=r-this.touchStartY;a>j&&Math.abs(a)>Math.abs(o)?(this.touchCaptured=!0,t.navigationMode===`linear`?t.rtl?this.Reveal.next():this.Reveal.prev():this.Reveal.left()):a<-j&&Math.abs(a)>Math.abs(o)?(this.touchCaptured=!0,t.navigationMode===`linear`?t.rtl?this.Reveal.prev():this.Reveal.next():this.Reveal.right()):o>j&&i.up?(this.touchCaptured=!0,t.navigationMode===`linear`?this.Reveal.prev():this.Reveal.up()):o<-j&&i.down&&(this.touchCaptured=!0,t.navigationMode===`linear`?this.Reveal.next():this.Reveal.down()),t.embedded?(this.touchCaptured||this.Reveal.isVerticalSlide())&&e.preventDefault():e.preventDefault()}}}onTouchEnd(e){this.touchCaptured&&!this.Reveal.slideContent.isAllowedToPlayAudio()&&this.Reveal.startEmbeddedContent(this.Reveal.getCurrentSlide()),this.touchCaptured=!1}onPointerDown(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType===`touch`)&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchStart(e))}onPointerMove(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType===`touch`)&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchMove(e))}onPointerUp(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType===`touch`)&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchEnd(e))}},M=`focus`,N=`blur`,Ee=class{constructor(e){this.Reveal=e,this.onRevealPointerDown=this.onRevealPointerDown.bind(this),this.onDocumentPointerDown=this.onDocumentPointerDown.bind(this)}configure(e,t){e.embedded?this.blur():(this.focus(),this.unbind())}bind(){this.Reveal.getConfig().embedded&&this.Reveal.getRevealElement().addEventListener(`pointerdown`,this.onRevealPointerDown,!1)}unbind(){this.Reveal.getRevealElement().removeEventListener(`pointerdown`,this.onRevealPointerDown,!1),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!1)}focus(){this.state!==M&&(this.Reveal.getRevealElement().classList.add(`focused`),document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!1)),this.state=M}blur(){this.state!==N&&(this.Reveal.getRevealElement().classList.remove(`focused`),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!1)),this.state=N}isFocused(){return this.state===M}destroy(){this.Reveal.getRevealElement().classList.remove(`focused`)}onRevealPointerDown(e){this.focus()}onDocumentPointerDown(e){let t=o(e.target,`.reveal`);(!t||t!==this.Reveal.getRevealElement())&&this.blur()}},De=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement(`div`),this.element.className=`speaker-notes`,this.element.setAttribute(`data-prevent-swipe`,``),this.element.setAttribute(`tabindex`,`0`),this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){e.showNotes&&this.element.setAttribute(`data-layout`,typeof e.showNotes==`string`?e.showNotes:`inline`)}update(){this.Reveal.getConfig().showNotes&&this.element&&this.Reveal.getCurrentSlide()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()&&(this.element.innerHTML=this.getSlideNotes()||`<span class="notes-placeholder">No notes on this slide.</span>`)}updateVisibility(){this.Reveal.getConfig().showNotes&&this.hasNotes()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()?this.Reveal.getRevealElement().classList.add(`show-notes`):this.Reveal.getRevealElement().classList.remove(`show-notes`)}hasNotes(){return this.Reveal.getSlidesElement().querySelectorAll(`[data-notes], aside.notes`).length>0}isSpeakerNotesWindow(){return!!window.location.search.match(/receiver/gi)}getSlideNotes(e=this.Reveal.getCurrentSlide()){if(e.hasAttribute(`data-notes`))return e.getAttribute(`data-notes`);let t=e.querySelectorAll(`aside.notes`);return t?Array.from(t).map(e=>e.innerHTML).join(`
`):null}destroy(){this.element.remove()}},Oe=class{constructor(e,t){this.diameter=100,this.diameter2=this.diameter/2,this.thickness=6,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=e,this.progressCheck=t,this.canvas=document.createElement(`canvas`),this.canvas.className=`playback`,this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.canvas.style.width=this.diameter2+`px`,this.canvas.style.height=this.diameter2+`px`,this.context=this.canvas.getContext(`2d`),this.container.appendChild(this.canvas),this.render()}setPlaying(e){let t=this.playing;this.playing=e,!t&&this.playing?this.animate():this.render()}animate(){let e=this.progress;this.progress=this.progressCheck(),e>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&requestAnimationFrame(this.animate.bind(this))}render(){let e=this.playing?this.progress:0,t=this.diameter2-this.thickness,n=this.diameter2,r=this.diameter2;this.progressOffset+=(1-this.progressOffset)*.1;let i=-Math.PI/2+Math.PI*2*e,a=-Math.PI/2+this.progressOffset*(Math.PI*2);this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(n,r,t+4,0,Math.PI*2,!1),this.context.fillStyle=`rgba( 0, 0, 0, 0.4 )`,this.context.fill(),this.context.beginPath(),this.context.arc(n,r,t,0,Math.PI*2,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle=`rgba( 255, 255, 255, 0.2 )`,this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(n,r,t,a,i,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle=`#fff`,this.context.stroke()),this.context.translate(n-14,r-14),this.playing?(this.context.fillStyle=`#fff`,this.context.fillRect(0,0,10,28),this.context.fillRect(18,0,10,28)):(this.context.beginPath(),this.context.translate(4,0),this.context.moveTo(0,0),this.context.lineTo(24,14),this.context.lineTo(0,28),this.context.fillStyle=`#fff`,this.context.fill()),this.context.restore()}on(e,t){this.canvas.addEventListener(e,t,!1)}off(e,t){this.canvas.removeEventListener(e,t,!1)}destroy(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)}},ke={width:960,height:700,margin:.04,minScale:.2,maxScale:2,controls:!0,controlsTutorial:!0,controlsLayout:`bottom-right`,controlsBackArrows:`faded`,progress:!0,slideNumber:!1,showSlideNumber:`all`,hashOneBasedIndex:!1,hash:!1,respondToHashChanges:!0,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,navigationMode:`default`,shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!0,showNotes:!1,showHiddenSlides:!1,autoPlayMedia:null,preloadIframes:null,mouseWheel:!1,previewLinks:!1,viewDistance:3,mobileViewDistance:2,display:`block`,hideInactiveCursor:!0,hideCursorTime:5e3,sortFragmentsOnSync:!0,autoAnimate:!0,autoAnimateMatcher:null,autoAnimateEasing:`ease`,autoAnimateDuration:1,autoAnimateUnmatched:!0,autoAnimateStyles:[`opacity`,`color`,`background-color`,`padding`,`font-size`,`line-height`,`letter-spacing`,`border-width`,`border-color`,`border-radius`,`outline`,`outline-offset`],autoSlide:0,autoSlideStoppable:!0,autoSlideMethod:null,defaultTiming:null,postMessage:!0,postMessageEvents:!1,focusBodyOnPageVisibilityChange:!0,transition:`slide`,transitionSpeed:`default`,backgroundTransition:`fade`,parallaxBackgroundImage:``,parallaxBackgroundSize:``,parallaxBackgroundRepeat:``,parallaxBackgroundPosition:``,parallaxBackgroundHorizontal:null,parallaxBackgroundVertical:null,view:null,scrollLayout:`full`,scrollSnap:`mandatory`,scrollProgress:`auto`,scrollActivationWidth:435,pdfMaxPagesPerSlide:1/0,pdfSeparateFragments:!0,pdfPageHeightOffset:-1,dependencies:[],plugins:[]},Ae=`6.0.1`;function P(a,s){arguments.length<2&&(s=arguments[0],a=document.querySelector(`.reveal`));let l={},f={},p=!1,m=!1,h,_,v,y,ee={hasNavigatedHorizontally:!1,hasNavigatedVertically:!1},b=[],x=1,w={layout:``,overview:``},T={},oe=`idle`,E=0,le,ue=0,de=-1,D=!1,O=new te(l),pe=new ie(l),k=new ae(l),Se=new ce(l),j=new se(l),M=new fe(l),N=new me(l),P=new he(l),F=new ge(l),I=new _e(l),L=new ve(l),R=new ye(l),z=new be(l),je=new xe(l),B=new Ce(l),V=new we(l),Me=new Ee(l),H=new Te(l),U=new De(l);function Ne(e){if(!a)throw`Unable to find presentation root (<div class="reveal">).`;if(p)throw`Reveal.js has already been initialized.`;if(p=!0,T.wrapper=a,T.slides=a.querySelector(`.slides`),!T.slides)throw`Unable to find slides container (<div class="slides">).`;return f=A(A(A(A(A({},ke),f),s),e),u()),/print-pdf/gi.test(window.location.search)&&(f.view=`print`),Pe(),window.addEventListener(`load`,tt,!1),B.load(f.plugins,f.dependencies).then(Fe),new Promise(e=>l.on(`ready`,e))}function Pe(){f.embedded===!0?T.viewport=o(a,`.reveal-viewport`)||a:(T.viewport=document.body,document.documentElement.classList.add(`reveal-full-page`)),T.viewport.classList.add(`reveal-viewport`)}function Fe(){p!==!1&&(m=!0,Le(),Re(),Ge(),Ue(),We(),Ct(),Ke(),j.update(!0),Ie(),L.readURL(),setTimeout(()=>{T.slides.classList.remove(`no-transition`),T.wrapper.classList.add(`ready`),W({type:`ready`,data:{indexh:h,indexv:_,currentSlide:y}})},1))}function Ie(){let e=f.view===`print`,t=f.view===`scroll`||f.view===`reader`;(e||t)&&(e?Je():H.unbind(),T.viewport.classList.add(`loading-scroll-mode`),e?document.readyState===`complete`?N.activate():window.addEventListener(`load`,()=>N.activate()):M.activate())}function Le(){f.showHiddenSlides||t(T.wrapper,`section[data-visibility="hidden"]`).forEach(e=>{let t=e.parentNode;t.childElementCount===1&&/section/i.test(t.nodeName)?t.remove():e.remove()})}function Re(){T.slides.classList.add(`no-transition`),g?T.wrapper.classList.add(`no-hover`):T.wrapper.classList.remove(`no-hover`),j.render(),pe.render(),k.render(),R.render(),z.render(),U.render(),T.pauseOverlay=c(T.wrapper,`div`,`pause-overlay`,f.controls?`<button class="resume-button">Resume presentation</button>`:null),T.statusElement=ze(),T.wrapper.setAttribute(`role`,`application`)}function ze(){let e=T.wrapper.querySelector(`.aria-status`);return e||(e=document.createElement(`div`),e.style.position=`absolute`,e.style.height=`1px`,e.style.width=`1px`,e.style.overflow=`hidden`,e.style.clip=`rect( 1px, 1px, 1px, 1px )`,e.classList.add(`aria-status`),e.setAttribute(`aria-live`,`polite`),e.setAttribute(`aria-atomic`,`true`),T.wrapper.appendChild(e)),e}function Be(e){T.statusElement.textContent=e}function Ve(e){let t=``;if(e.nodeType===3)t+=e.textContent.trim();else if(e.nodeType===1){let n=e.getAttribute(`aria-hidden`),r=window.getComputedStyle(e).display===`none`;if(n!==`true`&&!r){if(e.tagName===`IMG`||e.tagName===`VIDEO`){let n=e.getAttribute(`alt`);n&&(t+=He(n))}Array.from(e.childNodes).forEach(e=>{t+=Ve(e)}),[`P`,`DIV`,`UL`,`OL`,`LI`,`H1`,`H2`,`H3`,`H4`,`H5`,`H6`,`BLOCKQUOTE`].includes(e.tagName)&&t.trim()!==``&&(t=He(t))}}return t=t.trim(),t===``?``:t+` `}function He(e){let t=e.trim();return t===``?e:/[.!?]$/.test(t)?t:t+`.`}function Ue(){setInterval(()=>{(!M.isActive()&&T.wrapper.scrollTop!==0||T.wrapper.scrollLeft!==0)&&(T.wrapper.scrollTop=0,T.wrapper.scrollLeft=0)},1e3)}function We(){document.addEventListener(`fullscreenchange`,$t),document.addEventListener(`webkitfullscreenchange`,$t)}function Ge(){f.postMessage&&window.addEventListener(`message`,Jt,!1)}function Ke(t){let r=A({},f);if(typeof t==`object`&&e(f,t),l.isReady()===!1)return;let i=T.wrapper.querySelectorAll(S).length;T.wrapper.classList.remove(r.transition),T.wrapper.classList.add(f.transition),T.wrapper.setAttribute(`data-transition-speed`,f.transitionSpeed),T.wrapper.setAttribute(`data-background-transition`,f.backgroundTransition),T.viewport.style.setProperty(`--slide-width`,typeof f.width==`string`?f.width:f.width+`px`),T.viewport.style.setProperty(`--slide-height`,typeof f.height==`string`?f.height:f.height+`px`),f.shuffle&&wt(),n(T.wrapper,`embedded`,f.embedded),n(T.wrapper,`rtl`,f.rtl),n(T.wrapper,`center`,f.center),f.pause===!1&&pt(),Se.reset(),le&&=(le.destroy(),null),i>1&&f.autoSlide&&f.autoSlideStoppable&&(le=new Oe(T.wrapper,()=>Math.min(Math.max((Date.now()-de)/E,0),1)),le.on(`click`,en),D=!1),f.navigationMode==="default"?T.wrapper.removeAttribute(`data-navigation-mode`):T.wrapper.setAttribute(`data-navigation-mode`,f.navigationMode),U.configure(f,r),Me.configure(f,r),je.configure(f,r),R.configure(f,r),z.configure(f,r),I.configure(f,r),P.configure(f,r),pe.configure(f,r),xt()}function qe(){window.addEventListener(`resize`,Zt,!1),f.touch&&H.bind(),f.keyboard&&I.bind(),f.progress&&z.bind(),f.respondToHashChanges&&L.bind(),R.bind(),Me.bind(),T.slides.addEventListener(`click`,Xt,!1),T.slides.addEventListener(`transitionend`,Yt,!1),T.pauseOverlay.addEventListener(`click`,pt,!1),f.focusBodyOnPageVisibilityChange&&document.addEventListener(`visibilitychange`,Qt,!1)}function Je(){H.unbind(),Me.unbind(),I.unbind(),R.unbind(),z.unbind(),L.unbind(),window.removeEventListener(`resize`,Zt,!1),T.slides.removeEventListener(`click`,Xt,!1),T.slides.removeEventListener(`transitionend`,Yt,!1),T.pauseOverlay.removeEventListener(`click`,pt,!1)}function Ye(){p=!1,m!==!1&&(Je(),X(),U.destroy(),Me.destroy(),V.destroy(),B.destroy(),je.destroy(),R.destroy(),z.destroy(),j.destroy(),pe.destroy(),k.destroy(),document.removeEventListener(`fullscreenchange`,$t),document.removeEventListener(`webkitfullscreenchange`,$t),document.removeEventListener(`visibilitychange`,Qt,!1),window.removeEventListener(`message`,Jt,!1),window.removeEventListener(`load`,tt,!1),T.pauseOverlay&&T.pauseOverlay.remove(),T.statusElement&&T.statusElement.remove(),document.documentElement.classList.remove(`reveal-full-page`),T.wrapper.classList.remove(`ready`,`center`,`has-horizontal-slides`,`has-vertical-slides`),T.wrapper.removeAttribute(`data-transition-speed`),T.wrapper.removeAttribute(`data-background-transition`),T.viewport.classList.remove(`reveal-viewport`),T.viewport.style.removeProperty(`--slide-width`),T.viewport.style.removeProperty(`--slide-height`),T.slides.style.removeProperty(`width`),T.slides.style.removeProperty(`height`),T.slides.style.removeProperty(`zoom`),T.slides.style.removeProperty(`left`),T.slides.style.removeProperty(`top`),T.slides.style.removeProperty(`bottom`),T.slides.style.removeProperty(`right`),T.slides.style.removeProperty(`transform`),Array.from(T.wrapper.querySelectorAll(S)).forEach(e=>{e.style.removeProperty(`display`),e.style.removeProperty(`top`),e.removeAttribute(`hidden`),e.removeAttribute(`aria-hidden`)}))}function Xe(e,t,n){a.addEventListener(e,t,n)}function Ze(e,t,n){a.removeEventListener(e,t,n)}function Qe(e){typeof e.layout==`string`&&(w.layout=e.layout),typeof e.overview==`string`&&(w.overview=e.overview),w.layout?i(T.slides,w.layout+` `+w.overview):i(T.slides,w.overview)}function W({target:t=T.wrapper,type:n,data:r,bubbles:i=!0}){let a=document.createEvent(`HTMLEvents`,1,2);return a.initEvent(n,i,!0),e(a,r),t.dispatchEvent(a),t===T.wrapper&&et(n),a}function $e(e){W({type:`slidechanged`,data:{indexh:h,indexv:_,previousSlide:v,currentSlide:y,origin:e}})}function et(t,n){if(f.postMessageEvents&&window.parent!==window.self){let r={namespace:`reveal`,eventName:t,state:Bt()};e(r,n),window.parent.postMessage(JSON.stringify(r),`*`)}}function tt(){if(T.wrapper&&!N.isActive()){let e=T.viewport.offsetWidth,t=T.viewport.offsetHeight;if(!f.disableLayout){g&&!f.embedded&&document.documentElement.style.setProperty(`--vh`,window.innerHeight*.01+`px`);let n=M.isActive()?it(e,t):it(),r=x;nt(f.width,f.height),T.slides.style.width=n.width+`px`,T.slides.style.height=n.height+`px`,x=Math.min(n.presentationWidth/n.width,n.presentationHeight/n.height),x=Math.max(x,f.minScale),x=Math.min(x,f.maxScale),x===1||M.isActive()?(T.slides.style.zoom=``,T.slides.style.left=``,T.slides.style.top=``,T.slides.style.bottom=``,T.slides.style.right=``,Qe({layout:``})):(T.slides.style.zoom=``,T.slides.style.left=`50%`,T.slides.style.top=`50%`,T.slides.style.bottom=`auto`,T.slides.style.right=`auto`,Qe({layout:`translate(-50%, -50%) scale(`+x+`)`}));let i=Array.from(T.wrapper.querySelectorAll(S));for(let e=0,t=i.length;e<t;e++){let t=i[e];t.style.display!==`none`&&(f.center||t.classList.contains(`center`)?t.classList.contains(`stack`)?t.style.top=0:t.style.top=Math.max((n.height-t.scrollHeight)/2,0)+`px`:t.style.top=``)}r!==x&&W({type:`resize`,data:{oldScale:r,scale:x,size:n}})}rt(),T.viewport.style.setProperty(`--slide-scale`,x),T.viewport.style.setProperty(`--viewport-width`,e+`px`),T.viewport.style.setProperty(`--viewport-height`,t+`px`),M.layout(),z.update(),j.updateParallax(),F.isActive()&&F.update()}}function nt(e,n){t(T.slides,`section > .stretch, section > .r-stretch`).forEach(t=>{let r=d(t,n);if(/(img|video)/gi.test(t.nodeName)){let n=t.naturalWidth||t.videoWidth,i=t.naturalHeight||t.videoHeight,a=Math.min(e/n,r/i);t.style.width=n*a+`px`,t.style.height=i*a+`px`}else t.style.width=e+`px`,t.style.height=r+`px`})}function rt(){if(T.wrapper&&!f.disableLayout&&!N.isActive()&&typeof f.scrollActivationWidth==`number`&&f.view!==`scroll`){let e=it();e.presentationWidth>0&&e.presentationWidth<=f.scrollActivationWidth?M.isActive()||(j.create(),M.activate()):M.isActive()&&M.deactivate()}}function it(e,t){let n=f.width,r=f.height;f.disableLayout&&(n=T.slides.offsetWidth,r=T.slides.offsetHeight);let i={width:n,height:r,presentationWidth:e||T.wrapper.offsetWidth,presentationHeight:t||T.wrapper.offsetHeight};return i.presentationWidth-=i.presentationWidth*f.margin,i.presentationHeight-=i.presentationHeight*f.margin,typeof i.width==`string`&&/%$/.test(i.width)&&(i.width=parseInt(i.width,10)/100*i.presentationWidth),typeof i.height==`string`&&/%$/.test(i.height)&&(i.height=parseInt(i.height,10)/100*i.presentationHeight),i}function at(e,t){typeof e==`object`&&typeof e.setAttribute==`function`&&e.setAttribute(`data-previous-indexv`,t||0)}function ot(e){if(typeof e==`object`&&typeof e.setAttribute==`function`&&e.classList.contains(`stack`)){let t=e.hasAttribute(`data-start-indexv`)?`data-start-indexv`:`data-previous-indexv`;return parseInt(e.getAttribute(t)||0,10)}return 0}function st(e=y){return e&&e.parentNode&&!!e.parentNode.nodeName.match(/section/i)}function ct(e=y){return e.classList.contains(`.stack`)||e.querySelector(`section`)!==null}function lt(){return y&&st(y)?!y.nextElementSibling:!1}function ut(){return h===0&&_===0}function dt(){return y?!(y.nextElementSibling||st(y)&&y.parentNode.nextElementSibling):!1}function ft(){if(f.pause){let e=T.wrapper.classList.contains(`paused`);X(),T.wrapper.classList.add(`paused`),e===!1&&W({type:`paused`})}}function pt(){let e=T.wrapper.classList.contains(`paused`);T.wrapper.classList.remove(`paused`),Y(),e&&W({type:`resumed`})}function mt(e){typeof e==`boolean`?e?ft():pt():ht()?pt():ft()}function ht(){return T.wrapper.classList.contains(`paused`)}function gt(e){typeof e==`boolean`?e?k.show():k.hide():k.isVisible()?k.hide():k.show()}function _t(e){typeof e==`boolean`?e?Ut():Ht():D?Ut():Ht()}function vt(){return!!(E&&!D)}function G(e,t,n,r){if(W({type:`beforeslidechange`,data:{indexh:e===void 0?h:e,indexv:t===void 0?_:t,origin:r}}).defaultPrevented)return;v=y;let i=T.wrapper.querySelectorAll(C);if(M.isActive()){let n=M.getSlideByIndices(e,t);n&&M.scrollToSlide(n);return}if(i.length===0)return;t===void 0&&!F.isActive()&&(t=ot(i[e])),v&&v.parentNode&&v.parentNode.classList.contains(`stack`)&&at(v.parentNode,_);let o=b.concat();b.length=0;let s=h||0,c=_||0;h=Tt(C,e===void 0?h:e),_=Tt(ne,t===void 0?_:t);let l=h!==s||_!==c;l||(v=null);let u=i[h],d=u.querySelectorAll(`section`);a.classList.toggle(`is-vertical-slide`,d.length>1),y=d[_]||u;let p=!1;l&&v&&y&&!F.isActive()&&(oe=`running`,p=yt(v,y,s,c),p&&T.slides.classList.add(`disable-slide-transitions`)),Ot(),tt(),F.isActive()&&F.update(),n!==void 0&&P.goto(n),v&&v!==y&&(v.classList.remove(`present`),v.setAttribute(`aria-hidden`,`true`),ut()&&setTimeout(()=>{Pt().forEach(e=>{at(e,0)})},0));stateLoop:for(let e=0,t=b.length;e<t;e++){for(let t=0;t<o.length;t++)if(o[t]===b[e]){o.splice(t,1);continue stateLoop}T.viewport.classList.add(b[e]),W({type:b[e]})}for(;o.length;)T.viewport.classList.remove(o.pop());l&&(O.afterSlideChanged(),$e(r)),(l||!v)&&(O.stopEmbeddedContent(v),O.startEmbeddedContent(y)),requestAnimationFrame(()=>{Be(Ve(y))}),z.update(),R.update(),U.update(),j.update(),j.updateParallax(),pe.update(),P.update(),L.writeURL(),Y(),p&&(setTimeout(()=>{T.slides.classList.remove(`disable-slide-transitions`)},0),f.autoAnimate&&Se.run(v,y))}function yt(e,t,n,r){return e.hasAttribute(`data-auto-animate`)&&t.hasAttribute(`data-auto-animate`)&&e.getAttribute(`data-auto-animate-id`)===t.getAttribute(`data-auto-animate-id`)&&!(h>n||_>r?t:e).hasAttribute(`data-auto-animate-restart`)}function bt(e,t,n){let r=h||0;h=t,_=n;let i=y!==e;v=y,y=e,y&&v&&f.autoAnimate&&yt(v,y,r,_)&&Se.run(v,y),i&&(O.afterSlideChanged(),v&&(O.stopEmbeddedContent(v),O.stopEmbeddedContent(v.slideBackgroundElement)),O.startEmbeddedContent(y),O.startEmbeddedContent(y.slideBackgroundElement)),requestAnimationFrame(()=>{Be(Ve(y))}),$e()}function xt(){Je(),qe(),tt(),E=f.autoSlide,Y(),j.create(),L.writeURL(),f.sortFragmentsOnSync===!0&&P.sortAll(),h!==void 0&&(h=Tt(C,h),_=Tt(ne,_)),R.update(),z.update(),Ot(),U.update(),U.updateVisibility(),V.update(),j.update(!0),pe.update(),O.formatEmbeddedContent(),f.autoPlayMedia===!1?O.stopEmbeddedContent(y,{unloadIframes:!1}):O.startEmbeddedContent(y),F.isActive()&&F.layout(),W({type:`sync`})}function St(e=y){j.sync(e),P.sync(e),O.load(e),j.update(),U.update(),W({type:`slidesync`,data:{slide:e}})}function Ct(){q().forEach(e=>{t(e,`section`).forEach((e,t)=>{t>0&&(e.classList.remove(`present`),e.classList.remove(`past`),e.classList.add(`future`),e.setAttribute(`aria-hidden`,`true`))})})}function wt(e=q()){e.forEach((t,n)=>{let r=e[Math.floor(Math.random()*e.length)];r.parentNode===t.parentNode&&t.parentNode.insertBefore(t,r);let i=t.querySelectorAll(`section`);i.length&&wt(i)})}function Tt(e,n){let r=t(T.wrapper,e),i=r.length,a=M.isActive()||N.isActive(),o=!1,s=!1;if(i){f.loop&&(n>=i&&(o=!0),n%=i,n<0&&(n=i+n,s=!0)),n=Math.max(Math.min(n,i-1),0);for(let e=0;e<i;e++){let t=r[e],i=f.rtl&&!st(t);if(t.classList.remove(`past`),t.classList.remove(`present`),t.classList.remove(`future`),t.setAttribute(`hidden`,``),t.setAttribute(`aria-hidden`,`true`),t.querySelector(`section`)&&t.classList.add(`stack`),a){t.classList.add(`present`);continue}e<n?(t.classList.add(i?`future`:`past`),f.fragments&&Et(t)):e>n?(t.classList.add(i?`past`:`future`),f.fragments&&Dt(t)):e===n&&f.fragments&&(o?Dt(t):s&&Et(t))}let e=r[n],t=e.classList.contains(`present`);e.classList.add(`present`),e.removeAttribute(`hidden`),e.removeAttribute(`aria-hidden`),t||W({target:e,type:`visible`,bubbles:!1});let c=e.getAttribute(`data-state`);c&&(b=b.concat(c.split(` `)))}else n=0;return n}function Et(e){t(e,`.fragment`).forEach(e=>{e.classList.add(`visible`),e.classList.remove(`current-fragment`)})}function Dt(e){t(e,`.fragment.visible`).forEach(e=>{e.classList.remove(`visible`,`current-fragment`)})}function Ot(){let e=q(),n=e.length,r,i;if(n&&h!==void 0){let a=F.isActive(),o=a?10:f.viewDistance;g&&(o=a?6:f.mobileViewDistance),N.isActive()&&(o=Number.MAX_VALUE);for(let s=0;s<n;s++){let c=e[s],l=t(c,`section`),u=l.length;if(r=Math.abs((h||0)-s)||0,f.loop&&(r=Math.abs(((h||0)-s)%(n-o))||0),r<o?O.load(c):O.unload(c),u){let e=a?0:ot(c);for(let t=0;t<u;t++){let n=l[t];i=Math.abs(s===(h||0)?(_||0)-t:t-e),r+i<o?O.load(n):O.unload(n)}}}Ft()?T.wrapper.classList.add(`has-vertical-slides`):T.wrapper.classList.remove(`has-vertical-slides`),J()?T.wrapper.classList.add(`has-horizontal-slides`):T.wrapper.classList.remove(`has-horizontal-slides`)}}function K({includeFragments:e=!1}={}){let t=T.wrapper.querySelectorAll(C),n=T.wrapper.querySelectorAll(ne),r={left:h>0,right:h<t.length-1,up:_>0,down:_<n.length-1};if(f.loop&&(t.length>1&&(r.left=!0,r.right=!0),n.length>1&&(r.up=!0,r.down=!0)),t.length>1&&f.navigationMode===`linear`&&(r.right=r.right||r.down,r.left=r.left||r.up),e===!0){let e=P.availableRoutes();r.left=r.left||e.prev,r.up=r.up||e.prev,r.down=r.down||e.next,r.right=r.right||e.next}if(f.rtl){let e=r.left;r.left=r.right,r.right=e}return r}function kt(e=y){let t=q(),n=0;mainLoop:for(let r=0;r<t.length;r++){let i=t[r],a=i.querySelectorAll(`section`);for(let t=0;t<a.length;t++){if(a[t]===e)break mainLoop;a[t].dataset.visibility!==`uncounted`&&n++}if(i===e)break;i.classList.contains(`stack`)===!1&&i.dataset.visibility!==`uncounted`&&n++}return n}function At(){let e=Lt(),t=kt();if(y){let e=y.querySelectorAll(`.fragment`);if(e.length>0){let n=y.querySelectorAll(`.fragment.visible`);t+=n.length/e.length*.9}}return Math.min(t/(e-1),1)}function jt(e){let n=h,r=_,i;if(e){if(M.isActive())n=parseInt(e.getAttribute(`data-index-h`),10),e.getAttribute(`data-index-v`)&&(r=parseInt(e.getAttribute(`data-index-v`),10));else{let i=st(e),a=i?e.parentNode:e,o=q();n=Math.max(o.indexOf(a),0),r=void 0,i&&(r=Math.max(t(e.parentNode,`section`).indexOf(e),0))}}if(!e&&y&&y.querySelectorAll(`.fragment`).length>0){let e=y.querySelector(`.current-fragment`);i=e&&e.hasAttribute(`data-fragment-index`)?parseInt(e.getAttribute(`data-fragment-index`),10):y.querySelectorAll(`.fragment.visible`).length-1}return{h:n,v:r,f:i}}function Mt(){return t(T.wrapper,S+`:not(.stack):not([data-visibility="uncounted"])`)}function q(){return t(T.wrapper,C)}function Nt(){return t(T.wrapper,`.slides>section>section`)}function Pt(){return t(T.wrapper,C+`.stack`)}function J(){return q().length>1}function Ft(){return Nt().length>1}function It(){return Mt().map(e=>{let t={};for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n];t[r.name]=r.value}return t})}function Lt(){return Mt().length}function Rt(e,t){let n=q()[e],r=n&&n.querySelectorAll(`section`);return r&&r.length&&typeof t==`number`?r?r[t]:void 0:n}function zt(e,t){let n=typeof e==`number`?Rt(e,t):e;if(n)return n.slideBackgroundElement}function Bt(){let e=jt();return A({indexh:e.h,indexv:e.v,indexf:e.f,paused:ht(),overview:F.isActive()},V.getState())}function Vt(e){if(typeof e==`object`){G(r(e.indexh),r(e.indexv),r(e.indexf));let t=r(e.paused),n=r(e.overview);typeof t==`boolean`&&t!==ht()&&mt(t),typeof n==`boolean`&&n!==F.isActive()&&F.toggle(n),V.setState(e)}}function Y(){if(X(),y&&f.autoSlide!==!1){let e=y.querySelector(`.current-fragment[data-autoslide]`),n=e?e.getAttribute(`data-autoslide`):null,r=y.parentNode?y.parentNode.getAttribute(`data-autoslide`):null,i=y.getAttribute(`data-autoslide`);n?E=parseInt(n,10):i?E=parseInt(i,10):r?E=parseInt(r,10):(E=f.autoSlide,y.querySelectorAll(`.fragment`).length===0&&t(y,`video, audio`).forEach(e=>{e.hasAttribute(`data-autoplay`)&&E&&e.duration*1e3/e.playbackRate>E&&(E=e.duration*1e3/e.playbackRate+1e3)})),E&&!D&&!ht()&&!F.isActive()&&(!dt()||P.availableRoutes().next||f.loop===!0)&&(ue=setTimeout(()=>{typeof f.autoSlideMethod==`function`?f.autoSlideMethod():Kt(),Y()},E),de=Date.now()),le&&le.setPlaying(ue!==-1)}}function X(){clearTimeout(ue),ue=-1}function Ht(){E&&!D&&(D=!0,W({type:`autoslidepaused`}),clearTimeout(ue),le&&le.setPlaying(!1))}function Ut(){E&&D&&(D=!1,W({type:`autoslideresumed`}),Y())}function Z({skipFragments:e=!1}={}){if(ee.hasNavigatedHorizontally=!0,M.isActive())return M.prev();f.rtl?(F.isActive()||e||P.next()===!1)&&K().left&&G(h+1,f.navigationMode===`grid`?_:void 0):(F.isActive()||e||P.prev()===!1)&&K().left&&G(h-1,f.navigationMode===`grid`?_:void 0)}function Wt({skipFragments:e=!1}={}){if(ee.hasNavigatedHorizontally=!0,M.isActive())return M.next();f.rtl?(F.isActive()||e||P.prev()===!1)&&K().right&&G(h-1,f.navigationMode===`grid`?_:void 0):(F.isActive()||e||P.next()===!1)&&K().right&&G(h+1,f.navigationMode===`grid`?_:void 0)}function Q({skipFragments:e=!1}={}){if(M.isActive())return M.prev();(F.isActive()||e||P.prev()===!1)&&K().up&&G(h,_-1)}function $({skipFragments:e=!1}={}){if(ee.hasNavigatedVertically=!0,M.isActive())return M.next();(F.isActive()||e||P.next()===!1)&&K().down&&G(h,_+1)}function Gt({skipFragments:e=!1}={}){if(M.isActive())return M.prev();if(e||P.prev()===!1){if(K().up)Q({skipFragments:e});else{let n;if(n=f.rtl?t(T.wrapper,C+`.future`).pop():t(T.wrapper,C+`.past`).pop(),n&&n.classList.contains(`stack`)){let e=n.querySelectorAll(`section`).length-1||void 0;G(h-1,e)}else f.rtl?Wt({skipFragments:e}):Z({skipFragments:e})}}}function Kt({skipFragments:e=!1}={}){if(ee.hasNavigatedHorizontally=!0,ee.hasNavigatedVertically=!0,M.isActive())return M.next();if(e||P.next()===!1){let t=K();t.down&&t.right&&f.loop&&lt()&&(t.down=!1),t.down?$({skipFragments:e}):f.rtl?Z({skipFragments:e}):Wt({skipFragments:e})}}function qt(e){f.autoSlideStoppable&&Ht()}function Jt(e){let t=e.data;if(typeof t==`string`&&t.charAt(0)===`{`&&t.charAt(t.length-1)===`}`&&(t=JSON.parse(t),t.method&&typeof l[t.method]==`function`)){if(re.test(t.method)===!1){let e=l[t.method].apply(l,t.args);et(`callback`,{method:t.method,result:e})}else console.warn(`reveal.js: "`+t.method+`" is is blacklisted from the postMessage API`)}}function Yt(e){oe===`running`&&/section/gi.test(e.target.nodeName)&&(oe=`idle`,W({type:`slidetransitionend`,data:{indexh:h,indexv:_,previousSlide:v,currentSlide:y}}))}function Xt(e){let t=o(e.target,`a[href^="#"]`);if(t){let n=t.getAttribute(`href`),r=L.getIndicesFromHash(n);r&&(l.slide(r.h,r.v,r.f),e.preventDefault())}}function Zt(e){tt()}function Qt(e){document.hidden===!1&&document.activeElement!==document.body&&(typeof document.activeElement.blur==`function`&&document.activeElement.blur(),document.body.focus())}function $t(e){(document.fullscreenElement||document.webkitFullscreenElement)===T.wrapper&&(e.stopImmediatePropagation(),setTimeout(()=>{l.layout(),l.focus.focus()},1))}function en(e){dt()&&f.loop===!1?(G(0,0),Ut()):D?Ut():Ht()}let tn={VERSION:Ae,initialize:Ne,configure:Ke,destroy:Ye,sync:xt,syncSlide:St,syncFragments:P.sync.bind(P),slide:G,left:Z,right:Wt,up:Q,down:$,prev:Gt,next:Kt,navigateLeft:Z,navigateRight:Wt,navigateUp:Q,navigateDown:$,navigatePrev:Gt,navigateNext:Kt,navigateFragment:P.goto.bind(P),prevFragment:P.prev.bind(P),nextFragment:P.next.bind(P),on:Xe,off:Ze,addEventListener:Xe,removeEventListener:Ze,layout:tt,shuffle:wt,availableRoutes:K,availableFragments:P.availableRoutes.bind(P),toggleHelp:V.toggleHelp.bind(V),toggleOverview:F.toggle.bind(F),toggleScrollView:M.toggle.bind(M),togglePause:mt,toggleAutoSlide:_t,toggleJumpToSlide:gt,isFirstSlide:ut,isLastSlide:dt,isLastVerticalSlide:lt,isVerticalSlide:st,isVerticalStack:ct,isPaused:ht,isAutoSliding:vt,isSpeakerNotes:U.isSpeakerNotesWindow.bind(U),isOverview:F.isActive.bind(F),isFocused:Me.isFocused.bind(Me),isOverlayOpen:V.isOpen.bind(V),isScrollView:M.isActive.bind(M),isPrintView:N.isActive.bind(N),isReady:()=>m,loadSlide:O.load.bind(O),unloadSlide:O.unload.bind(O),startEmbeddedContent:()=>O.startEmbeddedContent(y),stopEmbeddedContent:()=>O.stopEmbeddedContent(y,{unloadIframes:!1}),previewIframe:V.previewIframe.bind(V),previewImage:V.previewImage.bind(V),previewVideo:V.previewVideo.bind(V),showPreview:V.previewIframe.bind(V),hidePreview:V.close.bind(V),addEventListeners:qe,removeEventListeners:Je,dispatchEvent:W,getState:Bt,setState:Vt,getProgress:At,getIndices:jt,getSlidesAttributes:It,getSlidePastCount:kt,getTotalSlides:Lt,getSlide:Rt,getPreviousSlide:()=>v,getCurrentSlide:()=>y,getSlideBackground:zt,getSlideNotes:U.getSlideNotes.bind(U),getSlides:Mt,getHorizontalSlides:q,getVerticalSlides:Nt,hasHorizontalSlides:J,hasVerticalSlides:Ft,hasNavigatedHorizontally:()=>ee.hasNavigatedHorizontally,hasNavigatedVertically:()=>ee.hasNavigatedVertically,shouldAutoAnimateBetween:yt,addKeyBinding:I.addKeyBinding.bind(I),removeKeyBinding:I.removeKeyBinding.bind(I),triggerKey:I.triggerKey.bind(I),registerKeyboardShortcut:I.registerKeyboardShortcut.bind(I),getComputedSlideSize:it,setCurrentScrollPage:bt,removeHiddenSlides:Le,getScale:()=>x,getConfig:()=>f,getQueryHash:u,getSlidePath:L.getHash.bind(L),getRevealElement:()=>a,getSlidesElement:()=>T.slides,getViewportElement:()=>T.viewport,getBackgroundsElement:()=>j.element,registerPlugin:B.registerPlugin.bind(B),hasPlugin:B.hasPlugin.bind(B),getPlugin:B.getPlugin.bind(B),getPlugins:B.getRegisteredPlugins.bind(B)};return e(l,A(A({},tn),{},{announceStatus:Be,getStatusText:Ve,focus:Me,scroll:M,progress:z,controls:R,location:L,overview:F,keyboard:I,fragments:P,backgrounds:j,slideContent:O,slideNumber:pe,onUserInput:qt,closeOverlay:V.close.bind(V),updateSlidesVisibility:Ot,layoutSlideContents:nt,transformSlides:Qe,cueAutoSlide:Y,cancelAutoSlide:X})),tn}var F=P,I=[];F.initialize=e=>{let t=document.querySelector(`.reveal`);if(!(t instanceof HTMLElement))throw Error(`Unable to find presentation root (<div class="reveal">).`);return Object.assign(F,new P(t,e)),I.map(e=>e(F)),F.initialize()},[`configure`,`on`,`off`,`addEventListener`,`removeEventListener`,`registerPlugin`].forEach(e=>{F[e]=(...t)=>{I.push(n=>n[e].call(null,...t))}}),F.isReady=()=>!1,F.VERSION=Ae;var L=`<!--
	NOTE: You need to build the notes plugin after making changes to this file.
-->
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>reveal.js - Speaker View</title>

		<style>
			body {
				font-family: Helvetica;
				font-size: 18px;
			}

			#current-slide,
			#upcoming-slide,
			#speaker-controls {
				padding: 6px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			#current-slide iframe,
			#upcoming-slide iframe {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
			}

			#current-slide .label,
			#upcoming-slide .label {
				position: absolute;
				top: 10px;
				left: 10px;
				z-index: 2;
			}

			#connection-status {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 20;
				padding: 30% 20% 20% 20%;
				font-size: 18px;
				color: #222;
				background: #fff;
				text-align: center;
				box-sizing: border-box;
				line-height: 1.4;
			}

			.overlay-element {
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				text-shadow: none;
				background: rgba( 220, 220, 220, 0.8 );
				color: #222;
				font-size: 14px;
			}

			.overlay-element.interactive:hover {
				background: rgba( 220, 220, 220, 1 );
			}

			#current-slide {
				position: absolute;
				width: 60%;
				height: 100%;
				top: 0;
				left: 0;
				padding-right: 0;
			}

			#upcoming-slide {
				position: absolute;
				width: 40%;
				height: 40%;
				right: 0;
				top: 0;
			}

			/* Speaker controls */
			#speaker-controls {
				position: absolute;
				top: 40%;
				right: 0;
				width: 40%;
				height: 60%;
				overflow: auto;
				font-size: 18px;
			}

				.speaker-controls-time.hidden,
				.speaker-controls-notes.hidden {
					display: none;
				}

				.speaker-controls-time .label,
				.speaker-controls-pace .label,
				.speaker-controls-notes .label {
					text-transform: uppercase;
					font-weight: normal;
					font-size: 0.66em;
					color: #666;
					margin: 0;
				}

				.speaker-controls-time, .speaker-controls-pace {
					border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );
					margin-bottom: 10px;
					padding: 10px 16px;
					padding-bottom: 20px;
					cursor: pointer;
				}

				.speaker-controls-time .reset-button {
					opacity: 0;
					float: right;
					color: #666;
					text-decoration: none;
				}
				.speaker-controls-time:hover .reset-button {
					opacity: 1;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock {
					width: 50%;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock,
				.speaker-controls-time .pacing .hours-value,
				.speaker-controls-time .pacing .minutes-value,
				.speaker-controls-time .pacing .seconds-value {
					font-size: 1.9em;
				}

				.speaker-controls-time .timer {
					float: left;
				}

				.speaker-controls-time .clock {
					float: right;
					text-align: right;
				}

				.speaker-controls-time span.mute {
					opacity: 0.3;
				}

				.speaker-controls-time .pacing-title {
					margin-top: 5px;
				}

				.speaker-controls-time .pacing.ahead {
					color: blue;
				}

				.speaker-controls-time .pacing.on-track {
					color: green;
				}

				.speaker-controls-time .pacing.behind {
					color: red;
				}

				.speaker-controls-notes {
					padding: 10px 16px;
				}

				.speaker-controls-notes .value {
					margin-top: 5px;
					line-height: 1.4;
					font-size: 1.2em;
				}

			/* Layout selector\xA0*/
			#speaker-layout {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #222;
				z-index: 10;
			}
				#speaker-layout select {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 0;
					box-shadow: 0;
					cursor: pointer;
					opacity: 0;

					font-size: 1em;
					background-color: transparent;

					-moz-appearance: none;
					-webkit-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}

				#speaker-layout select:focus {
					outline: none;
					box-shadow: none;
				}

			.clear {
				clear: both;
			}

			/* Speaker layout: Wide */
			body[data-speaker-layout="wide"] #current-slide,
			body[data-speaker-layout="wide"] #upcoming-slide {
				width: 50%;
				height: 45%;
				padding: 6px;
			}

			body[data-speaker-layout="wide"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="wide"] #upcoming-slide {
				top: 0;
				left: 50%;
			}

			body[data-speaker-layout="wide"] #speaker-controls {
				top: 45%;
				left: 0;
				width: 100%;
				height: 50%;
				font-size: 1.25em;
			}

			/* Speaker layout: Tall */
			body[data-speaker-layout="tall"] #current-slide,
			body[data-speaker-layout="tall"] #upcoming-slide {
				width: 45%;
				height: 50%;
				padding: 6px;
			}

			body[data-speaker-layout="tall"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="tall"] #upcoming-slide {
				top: 50%;
				left: 0;
			}

			body[data-speaker-layout="tall"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 45%;
				width: 55%;
				height: 100%;
				font-size: 1.25em;
			}

			/* Speaker layout: Notes only */
			body[data-speaker-layout="notes-only"] #current-slide,
			body[data-speaker-layout="notes-only"] #upcoming-slide {
				display: none;
			}

			body[data-speaker-layout="notes-only"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 1.25em;
			}

			@media screen and (max-width: 1080px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 16px;
				}
			}

			@media screen and (max-width: 900px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 14px;
				}
			}

			@media screen and (max-width: 800px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 12px;
				}
			}

		</style>
	</head>

	<body>

		<div id="connection-status">Loading speaker view...</div>

		<div id="current-slide"></div>
		<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>
		<div id="speaker-controls">
			<div class="speaker-controls-time">
				<h4 class="label">Time <span class="reset-button">Click to Reset</span></h4>
				<div class="clock">
					<span class="clock-value">0:00 AM</span>
				</div>
				<div class="timer">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
				<div class="clear"></div>

				<h4 class="label pacing-title" style="display: none">Pacing – Time to finish current slide</h4>
				<div class="pacing" style="display: none">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
			</div>

			<div class="speaker-controls-notes hidden">
				<h4 class="label">Notes</h4>
				<div class="value"></div>
			</div>
		</div>
		<div id="speaker-layout" class="overlay-element interactive">
			<span class="speaker-layout-label"></span>
			<select class="speaker-layout-dropdown"></select>
		</div>

		<script>

			(function() {

				var notes,
					notesValue,
					currentState,
					currentSlide,
					upcomingSlide,
					layoutLabel,
					layoutDropdown,
					pendingCalls = {},
					lastRevealApiCallId = 0,
					connected = false

				var connectionStatus = document.querySelector( '#connection-status' );

				var SPEAKER_LAYOUTS = {
					'default': 'Default',
					'wide': 'Wide',
					'tall': 'Tall',
					'notes-only': 'Notes only'
				};

				setupLayout();

				let openerOrigin;

				try {
					openerOrigin = window.opener.location.origin;
				}
				catch ( error ) { console.warn( error ) }

				// In order to prevent XSS, the speaker view will only run if its
				// opener has the same origin as itself
				if( window.location.origin !== openerOrigin ) {
					connectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';
					return;
				}

				var connectionTimeout = setTimeout( function() {
					connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';
				}, 5000 );

				window.addEventListener( 'message', function( event ) {

					// Validate the origin of all messages to avoid parsing messages
					// that aren't meant for us. Ignore when running off file:// so
					// that the speaker view continues to work without a web server.
					if( window.location.origin !== event.origin && window.location.origin !== 'file://' ) {
						return
					}

					clearTimeout( connectionTimeout );
					connectionStatus.style.display = 'none';

					var data = JSON.parse( event.data );

					// The overview mode is only useful to the reveal.js instance
					// where navigation occurs so we don't sync it
					if( data.state ) delete data.state.overview;

					// Messages sent by the notes plugin inside of the main window
					if( data && data.namespace === 'reveal-notes' ) {
						if( data.type === 'connect' ) {
							handleConnectMessage( data );
						}
						else if( data.type === 'state' ) {
							handleStateMessage( data );
						}
						else if( data.type === 'return' ) {
							pendingCalls[data.callId](data.result);
							delete pendingCalls[data.callId];
						}
					}
					// Messages sent by the reveal.js inside of the current slide preview
					else if( data && data.namespace === 'reveal' ) {
						const supportedEvents = [
							'slidechanged',
							'fragmentshown',
							'fragmenthidden',
							'paused',
							'resumed',
							'previewiframe',
							'previewimage',
							'previewvideo',
							'closeoverlay'
						];

						if( /ready/.test( data.eventName ) ) {
							// Send a message back to notify that the handshake is complete
							window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );
						}
						else if( supportedEvents.includes( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {
							dispatchStateToMainWindow( data.state );
						}
					}

				} );

				/**
				 * Updates the presentation in the main window to match the state
				 * of the presentation in the notes window.
				 */
				const dispatchStateToMainWindow = debounce(( state ) => {
					window.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );
				}, 500);

				/**
				 * Asynchronously calls the Reveal.js API of the main frame.
				 */
				function callRevealApi( methodName, methodArguments, callback ) {

					var callId = ++lastRevealApiCallId;
					pendingCalls[callId] = callback;
					window.opener.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'call',
						callId: callId,
						methodName: methodName,
						arguments: methodArguments
					} ), '*' );

				}

				/**
				 * Called when the main window is trying to establish a
				 * connection.
				 */
				function handleConnectMessage( data ) {

					if( connected === false ) {
						connected = true;

						setupIframes( data );
						setupKeyboard();
						setupNotes();
						setupTimer();
						setupHeartbeat();
					}

				}

				/**
				 * Called when the main window sends an updated state.
				 */
				function handleStateMessage( data ) {

					// Store the most recently set state to avoid circular loops
					// applying the same state
					currentState = JSON.stringify( data.state );

					// No need for updating the notes in case of fragment changes
					if ( data.notes ) {
						notes.classList.remove( 'hidden' );
						notesValue.style.whiteSpace = data.whitespace;
						if( data.markdown ) {
							notesValue.innerHTML = marked.parse( data.notes );
						}
						else {
							notesValue.innerHTML = data.notes;
						}
					}
					else {
						notes.classList.add( 'hidden' );
					}

					// Don't show lightboxes in the upcoming slide
					const { previewVideo, previewImage, previewIframe, ...upcomingState } = data.state;

					// Update the note slides
					currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ upcomingState ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );

				}

				// Limit to max one state update per X ms
				handleStateMessage = debounce( handleStateMessage, 200 );

				/**
				 * Forward keyboard events to the current slide window.
				 * This enables keyboard events to work even if focus
				 * isn't set on the current slide iframe.
				 *
				 * Block F5 default handling, it reloads and disconnects
				 * the speaker notes window.
				 */
				function setupKeyboard() {

					document.addEventListener( 'keydown', function( event ) {
						if( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {
							event.preventDefault();
							return false;
						}
						currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );
					} );

				}

				/**
				 * Creates the preview iframes.
				 */
				function setupIframes( data ) {

					var params = [
						'receiver',
						'progress=false',
						'history=false',
						'transition=none',
						'autoSlide=0',
						'backgroundTransition=none'
					].join( '&' );

					var urlSeparator = /\\?/.test(data.url) ? '&' : '?';
					var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
					var currentURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&postMessageEvents=true' + hash;
					var upcomingURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&controls=false' + hash;

					currentSlide = document.createElement( 'iframe' );
					currentSlide.setAttribute( 'width', 1280 );
					currentSlide.setAttribute( 'height', 1024 );
					currentSlide.setAttribute( 'src', currentURL );
					document.querySelector( '#current-slide' ).appendChild( currentSlide );

					upcomingSlide = document.createElement( 'iframe' );
					upcomingSlide.setAttribute( 'width', 640 );
					upcomingSlide.setAttribute( 'height', 512 );
					upcomingSlide.setAttribute( 'src', upcomingURL );
					document.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );

				}

				/**
				 * Setup the notes UI.
				 */
				function setupNotes() {

					notes = document.querySelector( '.speaker-controls-notes' );
					notesValue = document.querySelector( '.speaker-controls-notes .value' );

				}

				/**
				 * We send out a heartbeat at all times to ensure we can
				 * reconnect with the main presentation window after reloads.
				 */
				function setupHeartbeat() {

					setInterval( () => {
						window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );
					}, 1000 );

				}

				function getTimings( callback ) {

					callRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {
						callRevealApi( 'getConfig', [], function ( config ) {
							var totalTime = config.totalTime;
							var minTimePerSlide = config.minimumTimePerSlide || 0;
							var defaultTiming = config.defaultTiming;
							if ((defaultTiming == null) && (totalTime == null)) {
								callback(null);
								return;
							}
							// Setting totalTime overrides defaultTiming
							if (totalTime) {
								defaultTiming = 0;
							}
							var timings = [];
							for ( var i in slideAttributes ) {
								var slide = slideAttributes[ i ];
								var timing = defaultTiming;
								if( slide.hasOwnProperty( 'data-timing' )) {
									var t = slide[ 'data-timing' ];
									timing = parseInt(t);
									if( isNaN(timing) ) {
										console.warn("Could not parse timing '" + t + "' of slide " + i + "; using default of " + defaultTiming);
										timing = defaultTiming;
									}
								}
								timings.push(timing);
							}
							if ( totalTime ) {
								// After we've allocated time to individual slides, we summarize it and
								// subtract it from the total time
								var remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );
								// The remaining time is divided by the number of slides that have 0 seconds
								// allocated at the moment, giving the average time-per-slide on the remaining slides
								var remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length
								var timePerSlide = Math.round( remainingTime / remainingSlides, 0 )
								// And now we replace every zero-value timing with that average
								timings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );
							}
							var slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length
							if ( slidesUnderMinimum ) {
								message = "The pacing time for " + slidesUnderMinimum + " slide(s) is under the configured minimum of " + minTimePerSlide + " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";
								alert(message);
							}
							callback( timings );
						} );
					} );

				}

				/**
				 * Return the number of seconds allocated for presenting
				 * all slides up to and including this one.
				 */
				function getTimeAllocated( timings, callback ) {

					callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
						var allocated = 0;
						for (var i in timings.slice(0, currentSlide + 1)) {
							allocated += timings[i];
						}
						callback( allocated );
					} );

				}

				/**
				 * Create the timer and clock and start updating them
				 * at an interval.
				 */
				function setupTimer() {

					var start = new Date(),
					timeEl = document.querySelector( '.speaker-controls-time' ),
					clockEl = timeEl.querySelector( '.clock-value' ),
					hoursEl = timeEl.querySelector( '.hours-value' ),
					minutesEl = timeEl.querySelector( '.minutes-value' ),
					secondsEl = timeEl.querySelector( '.seconds-value' ),
					pacingTitleEl = timeEl.querySelector( '.pacing-title' ),
					pacingEl = timeEl.querySelector( '.pacing' ),
					pacingHoursEl = pacingEl.querySelector( '.hours-value' ),
					pacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),
					pacingSecondsEl = pacingEl.querySelector( '.seconds-value' );

					var timings = null;
					getTimings( function ( _timings ) {

						timings = _timings;
						if (_timings !== null) {
							pacingTitleEl.style.removeProperty('display');
							pacingEl.style.removeProperty('display');
						}

						// Update once directly
						_updateTimer();

						// Then update every second
						setInterval( _updateTimer, 1000 );

					} );


					function _resetTimer() {

						if (timings == null) {
							start = new Date();
							_updateTimer();
						}
						else {
							// Reset timer to beginning of current slide
							getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
								var slideEndTiming = slideEndTimingSeconds * 1000;
								callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
									var currentSlideTiming = timings[currentSlide] * 1000;
									var previousSlidesTiming = slideEndTiming - currentSlideTiming;
									var now = new Date();
									start = new Date(now.getTime() - previousSlidesTiming);
									_updateTimer();
								} );
							} );
						}

					}

					timeEl.addEventListener( 'click', function() {
						_resetTimer();
						return false;
					} );

					function _displayTime( hrEl, minEl, secEl, time) {

						var sign = Math.sign(time) == -1 ? "-" : "";
						time = Math.abs(Math.round(time / 1000));
						var seconds = time % 60;
						var minutes = Math.floor( time / 60 ) % 60 ;
						var hours = Math.floor( time / ( 60 * 60 )) ;
						hrEl.innerHTML = sign + zeroPadInteger( hours );
						if (hours == 0) {
							hrEl.classList.add( 'mute' );
						}
						else {
							hrEl.classList.remove( 'mute' );
						}
						minEl.innerHTML = ':' + zeroPadInteger( minutes );
						if (hours == 0 && minutes == 0) {
							minEl.classList.add( 'mute' );
						}
						else {
							minEl.classList.remove( 'mute' );
						}
						secEl.innerHTML = ':' + zeroPadInteger( seconds );
					}

					function _updateTimer() {

						var diff, hours, minutes, seconds,
						now = new Date();

						diff = now.getTime() - start.getTime();

						clockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
						_displayTime( hoursEl, minutesEl, secondsEl, diff );
						if (timings !== null) {
							_updatePacing(diff);
						}

					}

					function _updatePacing(diff) {

						getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
							var slideEndTiming = slideEndTimingSeconds * 1000;

							callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
								var currentSlideTiming = timings[currentSlide] * 1000;
								var timeLeftCurrentSlide = slideEndTiming - diff;
								if (timeLeftCurrentSlide < 0) {
									pacingEl.className = 'pacing behind';
								}
								else if (timeLeftCurrentSlide < currentSlideTiming) {
									pacingEl.className = 'pacing on-track';
								}
								else {
									pacingEl.className = 'pacing ahead';
								}
								_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );
							} );
						} );
					}

				}

				/**
				 * Sets up the speaker view layout and layout selector.
				 */
				function setupLayout() {

					layoutDropdown = document.querySelector( '.speaker-layout-dropdown' );
					layoutLabel = document.querySelector( '.speaker-layout-label' );

					// Render the list of available layouts
					for( var id in SPEAKER_LAYOUTS ) {
						var option = document.createElement( 'option' );
						option.setAttribute( 'value', id );
						option.textContent = SPEAKER_LAYOUTS[ id ];
						layoutDropdown.appendChild( option );
					}

					// Monitor the dropdown for changes
					layoutDropdown.addEventListener( 'change', function( event ) {

						setLayout( layoutDropdown.value );

					}, false );

					// Restore any currently persisted layout
					setLayout( getLayout() );

				}

				/**
				 * Sets a new speaker view layout. The layout is persisted
				 * in local storage.
				 */
				function setLayout( value ) {

					var title = SPEAKER_LAYOUTS[ value ];

					layoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );
					layoutDropdown.value = value;

					document.body.setAttribute( 'data-speaker-layout', value );

					// Persist locally
					if( supportsLocalStorage() ) {
						window.localStorage.setItem( 'reveal-speaker-layout', value );
					}

				}

				/**
				 * Returns the ID of the most recently set speaker layout
				 * or our default layout if none has been set.
				 */
				function getLayout() {

					if( supportsLocalStorage() ) {
						var layout = window.localStorage.getItem( 'reveal-speaker-layout' );
						if( layout ) {
							return layout;
						}
					}

					// Default to the first record in the layouts hash
					for( var id in SPEAKER_LAYOUTS ) {
						return id;
					}

				}

				function supportsLocalStorage() {

					try {
						localStorage.setItem('test', 'test');
						localStorage.removeItem('test');
						return true;
					}
					catch( e ) {
						return false;
					}

				}

				function zeroPadInteger( num ) {

					var str = '00' + parseInt( num );
					return str.substring( str.length - 2 );

				}

				/**
				 * Limits the frequency at which a function can be called.
				 */
				function debounce( fn, ms ) {

					var lastTime = 0,
						timeout;

					return function() {

						var args = arguments;
						var context = this;

						clearTimeout( timeout );

						var timeSinceLastCall = Date.now() - lastTime;
						if( timeSinceLastCall > ms ) {
							fn.apply( context, args );
							lastTime = Date.now();
						}
						else {
							timeout = setTimeout( function() {
								fn.apply( context, args );
								lastTime = Date.now();
							}, ms - timeSinceLastCall );
						}

					}

				}

			})();

		<\/script>
	</body>
</html>`;function R(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var z=R();function je(e){z=e}var B={exec:()=>null};function V(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(H.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Me=(()=>{try{return!0}catch{return!1}})(),H={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,`i`),blockquoteBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}>`)},U=/^(?:[ \t]*(?:\n|$))+/,Ne=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Pe=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Fe=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ie=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Le=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Re=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ze=V(Re).replace(/bull/g,Le).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Be=V(Re).replace(/bull/g,Le).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ve=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,He=/^[^\n]+/,Ue=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,We=V(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Ue).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ge=V(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Le).getRegex(),Ke=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,qe=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Je=V(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,qe).replace(`tag`,Ke).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ye=V(Ve).replace(`hr`,Fe).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Ke).getRegex(),Xe={blockquote:V(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,Ye).getRegex(),code:Ne,def:We,fences:Pe,heading:Ie,hr:Fe,html:Je,lheading:ze,list:Ge,newline:U,paragraph:Ye,table:B,text:He},Ze=V(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,Fe).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Ke).getRegex(),Qe={...Xe,lheading:Be,table:Ze,paragraph:V(Ve).replace(`hr`,Fe).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,Ze).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Ke).getRegex()},W={...Xe,html:V(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,qe).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:B,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:V(Ve).replace(`hr`,Fe).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,ze).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},$e=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,et=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tt=/^( {2,}|\\)\n(?!\s*$)/,nt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,rt=/[\p{P}\p{S}]/u,it=/[\s\p{P}\p{S}]/u,at=/[^\s\p{P}\p{S}]/u,ot=V(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,it).getRegex(),st=/(?!~)[\p{P}\p{S}]/u,ct=/(?!~)[\s\p{P}\p{S}]/u,lt=/(?:[^\s\p{P}\p{S}]|~)/u,ut=V(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,Me?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),dt=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,ft=V(dt,`u`).replace(/punct/g,rt).getRegex(),pt=V(dt,`u`).replace(/punct/g,st).getRegex(),mt=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,ht=V(mt,`gu`).replace(/notPunctSpace/g,at).replace(/punctSpace/g,it).replace(/punct/g,rt).getRegex(),gt=V(mt,`gu`).replace(/notPunctSpace/g,lt).replace(/punctSpace/g,ct).replace(/punct/g,st).getRegex(),_t=V(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,at).replace(/punctSpace/g,it).replace(/punct/g,rt).getRegex(),vt=V(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,rt).getRegex(),G=V(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,at).replace(/punctSpace/g,it).replace(/punct/g,rt).getRegex(),yt=V(/\\(punct)/,`gu`).replace(/punct/g,rt).getRegex(),bt=V(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xt=V(qe).replace(`(?:-->|$)`,`-->`).getRegex(),St=V(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,xt).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ct=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,wt=V(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,Ct).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Tt=V(/^!?\[(label)\]\[(ref)\]/).replace(`label`,Ct).replace(`ref`,Ue).getRegex(),Et=V(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Ue).getRegex(),Dt=V(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,Tt).replace(`nolink`,Et).getRegex(),Ot=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,K={_backpedal:B,anyPunctuation:yt,autolink:bt,blockSkip:ut,br:tt,code:et,del:B,delLDelim:B,delRDelim:B,emStrongLDelim:ft,emStrongRDelimAst:ht,emStrongRDelimUnd:_t,escape:$e,link:wt,nolink:Et,punctuation:ot,reflink:Tt,reflinkSearch:Dt,tag:St,text:nt,url:B},kt={...K,link:V(/^!?\[(label)\]\((.*?)\)/).replace(`label`,Ct).getRegex(),reflink:V(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,Ct).getRegex()},At={...K,emStrongRDelimAst:gt,emStrongLDelim:pt,delLDelim:vt,delRDelim:G,url:V(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,Ot).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:V(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,Ot).getRegex()},jt={...At,br:V(tt).replace(`{2,}`,`*`).getRegex(),text:V(At.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},Mt={normal:Xe,gfm:Qe,pedantic:W},q={normal:K,gfm:At,breaks:jt,pedantic:kt},Nt={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Pt=e=>Nt[e];function J(e,t){if(t){if(H.escapeTest.test(e))return e.replace(H.escapeReplace,Pt)}else if(H.escapeTestNoEncode.test(e))return e.replace(H.escapeReplaceNoEncode,Pt);return e}function Ft(e){try{e=encodeURI(e).replace(H.percentDecode,`%`)}catch{return null}return e}function It(e,t){let n=e.replace(H.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(H.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(H.slashPipe,`|`);return n}function Lt(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Rt(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function zt(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Bt(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`);r.state.inLink=!0;let c={type:e[0].charAt(0)===`!`?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,c}function Vt(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}var Y=class{options;rules;lexer;constructor(e){this.options=e||z}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=t[0].replace(this.rules.other.codeRemoveIndent,``);return{type:`code`,raw:t[0],codeBlockStyle:`indented`,text:this.options.pedantic?e:Lt(e,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Vt(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Lt(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:Lt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Lt(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.blockquote(a);i[i.length-1]=o,n=n.substring(0,n.length-t.raw.length)+o.raw,r=r.substring(0,r.length-t.text.length)+o.text;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=zt(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items){if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),e.task){if(e.text=e.text.replace(this.rules.other.listReplaceTask,``),e.tokens[0]?.type===`text`||e.tokens[0]?.type===`paragraph`){e.tokens[0].raw=e.tokens[0].raw.replace(this.rules.other.listReplaceTask,``),e.tokens[0].text=e.tokens[0].text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}}let t=this.rules.other.listTaskCheckbox.exec(e.raw);if(t){let n={type:`checkbox`,raw:t[0]+` `,checked:t[0]!==`[ ]`};e.checked=n.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=n.raw+e.tokens[0].raw,e.tokens[0].text=n.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(n)):e.tokens.unshift({type:`paragraph`,raw:n.raw,text:n.raw,tokens:[n]}):e.tokens.unshift(n)}}if(!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:`html`,block:!0,raw:t[0],pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:t[0],href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=It(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(It(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:t[0],depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=Lt(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=Rt(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Bt(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Bt(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=0,c=r[0][0]===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+n);(r=c.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}if((r[5]||r[6])&&n%3&&!((n+a)%3)){s+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+s);let t=[...r[0]][0].length,c=e.slice(0,n+r.index+t+a);if(Math.min(n,a)%2){let e=c.slice(1,-1);return{type:`em`,raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let l=c.slice(2,-2);return{type:`strong`,raw:c,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},X=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||z,this.options.tokenizer=this.options.tokenizer||new Y,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:H,block:Mt.normal,inline:q.normal};this.options.pedantic?(t.block=Mt.pedantic,t.inline=q.pedantic):this.options.gfm&&(t.block=Mt.gfm,t.inline=this.options.breaks?q.breaks:q.gfm),this.tokenizer.rules=t}static get rules(){return{block:Mt,inline:q}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(H.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(H.tabCharGlobal,`    `).replace(H.spaceLine,``));e;){let r;if(this.options.extensions?.block?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let n=t.at(-1);r.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let a=t.at(-1);n&&a?.type===`paragraph`?(a.raw+=(a.raw.endsWith(`
`)?``:`
`)+r.raw,a.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if(e){let t=`Infinite loop on byte: `+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)e.includes(r[0].slice(r[0].lastIndexOf(`[`)+1,-1))&&(n=n.slice(0,r.index)+`[`+`a`.repeat(r[0].length-2)+`]`+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+`++`+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+`[`+`a`.repeat(r[0].length-i-2)+`]`+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,o=``;for(;e;){a||(o=``),a=!1;let r;if(this.options.extensions?.inline?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);let n=t.at(-1);r.type===`text`&&n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(i)){e=e.substring(r.raw.length),r.raw.slice(-1)!==`_`&&(o=r.raw.slice(-1)),a=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(e){let t=`Infinite loop on byte: `+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}return t}},Ht=class{options;parser;constructor(e){this.options=e||z}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(H.notSpaceStart)?.[0],i=e.replace(H.endingNewline,``)+`
`;return r?`<pre><code class="language-`+J(r)+`">`+(n?i:J(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:J(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${J(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=Ft(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+J(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Ft(e);if(i===null)return J(n);e=i;let a=`<img src="${e}" alt="${J(n)}"`;return t&&(a+=` title="${J(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:J(e.text)}},Ut=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},Z=class e{options;renderer;textRenderer;constructor(e){this.options=e||z,this.options.renderer=this.options.renderer||new Ht,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ut}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},Wt=class{options;block;constructor(e){this.options=e||z}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?X.lex:X.lexInline}provideParser(){return this.block?Z.parse:Z.parseInline}},Q=new class{defaults=R();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Z;Renderer=Ht;TextRenderer=Ut;Lexer=X;Tokenizer=Y;Hooks=Wt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new Ht(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Y(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Wt;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=Wt.passThroughHooks.has(n)?e=>{if(this.defaults.async&&Wt.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return X.lex(e,t??this.defaults)}parser(e,t){return Z.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer():e?X.lex:X.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser():e?Z.parse:Z.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer():e?X.lex:X.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser():e?Z.parse:Z.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+J(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function $(e,t){return Q.parse(e,t)}$.options=$.setOptions=function(e){return Q.setOptions(e),$.defaults=Q.defaults,je($.defaults),$},$.getDefaults=R,$.defaults=z,$.use=function(...e){return Q.use(...e),$.defaults=Q.defaults,je($.defaults),$},$.walkTokens=function(e,t){return Q.walkTokens(e,t)},$.parseInline=Q.parseInline,$.Parser=Z,$.parser=Z.parse,$.Renderer=Ht,$.TextRenderer=Ut,$.Lexer=X,$.lexer=X.lex,$.Tokenizer=Y,$.Hooks=Wt,$.parse=$,$.options,$.setOptions,$.use,$.walkTokens,$.parseInline,Z.parse,X.lex;var Gt=()=>{let e,t=null,n;function r(){if(t&&!t.closed)t.focus();else{if(t=window.open(`about:blank`,`reveal.js - Notes`,`width=1100,height=700`),t.marked=$,t.document.write(L),!t){alert(`Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.`);return}a()}}function i(e){t&&!t.closed?t.focus():(t=e,window.addEventListener(`message`,l),u())}function a(){let r=n.getConfig().url,i=typeof r==`string`?r:window.location.protocol+`//`+window.location.host+window.location.pathname+window.location.search;e=setInterval(function(){t.postMessage(JSON.stringify({namespace:`reveal-notes`,type:`connect`,state:n.getState(),url:i}),`*`)},500),window.addEventListener(`message`,l)}function o(e,r,i){let a=n[e].apply(n,r);t.postMessage(JSON.stringify({namespace:`reveal-notes`,type:`return`,result:a,callId:i}),`*`)}function s(e){let r=n.getCurrentSlide(),i=r.querySelectorAll(`aside.notes`),a=r.querySelector(`.current-fragment`),o={namespace:`reveal-notes`,type:`state`,notes:``,markdown:!1,whitespace:`normal`,state:n.getState()};if(r.hasAttribute(`data-notes`)&&(o.notes=r.getAttribute(`data-notes`),o.whitespace=`pre-wrap`),a){let e=a.querySelector(`aside.notes`);e?(o.notes=e.innerHTML,o.markdown=typeof e.getAttribute(`data-markdown`)==`string`,i=null):a.hasAttribute(`data-notes`)&&(o.notes=a.getAttribute(`data-notes`),o.whitespace=`pre-wrap`,i=null)}i&&i.length&&(i=Array.from(i).filter(e=>e.closest(`.fragment`)===null),o.notes=i.map(e=>e.innerHTML).join(`
`),o.markdown=i[0]&&typeof i[0].getAttribute(`data-markdown`)==`string`),t.postMessage(JSON.stringify(o),`*`)}function c(e){try{return window.location.origin===e.source.location.origin}catch{return!1}}function l(t){if(c(t))try{let n=JSON.parse(t.data);n&&n.namespace===`reveal-notes`&&n.type===`connected`?(clearInterval(e),u()):n&&n.namespace===`reveal-notes`&&n.type===`call`&&o(n.methodName,n.arguments,n.callId)}catch{}}function u(){n.on(`slidechanged`,s),n.on(`fragmentshown`,s),n.on(`fragmenthidden`,s),n.on(`overviewhidden`,s),n.on(`overviewshown`,s),n.on(`paused`,s),n.on(`resumed`,s),n.on(`previewiframe`,s),n.on(`previewimage`,s),n.on(`previewvideo`,s),n.on(`closeoverlay`,s),s()}return{id:`notes`,init:function(e){n=e,/receiver/i.test(window.location.search)||(window.location.search.match(/(\?|\&)notes/gi)===null?window.addEventListener(`message`,e=>{if(!t&&typeof e.data==`string`){let t;try{t=JSON.parse(e.data)}catch{}t&&t.namespace===`reveal-notes`&&t.type===`heartbeat`&&i(e.source)}}):r(),n.addKeyBinding({keyCode:83,key:`S`,description:`Speaker notes view`},function(){r()}))},open:r}},Kt=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;new F({width:1600,height:900,margin:0,minScale:.2,maxScale:1.5,controls:!0,controlsTutorial:!1,controlsLayout:`edges`,progress:!0,history:!0,hash:!0,center:!1,touch:!0,keyboard:!0,overview:!0,help:!0,slideNumber:`c/t`,showSlideNumber:`speaker`,transition:Kt?`none`:`fade`,transitionSpeed:`fast`,backgroundTransition:Kt?`none`:`fade`,autoAnimate:!1,pdfSeparateFragments:!1,pdfMaxPagesPerSlide:1,plugins:[Gt]}).initialize().then(()=>{document.documentElement.classList.add(`reveal-ready`)});