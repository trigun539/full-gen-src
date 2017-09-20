import { expect } from 'chai';

describe('Homepage ::', () => {

	beforeEach(() => {
		browser.url('/emr');
	});

	it('should show subscriptions', () => {
		const subscriptionsHolder = browser.$('#subscriptions');
		const subscriptions = subscriptionsHolder.$$('div div div ul li');

		expect(subscriptions.length > 0).to.be.true;
	});

	it('should filter subscriptions by database', () => {
		const widget    = browser.$('#subscriptions');
		const filterBtn = widget.$('div div div div button:first-child');
		const all       = widget.$$('div div div ul li').length;

		filterBtn.click();

		const filtered = widget.$$('div div div ul li').length;

		expect(all > filtered).to.be.true;
	});

	it('should filter subscriptions by schema', () => {
		const widget    = browser.$('#subscriptions');
		const filterBtn = widget.$('div div div div button:last-child');
		const all       = widget.$$('div div div ul li').length;

		filterBtn.click();

		const filtered = widget.$$('div div div ul li').length;

		expect(all > filtered).to.be.true;
	});

	it('should go to subject areas', () => {
		const widget = browser.$('#subject-areas');
		const button = widget.$('div div button');

		button.click();

		const url = browser.getUrl();

		expect(/subject-areas/.test(url)).to.be.true;
	});	

});
