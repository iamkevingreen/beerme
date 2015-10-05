

Template.beer.helpers({

});

Template.beer.events({
  'click button': function () {
    var homie = $('input').val();
    console.log(homie);

    Meteor.call('sendText', homie, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});
