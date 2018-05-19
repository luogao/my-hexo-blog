---
title: js策略模式《JavaScript设计模式与开发实践》阅读笔记
date: 2018-05-19 16:41:39
tags:
---

> 策略模式的定义是：**定义一系列的算法，把它们一个个封装起来，并且是它们可以相互替换**。

- 策略模式可以避免代码中的多重判断条件。
- 策略模式很好的体现了开放-封闭原则，将一个个算法（解决方案）封装在一个个策略类中。便于切换，理解，扩展。
- 策略中的各种算法可以重复利用在系统的各个地方，避免复制粘贴。
- 策略模式在程序中或多或少的增加了策略类。但比堆砌在业务逻辑中要清晰明了。
- 违反最少知识原则，必须要了解各种策略类，才能更好的在业务中应用。

<!-- more -->

*此文仅记录本人阅读《JavaScript设计模式与开发实践》这个本时的感受，感谢作者曾探写出这么好的一本书。如有冒犯，如有错误，请联系[本人](mailto:luogao_lg@sina.com)处理。*

## 简单的业务场景

> 计算员工年终奖需要根据不同的员工绩效计算不同的奖金。例如，绩效为S的人年终奖有4倍工资。绩效A的人年终奖有3倍工资，绩效B的人有2倍工资。

用代码实现：

```javascript
var calculateBonus = function(performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return salary * 4
    }
    if (performanceLevel === 'A') {
        return salary * 3
    } 
    if (performanceLevel === 'B') {
        return salary * 2
    }
}

calculateBonus('S', 2000) // 8000
calculateBonus('A', 2000) // 6000
```
其实上面一段代码已经能应付目前的场景。但是，当奖金的评定需要增加一个绩效C，或者改变绩效A的计算方式。此时需要更改上面这个`calculateBonus`方法的内部结构，如此下去，这个方法内部将变得冗杂。

设计模式中很重要的一点就是将不变和变分离出来。这里变的是怎么算。不变的是根据一个绩效获得一个结果。所以上述代码重写，把各种算法封装在一个个策略类中(传统面向对象的模仿)：

```javascript
var performanceS = function() {}
performanceS.prototype.calc = function(salary) {
    return salary * 4
}

var performanceA = function() {}
performanceA.prototype.calc = function(salary) {
    return salary * 3
}

var performanceB = function() {}
performanceB.prototype.calc = function(salary) {
    return salary * 2
}

//奖金类Bonus
var Bonus = function() {
    this.salary = null //原始工资
    this.strategy = null // 绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function(salary) {
    this.salary = salary //设置工资
}

Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy //设置员工绩效对应的策略对象
}

Bonus.prototype.getBonus = function() { //获取奖金数额
    return this.strategy.calc(this.salary) //把计算奖金的操作委托个对应的策略对象
}

var bonus = new Bonus()
bonus.setSalary(10000)
bonus.setStrategy(new performanceA())

console.log(bonus.getBonus()) // 30000
```



## JavaScript版本的策略模式

在JavaScript中可以将一个个策略类写成函数，然后封装在对象中：

```javascript
// 计算奖金的例子
var strategies = {
    S: function(salary) {
        return salary * 4
    },
    A: function(salary) {
        return salary * 3
    },
    B: function(salary) {
        return salary * 2
    }
}

var calculateBonus = function(level, salary) {
    return strategies[level](salary)
}

console.log(calculateBonus('S', 10000)) // 40000
console.log(calculateBonus('S', 20000)) // 80000
```



## 更广义的“算法”

策略模式指的是一系列的算法（策略），并且把它们封装起来。计算奖金的列子中就封装了一些算法。其实世纪业务中也可以利用策略模式来封装一些“业务规则”。

### 表单验证

在Web项目中往往有很多场景需要提交表单。前端在把数据提交到后端之前，需要进行一波表单验证，来减少不必要的网络请求。在表单验证中往往会有多种校验规则，页面中可能会有多个表单要进行验证。此时可以用策略模式来实现一个表单验证：

```html
<form action="" mothod="post" id="registerForm">
  输入用户名： <input type="text" name="userName">
  输入密码： <input type="text" name="password">
  输入手机号码：<input type="text" name="phoneNumber">
  <button>提交</button>
</form>
<script>
    var strategies = {
      isNonEmpty: function(value, errorMsg){
        if(value === ''){
          return errorMsg
        }
      },
      minLength: function(value, length, errorMsg){
        if(value.length < length){
          return errorMsg
        }
      },
      isMobile: function(value, errorMsg){
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
          return errorMsg
        }
      }
    }

    // 定义Validator类
    var Validator = function(){
      this.cache = []
    }

    Validator.prototype.add = function(dom, rule, errorMsg){
      var ary = rule.split(':')
      this.cache.push(function(){
        var strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(errorMsg)
        return strategies[ strategy ].apply(dom, ary)
      })
    }

    Validator.prototype.start = function(){
      for (var i = 0,validatorFunc;validatorFunc = this.cache[i++];){
        var msg = validatorFunc()
        if(msg){
          return msg
        }
      }
    }

    var validataFunc = function() {
      var validator = new Validator()
    // 添加校验规则
      validator.add(registerForm.userName,'isNonEmpty', '用户名不能为空')
      validator.add(registerForm.password,'minLength:6', '密码长度不能少于6位')
      validator.add(registerForm.phoneNumber,'isMobile', '手机格式不正确')

      var errorMsg = validator.start()
      return errorMsg
    }

    var registerForm = document.getElementById('registerForm')
    registerForm.onsubmit = function(){
      var errorMsg = validataFunc()
      if (errorMsg) {
        console.log(errorMsg)
        return false
      }
    }
</script>
```



## 总结

- 在日常开发中一些工具函数可以封装在一起，组成自己的工具库。减少不必要的代码复制粘贴。
- 感觉敲代码思想更重要啦，这里策略模式体现了**开放-封闭原则**降低代码的耦合度。这些理念都是我自己在敲代码的路上要慢慢学习和积累的。
- 敲出来的代码不能只有自己认识。要多注意细节，时刻去想哪些代码可以再多完善。
- 当然不是所有的东西都要分来分去，一个简单的需求为了设计模式而去设计模式也是不可取的。

**love & peace**