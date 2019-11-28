// index
class indexRender {
  get(res, usr = '???') {
    return res.render('index', {
      title: 'Index',
      usr,
    });
  }
}

// signup
class signupRender {
  constructor() {
    this.layout = 'sign'
    this.body = 'signup'
  }

  get(res) {
    return res.render(this.body, {
      layout: this.layout,
      title: 'Sign up',
    });
  }

  err(res, text) {
    return res.render(this.body, {
      layout: this.layout,
      title: 'Sign up',
      msg: {
        text: text,
        status: 'error'
      },
    });
  }

  suc(res, text) {
    return res.render('signin', {
      layout: this.layout,
      title: 'Sign in',
      msg: {
        text: text,
        status: 'success'
      },
    });
  }
}

// signin
class signinRender {
  constructor() {
    this.layout = 'sign'
    this.body = 'signin'
  }

  get(res) {
    return res.render(this.body, {
      layout: this.layout,
      title: 'Sign in',
    });
  }

  err(res, text) {
    return res.send({
      result: 0,
      msg: text
    })
  }

  suc(res, text) {
    return res.send({
      result: 1,
      msg: text
    })
  }
}

module.exports = {
  indexRender: new indexRender(),
  signupRender: new signupRender(),
  signinRender: new signinRender(),
}
