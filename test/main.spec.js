import { expect }    from 'chai';
import { spy }       from 'sinon';
import BabelPolyfill from 'babel-polyfill';
import MainInjector  from 'inject-loader!main';

describe('MAIN :: ', () => {

	it('should render app', () => {
		const renderSpy = spy();
		const theMain = MainInjector({
			'react-dom': {
				render: renderSpy
			}
		});

		expect(renderSpy.called).to.be.true;
	});

});
