  (function() {
      var headTagStripe = document.getElementsByTagName("head")[0];
      var jqTagStripe = document.createElement('script');
      jqTagStripe.type = 'text/javascript';
      jqTagStripe.src = 'https://checkout.stripe.com/checkout.js';
      jqTagStripe.onload = slackPassEmbed;
      headTagStripe.appendChild(jqTagStripe);

      if (typeof jQuery == 'undefined') {
          var headTag = document.getElementsByTagName("head")[0];
          var jqTag = document.createElement('script');
          jqTag.type = 'text/javascript';
          jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
          jqTag.onload = slackPassEmbed;
          headTag.appendChild(jqTag);
      } else {
          $(slackPassEmbed)
      }

      var headTagSwal = document.getElementsByTagName("head")[0];
      var jqTagSwal = document.createElement('script');
      jqTagSwal.type = 'text/javascript';
      jqTagSwal.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js';
      headTagSwal.appendChild(jqTagSwal);

      var headTagSwalCSS = document.getElementsByTagName("head")[0];
      var jqTagSwalCSS = document.createElement('link');
      jqTagSwalCSS.type = 'text/css';
      jqTagSwalCSS.rel = 'stylesheet';
      jqTagSwalCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css';
      jqTagSwalCSS.onload = slackPassEmbed;
      headTagSwalCSS.appendChild(jqTagSwalCSS);

      function slackPassEmbed() {
          if (typeof StripeCheckout === 'undefined') return;
          var handler = StripeCheckout.configure({
              key: 'pk_live_Wb6YsTe50Kx9gbbc7O8gxREM',
              image: '/assets/images/blackdoor_handle.jpg',
              locale: 'auto',
              token: function(token) {
                  $.post('https://api.slackpass.io/widget', ({
                      token: token,
                      key: 'pk_live_Wb6YsTe50Kx9gbbc7O8gxREM',
                      sp: '5652805134057472',
                  }), function(data) {
                      if (data) {
                          if (data.message === 'already_in_team') {
                           swal('Success!', "Thanks for joining! You've been added to the premium channel. If you have any questions, please contact support@myblackdoor.com", "success")
                          } else
                          if (data.message === 'already_invited') {
                           swal('Uh oh!', "It looks like you have a pending invitiation to this Slack group. Please accept the invitation and try again.", "warning")
                          } else
                          if (data.message === 'Success') {
                           swal('Success!', "Thanks for joining! Your invitation is being prepared and should show up in your email inbox soon. If you have any questions, please contact support@myblackdoor.com", "success")
                          } else {
                            swal('Uh oh!', "It looks like there was an error. Please contact support@myblackdoor.com", "warning")
                          }
                      } else {
                          console.log("Error")
                      }
                  })
              }
          });
          document.getElementById('slackPassStripeWidget').addEventListener('click',
              function(e) {
                  handler.open({
                      name: 'Blackdoor',
                      description: 'Start your 30 day trial',
                      amount: 0,
                  });
                  e.preventDefault();
              });
          window.addEventListener('popstate', function() {
              handler.close();
          });
      }
  })();

