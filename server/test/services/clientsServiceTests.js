const expect = require('chai').expect;
const sinon = require('sinon');

const ClientsService = require('../../services/ClientsService');

describe('clientsService', () => {
	let service;
	let securityServiceMock = {
		checkClicks() {
			return false;
		}
	};

	beforeEach(() => {
		service = new ClientsService(securityServiceMock);
	});
	
	describe('registerClient', () => {
		it('returns an ID when called', () => {
			expect(service.registerClient()).to.be.ok;
		});

		it('returns a unique ID', () => {
			let first = service.registerClient();
			let second = service.registerClient();

			expect(first).to.not.eql(second);
		});
	});

	describe('addClick', () => {

		let spy;
		let id;
		beforeEach(() => {
			id = service.registerClient();
			spy = sinon.spy(service.securityService, 'checkClicks');
		});

		afterEach(() => {
			spy.restore();
		});

		it('returns an error when client isnt registered', () => {
			expect(service.addClick('some Id', {x: 1, y: 2})).to.contain('not registered');
		});

		it('invokes security service with the clicks given', () => {
			const coordinate = {x: 2, y: 4};

			service.addClick(id, coordinate);

			expect(spy.calledWith([coordinate]));
		});

		it('invokes security service with last 3 clicks given', () => {
			const coordinates = [{x: 6, y: 3}, {x: 26, y: 13}, {x: 65, y: 32}, {x: 4, y: 233}];
			
			service.addClick(id, coordinates[0]);
			expect(spy.calledWith([coordinates[0]])).to.be.ok;

			service.addClick(id, coordinates[1]);
			expect(spy.calledWith([coordinates[0], coordinates[1]])).to.be.ok;

			service.addClick(id, coordinates[2]);
			expect(spy.calledWith([coordinates[0], coordinates[1], coordinates[2]])).to.be.ok;

			service.addClick(id, coordinates[3]);
			expect(spy.calledWith([coordinates[1], coordinates[2], coordinates[3]])).to.be.ok;

		});
	})
});