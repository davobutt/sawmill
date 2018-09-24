import _ from 'lodash'
const tagger = {}

tagger.tag = (event) => {
  return getTags(event)
}

const addTags = (array, type, value) => {
  if (value) array.push({type: type, value: value})
}

const getTags = (event) => {
  let tags = []
  addTags(tags, 'app', _.get(event, 'event.syslog.appName'))
  addTags(tags, 'type', _.get(event, 'event.json.type'))
  addTags(tags, 'request', _.get(event, 'event.json.header.path'))
  addTags(tags, 'log', eventLogTagger(_.get(event, 'event.json.log')))
  return tags
}

const eventLogTagger = (log) => {
  if (/request=/g.test(log)) {
    return 'chips'
  }
}

export default tagger