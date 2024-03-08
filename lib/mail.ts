import sendMailFactory from "sendmail";
import { schoolEmailDomain } from "./utils/semantic-validation";

const sendmail = sendMailFactory({});

export function sendConfirmationEmail(
    recipient: string,
    confirmationCode: number
): void {
    sendmail(
        {
            from: "quickbites@" + schoolEmailDomain,
            to: recipient,
            subject: "Account confirmation",
            html: "Your confirmation code is " + confirmationCode
        },
        function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        }
    );
}
