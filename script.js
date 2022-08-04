console.log('Extensão do Davi carregada');
const interval = setInterval(()=>{
	const lista = document.querySelector("#watchers");
	if(lista){
		console.log(lista);
		clearInterval(interval);
		
		const button = document.createElement("button");
		button.innerHTML = "Observadores Personalizados";
		button.classList.add("obs");
		lista.prepend(button);

		button.addEventListener("click", ()=>{
			var pagina = $(location).attr('pathname').split("/")[1];
			var chamado = $(location).attr('pathname').split("/")[2];
			console.log(chamado);

			if(pagina == "issues"){
				console.log('ok');
				var args = {
					object_type: "issue",
					object_id: chamado,
					watcher: {
						user_ids:[448,582,677,618,33,92,744]
					}
				}
				console.log(chamado);
				$.post('https://redmine-cds.eb.mil.br/watchers', args, function(retorno) {
					window.location.reload(true);
					console.log(retorno);
				});
			}else{
				console.log('Não dá pra fazer isso nessa página');
			}
		})


	}
},500);