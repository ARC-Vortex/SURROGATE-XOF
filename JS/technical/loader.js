// Load files

for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "JS/" + modInfo.modFiles[file]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

