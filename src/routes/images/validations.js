import Validator from 'validatorjs'

const store = ({ body }) => {
  const rules = {
    source: 'required|string',
    urlSource: 'required|url'
  }

  return new Validator(body, rules)
}

export default {
  store
}
