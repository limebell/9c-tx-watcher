import request from "request";

export class WebHook {
  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async send(message: string): Promise<void> {
    message = "[Tx monitor] " + message;
    request(
      {
        url: this.url,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: message,
      },
      (error, response, body) => {
        if (error) {
          throw new Error(`POST ${this.url} => ${response}`);
        }
        console.log(
          "Successfully send message to slack. Server responded with:",
          body
        );
      }
    );
  }
}
