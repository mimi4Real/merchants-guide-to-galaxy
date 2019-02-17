const expect = require('chai').expect;
import romanStore from '../main/roman-store'
const store = new romanStore();

store.execute('glob is I');
store.execute(' glob   glob Sliver is 55 Credits')

describe('RomanStore', function () {
	it('#execute()', function () {
		expect(store.alias.length).to.be.equal(1);
	})
})

describe('RomanStore', function () {
	it('#romanToNumber()', function () {
		expect(store.romanToNumber('IIV')).to.be.equal(5);
	})
})
