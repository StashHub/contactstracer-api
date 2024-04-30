import * as functions from "firebase-functions";
import {buildCloudFunction} from "../settings";
import {deleteUploads} from "../lib/storage";
import * as t from "io-ts";
import {parseRequest} from "../lib/request";
import {isBuidOwnedByFuid} from "../lib/database";

const RequestSchema = t.type({
    buid: t.string,
});

export const deleteUploadsCallable = buildCloudFunction().https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Missing authentication");
    }

    const payload = parseRequest(RequestSchema, data);
    const buid = payload.buid;
    const fuid = context.auth.uid;

    if (!await isBuidOwnedByFuid(buid, fuid)) {
        throw new functions.https.HttpsError("unauthenticated", "The device does not exist or does not belong to your account");
    }

    try {
        console.log(`Deleting uploads for user ${fuid} and buid ${buid}`);
        await deleteUploads(fuid, buid);
    } catch (error) {
        console.error(`Failed deleting uploads for user ${fuid} and buid ${buid}: ${error}`);
        throw new functions.https.HttpsError("unavailable", "Failed to delete uploaded data");
    }
});