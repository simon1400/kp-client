const changeUrl = (state) => {
  let urlStr = ''
  for(var key in state) {
    if(state[key].length){
      urlStr += `&${key}=${state[key]}`
    }
  }
  urlStr = urlStr.slice(1)
  if(urlStr.length) {
    urlStr = '?'+urlStr
  }
  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + urlStr;
  window.history.pushState({path:newurl},'',newurl);
}

export default changeUrl
