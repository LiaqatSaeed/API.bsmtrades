var cron = require("node-cron");
import currentRatio from "../ExternalAPIs/fxssiAPI";

export const RecordBalanceHistory = () => {
    var task = cron.schedule(
        "0 * * * *",
        //"*/2 * * * *",
        () => {
            console.log("Running a job at every 3 AM/PM at Asia/Bahrain timezone");
        },
        {
            scheduled: true,
            timezone: "Asia/Bahrain",
        }
    );

    task.start();
};