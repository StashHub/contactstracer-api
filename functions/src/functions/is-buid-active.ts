import * as functions from "firebase-functions";
import {buildCloudFunction} from "../settings";
import * as t from "io-ts";
import {parseRequest} from "../lib/request";
import {isBuidOwnedByFuid} from "../lib/database";

const RequestSchema = t.type({
    buid: t.string
});

export const isBuidActiveCallable = buildCloudFunction().https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Missing authentication");
    }

    const payload = parseRequest(RequestSchema, data);
    const buid = payload.buid;
    const fuid = context.auth.uid;

    return await isBuidOwnedByFuid(buid, fuid);
});