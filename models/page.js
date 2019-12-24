function Paging(data) {
  var nowPage = parseInt(data.nowPage);
  var pageNum = parseInt(data.pageNum);
  var content = [];
  var pre = {};
  var pre = {};
  pre.index = 0;
  pre.text = "&lsaquo;";
  if (nowPage == 1) {
    pre.unclickable = true;
  }
  content.push(pre);
  if (pageNum <= 7) {
    for (var i = 1; i <= pageNum; i++) {
      var pag = {};
      pag.text = i;
      pag.index = i;
      if (nowPage == i) {
        pag.unclickable = true;
        pag.cur = true;
      }
      content.push(pag);
    }
  } else if (nowPage <= 3) {
    //当前页面小于等于展示页数总数的一半（向下取整），从1开始
    for (var i = 1; i <= nowPage + 2; i++) {
      var pag = {};
      pag.text = i;
      pag.index = i;
      if (nowPage == i) {
        pag.unclickable = true;
        pag.cur = true;
      }
      content.push(pag);
    }
    var pag = {};
    pag.text = "...";
    pag.unclickable = true;
    content.push(pag);
    var pag = {};
    pag.index = pageNum;
    pag.text = pageNum;
    content.push(pag);
  } else if (nowPage > 3 && nowPage < pageNum - 2) {
    var pag = {};
    pag.inde = 1;
    pag.text = 1;
    content.push(pag);
    var pag = {};
    pag.text = "...";
    pag.unclickable = true;
    content.push(pag);
    for (var i = nowPage - 2; i <= nowPage + 2; i++) {
      var pag = {};
      pag.text = i;
      pag.index = i;
      if (nowPage == i) {
        pag.unclickable = true;
        pag.cur = true;
      }
      content.push(pag);
    }
    var pag = {};
    pag.text = "...";
    pag.unclickable = true;
    content.push(pag);
    var pag = {};
    pag.inde = pageNum;
    pag.text = pageNum;
    content.push(pag);
  } else if (nowPage >= pageNum - 2) {
    var pag = {};
    pag.inde = 1;
    pag.text = 1;
    content.push(pag);
    var pag = {};
    pag.text = "...";
    pag.unclickable = true;
    content.push(pag);
    for (var i = nowPage - 2; i <= pageNum; i++) {
      var pag = {};
      pag.text = i;
      pag.index = i;
      if (nowPage == i) {
        pag.unclickable = true;
        pag.cur = true;
      }
      content.push(pag);
    }
  }
  var next = {};
  next.index = pageNum + 1;
  next.text = "&rsaquo;";
  if (nowPage == pageNum) {
    next.unclickable = true;
  }
  content.push(next);
  return content;
}
module.exports = {
  Paging
}