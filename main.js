onload = ()=>{
    console.log("Hello 🌎🌍🌏!");

    const iam = document.getElementById("iam")
    iam.onsubmit = (e => {
        e.preventDefault();

        const name = e.target.name.value;
        const details = e.target.details.value;
        updateBanner(name);

        e.target.name.value = "";
        e.target.details.value = "";

        return false;
    });

    function updateBanner(name) {
        document.getElementById("hello-banner").innerText = `Hello, ${name}!`;
    }
};