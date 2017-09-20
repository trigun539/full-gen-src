import { expect }  from 'chai';

describe('Application ::', () => {

	before(() => {
		browser.setViewportSize({ width: 1280, height: 720 });
	});

	it('should have a title', () => {
		browser.url('/emr/');
		expect(browser.getTitle()).to.be.equal('Enterprise Metadata Repository');
	});

});
