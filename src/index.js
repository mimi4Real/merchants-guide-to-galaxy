import './theme/index.scss'
import RomanStore from './main/roman-store'

let romanStore = null;
const OP_DOM_ID_MAP = {
	TEST: 'test-btn',
	CLEAR: 'clear-btn',
	SUBMIT: 'submit-btn',
	INPUT: 'content-input',
	TIPS: 'content-tips',
	EXECUTE_DEFINE: 'content-define',
	EXECUTE_RESULT: 'content-result'
}
/**
 * 初始化操作
 */
const init = function () {
	romanStore = new RomanStore();

	const input  = document.getElementById(OP_DOM_ID_MAP.INPUT);
	//input 回车事件
	eventUtil.addEventListener(input, 'keypress', function(ev) {
		if (ev.keyCode === 13) {
			viewOpHandle.handleAddInput();
		}
	});

	const submitBtnEl = document.getElementById(OP_DOM_ID_MAP.SUBMIT);
	//submit按钮点击事件
	eventUtil.addEventListener(submitBtnEl, 'click', () => {
		viewOpHandle.handleResult();
	});

	const testBtnEl = document.getElementById(OP_DOM_ID_MAP.TEST);
	//example按钮点击事件
	eventUtil.addEventListener(testBtnEl, 'click', () => {
		viewOpHandle.handleTest();
	});

	const clearBtnEl = document.getElementById('clear-btn');
	//clear按钮点击事件
	eventUtil.addEventListener(clearBtnEl, 'click', () => {
		viewOpHandle.handleClear();
	});

	viewOpHandle.handleTest(); //执行example
}

/**
 * 事件操作对象
 * @type {{addEventListener: ((el, type?, cb?)), removeEventListener: ((el, type, cb))}}
 */
const eventUtil = {
	/**
	 * 事件绑定
	 * @param el：dom对象
	 * @param type：事件类型
	 * @param cb：事件回调函数
	 */
	addEventListener(el, type, cb){
		el.addEventListener(type, (ev) => {
			cb && cb(ev);
		})
	}
}

/**
 * 页面操作对象
 * @type {{handleAddInput: (()), clearInput: (()), handleResult: (())}}
 */
const viewOpHandle = {
	/**
	 * input回车事件
	 */
	handleAddInput(text){
		let container  = document.getElementById(OP_DOM_ID_MAP.EXECUTE_DEFINE),
			input  = document.getElementById(OP_DOM_ID_MAP.INPUT);
		const value = text || input.value;
		if(value && value.trim()){
			const res = romanStore.execute(value);
			switch (res.status){
				case 'error':
					this.addTips(res.message);
					break;
				default:
					const successFragment = this.createFragment(value);
					container.appendChild(successFragment);
					!text && this.clearInput();
					break;
			}
		}
	},

	/**
	 * 创建dom片段
	 * @param text
	 * @returns {DocumentFragment}
	 */
	createFragment(text, type = 'p'){
		let textArr = typeof text  === 'string' ? [text] : text;
		let fragment = document.createDocumentFragment();
		for(var i in textArr){
			let p = document.createElement(type);
			p.textContent = textArr[i];
			fragment.appendChild(p);
		}

		return fragment;
	},

	/**
	 * 增加提示
	 * @param message
	 */
	addTips(message){
		if(message){
			document.getElementById(OP_DOM_ID_MAP.TIPS).textContent = message;
		}
	},

	/**
	 * 清空输入框
	 */
	clearInput(){
		document.getElementById(OP_DOM_ID_MAP.INPUT).value = "";
		document.getElementById(OP_DOM_ID_MAP.TIPS).textContent = "";
	},

	/**
	 * submit 提交后结果计算与显示
	 */
	handleResult(){
		const solutions = romanStore.solutions;
		let fragment = document.createDocumentFragment();
		let resDom = document.getElementById(OP_DOM_ID_MAP.EXECUTE_RESULT);
		resDom.appendChild(this.createFragment('Test Output:','h3'));

		const resultArr = solutions.map((solution) => {
			const alias = [].slice.call(solution.alias || []);
			if(solution.type === 'unKnow'){
				alias.push('I have no idea what you are talking about');
			} else {
				alias.push('is', solution.type === 'howMany' ? solution.romanNumber * solution.unitNumber : solution.romanNumber);
				solution.type === 'howMany' && alias.push('Credits');
			}

			return alias.join(' ');
		});

		resDom.appendChild(this.createFragment(resultArr));
		resDom.appendChild(fragment);
	},

	/**
	 * clear按钮点击事件
	 */
	handleClear(){
		romanStore = new RomanStore();
		this.clearInput();
		document.getElementById(OP_DOM_ID_MAP.EXECUTE_DEFINE).innerHTML = '';
		document.getElementById(OP_DOM_ID_MAP.EXECUTE_RESULT).innerHTML = '';
		document.getElementById(OP_DOM_ID_MAP.EXECUTE_DEFINE).appendChild(this.createFragment('Test Input:','h3'));
	},

	/**
	 * example按钮点击事件
	 */
	handleTest(){
		this.handleClear();
		const testText  = require('./test/input').default;
		let commandArr = testText.split("\n");
		commandArr.forEach( line =>{  // 逐行解析
			viewOpHandle.handleAddInput(line);
		});
		viewOpHandle.handleResult();
	}
}

init(); //初始化