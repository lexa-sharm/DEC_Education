function validator(form, callback){
	var count = 0;
	$(form).find('*[data-valid]').each(function(){

		var value = $(this).val();
		var types = $(this).attr('data-valid');
		var match = $(this).attr('data-match');
		types = types.split(',');

		for(var i in types){
			var type = types[i];

			switch(type){
				case "notempty":
					if(value == undefined || value == ""){
						count++;
					}
				break;

				case "name":
					if(value.length <= 3){
						count++;
					}
				break;

				case "phone":
					if(value.length < 10){
						count++;
					}
				break;

				case "email":
					var patt = /^.+@.+[.].{2,}$/i;
					if(!patt.test(value)){
						count++;
					}
				break;

/*				case "message":
					if(value.length < 13){
						count++;
					}
				break;*/
			}

			if(count > 0){
				callback.call($(this), type);
				return false;
			}
		}
	});
	// return true;
	if (count > 0) return false;
	else return true;
};



$(document).ready(function() {
	// var stid = false;
	$("#form-message").submit(function(){

		/*ERROR MESSAGE*/

		$('.error-message').hide();
		var success = validator("#form-message", function(type){

			/*Content ERROR MESSAGE*/

			var mess = {
				notempty:'Заполните это поле',
				name: 'Заполните это поле',
				email:'Введите корректный адрес xx@xx.xx',
				phone:'Введите номер телефона в международном формате +380xxxxxxxxx',
				// message:'Напишите сообщение'
			};

			/*Show сontent ERROR MESSAGE*/

			var mesBlock = $('.error-message'),
				nameError = $('.error-message .error-message__title'),
				descpError = $('.error-message .error-message__descp');
			pos = $(this).offset();
			mesBlock.css({
				top: pos.top + $(this).outerHeight() + 5,
				left: pos.left + ($(this).outerWidth() / 2)
			}).show();

			if (type == 'notempty') {
				nameError.text(mess.notempty);
				descpError.text('');
			} else {
				nameError.text(mess.notempty);
				descpError.text(mess[type]);
			}

			/*Animation show/hide ERROR MESSAGE*/

			$('.error-message')
				.stop()
				.css({opacity:1});
			$('.error-message')
				.stop()
				.css({opacity:1})
				.delay(2000)
				.animate({opacity:0}, 500);


			// if(stid !== false){
			//  	clearTimeout(stid);	
			// }
			// stid = setTimeout(function(){
			// 	$('.error-message').hide();
			// },2000);
		});


		if(success){
			/*E-mail Ajax Send*/
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "send.php", //Change
				data: th.serialize(),
				success: function(){
      console.log(th.serialize());
   }
			}).done(function() {
				alert("Thank you!");
				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
				}, 1000);
			});
			return false;
		}else{
			return false;
		}

	});

});