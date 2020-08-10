const logs = [
    {name: "Chris", details: "a PM on Cosmos DB"}
];

async function getLogs() {
    return logs;
}

function appendLog(log) {
    logs.push(log);
}

function validateInput(input) {
    return input !== undefined && input !== null && typeof input == "string" && input !== "";
}

module.exports = async function (context, req) {
    context.log(JSON.stringify(req, null, ' '));

    switch(req.method) {
        case "GET":
            context.res = {
                status: 200,
                headers: {
                    'content-type':'application/json'
                },
                body: await getLogs()
            }
            
            return;
        case "POST":
            const name = req.body.name;
            const details = req.body.details;
            if(!(validateInput(name) && validateInput(details))) {
                context.res = {
                    status: 400,
                    body: `You must submit a JSON object with "name" and "details" set to a non-empty string value`
                }
            }
            appendLog({name, details});

            context.res = {
                status: 201
            }

            return;
        default:
            throw new Error(`Unexpected HTTP method: ${req.method}`);
    }
};