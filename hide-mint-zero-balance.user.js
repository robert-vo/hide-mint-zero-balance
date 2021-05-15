// ==UserScript==
// @name         hide mint $0.00 balance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hide mint $0.00 balance
// @author       You
// @match        **https://mint.intuit.com/overview.event**
// @icon         https://www.google.com/s2/favicons?domain=intuit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const INTERVAL_TIME = 100;
	const MAIN_MINT_ELEMENT_ID = 'overviewMatContainer';
	const ZERO_DOLLARS = '$0.00';
	console.log('test');

	function isDOMLoaded() {
		var element = document.getElementById(MAIN_MINT_ELEMENT_ID);
		return element !== null;
	}

	var hideMintZeroBalance = setInterval(function () {
		if (isDOMLoaded()) {
			clearInterval(hideMintZeroBalance);
			hideZeroAccounts();
			hideZeroBalances();
		}
	}, INTERVAL_TIME);

	function hideZeroBalances() {
		document.querySelectorAll('.accounts-data-li').forEach((e) => {
			if(e.querySelector('h4 > span').textContent === ZERO_DOLLARS) {
				e.style.display = 'none'
			}
		});
	}

	function hideZeroAccounts() {
		// TODO –  get these tags programmatically
		const tags = [
			'#moduleAccounts-bank',
			'#moduleAccounts-credit',
			'#moduleAccounts-loan',
			'#moduleAccounts-investment',
			'#moduleAccounts-property',
		]
		const h3_span_balance = 'h3 span.balance';

		tags.forEach((e) => {
			var currDoc = document.querySelector(e);
			var currentText = currDoc.querySelector(h3_span_balance);
			if(currentText.innerText === ZERO_DOLLARS) {
				currDoc.style.display = 'none';
			}
		});
	}
})();
