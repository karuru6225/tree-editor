export default class {
  constructor({
    id = 0,
    parentId = null,
    answerText = '',
    title = ''
  }) {
    this.id = id;
    this.parentId = parentId;
    this.answerText = answerText;
    this.title = title;
  }
}
