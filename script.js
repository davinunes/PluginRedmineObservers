console.log('Extensão do Davi carregada');
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
					var user_ids = [618,677,582,448,744,90];
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
								username: 'bf803a4a195bc436895059127deab21a3e5cb8a8',
								password: 'password',
								crossDomain: true,
								dataType: 'json',
								contentType: 'application/json',
								success: function (retorno) {
									if(user_ids.length == ++it){
										$('#btn_observer').html("Pronto! A página será atualizada em instantes!").css("background-color","green");
										// https://redmine-cds.eb.mil.br/issues/33325.json?include=watchers
										$.ajax({
											url: 'https://redmine-cds.eb.mil.br/issues/'+chamado+'.json?include=watchers',
											type: 'get',
											username: 'bf803a4a195bc436895059127deab21a3e5cb8a8',
											password: 'password',
											crossDomain: true,
											dataType: 'json',
											contentType: 'application/json',
											success: function (r) {
												let espias = r.issue.watchers;
												console.log(espias);
												const spys = document.querySelector("ul.watchers");
												if(spys){
													console.log(spys);

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