(function() {
	var copyTextareaBtns = document.getElementsByClassName('js-kss-copy');

	for (let i = 0; i < copyTextareaBtns.length; i++) {

		copyTextareaBtns[i].addEventListener('click', function(event) {
			var copyTextarea = this.getAttribute('data-copy');
		  copyTextarea = document.getElementById(copyTextarea);
		  copyTextarea.select();

		  try {
		    var successful = document.execCommand('copy');
		    var msg = successful ? 'successful' : 'unsuccessful';
		    console.log('Copying text command was ' + msg);
		  } catch (err) {
		    console.log('Oops, unable to copy');
		  }
		});
	}
}).call(this);