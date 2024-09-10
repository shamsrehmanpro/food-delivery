
import {MailtrapClient} from "mailtrap"

const TOKEN = "cf3d64e6e78eecd72a140b6e48f89a15";

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "shams",
};


