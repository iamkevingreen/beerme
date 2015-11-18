

Template.beer.helpers({

});

Template.beer.events({
  'submit form': function(event, template) {
    event.preventDefault();
  }
});
Template.beer.rendered = function() {
  return $('#getmebeer').validate({
    rules: {
      name: {
        required: true
      },
      number: {
        required: true
      },
      message: {
        required: true
      }
    },
    messages: {
      name: {
        required: ""
      },
      number: {
        required: ""
      },
      message: {
        required: ""
      }
    },
    submitHandler: function() {
      var number = $('#number').val();
      var object = {
          'name': $('#name').val(),
          'number': number,
          'message': $('#message').val(),
      }
      Meteor.call('sendText', object, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          $('input').val("");
          $('textarea').val("");
          $('button').css('opacity', .2);
          $('button').after("<h2>Text Sent!</h2>");
        }
      });
    }
  });
}
