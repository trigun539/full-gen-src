import { expect }    from 'chai';
import babelPolyfill from 'babel-polyfill';
import Sagas         from 'sagas';
import SagasInjector from 'inject-loader!sagas';

describe('Sagas :: ', () => {
	it('should pass', () => {
		expect(true).to.be.true;
	});
});
