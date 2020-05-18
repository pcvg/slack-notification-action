"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const webhook_1 = require("@slack/webhook");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.SLACK_WEBHOOK_URL === undefined) {
                throw new Error('SLACK_WEBHOOK_URL is not set');
            }
            const webhook = new webhook_1.IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
            switch (process.env.JOB_STATUS) {
                case "Success":
                case "success":
                    var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_SUCCESS + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_SUCCESS + '","color": "good"}]}');
                    break;
                case "Failure":
                case "failure":
                    var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_FAIL + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_FAIL + '","color": "danger"}]}');
                    break;
                case "Cancelled":
                case "cancelled":
                    var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_FAIL + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_FAIL + '","color": "danger"}]}');
                    break;
                default:
                    var payload = eval("payload = " + '{ "attachments": [{"title": "' + process.env.TITLE_MSG_FAIL + '","title_link": "' + process.env.URL_WORKFLOW + '","text": "' + process.env.FOOTER_MSG_FAIL + '","color": "danger"}]}');
            }
            yield webhook.send(JSON.parse(JSON.stringify(payload)));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
