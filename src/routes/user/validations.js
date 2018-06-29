import Validator from 'validatorjs'

const create = ({ body }) => {
  const rules = {
    username: 'required|regex:/^[a-z0-9_-]{5,15}$/',
    email: 'required|email',
    password: 'required|min:8',
    authority: 'in:superadmin,admin,editor,writer,developer'
  }

  return new Validator(body, rules)
}

const login = ({ body }) => {
  const rules = {
    username: 'required|regex:/^[a-z0-9_-]{5,15}$/',
    password: 'required|min:8'
  }

  return new Validator(body, rules)
}

export default {
  create,
  login
}
