'use strict'

class SecurityService {
	checkClicks(clicksArr) {
		if (clicksArr.length !== 3)
			return false;

		// check if first click on the left
		const firstClickX = clicksArr[0].x;
		for (var i = 1; i < clicksArr.length; i++) {
			if (clicksArr[i].x <= firstClickX)
				return false;
		}

		// check if second click is on the right
		const secondClickX = clicksArr[1].x;
		for (var i = 0; i < clicksArr.length; i++) {
			if (i == 1) continue;
			if (clicksArr[i].x >= secondClickX)
				return false;
		}

		// check 3rd click is below
		const thirdClickY = clicksArr[2].y;
		for (var i = 0; i < clicksArr.length - 1; i++) {
			if (clicksArr[i].y >= thirdClickY)
				return false;
		}

		return true;
	}
}

module.exports = SecurityService;