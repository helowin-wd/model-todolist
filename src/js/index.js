init()

function init() {
  initTodoList
}
// 模块
var initTodoList = (function () {
  var plusBtn = document.getElementsByClassName('j-plus-input')[0],
    inputWrap = document.getElementsByClassName('input-wrap')[0],
    addItem = document.getElementsByClassName('j-add-item')[0],
    oList = document.getElementsByClassName('j-list')[0],
    textInput = document.getElementById('textInput'),
    inputShow = false,
    isEdit = false,
    curIdx = null

  addEvent(plusBtn, 'click', function () {
    if (inputShow) {
      inputWrap.style.display = 'none'
      inputShow = false
    } else {
      inputWrap.style.display = 'block'
      inputShow = true
    }
    isEdit = false
  })
  addEvent(addItem, 'click', function () {
    var oItems = document.getElementsByClassName('item'),
      val = textInput.value,
      len = val.length,
      itemLen = oItems.length,
      item

    if (len === 0) return
    if (itemLen > 0) {
      for (let i = 0; i < itemLen; i++) {
        item = elemChildren(oItems[i])[0]

        var text = item.innerText
        if (val === text) {
          alert('已存在此项目')
          return
        }
      }
    }

    if (isEdit) {
      var itemContent = elemChildren(oItems[curIdx])[0]
      itemContent.innerText = val
      addItem.innerText = '增加项目'
      isEdit = true
      curIdx = null
    } else {
      var oLi = document.createElement('li')
      oLi.className = 'item'
      oLi.innerHTML = itemTpl(val)
      oList.appendChild(oLi)
    }
    textInput.value = ''
    inputWrap.style.display = 'none'
    inputShow = false
  })

  function itemTpl(text) {
    return `<p class="item-content">${text}</p>
        <div class="btn-group">
          <a href="javascript:;" class="edit-btn fa fa-edit"></a>
          <a href="javascript:;" class="remove-btn fa fa-times"></a>
        </div>
        `
  }

  /**
   * 事件委托
   *
   * 通过事件对象找出事件源
   */
  addEvent(oList, 'click', function (e) {
    // 获取元素不能放在最上面，需要时时获取
    var oItems = document.getElementsByClassName('item'),
      itemLen = oItems.length,
      e = e || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      liParent = elemParent(tar, 2),
      // 【疑难点】事件委托机制，获取点击下标
      tarIdx = Array.prototype.indexOf.call(oItems, liParent),
      item

    if (className === 'edit-btn fa fa-edit') {
      inputWrap.style.display = 'block'
      inputShow = true
      // 清除所有激活active样式
      for (let i = 0; i < itemLen; i++) {
        item = oItems[i]
        item.className = 'item'
      }
      // 留下我自己
      liParent.className += ' active'
      curIdx = tarIdx
      isEdit = true
      addItem.innerText = `编辑第${tarIdx + 1}项`
    } else if (className === 'remove-btn fa fa-times') {
      liParent.remove()
    }
  })
})()

// 企业级的方法【推荐】
var tpl = document.getElementById('listTpl')
console.log(tpl.innerHTML)
