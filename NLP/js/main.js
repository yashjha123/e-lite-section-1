window.onload = setup();
window.onscroll = function(e) {
	// console.log('translateY('window.scrollY+'px)')
    // document.getElementById("home").style.transform = 'translateY('+window.scrollY/2+'px)';
    document.getElementById("home").style.opacity = 1.1-(window.scrollY/innerHeight)
};



var xhr = new XMLHttpRequest();

document.getElementById("sr").addEventListener('input', function (evt) {
    xhr.open('GET', 'https://infinite-taiga-09765.herokuapp.com/search?text='+this.value);
	
	if(this.value==""){
		update([0,1,2,3,4,5,6,7,8])
		return;
	}
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        // alert('User\'s name is ' + xhr.responseText);
	        update([parseInt(xhr.responseText)])
	    }
	    else {
	        // alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();

});

function change(i){
	g = ["Newest","Oldest"]
	if(window.st==0){
		window.st=1;
	}else{
		window.st=0;
	}
	window.st = (window.st);
	i.innerHTML = 'Sort By:<b> '+g[window.st]+' </b>'
	
	filter();
}
function update(index){
	document.getElementsByClassName("cards--viewer")[0].innerHTML=""
	if(window.st==1){
		index.reverse();
	}
	for(i=0;i<index.length;i+=1){
		k = index[i]
		document.getElementsByClassName("cards--viewer")[0].innerHTML+='<div class="card">\
																		<img src="./images/'+window.photo[k]+'">\
																	<div class="card--desc">\
																		<div class="card-t vertical-center">\
																			<div class="card--text">\
																				<b class="res">'+window.itemsBy[k]+'</b>\
																				<br>	\
																				Sector 34, Greator Noida\
																			</div>\
																			<div class="bookmark">\
																			</div>\
																		</div>\
																	</div>\
																	<br>\
																	<div class="more">MORE -></div>\
																</div>'
	}
}
function expand(i){
	(i.childNodes[3].classList.toggle("r"))
	i.parentNode.childNodes[5].childNodes[1].classList.toggle("hide");
	// list = (i.parentNode.childNodes[5].childNodes[1].childNodes)
	// for(x = 1;x<list.length;x+=2){
	// 	console.log(list[x].childNodes[1].childNodes[1].classList.toggle("hide"))
	// } 
}

function sep(i){
	list = (i.parentNode.childNodes)
	// console.log(list)
		// if (!i.childNodes[1].childNodes[1].classList.contains('hide')) {
	 //    	// (i.childNodes[1].childNodes[1].classList.add("hide"));	
	 //    	window.filterString=""
	 //    	filter();
	 //    	return;
		// }
	// console.log(list)
	for(x = 1;x<list.length;x+=2){
		(list[x].childNodes[1].childNodes[1].classList.add("hide"))
		// console.log(list[x].childNodes[1].childNodes[1].classList)
	} 
	(i.childNodes[1].childNodes[1].classList.remove("hide"));
}
function setRes(str){
	// str = i.innerHTML
	window.filterString = str;
	// console.log(str);
	filter();
}
function setPrice(val){
	// str = i.innerHTML
	window.filterPrice = val;
	// console.log(str);
	filter();
}
function setup(){
	window.itemsBy = ["Residential Apartments","Land Plots","Independent Plots","Residential Apartments","Office Space","Land Plots","Residential Apartments","Land Plots","Residential Apartments"]
	window.photo = ["res1.png","res2.png","res3.png","res4.png","res5.png","res6.png","res7.png","res8.png","res9.png"]
	window.price = [2000,3000,4000,5000,6000,7000,8000,9000,10000]
	update([0,1,2,3,4,5,6,7,8])
window.st = 0
	window.filterString = "Residential Apartments"
	window.filterPrice = 0
	filter();
	window.home1 = document.getElementsByClassName("home-page")[0].offsetTop;
}
function filter(){
	ans = []
	if(window.filterString=="" && window.filterPrice==0){
		update([0,1,2,3,4,5,6,7,8]);
	}
	for(i=0;i<window.itemsBy.length;i+=1){
		// console.log(window.filterString,window.itemsBy[i])
		if(window.filterString!=""){
			if(window.filterString==window.itemsBy[i]){
				if(window.filterPrice!=0){
					if(window.filterPrice<window.price[i]){
						// if(ans[ans.length-1]!=i){
							ans.push(i);
						// }
					}
				}else{
					ans.push(i);
				}
			}
		}
		else if(window.filterPrice!=0){
			if(window.filterPrice<window.price[i]){
				if(ans[ans.length-1]!=i){
					ans.push(i);
				}
			}
		}
	}
	update(ans);
}