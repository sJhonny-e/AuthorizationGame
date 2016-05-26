class ClientsService {
	constructor(securityService) {
		this.clientsClicks = new Map();
		this.securityService = securityService;
	}

	registerClient() {
		const newId = this.clientsClicks.size + 1;
		this.clientsClicks.set(newId, []);
		return newId;
	}

	addClick(clientId, click) {
		let clicksArr = this.clientsClicks.get(clientId);
		if (!clicksArr) {
			return 'client is not registered';
		}

		// at 3 clicks already recorded; remove previous ones
		if (clicksArr.length >= 3) {
			clicksArr.splice(0, clicksArr.length - 2);
		}

		clicksArr.push(click);
		return this.securityService.checkClicks(clicksArr);
	}
}

module.exports = ClientsService;