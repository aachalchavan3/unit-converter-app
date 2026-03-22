async function convert() {
    let value = document.getElementById("value").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    let resultBox = document.getElementById("result");

    // Empty input check
    if (value === "") {
        resultBox.innerText = "⚠️ Please enter a value";
        resultBox.classList.add("show");
        return;
    }

    try {
        let response = await fetch("http://127.0.0.1:5000/convert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ value, from, to })
        });

        let data = await response.json();

        // Unit symbols
        const units = {
            m: "m",
            km: "km",
            kg: "kg",
            g: "g",
            sec: "sec",
            min: "min",
            c: "°C",
            f: "°F"
        };

        // Format result
        let resultValue = parseFloat(data.result);
        if (!Number.isInteger(resultValue)) {
            resultValue = resultValue.toFixed(2);
        }

        // Final text
        let finalText = `${value} ${units[from]} = ${resultValue} ${units[to]}`;
        resultBox.innerText = finalText;

        // Animation
        resultBox.classList.remove("show");
        setTimeout(() => resultBox.classList.add("show"), 100);

        // =====================
        // 📜 HISTORY FEATURE (with delete ❌)
        // =====================
        let historyList = document.getElementById("history");

        let newItem = document.createElement("li");

        // Text span
        let textSpan = document.createElement("span");
        textSpan.innerText = finalText;

        // Delete button ❌
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.style.border = "none";
        deleteBtn.style.background = "transparent";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.marginLeft = "10px";

        // Delete only this item
        deleteBtn.onclick = function () {
            historyList.removeChild(newItem);
        };

        // Add text + button
        newItem.appendChild(textSpan);
        newItem.appendChild(deleteBtn);

        // Add to top
        historyList.prepend(newItem);

        // Limit to 5 items
        if (historyList.children.length > 5) {
            historyList.removeChild(historyList.lastChild);
        }

    } catch (error) {
        resultBox.innerText = "❌ Error connecting to server";
    }
}

/* 🔄 Swap function */
function swap() {
    let from = document.getElementById("from");
    let to = document.getElementById("to");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;
}

/* 🗑 Clear all history */
function clearHistory() {
    document.getElementById("history").innerHTML = "";
}