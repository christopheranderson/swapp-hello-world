const ENV = "PROD";

onload = async ()=>{
    console.log("Hello 🌎🌍🌏!");

    const iam = document.getElementById("iam")
    iam.onsubmit = (async e => {
        e.preventDefault();

        e.target.name.disabled = true;
        e.target.details.disabled = true;

        const name = e.target.name.value;
        const details = e.target.details.value;
        try {
            await appendLog(name, details);
        } catch (e) {
            console.error(e);
            return
        }
        updateBanner(name);

        await updateLogs();

        e.target.name.value = "";
        e.target.details.value = "";

        e.target.name.disabled = false;
        e.target.details.disabled = false;

        return false;
    });

    function updateBanner(name) {
        document.getElementById("hello-banner").innerText = `Hello, ${name}!`;
    }

    async function appendLog(name, details) {
        if(ENV === "DEV") {
            return;
        }
        await fetch("/api/log", {
            body: JSON.stringify({
                name,
                details
            }),
            method: "POST"
        })
    }

    async function updateLogs(){
        const logs = await fetchLogs().catch(e => {console.error(e); return []});

        const logList = document.getElementById("log-list");
        logList.innerHTML = '';

        if(logs.length > 0) {

            for(const log of logs) {
                const p = document.createElement("p");
                p.innerText = `${log.name} is ${log.details}`;
                logList.appendChild(p);
            }
        } else {
            const p = document.createElement("p");
            p.innerText = `... 👻🏠🏠`;
            logList.appendChild(p);
        }

        unhideLogs();
        return;
    }

    async function fetchLogs() {
        if(ENV=="DEV") {
            return [
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
                // {name: "Fakey O'Fraud", details: "a fake record"},
            ]
        }

        const response = await fetch("/api/log");

        if(!response.ok || !response.headers['Content-Type'] || !response.headers['Content-Type'].contains('json')) {
            console.error('Invalid response:\n' + await response.text());
            throw new Error("Could not fetch log");
        }

        return response.json();
    }

    function unhideLogs() {
        document.getElementById("log").classList.remove('hidden');
    }

    await updateLogs();
};