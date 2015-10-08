

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
        required: true,
        number: true
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
        required: "",
        number: ""
      },
      message: {
        required: ""
      }
    },
    submitHandler: function() {
      var object = {
          'name': $('#name').val(),
          'number': $('#number').val(),
          'message': $('#message').val(),
      }
      Meteor.call('sendText', object, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          $('input').remove();
          $('textarea').remove();
          $('button').css('opacity', .2);
          $('button').after("<h2>Text Sent!</h2>");
        }
      });
    }
  });
}
