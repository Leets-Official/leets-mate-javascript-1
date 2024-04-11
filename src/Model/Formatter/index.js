const shuffle = require('../../../Utils/shuffle.js');

class MemberFormatter {
  #membersList;

  constructor(members) {
    this.#membersList = members;
  }

  shuffle() {
    this.#membersList = shuffle(this.#membersList);
    return this;
  }

  splitBy(count) {
    const splittedMembers = [];

    for (let i = 0; i < this.#membersList.length; i += count) {
      splittedMembers.push(this.#membersList.slice(i, i + count));
    }

    this.#membersList = splittedMembers;
    return this;
  }

  formatString() {
    return this.#membersList.map((members) => {
      const names = members.map((member) => member.name).join(' | ');
      return `[ ${names} ]`;
    });
  }
}

module.exports = MemberFormatter;
