$(document).ready(function(){

		console.log('ready!');

		$('#chore-drop').on('submit', function(event) {
			event.preventDefault();
			title = $('#new-chore').val();
			house = $('#chore-house').val();
			console.log(title, house);

			updateChore(title, house);

		}).keyup(function (e) {
        if(e.keyCode === 13) {
            $("#chore-drop").hide();
            $('.off-canvas-wrap').removeClass('move-right');
            $('#new-chore').val('');
        }            
    });

		function updateChore(input, house) {
			$.ajax({
				url: '/chores',
				dataType: 'json',
				method: 'POST',
				data: { chore: { title: input, house_id: house}},
				success: function(data){
					console.log('saved!');
					console.log(data.user_id);
					list = data.user_id;
					$('#'+list+'').append('<div id="connected-chore" class="chore-list"><input id="chore-checkbox" type="checkbox"><label for="chore-checkbox"></label><span class="inner">'+title+'</span></div>');
					$("#chore-drop").hide();
          $('.off-canvas-wrap').removeClass('move-right');
          $('#new-chore').val('');
				}
				
			});
			

			

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
		}).keyup(function (e) {
        if(e.keyCode === 13) {
            $("#bill-drop").hide();
            $('.off-canvas-wrap').removeClass('move-right');
            $('#bill-title').val('');
        }            
    });

		function updateBill(title, amount, due_date, provider, house) {
			$.ajax({
				url: '/bills',
				dataType: 'json',
				method: 'POST',
				data: { bill: { title: title, amount: amount, due_date: due_date, provider: provider, house_id: house}},
				success: function(){
					console.log('saved!');
					$("#bill-drop").hide();
          $('.off-canvas-wrap').removeClass('move-right');
          $('#bill-title').val('');
				}
			});

			
			$('.bill-list ul').append('<li><div class="large-6 columns"><input id="bill-checkbox" type="checkbox"><label for="bill-checkbox">Paid?</label>'+title+amount+due_date+provider+'</li>');

		}


		$('input[type=checkbox]').change(function(){
			$(this).parent().toggleClass('chore-list active');
			
		})

		$(function() {
	    $( ".chore" ).sortable({
	      connectWith: ".chore"
	    }).disableSelection();
	  });

});