/* Navegación entre secciones y menú móvil */
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
    if(h==="contacto"){page="inicio";target="contacto";}
    if(pages.indexOf(page)<0) page="inicio";
    pages.forEach(function(p){document.getElementById("p-"+p).classList.toggle("active",p===page)});
    document.querySelectorAll(".nav a[data-page]").forEach(function(a){
      if(a.dataset.page===(target||page)) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    if(target){ requestAnimationFrame(function(){document.getElementById(target).scrollIntoView();}); }
    else window.scrollTo(0,0);
  }
  window.addEventListener("hashchange",route);
  route();

})();
