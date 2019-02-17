# merchants-guide-to-galaxy
## 说明
```shell
Webpack4 + Es6 + Sass
需求：帮助商人进行罗马数字和阿拉伯数字的转换
{'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
I|X|C|M 可以重复至多三次，不能被跨度大于2的罗马符减去
V|L|D不能重复,且不能被减（奇数位）
eg: MCMXLIV = 1000 +（1000-100）+（50-10）+（5-1）= 1944

效果：
Test input:
glob is I
prok is V
pish is X
tegj is L
glob glob Silver is 34 Credits
glob prok Gold is 57800 Credits
pish pish Iron is 3910 Credits
how much is pish tegj glob glob ?
how many Credits is glob prok Silver ?
how many Credits is glob prok Gold ?
how many Credits is glob prok Iron ?
how much wood could a woodchuck chuck if a woodchuck could chuck wood ?
 
Test Output:
pish tegj glob glob is 42
glob prok Silver is 68 Credits
glob prok Gold is 57800 Credits
glob prok Iron is 782 Credits
I have no idea what you are talking about

设计思路：创建romanStore类对问题对象进行存储管理，以便后期获取及页面展示。
状态:
  alias存储别名定义
  unit存储转换单位
  solutions存储解决方案（howMuch&howMany&unKnow）
行为：
  execute: 逐条解析用户输入，根据输入类别进行解析校验及状态存储
  addAlias: 增加罗马符别名并存储状态
  addUnit: 增加转换单位并存储状态
  addSolution: 根据别名和单位计算解决方案，并存储状态
  aliasToRoman: 别名转换为罗马字符（规则：偶数位重复不能超过三次，奇数位不能重复）
  romanToNumber: 罗马字符转换为数字（规则：奇数位不能被减，偶数位比小且不能被大于2个跨度的罗马字符减去）
 
 页面设计：
 example按钮：默认展示示例
 clear按钮
 submit按钮：执行转换结果
 input：用户输入定义及需要转换的问题，回车进行逐条执行。
 
```

## 基础环境
```shell
Node + Ruby
```

## 安装
```shell
1、webpack全局安装：npm install webpack webpack-cli -g
2、mocha测试全局安装（非必选）：npm install webpack mocha -g
3、局部安装依赖：npm install

开发：npm run start
生产：npm run build
```

