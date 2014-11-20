$(document).ready(function(){

		console.log('ready!');

		$('#chore-drop').on('submit', function(event) {
			event.preventDefault();
			title = $('#new-chore').val();
			house = $('#chore-house').val();
			console.log(title, house);

			updateChore(title, house);
		});

		function updateChore(input, house) {
			$.ajax({
				url: '/chores',
				dataType: 'json',
				method: 'POST',
				data: { chore: { title: input, house_id: house}},
				success: function(){
					console.log('saved!');
				}
			});
			$('#chore-list').append('<input id="chore-checkbox" type="checkbox"><label for="chore-checkbox"></label><span>'+title+'</span>');

		}

		$('#bill-drop').on('submit', function(event) {
			event.preventDefault();
			title = $('#bill-title').val();
			amount = $('#bill-amount').val();
			due_date = $('#bill-duedate').val();
			provider = $('#bill-provider').val();
			house = $('#bill-house').val();
			console.log(title, amount, due_date, provider, house);

			updateBill(title, amount, due_date, provider, house);
		});

		function updateBill(title, amount, due_date, provider, house) {
			$.ajax({
				url: '/bills',
				dataType: 'json',
				method: 'POST',
				data: { bill: { title: title, amount: amount, due_date: due_date, provider: provider, house_id: house}},
				success: function(){
					console.log('saved!');
				}
			});
			
			$('#bill-list ul').append('<li><div class="large-6 columns"><input id="bill-checkbox" type="checkbox"><label for="bill-checkbox">Paid?</label>'+title+amount+due_date+provider+'</li>');

		}

		WePay.set_endpoint("stage"); // stage or production

		WePay.OAuth2.button_init(document.getElementById('start_oauth2'), {
		    "client_id":"190452",
		     "scope":["manage_accounts","collect_payments","view_user","send_money","preapprove_payments"],
		    "user_name":"test user",
		    "user_email":"test@example.com",
		    "redirect_uri":"http://localhost:3000/auth/:provider/callback",
		    "top":100, // control the positioning of the popup with the top and left params
		    "left":100,
		    "state":"robot", // this is an optional parameter that lets you persist some state value through the flow
		    "callback":function(data) {
		    	console.log(data[0])
				/** This callback gets fired after the user clicks "grant access" in the popup and the popup closes. The data object will include the code which you can pass to your server to make the /oauth2/token call **/
				if (data.code.length !== 0) {
					// send the data to the server
				} else {
					// an error has occurred and will be in data.error
				}
			}
		});

		$('input[type=checkbox]').change(function(){
		
			$(this).parent().toggleClass('active');
			
		})

});