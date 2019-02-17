/**
 * 罗马字符和数值映射
 * @type {{I: number, V: number, X: number, L: number, C: number, D: number, M: number}}
 */
const ROMAN_NUMBER_MAP = {
	'I': 1,
	'V': 5,
	'X': 10,
	'L': 50,
	'C': 100,
	'D': 500,
	'M': 1000
}

/**
 * 罗马字符一维list,用于对照字符位置
 * @type {[*]}
 */
const ROMAN_KEYS = ['I','V','X','L','C','D','M'];

/**
 * 四种语法校验规则
 * @type {{isAlias: RegExp, isCredit: RegExp, howMuch: RegExp, howMany: RegExp}}
 */
const REGEX_VALS = {
	'isAlias': new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i),
	'isCredit': new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i),
	'howMuch': new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i),
	'howMany': new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i)
}

/**
 * 方法: 字符串忽略大小写对比
 * @param str1
 * @param str2
 * @returns {boolean}
 */
const equalString = function(str1, str2){
	if(str1.toLowerCase() === str2.toLowerCase()){
		return true;
	}
	return false;
}

/**
 * 罗马符校验: 偶数位不能重复超过三次，奇数位不能重复
 * @param romanCode
 * @returns {*}
 */
const romanValidate = function(romanCode){
	if(!romanCode){
		return {status: 'error', message: 'there are undefined names in it'};
	}
	if(romanCode.match(/([ixcm])\1{3,}/i) || romanCode.match(/([dlv])\1/i)){
		return {status: 'error', message: 'I|X|C|M repeats at most 3 times, D|L|V cannot be repeated'}
	}
	return {status: 'success', message: ''};
}

class RomanStore {
	constructor(){
		this.alias = [];  //别名对象list
		this.units = []; //单位对象list
		this.solutions = []; //解决方案对象list(how much | how many | unKnow)
	}

	/**
	 * 执行单条输入
	 * @param text
	 * @returns {*}
	 */
	execute(text){
		const defineType = this.getType(text);
		let res;
		switch (defineType){
			case 'isAlias':
				res = this.addAlias(text);
				break;
			case 'isCredit':
				res = this.addUnit(text);
				break;
			case 'howMuch':
				res = this.addSolutions(text, defineType);
				break;
			case 'howMany':
				res = this.addSolutions(text, defineType);
				break;
			default:
				this.solutions.push({type: defineType, text: text});
				res = {status: 'warning', message: ''}
				break;
		}
		return res;
	}

	/**
	 * 判断执行类型
	 * @param text
	 * @returns {"require"|"object"}
	 */
	getType(text){
		let defaultType = 'unKnow';
		for(let type in REGEX_VALS){
			if(REGEX_VALS[type].exec(text.trim()) !== null ){
				defaultType = type;
				break;
			}
		}

		return defaultType;
	}

	/**
	 * alias对象中增加
	 * @param text
	 * @returns {{status: string, message: string}}
	 */
	addAlias(text){
		let matArr = REGEX_VALS['isAlias'].exec(text)[0].split(/\s+/);
		const alias = matArr[0], romanCode = matArr[2];
		const aliasIndex = this.alias.findIndex((item) => equalString(item.name, alias));
		const codeIndex = this.alias.findIndex((item) => equalString(item.value, romanCode));
		if(aliasIndex > -1 || codeIndex > -1){
			return {
				status: 'error',
				message: `${aliasIndex > -1 ? alias : romanCode} has already assigned`
			}
		}
		this.alias.push({
			name: matArr[0],
			value: matArr[2],
			text: text
		})
		return {status: 'success', message: ''};
	}

	/**
	 * units对象中增加
	 * @param text
	 * @returns {{status: string, message: string}}
	 */
	addUnit(text){
		let matArr = REGEX_VALS['isCredit'].exec(text);
		let translateArr = matArr[1].trim().split(/\s+/);
		const unDefineUnit = translateArr.pop();
		const aliasIndex = this.alias.findIndex((item) => equalString(item.name, unDefineUnit));
		if(aliasIndex > -1){
			return {status: 'error', message: `${unDefineUnit} has been defined`};
		}
		if (translateArr.length < 1) {
			return {status: 'error', message: 'please provide at least one existing definition'};
		}

		const romanCode = this.aliasToRoman(translateArr);
		const romanValidateMsg = romanValidate(romanCode);
		if(romanValidateMsg.status === 'error')  return romanValidateMsg;

		const romanNumber = this.romanToNumber(romanCode);
		this.units.push({
			name: unDefineUnit,
			value: matArr[2] / romanNumber,  //todo 处理精度问题
			text: text
		});
		return {status: 'success', message: ''};
	}

	/**
	 * @param text
	 * @param key {default: 'howMuch'}
	 */
	addSolutions(text, key = 'howMuch') {
		const matArr = REGEX_VALS[key].exec(text), target = matArr[1].trim();

		if (!target)  return {status: 'error', message: 'please enter any definition'};

		const translateArr = target.split(/\s+/);
		let unit = null;
		if (key === 'howMany') {
			unit = translateArr.pop();
			const aliasIndex = this.units.findIndex((item) => equalString(item.name, unit));
			if (aliasIndex < 0) {
				return {status: 'error', message: `${unit} is not defined`};
			}
			if (translateArr.length < 1) {
				return {status: 'error', message: 'please provide at least one existing definition'};
			}
		}

		const romanCode = this.aliasToRoman(translateArr);
		const romanValidateMsg = romanValidate(romanCode);
		if (romanValidateMsg.status === 'error') return romanValidateMsg;
		const romanNumber = this.romanToNumber(romanCode);

		let obj = {
			type: key,
			text: text,
			alias: translateArr,
			roman: romanCode,
			romanNumber: romanNumber
		}
		if (key === 'howMany') {
			obj.unit = unit;
			const targetIndex = this.units.findIndex(item => equalString(item.name, unit));
			obj.unitNumber = this.units[targetIndex].value;
		}

		this.solutions.push(obj);

		return {status: 'success', message: ''}
	}

	/**
	 * 别名转为罗马符
	 * @param arr
	 * @returns {string}
	 */
	aliasToRoman(arr){
		let romans = [];
		for(let i in arr){
			let index = this.alias.findIndex((item) => equalString(item.name, arr[i]));
			if(index === -1){
				return '';
			} else {
				romans.push(this.alias[index].value);
			}
		}

		return romans.join('');
	}

	/**
	 * 罗马符转为数字
	 * @param romanCode
	 */
	romanToNumber(romanCode){
		var romanNumbers = [];
		romanCode.split('').forEach((item, i, arr) => {
			const itemIgnore = item.toUpperCase();
			const val = ROMAN_NUMBER_MAP[itemIgnore], posi = ROMAN_KEYS.indexOf(itemIgnore);
			romanNumbers.push(val);

			let isReducedArea = false, isSmaller = false;
			if(i !== arr.length -1) {
				const nextVal = arr[i + 1].toUpperCase();
				isReducedArea = ROMAN_KEYS.indexOf(nextVal) - posi <= 2;
				isSmaller = val < ROMAN_NUMBER_MAP[nextVal];
			}
			//if(偶数位 & 相邻增位值较大 & 相邻增位的值至多跨1个罗马符) 可以被减去
			if (posi % 2 === 0 && isSmaller && isReducedArea) {
				romanNumbers[i] *= -1;
			}
		});

		let res = romanNumbers.reduce(function(sum, elt) {
			return sum + elt;
		});
		return res;
	}
}

export default RomanStore;