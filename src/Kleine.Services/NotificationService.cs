using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Text;

namespace Kleine
{
    public class NotificationService : INotification
    {
        private static string baseUri = "http://preggopredict.com/";

        public static string BaseUri
        {
          get { return NotificationService.baseUri; }
          set { NotificationService.baseUri = value; }
        } 

        public static bool BaseUriSet = false;

        public void SendNotification(string to, string subject, string message)
        {
            sendEmail(new MailAddress("p@preggopredict.com", "PreggoPredict"), new MailAddress(to), String.Format("{0}", subject), subject, message);            
        }

        private void sendEmail(MailAddress fromAddress, MailAddress toAddress, string subject, string title, string body, Attachment attachment = null)
        {
            //this.smtpIp = "blacksmith";
            //SmtpServer
            string ipAddress = ConfigurationManager.AppSettings["SmtpServer"];

            body = string.Format(defaultBody, title, body, baseUri);

            MailMessage message = new MailMessage(fromAddress, toAddress);

            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;

            if (attachment != null)
                message.Attachments.Add(attachment);

            SmtpClient client = new SmtpClient(ipAddress);

            client.Send(message);
        }

        private static string defaultBody = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD XHTML 1.0 Transitional //EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html> <head> <title></title> <meta http-equiv='Content-Type' content='text/html; charset=utf-8'> <style type='text/css'> body, td {{ font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; color: #444; }} h1 {{ margin: 8px; font-size: 24px; }} h2 {{ margin: 0 0 10px 0; font-size: 18px; }} p {{ font-size: 13px; line-height: 18px; }} a, a:visited {{ text-decoration: none; color: #3498DB; }} a:hover {{ color: #0086BB; }} .footer a, .footer a:visited {{ text-decoration: none; color: #cccccc; }} .footer a:hover {{ color: #cccccc; }} </style> </head> <body> <table width='100%' cellspacing='0' cellpadding='0' bgcolor='fbfbfb'> <tr> <td align='center'> <table width='640' cellspacing='0' cellpadding='0' style='border: 1px solid #ccc;'> <tr> <td bgcolor='#a1cd41' align='left' style='padding-left:10px;'> <h1><a href='{2}' style='color: #444444; text-decoration: none; font-size: 16px;'>PreggoPredict</a></h1> </td> </tr> <tr> <td height='5' bgcolor='#8eb439'></td> </tr> <tr bgcolor='#ffffff'> <td style='padding: 20px' align='left'> <h2>{0}</h2> {1} </td> </tr> <tr align='center' bgcolor='#a1cd41' style='height: 30px;'> <td class='footer' style='color: #777777; font-size: 11px; height: 30px;'>This email was sent to you by <a href='{2}' style='color: #444444;'>PreggoPredict</a>.</td> </tr> </table> </td> </tr> </table> </body> </html>";

        public void SendInvitation(Profile profile, DueDate dueDate)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", profile.Name ?? "Friend");
            sb.AppendFormat("<a href=\"{0}#/invite?code={1}\">Make Prediction</a>", baseUri, profile.EmailCode);
            //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            SendNotification("josiahpeters@gmail.com", "Baby Peters - You are invited to make a prediction", sb.ToString());
        }

        public void SendGuessToKim(Profile profile, Prediction prediction)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                sb.AppendFormat("<table>");
                sb.AppendFormat("<tr><th>Field</th><th>Value</th></tr>");
                sb.AppendFormat("<tr><th>{0}</th><td>{1}</td></tr>", "Name", profile.Name);
                sb.AppendFormat("<tr><th>{0}</th><td>{1}</td></tr>", "Email", profile.EmailAddress);
                sb.AppendFormat("<tr><th>{0}</th><td>{1}</td></tr>", "Gender", prediction.Gender);
                sb.AppendFormat("<tr><th>{0}</th><td>{1}</td></tr>", "Date", ((DateTime)prediction.Date).ToString("MM/dd/yyyy"));
                sb.AppendFormat("<tr><th>{0}</th><td>{1}</td></tr>", "Time", ((DateTime)prediction.Time).ToString("hh:mm"));
                sb.AppendFormat("<tr><th>{0}</th><td>{1} lbs</td></tr>", "Weight", prediction.Weight);
                sb.AppendFormat("<tr><th>{0}</th><td>{1} in</td></tr>", "Length", prediction.Length);
                sb.AppendFormat("<tr><th>{0}</th><td>{1}</td></tr>", "Message", prediction.Message);
                sb.AppendFormat("</table>");
                //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

                SendNotification("kimmedinepeters@gmail.com", string.Format("Baby Peters - {0} Made a Guess!", profile.Name), sb.ToString());
            }
            catch (Exception ex)
            { }
        }

        public void SendAuth(Profile profile, DueDate dueDate)
        {
            StringBuilder sb = new StringBuilder();

            //sb.AppendFormat("Dear {0},<br /><br />\n", profile.Name ?? "Friend");
            sb.AppendFormat("<p>Kim and Joey are expecting a baby soon. They have invited you to take part in a game to predict when Baby P will be born.</p>");
            sb.AppendFormat("<p>Use the link below to make your prediction or view the results as people continue to vote.</p>");

            string link = string.Format("{0}invitation?code={1}", baseUri, profile.EmailCode);

            sb.AppendFormat("<p><a href=\"{0}\">{0}</a></p>", link);
            //sb.AppendFormat("<p><a href=\"{0}#/results/start?code={1}\">View Results</a></p>", baseUri, profile.EmailCode);
            //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            SendNotification(profile.EmailAddress, "Baby Peters - Make Your Prediction", sb.ToString());
        }
    }
}
