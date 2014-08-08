var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('k8hfZdWGpL0qTOPmIlJvig');

exports.sendInviteMail = function (res, email, messageHtml, messageSubject) {

    var message = {
        "html": messageHtml,
        "subject": messageSubject,
        "from_email": "contact@mail.opencloudschool.org",
        "from_name": "OpenCloudSchool Team",
        "to": [{
            "email": email,
            "name": "Educator",
            "type": "to"
        }],
        "headers": {
            "Reply-To": "contact@mail.opencloudschool.org"
        },
        "important": true,
        "track_opens": null,
        "track_clicks": true,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": "mail.opencloudschool.org",
        "return_path_domain": null,
        "merge": true
    };

    mandrill_client.messages.send({ "message": message, "async": false }, function (result) {
        var msg = result[0].status + " to " + result[0].email;
        res.send({
            "message": msg,
            "name": "inviteMailSent",
            "errors": null
        });
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function (e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
}