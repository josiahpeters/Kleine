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
        public void SendNotification(string to, string subject, string message)
        {
            sendEmail(new MailAddress("test@josiahpeters.com", "Kleine"), new MailAddress(to), String.Format("Kleine - {0}", subject), subject, message);            
        }

        private void sendEmail(MailAddress fromAddress, MailAddress toAddress, string subject, string title, string body, Attachment attachment = null)
        {
            //this.smtpIp = "blacksmith";
            //SmtpServer
            string ipAddress = ConfigurationManager.AppSettings["SmtpServer"];

            body = string.Format(defaultBody, title, body);

            MailMessage message = new MailMessage(fromAddress, toAddress);

            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;

            if (attachment != null)
                message.Attachments.Add(attachment);

            SmtpClient client = new SmtpClient(ipAddress);

            client.Send(message);
        }

        private static string defaultBody = "<!DOCTYPE HTML PUBLIC '-//W3C//DTD XHTML 1.0 Transitional //EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> <html> <head> <title></title> <meta http-equiv='Content-Type' content='text/html; charset=utf-8'> <style type='text/css'> body, td {{ font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; color: #444; }} h1 {{ margin: 8px; font-size: 24px; }} h2 {{ margin: 0 0 10px 0; font-size: 18px; }} p {{ font-size: 13px; line-height: 18px; }} a, a:visited {{ text-decoration: none; color: #3498DB; }} a:hover {{ color: #0086BB; }} .footer a, .footer a:visited {{ text-decoration: none; color: #cccccc; }} .footer a:hover {{ color: #cccccc; }} </style> </head> <body> <table width='100%' cellspacing='0' cellpadding='0' bgcolor='fbfbfb'> <tr> <td align='center'> <table width='640' cellspacing='0' cellpadding='0' style='border: 1px solid #ccc;'> <tr> <td bgcolor='#3498DB' align='left' style='padding-left:20px;'> <h1><a href='http://localhost:53252/' style='color: #ffffff; text-decoration: none;'>Kleine</a></h1> </td> </tr> <tr> <td height='10' bgcolor='#0086BB'></td> </tr> <tr bgcolor='#ffffff'> <td style='padding: 20px' align='left'> <h2>{0}</h2> {1} </td> </tr> <tr align='center' bgcolor='#22425F' style='height: 30px;'> <td class='footer' style='color: #ffffff; font-size: 11px; height: 30px;'>This email was sent to you by <a href='http://localhost:53252/' style='color: #cccccc;'>Kleine</a>.</td> </tr> </table> </td> </tr> </table> </body> </html>";
        

        public void SendInvitation(Profile profile, DueDate dueDate)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", profile.Name ?? "Friend");
            sb.AppendFormat("<a href=\"http://localhost:53252/#/invite?code={0}\">Make Prediction</a>", profile.EmailCode);
            //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            SendNotification("josiahpeters@gmail.com", "BabyP - Make Prediction", sb.ToString());
        }

        public void SendAuth(Profile profile, DueDate dueDate)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("Dear {0},<br /><br />\n", profile.Name ?? "Friend");
            sb.AppendFormat("<p><a href=\"http://localhost:53252/#/predict/start?code={0}\">Make Prediction</a></p>", profile.EmailCode);
            sb.AppendFormat("<p><a href=\"http://localhost:53252/#/results/start?code={0}\">View Results</a></p>", profile.EmailCode);
            //sb.AppendFormat("Thanks for signing up to make guesses. To keep things simple, you don't need a username or password, just an email account. We've included this link: {0} that you can use to make guesses or check on the statistics of other guessers. If you lose this email and need access again just enter your email address in again.", "");

            SendNotification("josiahpeters@gmail.com", "BabyP - Make Prediction", sb.ToString());
        }
    }
}
