/**
	** Usefull functions in work
	** elevenBeans
**/


/**
 usefull function on data processing
**/

function dataUtils (){
};

dataUtils.prototype = {
	// body...

	init : function(){
		console.log('init');
	},
	// unique Arry
	unique : function(arr){
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
        result.push(elem);
        hash[elem] = true;
      }
    }
    return result;
	},
  isMatchUA: function(ua, ualist){
      var list = (ualist || '').split('|');

      var ret = false;

      list.forEach(function (it) {
          it = it.trim();

          if (it && ua.indexOf(it) !== -1) {
              ret = true
          }
      });

      return ret;
  },
  parseBoolean: function(str){
    var ret = false;

    try{
      ret = JSON.parse(str);
    }catch(e){}

      return ret;
  },
  parseQueryString: function(url) {  
    var result = {};
    var paramParts;
    var reg=/^([\u4E00-\u9FFF]|[a-zA-Z]|[0-9]|\s)+$/;
    var params = (url.split('?')[1] || '').split('&');

    for(var param in params) {  
      if (params.hasOwnProperty(param)) {  
        paramParts = params[param].split('=');
        var temp = decodeURIComponent(paramParts[1] || "");
        if(temp && reg.test(temp))
          result[paramParts[0]] = temp;
      }  
    }
    console.log(result);
    return result;
  },
  getDefaultTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    month = (month < 9) ? '0' + month : month;
    var day = date.getDate();
    day = (day < 9) ? '0' + day : day;
    var time = year + '' + month + day;
    return time;
  },
  escapeHTML : function (text) {
    var replacements= {&quot;&lt;&quot;: &quot;&lt;&quot;, &quot;&gt;&quot;: &quot;&gt;&quot;,&quot;&amp;&quot;: &quot;&amp;&quot;, &quot;\&quot;&quot;: &quot;&quot;&quot;};
    return text.replace(/[&lt;&gt;&amp;&quot;]/g, function(character) {
        return replacements[character];
    });
  }
};

/**
 usefull function on dom processing
**/

function domUtils (){
};

domUtils.prototype = {
	// insert tarDom after desDom
	insertAfter : function (draggedElement, targetElement){
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
		// 如果最后的节点是目标元素，则直接添加。因为默认是最后
			parent.appendChild(draggedElement);
		}
		else {
			parent.insertBefore(draggedElement, targetElement.nextSibling);
			//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
		}
	}
};

/**
	BottomLoader
**/

function BottomLoader(isDebounce){
	this.BUFF = 200;
	this.viewportHeight = window.screen.height;
	this.DIFF = this.viewportHeight;
	this.cbContent = {};
	this.count = 1;
	this.last = 0;
	this.init(isDebounce);
}

BottomLoader.prototype = {
  init: function (isDeb) { //对于detect检测做了间隔BUFF限制 并绑定scroll事件
    var self = this;
    var timer = null;
    window.addEventListener('scroll', function () {
      if(isDeb){
        if (typeof timer === 'number') {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            //添加onscroll事件处理
            self.detect();
        }, self.BUFF);
      }else{
        self.throttle(200,self.detect);
      }
    }, false);
  },
  detect: function () {  //监测的逻辑
  	var self = this;
    var docHeight = document.body.clientHeight;
    var scrollTop = document.body.scrollTop; //scroll distance
    //console.log('detect');
    var elBottomPos = docHeight;
    if ((self.viewportHeight + scrollTop + cbContent.diff >= elBottomPos )&&(scrollTop + cbContent.diff <= elBottomPos )){
      cbContent.callback && cbContent.callback(self.count);
      console.log('Loader '+self.count+" times");
      self.count ++;
    }
  },
  addCallback: function (callback,config) {  //增加回调函数
    var self = this;
    cbContent = {
      diff: config.diff || self.DIFF,
      callback: callback
    };
    if(config.immediately){
      self.detect();
    }
  },
  throttle : function(delay, action){
    var self = this;
    var curr = +new Date();
    if (curr - self.last > delay){
      console.log('in');
      action.apply(this, arguments);
      self.last = curr ;
    };
  }
};

