/* Navegación entre secciones, menú móvil y efectos de movimiento */
(function(){
  var pages=["inicio","proyectos","curriculum"];
  var btn=document.querySelector(".menu-btn"), menu=document.getElementById("menu");
  function setMenu(open){
    menu.classList.toggle("open",open);
    btn.setAttribute("aria-expanded",open);
    btn.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");
  }
  btn.addEventListener("click",function(){setMenu(!menu.classList.contains("open"))});
  menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});

  function route(){
    var h=(location.hash||"#inicio").slice(1), page=h, target=null;
    if(pages.indexOf(h)<0){
      var el=h&&document.getElementById(h), host=el&&el.closest(".page");
      page=host?host.id.slice(2):"inicio"; if(host) target=h;
    }
    pages.forEach(function(p){document.getElementById("p-"+p).classList.toggle("active",p===page)});
    document.querySelectorAll(".nav a[data-page]").forEach(function(a){
      if(a.dataset.page===(target==="contacto"?target:page)) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    if(target){ requestAnimationFrame(function(){document.getElementById(target).scrollIntoView();}); }
    else window.scrollTo(0,0);
    if(window.__onRoute) window.__onRoute();
  }
  window.addEventListener("hashchange",route);

  /* ---------- Movimiento ---------- */
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root=document.documentElement;

  // Barra de progreso de lectura
  var header=document.querySelector(".header"), bar=document.createElement("div");
  bar.className="progress"; bar.setAttribute("aria-hidden","true"); header.appendChild(bar);

  if(reduce){ route(); window.addEventListener("scroll",progress,{passive:true}); progress(); return; }
  root.classList.add("motion");

  // 1. Aparición escalonada al entrar en pantalla
  var groups=[
    [".hero .hello, .hero h1, .hero .lead, .hero .ctas",""],
    [".portrait","rv-s"],
    [".statement p","rv-s"],
    [".h2, .sec-head > a",""],
    [".three > div",""],
    [".hx",""],
    [".fc",""],
    [".how > div > .intro, .how > div > img",""],
    [".steps li","rv-r"],
    [".contact .big, .contact .mail, .contact .foot",""],
    [".pj-hero h1, .pj-hero p",""],
    [".nx-head > div, .nx-facts > div, .nx-sub, .nx-item, .nx-foot",""],
    [".nx-mig","rv-r"],
    [".nx-media","rv-s"],
    [".pj .pj-media","rv-l"],[".pj.flip .pj-media","rv-r"],
    [".pj .pj-txt > *",""],
    [".band h2, .band .btn",""],
    [".cv-photo","rv-s"],
    [".cv-intro h1, .cv-role, .cv-bio, .cv-bio2, .cv-intro .ctas",""],
    [".job, .stack .row",""]
  ];
  var els=[];
  groups.forEach(function(g){
    document.querySelectorAll(g[0]).forEach(function(el){
      if(el.classList.contains("rv")){ if(g[1]){el.classList.remove("rv-l","rv-r","rv-s");el.classList.add(g[1]);} return; }
      el.classList.add("rv"); if(g[1]) el.classList.add(g[1]); els.push(el);
    });
  });
  // Retraso escalonado entre hermanos que aparecen juntos
  els.forEach(function(el){
    var sib=Array.prototype.filter.call(el.parentNode.children,function(c){return c.classList.contains("rv")});
    el.style.setProperty("--d",Math.min(sib.indexOf(el),6)*90+"ms");
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{rootMargin:"0px 0px -30px 0px",threshold:.08});
  els.forEach(function(el){io.observe(el)});

  // 2. Parallax
  var px=[
    [".statement img",.22],[".portrait img",-.06],[".cv-photo img",-.06],
    [".how img",.08],[".pj-phone",-.07],[".nx-media .pj-phone",-.1]
  ];
  var pxEls=[];
  px.forEach(function(p){document.querySelectorAll(p[0]).forEach(function(el){el.dataset.px=p[1];pxEls.push(el)})});
  var vh=window.innerHeight;
  function parallax(){
    pxEls.forEach(function(el){
      var r=el.parentNode.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200) return;
      var off=(r.top+r.height/2-vh/2)*parseFloat(el.dataset.px);
      el.style.translate="0 "+off.toFixed(1)+"px";
    });
  }
  function progress(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.transform="scaleX("+(max>0?window.scrollY/max:0)+")";
  }
  var ticking=false;
  function onScroll(){ if(!ticking){ticking=true;requestAnimationFrame(function(){parallax();progress();ticking=false;});} }
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",function(){vh=window.innerHeight;onScroll();});
  window.__onRoute=function(){ requestAnimationFrame(onScroll); };

  // Solo con ratón: inclinación 3D, botones magnéticos y cursor
  if(finePointer){
    // 3. Inclinación de los mockups de proyecto
    document.querySelectorAll(".pj-media, .nx-media").forEach(function(m){
      var b=m.querySelector(".pj-browser"); if(!b) return;
      m.addEventListener("mousemove",function(e){
        var r=m.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        b.style.setProperty("--ry",(x*6).toFixed(2)+"deg"); b.style.setProperty("--rx",(-y*5).toFixed(2)+"deg");
      });
      m.addEventListener("mouseleave",function(){b.style.setProperty("--ry","0deg");b.style.setProperty("--rx","0deg");});
    });

    // 4. Botones magnéticos
    document.querySelectorAll(".btn, .nav .li").forEach(function(el){
      el.addEventListener("mousemove",function(e){
        var r=el.getBoundingClientRect();
        el.style.translate=((e.clientX-r.left-r.width/2)*.18).toFixed(1)+"px "+((e.clientY-r.top-r.height/2)*.28).toFixed(1)+"px";
      });
      el.addEventListener("mouseleave",function(){el.style.translate="0 0";});
    });

    // 5. Cursor personalizado
    var dot=document.createElement("div"), ring=document.createElement("div"), label=document.createElement("span");
    dot.className="cur-dot"; ring.className="cur-ring"; ring.appendChild(label);
    dot.setAttribute("aria-hidden","true"); ring.setAttribute("aria-hidden","true");
    document.body.appendChild(dot); document.body.appendChild(ring);
    root.classList.add("has-cursor","cur-hidden");
    var mx=-100,my=-100,rx=-100,ry=-100;
    window.addEventListener("mousemove",function(e){
      mx=e.clientX; my=e.clientY; root.classList.remove("cur-hidden");
      dot.style.transform="translate3d("+mx+"px,"+my+"px,0)";
      var t=e.target, lab=t.closest(".pj-view, .pj-phone"), proj=t.closest(".hx, .fc");
      if(lab){ label.textContent="Scroll"; ring.className="cur-ring is-label"; }
      else if(proj){ label.textContent="Ver"; ring.className="cur-ring is-label"; }
      else if(t.closest("a, button, summary")){ ring.className="cur-ring is-link"; }
      else ring.className="cur-ring";
    },{passive:true});
    document.addEventListener("mouseleave",function(){root.classList.add("cur-hidden")});
    window.addEventListener("mousedown",function(){ring.classList.add("is-down")});
    window.addEventListener("mouseup",function(){ring.classList.remove("is-down")});
    (function loop(){
      rx+=(mx-rx)*.18; ry+=(my-ry)*.18;
      ring.style.transform="translate3d("+rx.toFixed(1)+"px,"+ry.toFixed(1)+"px,0)";
      requestAnimationFrame(loop);
    })();
  }

  route();
  onScroll();
})();
