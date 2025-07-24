"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const variables_config_1 = require("../config/variables.config");
class MailerService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: variables_config_1.AUTH_MAIL,
                pass: variables_config_1.AUTH_PASS,
            },
        });
    }
    async sendMail(to, subject, text) {
        const mailOptions = {
            from: variables_config_1.AUTH_MAIL,
            to,
            subject,
            text,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    }
}
exports.default = new MailerService();
//# sourceMappingURL=mailer.service.js.map