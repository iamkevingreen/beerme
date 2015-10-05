

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
        $('input').remove();
        $('button').css('opacity', .2);
        $('button').after("<h2>Text Sent!</h2>");
      }
    });
  }
});
