
module.exports = (
  `
    <div>
      <head>
        <title>yoooo beer</title>
        <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
          }
          body, html {
            font-family: 'Space Mono';
          }
          h2 {
            font-family: 'Space Mono', monospace;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
          }
          .content {
            padding-top: 30px;
          }
          a {
            color: #000;
          }
          svg {
            width: 30px;
            height: 30px;
          }
          .nounderline {
            text-decoration: none;
          }
          .mt1 {
            margin-top: 1rem;
          }
          .ml05 {
            margin-left: 0.5rem;
          }
          .s-i {
            font-family: 'Space Mono';
            outline: none;
            padding: 1rem;
          }
          .s-s {
            width: 32%;
          }
          .logger {
            width: 100%;
            margin-top: 30px;
            height: 140px;
            padding: 5px;
            overflow: scroll;
            background-color: #000;
          }
          .logger span {
            font-size: 0.7rem;
            color: white;
            display: block;
          }
          .logger span.error {
            color: red;
          }
          .logger span.success {
            color: green;
          }
          form label span {
            padding-bottom: 30px;
          }
          form button {
            border: 0;
            cursor: pointer;
            padding: 12px 18px;
            background-color: black;
            color: white;
          }
        </style>
      </head>
      <div class='container'>
        <h2>
          Ayo get me a beer
        </h2>
        <div class='content'>
          Enter your friends name and number to text them for a beer
        </div>
        <div style='margin-top: 20px;'>
          <form id='form'>
            <div style='margin-bottom: 10px;'>
              <label for='current_namespace' style='width: 108%'>
                <input required class=' s-i'  style='width: 100%;' name='phone' type='tel' placeholder='Phone Number' />
              </label>
              <div class='mt1'>
                <label for='current_key' class='mt1' style='width: 100%'>
                  <input required class='s-i' style='width: 100%;' name='name' placeholder='Friends Name' />
                </label>
              </div>
            </div>
            <div class='mt1'>
              <button type='submit' id='magic'>Pew pew pew</button>
            </div>
          </form>
        </div>
        <div class='logger'>
          <div id='logger'></div>
          <span>this is the logger...</span>
        </div>
        <div class='content'>
          <p>Created by <a href="https://thecouch.nyc">The Couch</a></p>
        </div>
      </div>
      <script>
        fetch('/api/responses')
        .then(response => response.json())
        .then((json) => {
          console.log('hey?', JSON.stringify(json))
        })
        function toJSONString( form ) {
          var obj = {};
          var elements = form.querySelectorAll( "input, select, textarea" );
          for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
              obj[ name ] = value;
            }
          }

          return JSON.stringify( obj );
        }

        var form = document.getElementById('form')
        var logger = document.getElementById('logger')
        var magic = document.getElementById('magic')
        var jsonForm = {}

        form.addEventListener('submit', (e) => {
          magic.innerHTML = 'Doing stuff...'
          e.preventDefault()
          jsonForm = toJSONString(form)
          fetch('/api/text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: jsonForm
          }).then((response) => {
            return response.json()
          }).then((json) => {
            if (json.error) {
              var span = document.createElement('span')
              span.classList.add('error')
              span.innerHTML = json.reason
              let logP = logger.parentNode
              logP.insertBefore(span, logger)
              magic.innerHTML = 'Try again'
            } else {
              var span = document.createElement('span')
              span.innerHTML = 'successfully texted ' + json.data.name
              let logP = logger.parentNode
              logP.insertBefore(span, logP.childNodes[0])
              magic.innerHTML = 'text another mum'
            }

          })
        })
      </script>
    </div>
  `
)
