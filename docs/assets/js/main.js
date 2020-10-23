"use strict";let searchArray=[],favArray=[];function searchItem(e,a,t){this.showId=e,this.showName=a,this.showImage=t}function favItem(e,a,t,r,s){this.showId=e,this.showName=a,this.showImage=t,this.showAlt=r,this.showTitle=s}const btnSearch=document.querySelector(".js-searchBtn"),textAreaSearch=document.querySelector(".js-searchTextArea"),resetBtnSearch=document.querySelector(".js-searchReset"),warningSearch=document.querySelector(".js-searchWarning");function handleSearch(){searchArray=[];const e=textAreaSearch.value;e?(warningSearch.classList.add("hidden"),resetBtnSearch.classList.remove("hidden"),fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{for(let a=0;a<e.length;a++){const t=e[a].show.id,r=e[a].show.name,s=existMediumImg(e[a].show.image);searchArray.push(new searchItem(t,r,s))}paintSearch(),addFavEvent()})):warningSearch.classList.remove("hidden")}function existMediumImg(e){return null!==e&&null!==e.medium?e.medium:"//via.placeholder.com/210x295/e65027/800080/?text=¿?"}const containerSearch=document.querySelector(".js-searchList");function paintSearch(){let e="";e+='<h2 class="searchList__title">Tu búsqueda</h2>';for(let a=0;a<searchArray.length;a++)e+=`<li class="js-searchItem searchList__searchItem" data-id="${searchArray[a].showId}">`,e+=`<h3 class="js-searchItemTitle searchList__searchItem--title">${searchArray[a].showName}</h3>`,e+=`<img class="js-searchItemImg searchList__searchItem--img" src="${searchArray[a].showImage}" alt="Imagen del cartel de ${searchArray[a].showName}" title="Cartel de ${searchArray[a].showName}"/>`,e+="</li>",containerSearch.innerHTML=e}function addFavEvent(){const e=document.querySelectorAll(".js-searchItem");for(const a of e)a.addEventListener("click",handleFav)}function handleFav(e){const a=e.currentTarget.dataset.id,t=e.currentTarget.querySelector(".js-searchItemTitle"),r=e.currentTarget.querySelector(".js-searchItemImg");e.currentTarget.classList.contains("addFav")?(e.currentTarget.classList.remove("addFav"),favArray=favArray.filter(e=>e.showId!==a),paintFav()):(e.currentTarget.classList.add("addFav"),favArray.push(new favItem(a,t.innerHTML,r.src,"Imagen del cartel de "+t.innerHTML,"Cartel de "+t.innerHTML)),paintFav())}btnSearch.addEventListener("click",handleSearch);const containerFav=document.querySelector(".js-favList");function paintFav(){let e="";for(let a=0;a<favArray.length;a++)e+=`<li class="js-favItem favList__favItem" data-id="${favArray[a].showId}">`,e+=`<h3 class="js-favItemTitle favList__favItem--title">${favArray[a].showName}</h3>`,e+=`<img class="js-favItemImg favList__favItem--img" src="${favArray[a].showImage}" alt="Imagen del cartel de ${favArray[a].showAlt}" title="Cartel de ${favArray[a].showTitle}"/>`,e+="</li>",containerFav.innerHTML=e}