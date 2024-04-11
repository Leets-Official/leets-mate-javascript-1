class Member {
  #name;

  constructor(name) {
    this.#name = name.trim();
  }

  get name() {
    return this.#name;
  }
}

module.exports = Member;
