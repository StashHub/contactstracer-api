import * as functions from "firebase-functions";
import {buildCloudFunction} from "../settings";
import * as t from "io-ts";
import {parseRequest} from "../lib/request";
import {FIRESTORE_CLIENT, isBuidOwnedByFuid} from "../lib/database";

const RequestSchema = t.type({
    buid: t.string,
    pushRegistrationToken: t.string
});

export const changePushTokenCallable = buildCloudFunction().https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Missing authentication");
    }

    const payload = parseRequest(RequestSchema, data);
    const buid = payload.buid;
    const pushRegistrationToken = payload.pushRegistrationToken;
    const fuid = context.auth.uid;

    if (!await isBuidOwnedByFuid(buid, fuid)) {
        throw new functions.https.HttpsError("unauthenticated", "The device does not exist or does not belong to your account");
    }

    const registrations = FIRESTORE_CLIENT.collection("registrations");

    try {
        console.log(`Changing push token for BUID ${buid}`);
        await registrations.doc(buid).update({
            pushRegistrationToken
        });
    } catch (error) {
        console.error(`Changing push token for BUID ${buid}: ${error}`);
        throw new functions.https.HttpsError("unavailable", "Failed to change push token");
    }
});