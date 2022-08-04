console.log('Extensão do Davi carregada');
const interval = setInterval(()=>{
	const lista = document.querySelector("#watchers");
	if(lista){
		console.log(lista);
		clearInterval(interval);
		
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
				var user_ids = [448,582,677,618,33,92,744];
				
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
									window.location.reload(true);
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
},500);