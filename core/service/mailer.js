var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('d1WatrL9NPg6HHM-EWE5mg');
var fs = require('fs-extra');

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
        "tags": [
      "invite-signup"
        ],
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
};


exports.sendWelcomeMail = function (email) {

    var message = {
        "html": "<h2>Welcome to Open Cloud School</h2><br/><p>Thankyou for signing up for our service, but as of now, we are not quite ready.</p><p>But you will be the first one to be notified when we are up and running<br/>Feel Free to email us, with any queries or suggestions, We will make sure that we answer all your questions</p>.<br/><br/><p>Open Cloud School Team<br/><a href='https://www.facebook.com/opencloudschool'>Facebook</a><br/><a href='https://twitter.com/opencloudschool'>Twitter</a><br/><a href='https://www.google.com/+OpenCloudSchoolOrgOCS'>Google Plus</a></p>",
        "subject": "Welcome to Open Cloud School",
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
        "tags": [
      "invite-welcome"
        ],
        "merge": true
    };

    mandrill_client.messages.send({ "message": message, "async": false }, function (result) {
        fs.ensureFile('./data/invites_email_data.json', function (err) {
            if (err) {
                console.log("unable to write to file");
            }
            fs.appendFile('./data/invites_email_data.json', JSON.stringify(result[0],null,4), function (err) {
                if (err) {
                    console.log("unable to write to file");
                }
            });
        });
    }, function (e) {
        fs.ensureFile('./data/invites_email_data.json', function (err) {
            if (err) {
                console.log("unable to write to file");
            }
            fs.appendFile('./data/invites_email_data.json', JSON.stringify(e, null, 4), function (err) {
                if (err) {
                    console.log("unable to write to file");
                }
            });
        });
    });
};