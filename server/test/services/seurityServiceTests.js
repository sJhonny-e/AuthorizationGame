const expect = require('chai').expect;

const SecurityService = require('../../services/securityService.js');

describe('checkClicks', () => {

	let service;
	let clickOnLeft = {x: 1, y: 50};
	let clickOnRight = {x: 100, y: 50};
	let clickBelow = {x: 20, y: 100};
	beforeEach(() => {
		service = new SecurityService();
	});

	it('fails if less than 3 clicks', () => {
		expect(service.checkClicks([])).to.not.be.ok;
	});

	it('passes if first is left click, second is right click, and third is below click', () => {
		expect(service.checkClicks([clickOnLeft, clickOnRight, clickBelow])).to.be.ok;
	});	


})