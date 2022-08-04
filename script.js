console.log('Extensão do Davi carregada');
const apikey= "bf803a4a195bc436895059127deab21a3e5cb8a8";
const user_ids = [618,677,582,448,744,90];

/* 
448	alan.mazuco
582	paulo.camargo
677	luciene.demenicis
618	davinunes.franca
33	borges.andre
92	natalianascimento.rodrigues
744	mayara.lima
90	adson.borges
*/

const interval = setInterval(()=>{
	const lista = document.querySelector("#watchers");
	if(lista){
		const meuBotao = document.querySelector("#btn_observer");
		if(meuBotao){

		}else{
			console.log(lista);
			
			const button = document.createElement("button");
			button.setAttribute("id","btn_observer");
			button.innerHTML = "Adicionar Observadores Predefinidos";
			button.classList.add("obs");
			lista.prepend(button);
	
			button.addEventListener("click", ()=>{
				var pagina = $(location).attr('pathname').split("/")[1];
				var chamado = $(location).attr('pathname').split("/")[2];
				console.log(chamado);
	
				if(pagina == "issues"){
					console.log('ok');
					
					console.log(chamado);
					function addObs(ll){
						let it = 0;
						ll.forEach(element => {
							args = {
								user_id: element
							}
							$.ajax({
								url: 'https://redmine-cds.eb.mil.br/issues/'+chamado+'/watchers.json',
								type: 'post',
								username: apikey,
								password: 'password',
								crossDomain: true,
								dataType: 'json',
								contentType: 'application/json',
								success: function (retorno) {
									if(user_ids.length == ++it){
										$('#btn_observer').html("Observadores foram adicionados!").css("background-color","green");
										// https://redmine-cds.eb.mil.br/issues/33325.json?include=watchers
										$.ajax({
											url: 'https://redmine-cds.eb.mil.br/issues/'+chamado+'.json?include=watchers',
											type: 'get',
											username: apikey,
											password: 'password',
											crossDomain: true,
											dataType: 'json',
											contentType: 'application/json',
											success: function (r) {
												let espias = r.issue.watchers;
												// console.log(espias);
												const spys = document.querySelector("ul.watchers");
												var menu = $("<ul>",{
													class:"watchers"
												});
												espias.forEach(e=>{
													// console.log(e);
													// <a class="user active" href="/users/618">davinunes.franca</a>

													let li = $("<li>",{
														class:"user-"+e.id
													});
													// <li class="user-90">davi</li>
													let aa = $("<a>",{
														text:e.name,
														class:"user active",
														href:"/users/"+e.id
													});
													//<a class=""   href="33325618"></a>
													let at = $("<a>",{
														text:"Excluir",
														class:"delete icon-only icon-del",
														href:"/issues/"+chamado+"/watchers/"+e.id,
														title:"Excluir",
														rel:"nofollow",
														"data-method":"delete",
														"data-remote":"true"
													});
													let img='<img class="gravatar" srcset="https://www.gravatar.com/avatar/35bb79e97a77d2b40809bc2843a8e939?rating=PG&amp;size=32&amp;default= 2x" src="https://www.gravatar.com/avatar/35bb79e97a77d2b40809bc2843a8e939?rating=PG&amp;size=16&amp;default=">';
													li.append(img);
													li.append(aa);
													li.append(at);
													menu.append(li);

													//<a class=""   rel="nofollow" data-method="delete" href="/issues/33325/watchers/582"></a>
													
												});
												if(spys){
													console.log(menu);
													$("ul.watchers").html(menu);
													
												}
											}
										});
										// window.location.reload(true);
									}
								},
								data: JSON.stringify(args)
							});
						});
						console.log(user_ids.length);
					}
					addObs(user_ids);
				}else{
					console.log('Não dá pra fazer isso nessa página');
				}
			})

		}


	}
},200)