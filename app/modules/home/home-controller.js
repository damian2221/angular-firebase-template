export default class HomeController {
  constructor($firebaseRef, $firebaseObject, $firebaseArray, $timeout) {
    const self = this;
    let ref;

    ref = $firebaseRef.default.child('person');
    this.person = $firebaseObject(ref);
    ref = $firebaseRef.default.child('messages');
    this.messages = $firebaseArray(ref);

    this.messages.$resolved = false;
    this.messages.$loaded().then(() => {
      self.messages.$resolved = true;
    });

    // delay message rendering until after view animation
    this.showMessages = false;
    $timeout(function() {
      self.showMessages = true;
    }, 750);

    return self;
  }

  submitMessage(message) {
    this.messages.$add(message);
  }

  updateName(name) {
    this.person.name = name;
    this.person.$save();
  }
}

HomeController.$inject = ['$firebaseRef', '$firebaseObject', '$firebaseArray', '$timeout'];
